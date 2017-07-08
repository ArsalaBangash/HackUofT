import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Endpoints } from '../../models/endpoints'
import { UserService } from '../../services/user_service'
import { EventService } from '../../services/event_service'
import { User } from '../../models/user'
import { Event } from '../../models/event'
import { Storage } from '@ionic/storage';



@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
    events: Event[];
	eventService: EventService;
	userService: UserService;
    eventsReady: boolean = false;
	eventsDisplayed: number = 0;

	constructor(public platform: Platform,
		public actionsheetCtrl: ActionSheetController, private http: Http,
		private endpoints: Endpoints, private storage: Storage) {
		this.userService = new UserService(http, endpoints);
		this.eventService = new EventService(http, endpoints);
		this.eventService.getIndexedEvents(this.eventsDisplayed, this.eventsDisplayed + 3)
			.subscribe(
			events => {
                this.events = events;
                this.eventsReady = true;
				this.eventsDisplayed += events.length;
            }
			);
	}


	public formatStart(startDate: string) {
		return (new Date(startDate)).toLocaleString('en-us');
	}

	public formatEnd(endDate: string) {
		return (new Date(endDate)).toLocaleString('en-us');
	}


	public checkWhetherStarred(event) {
		/*TODO: This isn't correct. There should be a call to the current user's
		events list to see if the event is actually there or not and depending
		on that, set the star icon
		*/
		return "ios-star-outline";
	}

	doInfinite(infiniteScroll): void {
		console.log('Begin async operation');
		setTimeout(() => {
			this.eventService.getIndexedEvents(this.eventsDisplayed, this.eventsDisplayed + 3)
				.subscribe(
				events => {
					Array.prototype.push.apply(this.events, events);
					this.eventsDisplayed += events.length;
				}
				);
			console.log('Async operation has ended');
			infiniteScroll.complete();
		}, 10);
	}




	getFriendsList() {
		let actionSheet = this.actionsheetCtrl.create({
			title: 'Friends Going',
			cssClass: 'action-sheets-basic-page',
			buttons: [{ text: 'Arsala', }, { text: 'Bola', }]
		});
		actionSheet.present();
	}

	public changeStarStatus(event_id: string) {
		/*TODO: This should check whether it's already starred or not and depending
		on that, it should add or remove the event ID
		*/
		this.storage.get('currentUser').then(
			(user) => {
				user.events.push(event_id);
				//   console.log("Event ID", event_id)
				this.storage.set('currentUser', user);
				//   console.log("Updated user", user)
				//   console.log(user._id);
				this.userService.addEvent(user._id, user).subscribe(
					(callback: User) => console.log("All done", callback),
					(error) => console.log(error),
				);
			}
		);
    }

}
