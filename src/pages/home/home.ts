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
	templateUrl: 'home.html'
})

export class HomePage {
	storageService: Storage;
	EventService: EventService;
	UserService: UserService;

	currentUser: User;
	currentUserName: string;
	currentUserID: string;

	userEventID: string[];

	events: Event[];


	userEvents = [
		{
			id: "1",
			name: "DeerHunt",
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
			name: "NodeSchools",
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
			name: "Intro to EMACS Workshop",
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

	constructor(public navCtrl: NavController, private http: Http,
		private endpoints: Endpoints, private storage: Storage) {

		this.storageService = storage;
		this.EventService = new EventService(http, endpoints);
		this.UserService = new UserService(http, endpoints);


		this.storageService.get('currentUser').then((user) => {
			this.currentUserName = user.name;
		});
	}

	private getUserEvents(user_id: string) {
		this.UserService.getUserEvents(user_id)
			.subscribe(
			(callback: string[]) => this.userEventID = callback,
			(error) => console.log(error),
			() => this.events = this.userEventID.map(event => this.getEvent(event))
			);
	}

	private getEvent(event_id: string): Event {
		var userEvent: Event;
		this.EventService.getEvent(event_id)
			.subscribe((callback: Event) => console.log(callback));
		return userEvent;
	}
}
