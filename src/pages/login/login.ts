import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {LogRegService} from '../../services/log_reg_service'
import { User } from '../../models/user'
import { LogRegCallback } from '../../models/log_reg_callback'
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
	logRegService: LogRegService;
	loginErrorTitle = "Login Error";
	loginErrorMessage = "Incorrect Login information entered";
	regErrorTitle = "Registration Error";
	regFailTitle = "Registration Failed";
	regErrorMessage = "There was an error during registration";



	constructor(public navCtrl: NavController, public navParams: NavParams,
		public alertCtrl: AlertController, private http: Http) {
		this.logRegService = new LogRegService(http)
	}


	login() {
		if (this.inputEmail == "" && this.inputPassword == "") {
			this.showAlert(this.loginErrorTitle, this.loginErrorMessage);
		} else {
			this.logRegService.loginUser(this.inputEmail,this.inputPassword)
			.subscribe(
                value => this.handleLoginCallback(value),
				error => this.showAlert(this.regErrorTitle, this.regErrorMessage));
		}


	}

	showAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['OK']
		});
		alert.present();
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
			this.showAlert(this.regFailTitle, errorMessage);
		}
		else {
			this.logRegService.registerUser(this.inputEmail,
				this.inputUsername,
				this.inputPassword).subscribe(
                value => this.handleRegistrationCallback(value),
				error => this.showAlert(this.regErrorTitle, this.regErrorMessage));
		}
	}

	handleLoginCallback(callBack) {
		console.log(callBack.status);
		console.log(callBack.message);
        switch (callBack.status) {
            case 0:
                this.navCtrl.push(TabsPage);
                break;
            case 1:
				this.showAlert(this.loginErrorTitle, callBack.message);
				break;

        }
	}

    handleRegistrationCallback(callBack) {
        var alertHeading, alertBody;
		console.log(callBack.status);
		console.log(callBack.message);
        switch (callBack.status) {
            case 0:
                alertHeading = "Registration Successful";
                alertBody = "Please check your email for an validation link";
                break;
            case 1:
                alertHeading = "Registration Failed";
                alertBody = callBack.message;
                break;
        }
        this.showAlert(alertHeading, alertBody);
    }
}
