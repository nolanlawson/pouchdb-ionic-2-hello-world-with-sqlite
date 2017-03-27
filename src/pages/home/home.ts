import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import * as PouchDB from 'pouchdb-browser';
import * as cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
PouchDB.plugin(cordovaSqlitePlugin);

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pouchdbLoaded: boolean;
  idbSupported: boolean;
  websqlSupported: boolean;
  cordovaSqliteSupported: boolean;
  nativeSqlitePluginInstalled: boolean;

  constructor(public navCtrl: NavController, platform: Platform) {
    this.pouchdbLoaded = false;
    platform.ready().then(() => {
      this.loadPouchDB();
    });
  }

  loadPouchDB() {
    var self = this;
    
    function checkAdapterWorks(adapter) {
      return Promise.resolve().then(() => {
        var db = new PouchDB('mydb', {adapter: adapter});
        return db.info();
      }).then(() => true).catch(() => false);
    }

    var promises = [
      checkAdapterWorks('idb'),
      checkAdapterWorks('websql'),
      checkAdapterWorks('cordova-sqlite'),
      Promise.resolve(!!window.sqlitePlugin)
    ];

    Promise.all(promises).then(function (results) {
      self.idbSupported = results[0];
      self.websqlSupported = results[1];
      self.cordovaSqliteSupported = results[2];
      self.nativeSqlitePluginInstalled = results[3];
      self.pouchdbLoaded = true;
    });
  }

}
