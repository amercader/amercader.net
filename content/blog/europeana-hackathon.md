---
title: "Europeana Hackathon"
date: 2011-04-05 20:30:45
draft: false
---

The past Friday and Saturday took place in Hilversum, near Amsterdam,
the first Europeana Hackathon. [Europeana][europeana] is a project funded by
the European Comission that aggregates cultural content from organizations
across Europe. It hosts around 16 million records, and the variety of stuff
you can find on it is incredible, from [ancient maps][euro1] to [fashion clogs][euro2] 
to [dolls sitting on a monkey][euro3].

The team behind Europeana has recently published a preliminary beta version
of an [API][api], and the objectives of the Hackathon were both receiving feedback
from developers and see what they could came up with after playing with it.

The hacking took place in the impressive [Netherlands Institute for Sound and Vision][inst]
and the room was everything but dull! The organization was absolutely flawless 
and there were lots of interesting ideas for enhancing and building services
around the API. 
<div class="image"><img src="/img/posts/eurohack1.jpg" alt="Netherlands Institute for Sound and Vision"/></div>
<div class="image"><img src="/img/posts/eurohack2.jpg" alt="Funky hacking"/></div> 
Just the day before starting, new enrichment terms were included in the API,
including location information extracted from GeoNames. This allowed to 
perform bounding box based spatial queries, and I quickly started 
looking at ways to use them.

The Europeana API is based on [OpenSearch][os], and returns a RSS response
of the query results. Unfortunately, the location information is not
included in this first response, but in a SRW representation that has to be
queried in a second query. So my first step was to create a thin wrapper 
around the Europeana API that captured the results, queried the details of
each item and injected the coordinates back in the results RSS.

So instead of getting this:

    :::xml
     <item>
        <title>Vierge &#224; l'Enfant : Nostre Dame de Grasse</title>
        <link>http://www.europeana.eu/portal/record/03901/ ... </link>
        <description>anonyme;Culture.fr/collections</description>
        <enclosure url="http://www.culture.gouv.fr/Wave/image/joconde/0387/m056206_0003905_v.jpg"/>
     </item>

You get this:

    :::xml
     <item>
        <title>Vierge &#224; l'Enfant : Nostre Dame de Grasse</title>
        <link>http://www.europeana.eu/portal/record/03901/ ... </link>
        <description>anonyme;Culture.fr/collections</description>
        <enclosure url="http://www.culture.gouv.fr/Wave/image/joconde/0387/m056206_0003905_v.jpg"/>
        <georss:point xmlns:georss="http://www.georss.org/georss">43.41667 1.5</georss:point>
     </item>

A tiny but crucial difference. This effectively transforms the results in a
[GeoRSS][georss] feed, an open standard used to include location information in RSS
which is widely supported in mapping applications and libraries like OpenLayers
or Google Maps. The obvious problem is that this is terribly inefficient and
__very__ slow, so it will be great if the API itself would provide this information.

Once the GeoRSS wrapper was ready, there were several possible applications
to build around it. I wrote a simple interface with OpenLayers that allows 
you to draw a bounding box, perform an API query and plot the results on the
map. It also supports pagination and filtering by historic period (though in
some cases no results are returned).

<div class="image"><img src="/img/posts/eurohack3.png" alt="Europeana Geo-Wrapper Demo"/></div>

 * **[View the demo online][demo]**
 * Source code is available at [GitHub][github]

There was no time for more, but hopefully it will show the potential of
geo-enabling the Europeana API, which I'm sure has a bright future ahead.

[europeana]: http://europeana.eu
[os]: http://www.opensearch.org
[euro1]: http://europeana.eu/portal/search.html?embedded=&start=1&view=table&query=maps
[euro2]: http://europeana.eu/portal/record/09405a/ED1C34096D50EACC3C812650B9BEBB9C6FC92F67.html
[euro3]: http://europeana.eu/portal/record/09405/EE5B9518E8087731287B4DEC0BCAEEC9DCED3420.html
[api]: http://version1.europeana.eu/web/api
[inst]: http://www.neutelings-riedijk.com/index.php?id=13,37,0,0,1,0
[georss]: http://www.georss.org/
[demo]: http://amercader.net/dev/geoeuropeana/
[github]: https://github.com/amercader/geoeuropeana