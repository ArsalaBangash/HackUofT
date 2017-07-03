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

	constructor(private http: Http, private endpoints: Endpoints) {
		this.eventURL = endpoints.API_GET_EVENTS;
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

    private extractData(res: Response) {
		return res.json() as Event[];
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
