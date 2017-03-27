pouchdb-ionic-2-hello-world
=====================

This is a "hello world" Ionic 2 app, using PouchDB.

The app was built with ionic CLI v2.2.1, using the command:

    ionic create --v2 pouchdb-ionic-2-hello-world

Then I installed PouchDB:

    npm install pouchdb-browser --save

(I used the `pouchdb-browser` package because I don't need PouchDB to run in Node,
so I can skip the Node dependencies. You could also use the `pouchdb` package, but it may take longer to install.)

Then I imported PouchDB in JavaScript:

```js
    import * as PouchDB from 'pouchdb-browser';
```