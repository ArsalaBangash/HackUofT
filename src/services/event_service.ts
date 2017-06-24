import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Event} from '../models/event';

export class EventService{

    usersURL = "http://edmondumolu.me:3001/users"
    constructor(private http: Http){}

    
    getUserEvents(user_id): void {
        let params: URLSearchParams = new URLSearchParams();
        params.set('_id', user_id);
        //return this.http.get(this.usersURL, {search: params})
        
    }

    updateUserEvents(user_id: String): void{
        
    }


}