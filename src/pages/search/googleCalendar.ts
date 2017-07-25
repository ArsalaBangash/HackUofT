import { Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { Observable } from 'rxjs/Observable';


export class googleCalendar{
    gapi: any;
    event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2017-07-26T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': '2017-07-27T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
            ]
        }
    };

    CLIENT_ID = '859846349396-0lj5h6cisfdouccrtj5obq6n9100m4lm.apps.googleusercontent.com';
    SCOPES = ["https://www.googleapis.com/auth/calendar"];
    APIKEY = "AIzaSyBa5O6vNrPI20xAC0PDgDvVF6O1ak2SYfI";
    REDIRECTURL = "http://127.0.0.1:8100";

    constructor(private browserRef: InAppBrowser){

    }

    public addEvent(){
        const browser = this.browserRef.create('https://accounts.google.com/o/oauth2/auth?client_id=' + this.CLIENT_ID + '&redirect_uri=' + this.REDIRECTURL + '&scope=https://www.googleapis.com/auth/calendar&approval_prompt=force&response_type=token', '_blank', 'location=no');
        browser.on("loadstart")
               .subscribe((event) => {
            if ((event["url"]).indexOf("http://localhost/callback") === 0) {
                var url = event["url"];
                var token = url.split('access_token=')[1].split('&token_type')[0];
                browser.close();
                
                //Sending the google calendar invite from the google api
                this.gapi.client.setApiKey(this.APIKEY);
                var request = this.gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': this.event
                });
            }
        });
    }
}

