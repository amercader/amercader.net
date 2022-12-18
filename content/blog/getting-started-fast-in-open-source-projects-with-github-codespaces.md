---
title: "Getting started fast in Open Source projects with GitHub Codespaces"
description: "See how GitHub Codespaces can provide users with their own demo environment and make easy to start contributing"
images:
- /img/blog/2021.jpg
date: 2022-01-09
draft: false
---

In this post I explore how remote development enviroments can be a helpful resource to lower the barriers to entry for Open Source projects, and using the example of Github Codespaces, how to configure and set them up so users can try out your library or app wihtout installing anything.

TODO image


Different options for fully remote, cloud-based development environments have been appearing in recent years, both from startups like [Gitpod](https://www.gitpod.io/) or [Nimbus](https://www.usenimbus.com/) and big players like [AWS CodeCatalyst](https://aws.amazon.com/codecatalyst/) or [GitHub Codespaces](https://github.com/features/codespaces). The main selling point for these products is the ability to quickly spin up pre-configured and reproducible development environments that allow to focus on the coding instead of the setting up. 


Personally I'm not ready to leave the comfort of my own computer for coding just yet, so I'm not interested in remote dev environments as a day to day tool, but rather in their potential to produce ready to go, pre-configured instances of Open Source projects that users can immediately try out.

# Why are they useful

Remote development environments combine an online editor that runs in browser with some cloud infrastructure that allows to run one ore more services, generally defined as Docker containers
