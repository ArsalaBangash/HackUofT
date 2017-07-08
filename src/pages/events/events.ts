import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import { Endpoints } from '../../models/endpoints'
import { UserService } from '../../services/user_service'
import { EventService } from '../../services/event_service'
import { User } from '../../models/user'
import { Event } from '../../models/event'

import 'rxjs/add/operator/map';


@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  Favorite: string = "home"
  items = [
    {
      id: "1",
      name: "Event1",
      city: "Mississauga",
      country: "Canada",
      address: "3359 Mississauga Rd, Mississauga, Ontario",
      start: "July 2nd",
      end: "July 2nd",
      picture: "no pic",
      links: [],
      type: "meetup",
      description: "Regular Event"
    },
    {
      id: "2",
      name: "Event2",
      city: "Toronto",
      country: "Canada",
      address: "459 Spadina Avenue, Toronto, Ontario",
      start: "July 3nd",
      end: "July 3nd",
      picture: "no pic",
      links: [],
      type: "meetup",
      description: "Regular Event"
    },
    {
      id: "3",
      name: "Event3",
      city: "Mississauga",
      country: "Canada",
      address: "3359 Mississauga Rd, Mississauga, Ontario",
      start: "July 3nd",
      end: "July 3nd",
      picture: "no pic",
      links: [],
      type: "meetup",
      description: "Regular Event"
    }
  ];

  storageService: Storage;
	EventService: EventService;
	UserService: UserService;

  constructor(public platform: Platform,
    public actionsheetCtrl: ActionSheetController, private http: Http,
		private endpoints: Endpoints, private storage: Storage) {

      this.storageService = storage;
		  this.EventService = new EventService(http, endpoints);
		  this.UserService = new UserService(http, endpoints);

  }

  public starEvent(event_id: string) {
    this.storageService.get('currentUser').then(
      (user) => {
        user.events.push(event_id);
        console.log("Event ID", event_id)
        this.storageService.set('currentUser', user);
        console.log("Updated user", user)

        console.log(user._id);
        this.UserService.addEvent(user._id, user).subscribe(
          (callback: User) => console.log("All done", callback),
          (error) => console.log(error),
        );
      }
    );
  }


  getFriendsList() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Friends Going',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Arsala',

        },
        {
          text: 'Bola',


        },
        {
          text: 'Jay',
        },
        {
          text: 'Santi',

        },
        {
          text: 'Ose',
        }
      ]
    });
    actionSheet.present();
  }

}
