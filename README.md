Jackie Kutcher Homepage
=======================

MVP Requirements
================

design
-----------
* must be responsive (mobile, tablet, desktop)
* No bootstrap

performance
-----------
* must be SEO-friendly
* must be usable without javascript and cookies
* page load times of < 1.5s (ideally 1s).
  - images must lazy load when possible
  - defer all low-priority requests.

TODO
====

* develop a roadmap w/ deliverable dates
* do we need server-side tests?

immediate MVP
-------------
* navigation
* basic theme
* favicon

pipeline
--------
* JS-based page transitions when available
* cache-busting
* custom contact form
* tracking/analytics
* CI

super-long pipeline
-------------------
* custom CMS
* theme management??
* CDN

optimization
------------
* eliminate unused fonts
* eventual build process for server views (eliminate express.js app)
* better to use fonts in link tags or pull in via css?

Notes
=====

Browser Support
---------------
I supported IE8 professionally for a long time, but I'm doing this in my free
time so it will only support evergreen browsers. XP users feel free to send
fax in your bug reports.

Tech Stack
----------
* IO.js backing the express app (enables ES6 support by default)
* ES6 -> 5 transpiling on the front-end.
* Lean client-side (no jQuery, bootstrap, etc).
