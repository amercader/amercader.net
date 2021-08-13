---
title: "Casual OpenStreetMapping"
description: "Getting started contributing to OSM, the easy way."
images:
- /img/blog/osm_cires2.png
date: 2021-08-13
draft: false
---

Records show that I joined OpenStreetMap back in 2008, but I never was a very active contributor. Back then there wasn't widely available imagery appropriately licensed to trace things on, and the tools and conventions to be used were cryptic and felt for the initiated only. [JOSM](https://josm.openstreetmap.de/) looked scary and the friendlier [iD editor](https://wiki.openstreetmap.org/wiki/ID) didn't exist yet.

Fast forward a decade and, not surprisingly, things have changed a lot. To the point that I've found myself editing the map semi-regularly for the last month, which has brought me to a whooping #154 in the OSM rank for Spain (according to [this site](https://hdyc.neis-one.org/?amercader)). How about that?

{{< figure src="/img/blog/howosm.png" alt="Some of my OSM contribution stats" caption="Impressive, I know" >}}

Perhaps my proudest moment is mapping the entirety of the small hamlet of [Cirés](https://www.openstreetmap.org/search?query=cir%C3%A9s#map=18/42.40994/0.70884), where we recently spent a week on holidays (It helped that it only has 8 buildings and no street names).

{{< figure src="/img/blog/osm_cires1.png" alt="OSM in the town of Cirés" >}}
{{< figure src="/img/blog/osm_cires2.png" alt="OSM in the town of Cirés" >}}

Here's how it looks in reality:

{{< figure src="/img/blog/cires.jpg" alt="A view of the town of Cirés" >}}

The reason for this revival is that nowadays you can make significant contributions to OSM using just your phone. All the editing above was done using my phone during my laptop-free vacation.

## StreetComplete

 What kick-started things in my case was learning about [StreetComplete](https://play.google.com/store/apps/details?id=de.westnordost.streetcomplete&hl=en&gl=US). StreetComplete is an Android app that, rather than allowing you to create new features on OSM, gives you the ability to solve "quests" on existing ones. Each of these quests essentially adds detail to the underlying map data, but rather than having to know what tags are, how to add them and which ones are the correct ones in each situation, it offers you simple visual tasks that abstract the whole process for you.

Here's an example set of quests in a particular area. There are quests for adding house numbers, telling what surface a street has, if it has pavement or not, or even describing the shape of a building's roof:

{{< figure src="/img/blog/osm1.png" alt="A screenshot of the StreetComplete app" >}}

Once you tap on them you get a widget to answer the specific question. For instance, if you tap on a "Surface type" quest you get this:

{{< figure src="/img/blog/osm2.png" alt="A screenshot of the StreetComplete app" >}}

It is a very well designed process, which allows for rapid input. And like all successful phone apps it is, well, slightly addictive. You start doing some quick quests on areas you are familiar with and before you know it you are taking a detour on your way home "just to see how many levels the buildings on that street have" or "check the opening hours of that pharmacy". And all for the greater good! Seriously though it is a great way to kill time with your phone instead of doomscrolling, and the details provided can be really valuable.

## Vespucci

StreetComplete can also act as a gateway drug for more involved OSM editing. Sometimes the list of options you are given is too limited, or you notice that the current data is incorrect or incomplete. Maybe there is a typo in a street name, or a set of stairs missing in a way. StreetComplete won't allow you to fix any of these so it's time to move to the next level.

One of my hard requirements was no desktop computer, as I already spend too many hours sitting in front of it, so I investigated mobile options. The iD editor was the first thing I tried but sadly it doesn't work great on a mobile browser (if you want to get started on OSM editing using your computer definitely give iD a try first). [Vespucci](https://vespucci.io/) quickly stood out as the most comprehensive Android-based editor and that's what I went for (iOS users might want to give [Go Map!!](https://wiki.openstreetmap.org/wiki/Go_Map!!) a try).

Vespucci is definitely not as friendly as StreetComplete and it will take a while to get familiar with it.

{{< figure src="/img/blog/osm_vespucci1.png" alt="A screenshot of the Vespucci app" >}}

Sensible people will benefit from reading OSM's [Beginners' Guide](https://wiki.openstreetmap.org/wiki/Beginners%27_guide) and the [Introduction to Vespucci](http://vespucci.io/help/en/Introduction/) but for those of you like me that jump straight to touching buttons and breaking things you basically download the current data (nodes, ways and their tags) for a particular area, make changes (add, edit or delete stuff) and then upload the changes to the OSM server. You can undo all changes and there is a review step before uploading so there is space for trying things and learning as you go.

I won't go into detail here about how Vespucci works, mostly because I've just used a fraction of what it can do so far, but doing basic editing like adding new buildings or amenities, or editing tags should be easy to pick up for people with experience in other editing tools. 

The [OSM Wiki](https://wiki.openstreetmap.orgOSM) is the main resource I use to learn how to map a particular thing. In most cases, the process is as follows:

1. Google "osm + thing I want to map" (eg *osm cemetery*)
2. Open the OSM Wiki page for it (eg [Tag:landuse=cemetery](https://wiki.openstreetmap.org/wiki/Tag:landuse%3Dcemetery))
3. Check the "How to map" and "See also" sections
4. Apply the relevant tags to the nodes/ways in Vespucci

Vespucci will flag issues with the data like overlapping buildings and ways, ways without exit missing appropriate tags etc, which also helps to learn how to map things properly.

---

I still have a lot to learn to even consider myself a novice OSM mapper but beginner-friendly tools like the ones above have definitely helped me in dipping my toes in the world of OSM mapping.


{{< figure src="/img/blog/osm_estarredono.png" alt="OSM in Estarredono" caption="Another nice set of edits in the beautiful place of <a href='https://www.openstreetmap.org/#map=19/42.55457/0.76514'>Estarredono</a>" >}}

