---
title: "Getting started fast in Open Source projects with GitHub Codespaces"
description: "See how GitHub Codespaces can provide users with their own demo environment and make easy to start contributing"
images:
- /img/blog/2021.jpg
date: 2022-01-09
draft: false
---

In this post I explore how remote development environments can be a helpful resource to lower the barriers to entry for Open Source projects, and using the example of GitHub Codespaces, how to configure and set them up so users can try out your library or app without installing anything.

TODO image


Different options for fully remote, cloud-based development environments have been appearing in recent years, both from startups like [Gitpod](https://www.gitpod.io/) or [Nimbus](https://www.usenimbus.com/) and big players like [AWS CodeCatalyst](https://aws.amazon.com/codecatalyst/) or [GitHub Codespaces](https://github.com/features/codespaces). The main selling point for these products is the ability to quickly spin up pre-configured and reproducible development environments that allow to focus on the coding instead of the setting up. 


Personally I'm not ready to leave the comfort of my own computer for coding just yet, so I'm not interested in remote dev environments as a day to day tool, but rather in their potential to produce ready to go, pre-configured instances of Open Source projects that users can immediately try out.

# Why are they useful

Remote development environments combine an online editor that runs in the browser with cloud infrastructure that allows to run one or more services, generally defined as Docker containers. This means that you can set them up to run applications automatically without users having to install anything in their local computers.

In the case of GitHub Codespaces, there is the added benefit that users can launch these environments using the own GitHub UI, and that the configuration for the remote environment can be stored as part of the same repository to keep it close to the code.

# How they work

Starting a Codespace from a GitHub repo is easy, you just need to [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) a repository to your own account and click on the green _Code_ button > _Codespaces_ > _Create codespace on main_


{{< figure src="/img/blog/codespaces_create.png" alt="GitHub UI to create a new Codespace" >}}

While this might be useful if you want to explore a big repository or send a quick pull request it's not much different that cloning the repository and exploring it locally. What will really make a difference is to configure it so whatever library, application or service that the repo is hosting is running and ready to go when users boot a new Codespace. For instance:

* If it's a CLI tool, installing the library alongside its requirements and start a terminal
