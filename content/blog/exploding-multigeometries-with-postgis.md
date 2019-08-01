---
title: "Exploding multi-geometries with PostGIS"
date: 2011-04-27 21:11:29
draft: false
---

I recently needed a bit of geoprocessing for which PostGIS turned out to 
be the perfect tool. I'll share my findings in case they are
useful to somebody. But first of all, here goes some context: I had imported the countries dataset from [Natural Earth](http://www.naturalearthdata.com/)
to PostGIS (piece of cake with [ogr2ogr](http://www.gdal.org/ogr2ogr.html)), and I needed to obtain the extent or 
bounding box of each country.

## Getting the extents

The most obvious choice seemed [`ST_Extent`](http://postgis.refractions.net/docs/ST_Extent.html), but there is a better choice:
[`ST_Envelope`](http://postgis.refractions.net/docs/ST_Envelope.html). `ST_Extent` is an aggregate function, so you need to group by one of the 
table's columns, and it returns a `bbox3d_extent` object instead of an actual geometry. `ST_Envelope` will return a geometry (a polygon in our case):

    :::sql
    CREATE TABLE world_extents AS 
    SELECT ST_Envelope(mpoly) AS the_geom,name 
    FROM world_worldborders;

The result of the previous statement was not as exciting as expected when rendered in QGIS:

<div class="image"><img src="/img/posts/extents1.png" alt="Messy extents"/></div>

The Natural Earth borders dataset has one multi-polygon per country, which includes all the land polygons which pertain to it. In consequence,
 countries like the United States had extents stretching the whole world, from Hawaii to the Bering Strait islands. I needed a previous step
 to obtain one separate polygon for each land mass or island.

## Boum!

GIS users will be familiar with the operation known as __explode__. It is used to obtain individual features from a multipart feature. So instead of having a single polygon for all Japan, after exploding it you will get an individual polygon for each of its islands.

<div class="image"><img src="/img/posts/explode.png" alt="Explode!"/></div>

There are different ways of performing it in desktop GIS applications, but in can
also be done in PostGIS using a couple of different functions. I adapted this statment from the slides of the ["Tips for the PostGIS power user"](http://2010.foss4g.org/presentations_show.php?id=3369) by [Paul Ramsey](http://blog.cleverelephant.ca/), presented in last year's edition of FOSS4G (The slides are a must read for any PostGIS enthusiast). Let's have a look at the final statement and discuss it later:

    :::sql
    CREATE TABLE world_worldborders_2 AS 
    SELECT id,name,the_geom 
    FROM (SELECT id,name,ST_GeometryN(mpoly,generate_series(1,ST_NumGeometries(mpoly))) AS the_geom
    FROM world_worldborders
    ) AS foo;

* [`ST_GeometryN`](http://postgis.refractions.net/docs/ST_GeometryN.html) will return the geometry at the provided index in a geometry collection or multipart geometry.
* [`generate_series`](http://www.postgresql.org/docs/8.0/static/functions-srf.html) is a set returning function (it returns more than one row). It generates a series of values from the start to the end values provided.
* [`ST_NumGeometries`](http://www.postgis.org/docs/ST_NumGeometries.html) does what it says on the tin, returning the number of geometries in a collection or multigeometry.

There is a faster approach using [`ST_Dump`](http://www.postgis.org/docs/ST_Dump.html), which returns a set of the individual geometries that make up a multi one.
Notice that it returns a composite type with a `path` and `geom` properties, so you need to use the dot notation to access the returned geometry:

    :::sql
    CREATE TABLE world_worldborders_3 AS
    SELECT id,name,
    (ST_Dump(mpoly)).geom
    FROM world_worldborders;

##The result

The combined statement produced a more nice looking layer, with extents following more closely the actual outline
of the countries:

    :::sql
    CREATE TABLE world_extents_2 AS 
    SELECT id,name,ST_Envelope(the_geom) AS the_geom
    FROM (SELECT id,name,ST_GeometryN(mpoly,generate_series(1,ST_NumGeometries(mpoly))) AS the_geom
    FROM world_worldborders
    ) AS foo;
    

<div class="image"><img src="/img/posts/extents2.png" alt="Nice extents"/></div>