import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import {LogRegCallback} from '../models/log_reg_callback'
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: this.headers });
let loginURL = "http://edmondumolu.me:3001/users/login"
let registerURL = "http://edmondumolu.me:3001/users"

export class LogRegService {

	constructor(private http: Http) { }

	getUser(): Observable<User> {
		return this.http.get(this.loginURL)
			.map(this.extractData)
			.catch(this.handleError);
	}

	registerUser(email, username, password): Observable<LogRegCallback> {
		let user = {
			"email": email, "name": username,
			"password": password
        };
		return this.http.post(registerURL, user, options)
			.map(this.extractData)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || {};
	}
}
