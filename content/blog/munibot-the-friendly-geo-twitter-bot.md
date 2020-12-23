---
title: "Munibot, the friendly geo Twitter bot"
date: 2020-12-23
draft: false
---

I wrote a small Twitter bot that tweets aerial imagery of municipalities (or any other administrative region). Its current two incarnations are [@munibot_es](https://twitter.com/munibot_es) and [@munibot_cat](https://twitter.com/munibot_cat), sending regular images of municipalities in Spain and Catalonia respectively:


{{< figure 
    src="/img/blog/munibot_es_tweet.jpg"
    alt="A screenshot of Munibot es"
    caption="[Original tweet](https://twitter.com/munibot_es/status/1341390576936214529)"
>}}

I was originally inspired by [@everytract](https://twitter.com/everytract), which shows all US Census Tracts in order, and while working on it I also found out about a more recent colleague, [@everypostcode](https://twitter.com/everypostcode). I'm happy munibot joins this crew of silent tweeters that bring beautiful aerial imagery to otherwise depressing timelines.

To make things a bit more interesting I wanted to not only show the specific municipality with a white or black background but to mask the surroundings with a semi-transparent mask. I think this makes the images generated more beautiful:


{{< figure 
    src="/img/blog/munibot_es_tweet.jpg"
    alt="A screenshot of Munibot es"
    caption="[Original tweet](https://twitter.com/munibot_es/status/1341390576936214529)"
>}}


