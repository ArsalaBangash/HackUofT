import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import { Endpoints } from '../../models/endpoints'
import { UserService } from '../../services/user_service'
import { EventService } from '../../services/event_service'
import { User } from '../../models/user'
import { Event } from '../../models/event'

import { EventsPage } from '../events/events';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  storageService: Storage;
  EventService: EventService;
  UserService: UserService;

  currentUser: User;
  currentUserID: string;

  userEventID: String[];
  userEvents: Event[];
  
  items;

  eventsPage = EventsPage;

  constructor(public navCtrl: NavController, private http: Http, private endpoints: Endpoints, private storage: Storage) {
    this.items = [
      {
      "iconName": "ios-star-outline",
      }
    ];
    this.storageService = storage;
    this.EventService = new EventService(http, endpoints);
    this.UserService = new UserService(http, endpoints);

    this.storageService.get('currentUser').then(
      (user) => this.getUserEvents(user._id));


    for(var i = 0; i < 30; i++){
      this.items.push(
        {
          "iconName": "ios-star-outline",
      });
    }
  }



  private getUserEvents(user_id: string) {
    this.UserService.getUserEvents(user_id)
      .subscribe((callback: String[]) => this.userEventID = callback,
                  (error) => console.log(error),
                  () => this.userEvents = this.userEventID.map(event => this.getEvent(event)));
  }

  private getEvent(event_id: String): Event {
    var userEvent: Event;
    this.EventService.getEvent(event_id)
      .subscribe((callback: Event) => userEvent = callback);
    return userEvent;


  }



}
