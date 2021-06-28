---
title: "Munibot Maps: Vector tiles with Maplibre GL JS"
description: ""
images:
- /img/blog/munibot_map.png
date: 2021-06-26
draft: false
---

For the past six months the [Munibot](https://amercader.net/blog/munibot-the-friendly-geo-twitter-bot/) crew has been humming
along, regularly tweeting beautiful imagery of [Spanish](https://twitter.com/munibot_es) and 
[Catalan](https://twitter.com/munibot_cat) municipalities. The two original bots were later joined by
their [French counterpart](https://twitter.com/communebot/), with the much more monumental task of going over the almost 35.000
communes of France.

Over time, I got curious about how many tweets had been published and how many were left, or wondered if a particular
municipality had been tweeted or not. All these questions can be answered by querying Twitter or the backend database that
the bots use, but I wanted some kind of interactive dashboard where I could access the information directly. And I also
really liked the idea of having a live map that got filled with color as more tweets/municipalities were being published,
until eventually the whole map was covered in color.

And that is what now lives at [munibot.amercader.net](https://munibot.amercader.net/).

{{< figure src="/img/blog/munibot_map.png" alt="A screenshot of the Munibot Map app" link="https://munibot.amercader.net/" rel="noreferrer" >}}

They are basic maps without background or labels, and the municipalities with a tweet have a different color. When you click
on them you can see the actual tweet. And that's about it (I will probably add a search box to search by name though).

## Data

We are lucky in Spain to have public open geodata easily available under permissive licenses so getting the municipalities boundaries for the Spanish and Catalan munibots was just a matter of a few clicks on the [CNIG Download Centre](https://centrodedescargas.cnig.es/CentroDescargas/index.jsp). French communes were another matter though and I had to dig a bit. I finally ended up using a dataset from [Data.gouv.fr](https://www.data.gouv.fr/fr/datasets/decoupage-administratif-communal-francais-issu-d-openstreetmap/) which had been extracted from OpenStreeMap, and complementing it with extra datasets to get all the fields I needed. In both cases the starting format was the venerable Shapefile, and I normalized them and migrated them to PostGIS to make working with them easier.


## Vector tiles

To visualize and add style to these datasets in the browser we need to transform them in a suitable format. I never had used [Vector tiles](https://en.wikipedia.org/wiki/Vector_tiles) before and this seemed like a great opportunity. Vector tiles clip your geographic datasets into contiguous (generally) square tiles and serialize them using a format called [Protocol Buffer (or protobuf)](https://en.wikipedia.org/wiki/Google_Protocol_Buffers), which is highly optimized to transfer data efficiently. All this allows web maps to consume large datasets efficiently, while providing more flexibility when styling it or adding interaction to it.

There is a rich [ecosystem of tools](https://github.com/mapbox/awesome-vector-tiles) for working with vector tiles. You can use a dynamic tile server like [Tegola](https://tegola.io/) or a tool like [Tippecanoe](https://github.com/mapbox/tippecanoe) to generate the tilesets and then host them statically somewhere. Both tools worked really well for me but I had really basic requirements. I ended up going for the second option and hosting the tiles on Amazon S3, which turned out really well. I'll definitely try to write a more detailed separate blog post describing this process, as I think it's a great option for serving spatial data with minimal costs and maintenance.


## App

For a long time, the gold standard for building web maps that consumed vector tiles had been [Mapbox GL JS](https://www.mapbox.com/mapbox-gljs). At the end of last year they changed the license of the new version of their library to a proprietary one, which made it an option less appealing for open source projects. A fork of the last BSD-licensed Mapbox GL JS version became [Maplibre GL JS](https://github.com/maplibre/maplibre-gl-js) and that's what I picked to power my maps.

And to glue it all together? HTML and [plain JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Granted that it is an extremely simple website but in the current state of frontend development, not jumping into a framework and writing code like this feels both defiant and *very* refreshing:

```javascript
let content = `| ${tweeted} tweets / ${total} total (${parseInt(tweeted/total*100)}%)`
document.getElementsByClassName("counts")[0].append(
    document.createElement("li").appendChild(
        document.createTextNode(content)))
```

It's silly but I'm particularly proud of the small SVGs in the [Spanish map](https://munibot.amercader.net/es/) to zoom the map to mainland Spain or the Canary Islands:

{{< figure src="/img/blog/munibot_es_extent.png" alt="A screenshot of the Munibot Map app, showing the extent chooser" link="https://munibot.amercader.net/es/" rel="noreferrer"  caption="So cute">}}

For France and its myriad overseas territories I tried to use [Roger Veciana](https://twitter.com/rveciana)'s excellent [d3-composite-projections](https://github.com/rveciana/d3-composite-projections) library but it was too much hassle to adapt to my needs and ended up with a more spartan link list:

{{< figure src="/img/blog/munibot_fr_extent.png" alt="A screenshot of the Munibot Map app, showing the extent chooser" link="https://munibot.amercader.net/fr/" rel="noreferrer"  caption="Gets the job done">}}

All in all a neat little app built in a "serverless" stack that has been fun to put together. Check it out at [munibot.amercader.net](https://munibot.amercader.net/).
