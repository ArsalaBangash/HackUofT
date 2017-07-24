
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Endpoints } from '../models/endpoints'
import { Event } from '../models/event'
import { User } from '../models/user'


export class UserService {
	getEventURL: string;
	followersURL: string;
	getUserURL: string;
	postEventURL: string;

	updateUserURL: string;

	options: RequestOptions;
	headers: Headers;

	constructor(private http: Http, private endpoints: Endpoints) {
		this.followersURL = endpoints.API_GET_USER_FOLLOWER;

		this.getUserURL = endpoints.API_GET_USER_BY_ID;
		this.postEventURL = endpoints.API_POST_USER_EVENT;

		this.updateUserURL = endpoints.API_UPDATE_USER;


		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.options = new RequestOptions({ headers: this.headers });
	}

	/**
     * * Makes a get request to the API to return a user
     * @param  { string } userID [The user in question]
     * @return { Observable<User> } The Observable containing the requested User
     */
	getUser(userID: string): Observable<User>{
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', userID);
		return this.http.get(this.getUserURL, { search: params})
						.map(res => res.json() as User)
						.catch(this.handleError)
	}

	/**
	 * * Makes a put request to the API to update a user events list
	 * @param {string} userID [The user in question]
	 * @param {User} user [The updated user object]
	 * @return {Observable<User>} An updated user object
	 */
	addEvent(userID: string, user: User): Observable<User>{
		// let url = `${this.postEventURL}/${userID}`;
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', userID);
		return this.http.put(this.postEventURL, user, {search:params , headers: this.headers})
					    .map(res => res.json() as User)
						.catch(this.handleError)
	}

	/**
	 * * Makes a get request to the API to return all user followers
	 * @param  {string} userID [The user in question]
	 * @return {Observable<String[]>} The Observable containing all follower IDs
	 */
	getUserFollowers(userID: string): Observable<String[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', userID);
		return this.http.get(this.followersURL, { search: params })
			.map(this.extractData)
            .catch(this.handleError)
    }

	updateUser(updatedUser: User): Observable<string> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', updatedUser.userInfo['_id']);
		return this.http.put(this.updateUserURL, updatedUser, { search: params})
			.map(res => res.text())
			.catch(this.handleError)
	}

    private extractData(res: Response) {
		return res.json() as String[];
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
