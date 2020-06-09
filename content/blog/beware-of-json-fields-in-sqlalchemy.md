---
title: "Beware of JSON fields in SQLAlchemy"
description: "JSON fields in PostgreSQL are really convenient, but when using them in SQLAlchemy there are details around changes detection that need to be taken into account."
date: 2020-06-09
draft: false
---

PostgreSQL [JSON fields](https://www.postgresql.org/docs/12/datatype-json.html) are a really convenient way of storing structured data alongside traditional row / column values. They avoid the need to create extra tables and relationships and when properly set up they can perform really well for a lot of use cases.

SQLAlchemy supports JSON fields [natively](https://docs.sqlalchemy.org/en/13/core/type_basics.html#sqlalchemy.types.JSON) so you can easily add support for them in your ORM models. There is one thing that has bitten me a couple of times before and is definitely worth knowing about JSON fields and SQLAlchemy though, and that is how changes are detected (or as SQLAlchemy puts it, "mutation tracking").

Let's start with a simple example, a `document` table with a primary key and a `config` JSON field (we are using PostgreSQL `jsonb` type, which is preferable in most cases):

```sql
CREATE TABLE document (
    id integer CONSTRAINT document_pk PRIMARY KEY,
    config jsonb
);
```
And here's our SQLAlchemy model declarative definition, plus all the boilerplate to get a database connection and a session:

```python
from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import JSONB

engine = create_engine('postgresql://user:pass@host/db')
session = sessionmaker(bind=engine)()
Base = declarative_base()


class Document(Base):

    __tablename__ = 'document'

    id = Column(Integer, primary_key=True)
    config = Column(JSONB)

```
Let's add a document:
```python
doc = Document(
    id=1,
    config={'key1': 1, 'key2': 2}
)

session.add(doc)
session.commit()
```
And change the value on one of the keys in the `config` object:

```python
doc.config['key2'] = 5

session.add(doc)
session.commit()

assert doc.config['key2'] == 5
```

This will raise an `AssertionError` and if we inspect the value of the `config` field at that point we will see that `key2` is still 2.

Looking at the SQLAlchemy documentation linked above, if we scroll a bit down we'll see the section _Detecting Changes in JSON columns when using the ORM_ (that frustratingly can't be directly linked):

> The JSON type, when used with the SQLAlchemy ORM, does not detect in-place mutations to the structure

Which means that SQLAlchemy has no way of knowing that you changed the value of the JSON field. We need to use the _mutable_ extension, more particularly, the [`MutableDict`](https://docs.sqlalchemy.org/en/13/orm/extensions/mutable.html#sqlalchemy.ext.mutable.MutableDict) class. Let's rewrite our model definition:

```python
from sqlalchemy import Column, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableDict

# engine and session definition omitted

class Document(Base):

    __tablename__ = 'document'

    id = Column(Integer, primary_key=True)
    config = Column(MutableDict.as_mutable(JSONB))
   
```    
And try the update again:

```python
doc.config['key2'] = 5

session.add(doc)
session.commit()

assert doc.config['key2'] == 5
```
No `AssertionError` now, so we are on the right track.

But before we happily carry on using our JSON field let's see what happens with more complex structures, eg if one of the values in our object is another object:

```python
doc.config['key2'] = {
    'key2a': 'a'
    'key2b': 'b'
}

session.add(doc)
session.commit()

doc.config['key2']['key2a'] = 'c'

session.add(doc)
session.commit()

assert doc.config['key2']['key2a'] == 'c'
```

Oh no! `AssertionError` is back to tell us that changes *to nested objects* are not being tracked. Having a closer look at the `MutableDict` docs we see:

> Note that MutableDict does not apply mutable tracking to the values themselves inside the dictionary. Therefore it is not a sufficient solution for the use case of tracking deep changes to a recursive dictionary structure, such as a JSON structure.

We can't say we weren't warned (if you are the type of person who reads the documentation *before* doing something). The guideline for how to solve this is:

> To support this use case, build a subclass of MutableDict that provides appropriate coercion to the values placed in the dictionary so that they too are “mutable”, and emit events up to their parent structure.

This is quite a mouthful and turns out, not trivial to implement.

Luckily there is an open source library that does just that: [sqlalchemy-json](https://github.com/edelooff/sqlalchemy-json). It provides a class that allows tracking changes on nested dicts and lists in a JSON field. To use it you need to change slightly the field definition in your model:

```python
from sqlalchemy_json import mutable_json_type

class Document(Base):

    __tablename__ = 'document'

    id = Column(Integer, primary_key=True)
    config = Column(mutable_json_type(dbtype=JSONB, nested=True))
```

This will make SQLAlchemy aware of changes at all levels of the JSON field, so the example above should work now. The library is well documented and looks very thoroughly implemented, although there are no tests included.

An alternative to use an external requirement is to create a copy of the JSON field dict before making the changes. This will change the references to the entire object, and SQLAlchemy will update it regardless of where the changes are made:


```python
import copy

doc.config = copy.deepcopy(doc.config)

doc.config['key2']['key2a'] = 'c'

session.add(doc)
session.commit()

assert doc.config['key2']['key2a'] == 'c'
```

Depending on the size of your objects and the frequency of updates this approach might be sufficent, although when working with big objects and many operations the cost of copying the object probably needs to be taken into account.

 I hope this saves someone some debugging time.
