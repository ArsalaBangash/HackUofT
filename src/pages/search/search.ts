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
	storageService: Storage;
    eventsReady: boolean = false;
	eventsDisplayed: number = 0;
	currentUser: User;

	constructor(public platform: Platform,
		public actionsheetCtrl: ActionSheetController, private http: Http,
		private endpoints: Endpoints, private storage: Storage) {
		this.userService = new UserService(http, endpoints);
		this.eventService = new EventService(http, endpoints);
		//Adds the first three events to the events array.
		this.storageService = storage
		this.eventService.getIndexedEvents(this.eventsDisplayed, this.eventsDisplayed + 5)
			.subscribe(
			events => {
                this.events = events;
                this.eventsReady = true;
				this.eventsDisplayed += events.length;
            }
			);
		this.storage.get('currentUser').then((user) => {
			this.currentUser = user;
		});
	}

	/**
	 * Formats the start date for the event card
	 */
	public formatStart(startDate: string): string {
		return (new Date(startDate)).toLocaleString('en-us');
	}

	/**
	 * Formats the end date for the event card
	 */
	public formatEnd(endDate: string) {
		return (new Date(endDate)).toLocaleString('en-us');
	}

	/**
	 * Returns the name of the star icon to display depending upon
	 * whether the particular event is within the current user's list
	 * of starred events.
	 * @param  {Event}  event The event to be checked
	 * @return {string} The name of the star icon to display
	 */
	public checkWhetherStarred(event: Event): string {
		if (this.currentUser.events.indexOf(event._id) > -1) {
			return "ios-star"
		}
		return "ios-star-outline";
	}

	/**
	 * Fetches the next 5 events from the server once the user navigates to the
	 * end of the screen
	 */
	doInfinite(infiniteScroll) {
		console.log('Begin async operation');
		setTimeout(() => {
			this.eventService.getIndexedEvents(this.eventsDisplayed, this.eventsDisplayed + 5)
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

	/**
	 * Adds or removes a particular event from the user's list of events. The
	 * star icon is also changed to reflect the addition or removal of the
	 * event from the list of the user's starred events
	 * @param  {string} eventID The event to be added or removed
	 */
	public changeStarStatus(eventID: string) {
		let eventIndex = this.currentUser.events.indexOf(eventID);
		if (eventIndex > -1) {
			this.unstarEvent(eventID, eventIndex);
		} else {
			this.starEvent(eventID, eventIndex);
		}
    }

	public starEvent(eventID: string, eventIndex: number) {
		console.log(this.currentUser.events);
		console.log("user " + this.currentUser._id + "starring " + eventID);
		this.currentUser.events.push(eventID);
		console.log(this.currentUser.events);
		this.storage.set('currentUser', this.currentUser);
		this.userService.updateUser(this.currentUser).subscribe();
		this.eventService.addUser(eventID, this.currentUser._id).subscribe();
	}

	public unstarEvent(eventID: string, eventIndex: number) {
		console.log(this.currentUser.events)
		console.log("user " + this.currentUser._id + "UNstarring " + eventID)
		this.currentUser.events.splice(eventIndex, 1)
		this.storage.set('currentUser', this.currentUser);
		this.userService.updateUser(this.currentUser).subscribe();
		this.eventService.removeUser(eventID, this.currentUser._id).subscribe();
	}

	/**
	*Computes the number of the followers of a user that are attending
	*a particular event. The number will be displayed in each event card
	* @param  {Event}  event The event to be checked for which of the followers are attending
	* @return {number} the number of followers that are attending the event
	**/
	public computeFriendsGoing(event:Event): number{
		//Have to still complete
	}

}
