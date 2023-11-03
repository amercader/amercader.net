---
title: "Choosing a map provider in ckanext-spatial"
description: "A new version of ckanext-spatial to help mitigate the Stamen map tiles end of life."
images:
- /img/blog/stamen-map-provider-error.png
date: 2023-11-03
draft: false
---

A new version of ckanext-spatial ([2.1.0](https://github.com/ckan/ckanext-spatial/releases/tag/v2.1.0)) was released this week. Besides the usual gracious contributions from community members and some cleanups to drop support for Python 2 and an old search backend, the main change included in this release is an improved way of configuring the background tiles for map widgets.

A while ago, users of the extension might have seen the following message popping up in their maps:


{{< figure src="/img/blog/stamen-map-provider-error.png" alt="A Leaflet map showing a message in the Stamen tiles about these being discontinued" >}}

After many years of being a popular choice as a tile map provider, Stamen stopped [providing their tiles](https://maps.stamen.com/stadia-partnership/) as a public service. I chose the Stamen Terrain tiles as the default fallback option for ckanext-spatial map widgets because they didn't require any registration or setup (besides being really beautiful), making things easier for users installing the extension. But the reality is, that as of October 2023 most if not all map tiles providers out there require at the very least registering to their service and providing some sort of token or key. This makes perfect sense, as maintaining a global tileset updated and served globally requires resources, and providers need some way of tracking usage and limiting abuse.

So the new version of ckanext-spatial won't setup any pre-configured tile layer on map widgets, and will encourage maintainers to set up their preferred one by displaying a notice:


{{< figure src="/img/blog/no-map-provider.png" alt="A notice in the map widget asking users to configure a map provider" >}}


To provide as many choices as possible, I integrated the excellent [Leaflet-providers](https://github.com/leaflet-extras/leaflet-providers) library, which provides pre-configured access to dozens of map providers.


This means that in most cases, setting up a map provider is just a matter of a couple of configuration options in the [CKAN configuration file](https://docs.ckan.org/en/latest/maintaining/configuration.html#ckan-configuration-file):

    # Stadia / Stamen Terrain
    ckanext.spatial.common_map.type = Stadia.StamenTerrain
    ckanext.spatial.common_map.apikey = <your_api_key>

or:

    # MapBox
    ckanext.spatial.common_map.type = MapBox
    ckanext.spatial.common_map.mapbox.id = <your_map_id>
    ckanext.spatial.common_map.mapbox.accessToken = <your_access_token>

Sites using the old configuration options should still work, and there is an option to manually configure a layer using the [XYZ convention](https://docs.ckan.org/projects/ckanext-spatial/en/latest/map-widgets.html#custom-layers) for those wanting to add their own layers.

As ever, please check the [documentation](https://docs.ckan.org/projects/ckanext-spatial/en/latest/map-widgets.html) for all details and let me know if you find any [issue](https://github.com/ckan/ckanext-spatial/issues).
