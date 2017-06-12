import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: this.headers });
let url = "http://edmondumolu.me:3001/users"

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	tabsPage = TabsPage;
	inputUsername = "";
	inputEmail: string = "";
	inputPassword: string = "";


	constructor(public navCtrl: NavController, public navParams: NavParams,
		public alertCtrl: AlertController, private http: Http) {
	}

	showAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['OK']
		});
		alert.present();
	}

	login() {
		if (this.isRegistered()) {
			this.proceedLogin();
		} else {
			this.showAlert("Login Error", "User is not registered");
		}
	}

	isRegistered() {

	}

	proceedLogin() {

	}

	registrationEmailCheck() {
		var emailCheck = this.inputEmail.match(/^(\w|[\.])+@((mail\.)?utoronto\.ca|cs.toronto.edu)$/);
		var errorMessage;
		if (emailCheck == null) {
			errorMessage = "You need one of the following email addresses:" +
				"\n" + "@mail.utoronto.ca" + "\n" + "@utoronto.ca \n @cs.toronto.edu";
			this.showAlert("Registration Failed", errorMessage);
			console.log("Match Not Successful");
		} else if (this.inputUsername.length < 6) {
			errorMessage = "Your username must be at least 6 characters long"
			this.showAlert("Registration Failed", errorMessage);
		}
		else {
			this.registerUser().subscribe(
                value => this.handleRegistrationCallback(value[0]),
				error => this.showAlert('Error', 'There was an error during registration'));
		}
	}

    handleRegistrationCallback(status) {
        var alertHeading, alertBody;
        switch(status) {
            case "success":
                alertHeading = "Registration Successful";
                alertBody = "Please check your email for an validation link";
                break;
            case "error":
                alertHeading = "Registration Failed";
                alertBody = status[1];
                break;
        }
        this.showAlert(alertHeading, alertBody);
    }

	registerUser(): Observable<Response> {
		let user = {
			"email": this.inputEmail, "name": this.inputUsername,
			"password": this.inputPassword
		};
		return this.http.post(url, user, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}
