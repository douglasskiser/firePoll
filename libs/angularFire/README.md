AngularFire
===========
AngularFire is an officially supported [AngularJS](http://angularjs.org/) binding
for [Firebase](http://www.firebase.com/?utm_medium=web&utm_source=angularFire).
Firebase is a full backend so you don't need servers to build your Angular app!

*Please visit the
[Firebase + Angular Quickstart guide](https://www.firebase.com/quickstart/angularjs.html)
for more information*.

We also have a [tutorial](https://www.firebase.com/tutorial/#tutorial/angular/0),
[documentation](https://www.firebase.com/docs/angular/index.html) and an
[API reference](https://www.firebase.com/docs/angular/reference.html).

Join our [Firebase + Angular Google Group](https://groups.google.com/forum/#!forum/firebase-angular) to ask questions, provide feedback, and share apps you've built with Firebase and Angular.

Development
-----------
[![Build Status](https://travis-ci.org/firebase/angularFire.png)](https://travis-ci.org/firebase/angularFire)

If you'd like to hack on AngularFire itself, you'll need
[node.js](http://nodejs.org/download/), [Bower](http://bower.io), and
[CasperJS](https://github.com/n1k0/casperjs):

```bash
npm install -g phantomjs casperjs
npm install
bower install
```

Use grunt to build and test the code:

```bash
# Default task - validates with jshint, minifies source and then runs unit tests
grunt

# Watch for changes and run unit test after each change
grunt watch

# Run tests
grunt test

# Minify source
grunt build
```

License
-------
[MIT](http://firebase.mit-license.org).
