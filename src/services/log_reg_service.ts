import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import {LogRegCallback} from '../models/log_reg_callback'
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: this.headers });

export class LogRegService {
	loginURL = "http://edmondumolu.me:3001/users/login/"
	registerURL = "http://edmondumolu.me:3001/users"

	constructor(private http: Http) { }

	getUser(): Observable<User> {
		return this.http.get(this.loginURL)
			.map(this.extractData)
			.catch(this.handleError);
	}

	loginUser(email,password): Observable<LogRegCallback> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('email', email);
		params.set('password', password);
		return this.http.get(this.loginURL,{ search: params})
			.map((r: Response) => r.json() as LogRegCallback)
			.catch(this.handleError);
	}

	registerUser(email, username, password): Observable<LogRegCallback> {
		let user = {
			"email": email, "name": username,
			"password": password
        };
		return this.http.post(this.registerURL, user, options)
			.map(this.extractData)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	private extractData(res: Response) {
		let body = res.json();
		console.log(body.data);
		return body.data || {};
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
