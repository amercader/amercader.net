---
title: "Exploring Machine Learning features in CKAN"
description: "Using Machine Learning Embeddings to improve discoverability in CKAN"
images:
- /img/blog/munibot_search.png
date: 2023-12-18
draft: false
---

If you cut across all the tiresome hype and snake oil marketing that surrounds the AI / Machine Learning field you can find valuable techniques that can provide value to software projects. This is specially true for those that revolve around data sharing and publication like data catalogs. They are (generally) well-structured repositories of (hopefully) publicly available data described by (one would hope) comprehensive dataset metadata, all good ingredients to apply ML processes. There have been [promising attempts in CKAN](https://github.com/ckan/ckan/discussions/7501) to integrate with LLM-powered chatbots, and things like automatic dataset classification or semantic search look like could add value with relatively low effort.

To learn more and focus on one particular feature I've been recently exploring the use of _embeddings_ to find similar datasets in large CKAN instances.

## What are embeddings?

There are long mathematical explanations to what embeddings are and how are they computed but for our purposes let's say that embeddings are a way of encoding complex information like texts, images or data into a standard numerical representation, a vector (a fancy name for a list of numbers). The important bit is that this numerical representation captures the semantic meaning of the original input, at least according to the underlying model used to create the embeddings.

This makes easy for computers to compare embeddings between them, and calculate which ones are closer to others, that is which original objects are more similar between them.

Let's see an example. Here are the simplified embeddings of three pieces of text using [Sentence Transformers](https://www.sbert.net/) `all-MiniLM-L6-v2` model (All embeddings computed using the same model have the same dimensions, i.e. the list of numbers has the same size):

| Text | Embedding (5 first dimensions) |
| ---- | ------------------------------ |
| A dog with a blue hat | [-0.01296314,  0.00495872,  0.06955151,  0.05257371,  0.0787459, ...] |
| A cat with a green hat | [ 0.06206828,  0.05956109,  0.02806069, -0.02479857,  0.02578322, ...] |
| Stately, plump Buck Mulligan came from the stairhead | [-0.05418522,  0.01471444,  0.01173631,  0.02672934,  0.0138136, ...] |

You can use a different model to compute the embeddings, for instance [OpenAI](https://platform.openai.com/docs/guides/embeddings/use-cases) `text-embedding-ada-002`. In this case the embeddings would have 1536 dimensions instead of 384.

