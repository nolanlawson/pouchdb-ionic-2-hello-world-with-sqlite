pouchdb-ionic-2-hello-world-with-sqlite
=====================

This is a "hello world" Ionic 2 app, using PouchDB. It's the same as
[pouchdb-ionic-2-hello-world](https://github.com/nolanlawson/pouchdb-ionic-2-hello-world) except I added a native
SQLite adapter.

Many folks prefer to use a native SQLite adapter. I wrote about [some good reasons you might do this](https://nolanlawson.com/2016/04/10/introducing-the-cordova-sqlite-plugin-2/). In any case, here's what
I did to enable this.

The app was built with ionic CLI v2.2.1, using this command:

    ionic create --v2 pouchdb-ionic-2-hello-world

Then I installed PouchDB:

    npm install pouchdb-browser --save

(I used the `pouchdb-browser` package because we don't need Node/LevelDB dependencies to run in Ionic,
so we can skip installing the Node dependencies. You could also use the `pouchdb` package.)

Then I installed `pouchdb-adapter-cordova-sqlite`:

    npm install pouchdb-adapter-cordova-sqlite --save

Then I added the native SQLite plugin (I'm using `cordova-plugin-sqlite-2`, but there are others):

    cordova plugin add cordova-plugin-sqlite-2 --save

Then I imported PouchDB in JavaScript, and registered the plugin:

```js
import * as PouchDB from 'pouchdb-browser';
import * as cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
PouchDB.plugin(cordovaSqlitePlugin);
```

Note that I did this within `platform.ready().then(/* ... */)`. If you skip this step, then `window.sqlitePlugin`
won't be available yet, and so PouchDB won't actually use the native SQLite plugin.

If you run this app using `cordova prepare && ionic run ios`, you should see:

<img src="screenshot.png" alt="screenshot"/>

Note that to create a new PouchDB database using the native SQLite adapter, you do:

```js
var db = new PouchDB('mydb.db', {adapter: 'cordova-sqlite'});
```