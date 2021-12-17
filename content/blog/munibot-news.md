---
title: "Munibot News"
description: "News roundup from the Munibot front"
images:
- /img/blog/munibot_search.png
date: 2021-12-18
draft: false
---

Here's a news roundup from the [Munibot](https://amercader.net/blog/munibot-the-friendly-geo-twitter-bot/) front, everybody's favourite Twitter geo bots.

About a month ago [@munibot_cat](https://twitter.com/munibot_cat), the smallest of the current bots, finished its journey across the 948 Catalan municipalities. It took just under a year and along the way it gathered a small but loyal group of followers. Its bigger brother [@munibot_es](https://twitter.com/munibot_es) carries on, having just surpassed a quarter of all municipalities visited.

{{< figure src="/img/blog/munibot_cat_map.png" alt="A screenshot of the municipalitites visited by munibot_cat" link="https://munibot.amercader.net/ca" rel="noreferrer" caption="Well done, @munibot_cat">}}


While one bot finished its journey, another one just started. From sea to shining sea, [@countybot_us](https://twitter.com/countybot_us) will visit all 3221 US counties and equivalents. I wasn't sure how the larger units than European municipalities would work but I'm really enjoying the images generated.

{{< figure src="/img/blog/countybot_us_2.png" alt="A screenshot of a tweet by countybot_us" >}}

The mid-western counties, drawn like a grid of rectangles, look like artworks that can be hung on the wall.

{{< figure src="/img/blog/countybot_us_1.png" alt="A screenshot of a tweet by countybot_us" >}}

The imagery comes from the USGS [National Map](https://www.usgs.gov/programs/national-geospatial-program/national-map). The WFS and WMS services powered by ArcGIS are mostly ok, except for one important aspect in our case. The WMS service lies if you pass a `FORMAT=image/geotiff` parameter and returns a plain old TIFF, without embedded georeference information. That meant that I had to georeference the image myself before passing it to the processing functions that create the mask effect, which meant dusting off the [venerable Python GDAL bindings](https://github.com/amercader/countybot_us/blob/main/countybot_us/profile.py#L129:L161). True to their reputation, they were a bit of a pain to install and set up but we got there.



{{< figure src="/img/blog/munibot_search.png" alt="A screenshot of the search functionality in the munibot map apps" >}}


The [Munibot Map Apps](/blog/munibot-maps/) finally got a search box so users can jump straight to their favourite administrative unit and check if a tweet exists or not. It was great fun to build the underlying [API](https://github.com/amercader/munibot_backend) with [FastAPI](https://fastapi.tiangolo.com/), its documentation is truly exceptional. I played around a bit with the async support but it turned out that the synchronous versions of the calls were slightly faster! So definitely not worth the overhead.

I also used this as an excuse to learn a bit about [Traefik](https://traefik.io/traefik/), specially its [automatic SSL certificate renewal setup](https://doc.traefik.io/traefik/user-guides/docker-compose/acme-tls/). I wish my past self from a decade ago could see these tools! Having said that, all the munibot database infrastructure is still proudly powered by SQLite so there's definitely value in old boring pieces of software.
