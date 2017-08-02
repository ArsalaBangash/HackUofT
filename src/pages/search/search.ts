import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Endpoints } from '../../models/endpoints'
import { EventPictureStatus } from '../../models/event_picture_status'
import { UserService } from '../../services/user_service'
import { EventService } from '../../services/event_service'
import { User } from '../../models/user'
import { UserInfo } from '../../models/UserInfo2'
import { Event } from '../../models/event'
import { Storage } from '@ionic/storage';
import { EventInfoPage } from '../event-info/event-info'
import { HackathonInfoPage } from '../hackathon-info/hackathon-info'
import { Utils } from '../../services/utils'
import { PageService } from '../../services/page_service';
let followersGoingDict = {};

@Component({
  selector: 'page-search',
  providers: [UserService, EventService],
  templateUrl: 'search.html',
})
export class SearchPage {
  events: Event[];
  eventsReady: boolean = false;
  eventsDisplayed: number = 0;
  eventsPicsDisplayed: number = 0;
  currentUser: User;
  //followersGoingDict = {};


  eventPicMap: Map<string, { ready: boolean, picture: string }>



  constructor(public platform: Platform,
    public actionsheetCtrl: ActionSheetController, private http: Http,
    private endpoints: Endpoints, private storage: Storage,
    public navCtrl: NavController,
    public pageService: PageService, private eventService: EventService, private userService: UserService) {
    //Initializes the eventPicMap
    this.eventPicMap = new Map();

    //Fetches the 5 latest events present on the server
    this.eventService.getIndexedEvents(this.eventsDisplayed, this.eventsDisplayed + 5)
      .subscribe(
      events => {
        /*
          The array of events received by the server is set to the local array
          of events, and the number of events currently in display is noted so
          that the further fetching of events may begin with an offset. The
          pictures for the events are fetched and the eventsReady boolean is set
          to true so that content may be displayed.
         */
        this.events = events;
        this.eventsDisplayed += events.length;
        this.addEventPics();
        this.eventsReady = true;
      }
      );
    this.storage.get('currentUser').then((user) => {
      this.currentUser = user;
    });
  }

  /**
   * For every event in the current events list, a picture for the vent is
   * fetched from the server and when fully received, the eventPicMap is
   * updated with the associated information for the event.
   * @return {[type]} [description]
   */
  public addEventPics() {
    for (var i = 0; i < this.events.length; i++) {
      var currentEventID = this.events[i]._id
      this.eventService.getEventPicture(currentEventID).subscribe(
        (eventPicData) => {
          this.eventPicMap.set(eventPicData[0], {
            "ready": true,
            "picture": eventPicData[1]
          });
        },
        (err) => console.log("This error happened: " + err)
      )
    }
  }

  /**
   * Checks whether or not a particular event's picture is ready to be displayed
   * @param  {string}  eventID The event for which the picture is being loaded
   * @return {boolean}         Whether or not the picture is ready to be displayed
   */
  public eventPictureReady(eventID: string): boolean {
    var eventPictureStatus = this.eventPicMap.get(eventID)
    if (eventPictureStatus != null) {
      return eventPictureStatus.ready
    }
  }

  /**
   * Returns the picture for a particular event by fetching the picture data
   * from the eventPicMap
   * @param  {string} eventID The event for which the picture is being fetched
   * @return {string}         The string containing the data for the event's picture
   */
  public getEventPicture(eventID: string): string {
    return this.eventPicMap.get(eventID).picture;
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
      this.eventService
        .getIndexedEvents(this.eventsDisplayed, this.eventsDisplayed + 5)
        .subscribe(
        events => {
          Array.prototype.push.apply(this.events, events);
          this.eventsDisplayed += events.length;
          this.addEventPics();
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
    var arrayOfFollowers = followersGoingDict[eventID];

    var buttonsArray = [];
    var j = 0;
    for (j; j < arrayOfFollowers.length; j++) {
      buttonsArray.push({ text: arrayOfFollowers[j], })
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
      this.starEvent(eventID);
    }
  }


  /**
   * Adds an event to the user's event list, updates the local storage of that
   * user, and then updates the user on the server side. The event on the server
   * is also updated by having the current user's information added to the
   * usersGoing list.
   * @param  {string} eventID    The event being starred
   */
  public starEvent(eventID: string) {
    // console.log(this.currentUser.events);
    // console.log("user " + this.currentUser._id + "starring " + eventID);
    this.currentUser.events.push(eventID);
    // console.log(this.currentUser.events);
    this.storage.set('currentUser', this.currentUser);
    this.userService.updateUser(this.currentUser).subscribe();
    this.eventService.addUser(eventID,
      this.currentUser._id,
      this.currentUser.name,
      this.currentUser.avatar).subscribe();
  }

  /**
   * The event is removed from the list of the user's events, and the user is
   * subsequently updated locally and on the server. The user's information
   * is also removed from the event's usersGoing list.
   * @param  {string} eventID    The ID of the event being removed
   * @param  {number} eventIndex The index within the user's event list at which
   * the event being removed exists
   * @return {[type]}            [description]
   */
  public unstarEvent(eventID: string, eventIndex: number) {
    // console.log(this.currentUser.events)
    // console.log("user " + this.currentUser._id + "UNstarring " + eventID)
    this.currentUser.events.splice(eventIndex, 1)
    this.storage.set('currentUser', this.currentUser);
    this.userService.updateUser(this.currentUser).subscribe();
    this.eventService.removeUser(eventID, this.currentUser._id, this.currentUser.name, this.currentUser.avatar).subscribe();
  }

  public helperToFind(list: string[], value:string): number{
    return list.indexOf(value);
  }


  /**
	*Computes the number of the followers of a user that are attending
	*a particular event. The number will be displayed in each event card
	* @param  {Event}  event The event to be checked for which of the followers are attending
	* @return {number} the number of followers that are attending the event
	**/
	public computeFriendsGoing(eventID:string, usersGoing: UserInfo[]): number{

    var userFollowings = this.currentUser.following
    var count = 0;


			// console.log(typeof(event));
			// console.log(typeof(event._id));
      //usersGoing.findIndex

			//check if the key exists in the dictionary
			if(!(eventID in followersGoingDict)){
				followersGoingDict[eventID] = [];
		  }
      //usersGoing.findIndex
      //
      var i = 0;
      
			for(i; i<usersGoing.length; i++){
				var index = Utils.findWithAttr(userFollowings, '_id' ,usersGoing[i]['_id'])
        //count++;
				if(index > -1){
          var indexInDict = this.helperToFind(followersGoingDict[eventID],usersGoing[i]['name'])
          if(indexInDict == -1){
    				followersGoingDict[eventID].push(usersGoing[i]['name']);
          }
          count++;


				}
		  }


    return count;


  }

}
