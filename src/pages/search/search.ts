import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Endpoints } from '../../models/endpoints'
import { UserService } from '../../services/user_service'
import { EventService } from '../../services/event_service'
import { User } from '../../models/user'
import { Event } from '../../models/event'
import { Storage } from '@ionic/storage';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { googleCalendar } from '../../pages/search/googleCalendar'

import { EventInfoPage } from '../event-info/event-info'
import { HackathonInfoPage } from '../hackathon-info/hackathon-info'
import { PageService } from '../../services/page_service';

@Component({
  selector: 'page-search',
  providers: [UserService, EventService],
  templateUrl: 'search.html',
})
export class SearchPage {
  events: Event[];
	storageService: Storage;
  eventsReady: boolean = false;
  eventsDisplayed: number = 0;
  currentUser: User;
  followersGoingDict = {};

  googleCalendar: any;

  constructor(public platform: Platform, private browserRef: InAppBrowser,
    public actionsheetCtrl: ActionSheetController, private http: Http,
    private endpoints: Endpoints, private storage: Storage,
    public navCtrl: NavController,
    public pageService: PageService,   private eventService: EventService, private userService: UserService) {
    //Adds the first three events to the events array.
    this.storageService = storage;
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

    this.googleCalendar = new googleCalendar(this.browserRef);
    console.log("this is google", googleCalendar)
  }


  public formatDate(date: string): string {
    return (new Date(date)).toLocaleString('en-us');
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

  moreInfo(event) {
    this.pageService.pageData = event;
    if (event.type == 'E')
      this.navCtrl.push(EventInfoPage)
    else
      this.navCtrl.push(HackathonInfoPage)
  }

  getFriendsList(eventID: string) {
    var arrayOfFollowers = this.followersGoingDict[eventID];

		var buttonsArray = [];
		var j = 0;
		for(j; j<arrayOfFollowers.length; j++) {
			buttonsArray.push({text: arrayOfFollowers[j],})
		}

    let actionSheet = this.actionsheetCtrl.create({
      title: 'Friends Going',
      cssClass: 'action-sheets-basic-page',
      buttons: buttonsArray
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
		this.eventService.addUser(eventID, this.currentUser._id, this.currentUser.name, this.currentUser.avatar).subscribe();
	}

  public unstarEvent(eventID: string, eventIndex: number) {
		console.log(this.currentUser.events)
		console.log("user " + this.currentUser._id + "UNstarring " + eventID)
		this.currentUser.events.splice(eventIndex, 1)
		this.storage.set('currentUser', this.currentUser);
		this.userService.updateUser(this.currentUser).subscribe();
		this.eventService.removeUser(eventID, this.currentUser._id, this.currentUser.name, this.currentUser.avatar).subscribe();
	}

  /**
	*Computes the number of the followers of a user that are attending
	*a particular event. The number will be displayed in each event card
	* @param  {Event}  event The event to be checked for which of the followers are attending
	* @return {number} the number of followers that are attending the event
	**/
	public computeFriendsGoing(event:Event): number{
			var i = 0;
			var usersGoing = event.usersGoing;

			//make an api call to get the current user
			//for now I will just assume I have a list

			var userFollowings = this.currentUser.following
			var count = 0;


			console.log(typeof(event));
			console.log(typeof(event._id));

			//check if the key exists in the dictionary
			// if(!(event._id) in this.followersGoingDict){
			// 	this.followersGoingDict[event._id] = [];
		  // }
			//
			// for(i; i<usersGoing.length; i++){
			// 	var index = Utils.findWithAttr(this.currentUser.following, 'id',usersGoing[i]['id'])
			// 	if(index > -1){
			// 		this.followersGoingDict[event._id].push(usersGoing[i]['name']);
			// 		count++;
			// 	}
		  // }


			return count;
  }
    
  public addEvent(){
    this.googleCalendar.addEvent();
  }

}
