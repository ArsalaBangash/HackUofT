import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventsPage } from '../events/events';
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	eventsPage = EventsPage
  Favorite: string = "home"
  items = [
    {
      "iconName": "ios-star-outline",
    }
  ];
  events = [];

  constructor(public navCtrl: NavController) {
    for (let i = 0; i < 30; i++) {
        this.items.push({
          "iconName": "ios-star-outline",
        });
    }
  }

}
