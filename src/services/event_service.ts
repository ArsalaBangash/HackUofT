import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Endpoints } from '../models/endpoints'
import { LogRegCallback } from '../models/log_reg_callback'
import { Event } from '../models/event'
import { User } from '../models/user'

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  eventURL: string;
  addUserURL: string;
  removeUserURL: string;
  userEventsURL: string;
  eventPicURL: string;

  constructor(private http: Http, private endpoints: Endpoints) {
    this.userEventsURL = endpoints.API_GET_USER_EVENTS;
    this.eventURL = endpoints.API_GET_EVENTS;
    this.addUserURL = endpoints.API_ADD_EVENT_USERS;
    this.removeUserURL = endpoints.API_REMOVE_EVENT_USERS;
    this.eventPicURL = endpoints.API_GET_EVENT_PICTURE;
  }

	/**
     * Makes a get request to the API to return all events
     * @return {Observable<Event>} The Observable containing all events
     */
  getEvent(userID: string): Observable<Event> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', userID);
    return this.http.get(this.eventURL)
      .map(res => res.json() as Event)
      .catch(this.handleError);
  }

  /**
   * Makes a get request to the API to return all events
   * @return {Observable<Event[]>} The Observable containing all events
   */
  getEvents(): Observable<Event[]> {
    return this.http.get(this.eventURL)
      .map(this.mapToEventsArray)
      .catch(this.handleError);
  }

	/**
     * * Makes a get request to the API to return all user events
     * @param  { string } userID [The user in question]
     * @return { Observable<Event[]> } The Observable containing all event IDs
     */
  getUserEvents(userID: string): Observable<Event[]> {
    console.log("Getting user events");
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', userID);
    return this.http.get(this.userEventsURL, { search: params })
      .map(this.mapToEventsArray)
      .catch(this.handleError)
  }

  getIndexedEvents(start: Number, end: Number): Observable<Event[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('startIndex', start.toString());
    params.set('endIndex', end.toString());
    return this.http.get(this.eventURL, { search: params })
      .map(this.mapToEventsArray)
      .catch(this.handleError);
  }

  addUser(eventID: string, userID: string, userName: string, userAvatar: string) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('eventID', eventID);
    let userInfo = {'_id': userID, 'name': userName, 'avatar': userAvatar};
		return this.http.put(this.addUserURL, {'userInfo': userInfo}, { search: params })
  }

  removeUser(eventID: string, userID: string, userName: string, userAvatar: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('eventID', eventID);
    let userInfo = {'_id': userID, 'name': userName, 'avatar': userAvatar};
  	return this.http.put(this.addUserURL, {'userInfo': userInfo}, { search: params })
  }

  getEventPicture(eventID: string): Observable<string[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', eventID);
    return this.http.get(this.eventPicURL, { search: params })
      .map((res) => this.mapToPicData(res, eventID))
      .catch(this.handleError);
  }

  private mapToPicData(res: Response, eventID: string) {
    var picture = res.json().picture;
    var picData = [];
    picData[0] = eventID;
    picData[1] = picture;
    return picData
  }




  private mapToEventsArray(res: Response) {
    var eventArray = res.json();
    var events: Event[] = [];
    console.log(eventArray.length);
    for (var i = 0; i < eventArray.length; i++) {
      events.push(eventArray[i] as Event);
      console.log(typeof (events[i]));
    }
    console.log(events);
    return events;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
