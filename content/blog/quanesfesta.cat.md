---
title: "Quanesfesta.cat: fem només una cosa, i fem-la bé"
description: "Construint Quanesfesta.cat, un calendari laboral interactiu"
images:
- /img/blog/quanesfesta.png
date: 2023-02-25
draft: false
---

(Jump to the [English](#english) version below)


El meu requeriment era senzill: 

_Com puc afegir les festes laborals a Catalunya (incloent les festes locals) al meu calendari des d'un lloc oficial?_

Malauradament, una tasca senzilla com aquesta no sembla que sigui possible.

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

Tècnicament, m'ho he pres com una excusa per refrescar coneixements en Javascript modern i noves eines, inclòs [Alpine.js](https://alpinejs.dev/). Ha sigut un plaer treballar-hi, amb una API sense floritures i una documentació excel·lent. Com sempre el codi font i les dades són obertes, i els podeu trobar al repositori de Github ([amercader/calendari](https://github.com/amercader/calendari)).

Si feu servir [quanesfesta.cat](https://quanesfesta.cat) i teniu qualsevol suggeriment em podeu contactard desde qualsevol del canals llistats a la [pàgina principal](https://amercader.net/) o creant una incidència al [repositori](https://github.com/amercader/calendari/issues).


---

<a id="english" /> 

Bla bla
