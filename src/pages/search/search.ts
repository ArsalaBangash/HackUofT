import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  items = [];

  constructor() {

      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }


  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {

      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 10);
  }
}
