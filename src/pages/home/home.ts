import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as PouchDB from 'pouchdb-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pouchdbLoaded: boolean;
  idbSupported: boolean;
  websqlSupported: boolean;

  constructor(public navCtrl: NavController) {
    this.pouchdbLoaded = false;
    this.idbSupported = false;
    this.websqlSupported = false;
    this.loadPouchDB();
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
      checkAdapterWorks('websql')
    ];

    Promise.all(promises).then(function (results) {
      self.idbSupported = results[0];
      self.websqlSupported = results[1];
      self.pouchdbLoaded = true;
    });
  }

}
