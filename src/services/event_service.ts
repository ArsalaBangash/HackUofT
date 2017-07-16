import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Endpoints } from '../models/endpoints'
import {LogRegCallback} from '../models/log_reg_callback'
import {Event} from '../models/event'
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });


export class EventService {

	eventURL: string;
	addUserURL: string;
	removeUserURL: string;

	constructor(private http: Http, private endpoints: Endpoints) {
		this.eventURL = endpoints.API_GET_EVENTS;
		this.addUserURL = endpoints.API_ADD_EVENT_USERS;
		this.removeUserURL = endpoints.API_REMOVE_EVENT_USERS;
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
			.map(this.extractData)
			.catch(this.handleError);
    }

	getIndexedEvents(start: Number, end: Number): Observable<Event[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('startIndex', start.toString());
		params.set('endIndex', end.toString());
        return this.http.get(this.eventURL, { search: params })
			.map(this.extractData)
			.catch(this.handleError);
    }

	addUser(eventID: string, userID: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('eventID', eventID);
		return this.http.put(this.addUserURL, {userID: userID}, { search: params })
	}

	removeUser(eventID: string, userID: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('eventID', eventID);
		return this.http.put(this.removeUserURL,{userID: userID}, { search: params })
	}

    private extractData(res: Response) {
		var eventArray = res.json();
		var events: Event[] = [];
		console.log(eventArray.length);
		for (var i = 0; i < eventArray.length; i++) {
			events.push(eventArray[i] as Event);
			console.log(typeof (events[i]));
		}
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
