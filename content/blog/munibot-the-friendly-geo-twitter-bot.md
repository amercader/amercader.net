---
title: "Munibot, the friendly geo Twitter bot"
description: "I wrote Munibot, a small Twitter bot that tweets aerial imagery of municipalities (or any other administrative region)"
images:
- /img/blog/munibot_summary.jpg
date: 2020-12-26
draft: false
---

I wrote [Munibot](https://github.com/amercader/munibot), a small Twitter bot that tweets aerial imagery of municipalities (or any other administrative region). Its current two incarnations are [@munibot_es](https://twitter.com/munibot_es) and [@munibot_cat](https://twitter.com/munibot_cat), sending regular images of municipalities in Spain and Catalonia respectively:


{{< figure 
    src="/img/blog/munibot_es_tweet.jpg"
    alt="A screenshot of Munibot es"
    caption="[Original tweet](https://twitter.com/munibot_es/status/1341390576936214529)"
>}}


Of course it is open source and you can easily customize it to run your own. The source and documentation is on [GitHub](https://github.com/amercader/munibot).

I was originally inspired by [@everytract](https://twitter.com/everytract), which shows all US Census Tracts in order, and while working on it I also found out about a more recent colleague, [@everypostcode](https://twitter.com/everypostcode). I'm happy Munibot joins this crew of silent tweeters that bring beautiful aerial imagery to otherwise depressing timelines.

To make things a bit more interesting I wanted to not only show the specific municipality with a white or black background but to mask the surroundings with a semi-transparent mask. I think this makes the images generated more beautiful:


{{< figure 
    src="/img/blog/munibot_cat_examples.jpg"
    alt="Examples of images generated by Munibot"
    class="imgWide"
>}}

{{< figure 
    src="/img/blog/munibot_es_examples.jpg"
    alt="Examples of images generated by Munibot"
    class="imgWide"
>}}

It had been a long while since my geo days, so it was remarkable to see how libraries like [Fiona](https://fiona.readthedocs.io) and [Rasterio](https://rasterio.readthedocs.io) have made it so much easier to deal with geospatial data. [Tweepy](http://docs.tweepy.org) made all the Twitter-specific stuff straightforward, so all in all it was relatively easy to put together.

My goal is to eventually have different bots tweeting different administrative units from places around the world, so I wrote the main library in a modular way, where different profiles feed the relevant data and Munibot takes care of all the common logic.

Profiles need to provide:

* The **geometry** of the boundary of a particular administrative unit. This can come from any place that can end up providing a GeoJSON-like Python dict: an actual GeoJSON file, PostGIS database or a [WFS](https://en.wikipedia.org/wiki/Web_Feature_Service) service (like in the current profiles).
* The **base image** (aerial photography or satellite imagery) covering the extent of the administrative unit. [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services work really well for this as they allow to retrieve images of arbitrary extent and size (as opposed to tile-based services optimized for visualization).
* The **text** that should go along with the image in the tweet. Generally the name of the unit, plus some higher level unit for reference. I added links to Wikipedia in the current profiles as well.
* A method that defines the **id** of the next unit that should be tweeted. As opposed to *@everytract* and *@everypostcode* that tweet units in order, I preferred to tweet units randomly, so I need to keep some track of the units already made (small SQLite database backed up to S3 💅)
* Optionally, the **latitude and longitude** that should be added to the tweet.

With all this Munibot will take care of the rest:
* Create the mask with the unit boundaries and apply it to the base image to generate the final one.
* Put together all inputs so Tweepy can upload the image and send the tweet.
* After the tweet is sent, profiles get the tweet (status) id so they can do whatever they need with it.

And that's it. Once everything is set up, it just a matter of running the following:

    munibot tweet <profile_name>

Next steps are to finish the documentation, and implement one or more new bots externally to really test the profiles mechanism. Do you want to run your own or know data sources that would make a good candidate for a new munibot account? [Get in touch!](https://amercader.net)

{{< figure 
    src="/img/blog/munibot_cat_tweet.jpg"
    alt="A screenshot of Munibot cat"
    caption="[Original tweet](https://twitter.com/munibot_cat/status/1342379595396427781)"
>}}
