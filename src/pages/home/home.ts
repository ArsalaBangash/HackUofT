import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import { Endpoints } from '../../models/endpoints'
import { UserService } from '../../services/user_service'
import { EventService } from '../../services/event_service'
import { User } from '../../models/user'
import { Event } from '../../models/event'

import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  providers: [EventService, UserService],
  templateUrl: 'home.html'
})

export class HomePage {
  currentUser: User;
  currentUserName: string;
  currentUserID: string;
  events: Event[];
  eventsReady: boolean = false;


  constructor(public navCtrl: NavController, private http: Http,
    private endpoints: Endpoints, private storage: Storage,
    private eventService: EventService, private userService: UserService) {
    this.storage.get('currentUser').then((user) => {
      this.currentUser = user;
      this.currentUserName = user.name;
      //   this.eventService.getUserEvents(this.currentUser._id).subscribe(
      //     events => {
      //       this.events = events;
      //       console.log(this.events);
      //     }
      //   )
      // });
      this.eventsReady = true;
    });
  }
}
