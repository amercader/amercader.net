---
title: "Quanesfesta.cat: fem només una cosa, i fem-la bé"
description: "Construint Quanesfesta.cat, un calendari laboral interactiu"
images:
- /img/blog/quanesfesta.png
date: 2023-02-26
draft: false
---

(Jump to the [English](#english) version below)


El que necessitava era prou senzill: 

_Com puc afegir les festes laborals a Catalunya (incloent les festes locals) al meu calendari des d'un lloc oficial?_

Malauradament, una tasca simple com aquesta no sembla que sigui possible.

Les pàgines disponibles des de la Generalitat ofereixen una experiència molt pobra:

* [Calendari laboral 2023](https://web.gencat.cat/ca/actualitat/reportatges/calendarilaboral/calendari-laboral-2023/): les festes només són disponibles com una llista de text o una imatge, no hi opció de descarregar el calendari com a ICS o com a taula.
* [Cercador de festes locals](https://treball.gencat.cat/ca/ambits/relacions_laborals/ci/calendari_laboral/festes_generals_locals_Cat/index.html): sense comentaris. Un viatge al passat en termes de disseny, amb una usabilitat molt pobra
* [Dades obertes](https://analisi.transparenciacatalunya.cat/Treball/Calendari-laboral-de-Catalunya/yf2b-mjr6): no inclouen el nom de la festa, ni tampoc les festes locals

Hi ha multitud d'altres llocs web que llisten les festes laborals, però malauradament acostumen a ser llocs no oficials infestats de _trackers_, publicitat intrusiva i contingut autogenerat per a SEO (i tampoc inclouen festes locals ni descàrrega d'arxius ICS).

En comptes d'anar a queixar-me a Twitter (tot i que en tenia moltes ganes), vaig decidir crear el recurs que m'hauria agradat trobar-me. D'aquí va sorgir [quanesfesta.cat](https://quanesfesta.cat).

{{< figure src="/img/blog/quanesfesta.cat_screenshot.png" alt="El lloc web quanesfesta.cat" >}}

Un lloc web amb una funcionalitat ben definida que:

* Inclou un disseny minimalista, de càrrega ràpida i responsiu
* Mostra les festes laborals, incloent la més propera de forma més prominent
* Permet escollir la teva localitat per incloure les festes locals
* Permet descarregar les festes com un arxiu ICS per importar-lo al teu calendari digital preferit
* Ofereix les dades en brut en formats oberts perquè altres les puguin aprofitar

L'aplicació resultant està clarament influïda per l'excel·lent equivalent per al Regne Unit de [Gov.uk](https://www.gov.uk/bank-holidays), i no me n'amago. Quan vius al Regne Unit una temporada et malacostumes a uns serveis digitals de primera classe.

Tècnicament, m'ho he pres com una excusa per refrescar coneixements en Javascript modern i noves eines, inclòs [Alpine.js](https://alpinejs.dev/). Ha sigut un plaer treballar-hi, amb una API sense floritures i una documentació excel·lent. Com sempre el codi font i les dades són obertes, i els podeu trobar al repositori de GitHub ([amercader/calendari](https://github.com/amercader/calendari)).

Si feu servir [quanesfesta.cat](https://quanesfesta.cat) i teniu qualsevol suggeriment em podeu contactar desde qualsevol del canals llistats a la [pàgina principal](https://amercader.net/) o creant una incidència al [repositori](https://github.com/amercader/calendari/issues).


---

<a id="english"></a> 

## Quanesfesta.cat: Let's do one thing, and make it well

What I needed was easy enough:

_How can I add the public holidays in Catalonia (included the local ones) to my calendar from an official site?_

Sadly, it seems like this apparently easy task is not really possible.

The Catalan Government website offer a very poor experience:

* [Offical calendar 2023](https://web.gencat.cat/ca/actualitat/reportatges/calendarilaboral/calendari-laboral-2023/): Holidays are just available as a list or an image, can not be downloaded as ICS or table.
* [Local holiday finder](https://treball.gencat.cat/ca/ambits/relacions_laborals/ci/calendari_laboral/festes_generals_locals_Cat/index.html): No comments. A trip to the past in terms of design, with really poor usability.
* [Open Data](https://analisi.transparenciacatalunya.cat/Treball/Calendari-laboral-de-Catalunya/yf2b-mjr6): They don't include the name of the holiday, nor the local ones.

There are a myriad of other web sites that list public holidays but they are generally non official sites riddle with trackers, intrusive ads and auto-generated content for SEO (and they also don't include local holidays or ICS download).

Instead of going to rant on Twitter, I decided to create the service I'd had like to find. That's where [quanesfesta.cat](https://quanesfesta.cat) came from.

{{< figure src="/img/blog/quanesfesta.cat_screenshot.png" alt="The website quanesfesta.cat" >}}

A site with a clearly defined function that:

* Uses a fast, responsive and minimalist design
* Shows the public holidays, with the next one displayed prominently
* Allows to choose a place to include the local holidays
* Allows to download the holidays as an ICS file to import them to your favourite calendar app
* Offers the raw data in open formats so others can reuse them

The resulting app is clearly influenced by its British equivalent from [Gov.uk](https://www.gov.uk/bank-holidays), and I don't shy away from it. Living in the UK for a while you get spoiled with some first class digital services.

On the tech side, I took it as an excuse to refresh my knowledge in modern Javascript and new tooling, including [Alpine.js](https://alpinejs.dev/). It's been a pleasure working with it, with a paired down API and excellent documentation. As ever the source code and generated data are open, and you can find them in GitHub ([amercader/calendari](https://github.com/amercader/calendari)).

If you use [quanesfesta.cat](https://quanesfesta.cat) and have any suggestion and want to contact me you can do so from any of the channels listed in the [home page](https://amercader.net/) or creating an issue in the [repository](https://github.com/amercader/calendari/issues).
