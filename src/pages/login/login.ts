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
	loginFailedMessage = "Incorrect Login information entered";
	loginErrorMessage = "An error occured when logging in";
	regErrorTitle = "Registration Error";
	regFailTitle = "Registration Failed";
	regErrorMessage = "There was an error during registration";
	usernameErrorMessage = "Your username must be at least 6 characters long";
	emailError = "You need one of the following email addresses:" +
	"\n" + "@mail.utoronto.ca" + "\n" + "@utoronto.ca \n @cs.toronto.edu";



	constructor(public navCtrl: NavController, public navParams: NavParams,
		public alertCtrl: AlertController, private http: Http) {
		this.logRegService = new LogRegService(http)
	}

	/**
	 * Checks whether the login information is correctly entered and then proceed
	 * use the LogRegService to login the user and handle the callback from the
	 * service
	 */
	login() {
		if (this.inputEmail == "" || this.inputPassword == "") {
			this.showAlert(this.loginErrorTitle, this.loginErrorMessage);
		} else {
			this.logRegService.loginUser(this.inputEmail, this.inputPassword)
				.subscribe(
                value => this.handleLoginCallback(value),
				error => this.showAlert(this.loginErrorTitle, this.loginFailedMessage));
		}


	}

	/**
	 * Displays an alert dialog with the given title and message
	 * @param  {String} title
	 * @param  {String} message
	 */
	showAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['OK']
		});
		alert.present();
	}


	register() {
		if (this.registrationEmailCheck() && this.registrationUserCheck()) {
			console.log(true)
			this.logRegService.registerUser(this.inputEmail,
				this.inputUsername,
				this.inputPassword).subscribe(
                value => this.handleRegistrationCallback(value),
				error => this.showAlert(this.regErrorTitle, this.regErrorMessage));
		}
	}

	/**
	 * Return true if the email is valid. If not displays
	 * an error and returns false
	 * @return {boolean}
	 */
	registrationEmailCheck(): boolean {
		var emailCheck = this.inputEmail.match(/^(\w|[\.])+@((mail\.)?utoronto\.ca|cs.toronto.edu)$/);
		if (emailCheck == null) {
			this.showAlert(this.regFailTitle, this.emailError);
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Return true if the username is at least 6 characters long. If not displays
	 * an error and returns false
	 * @return {boolean}
	 */
	registrationUserCheck(): boolean {
		if (this.inputUsername.length < 6) {
			this.showAlert(this.regFailTitle, this.usernameErrorMessage);
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Handles the LogRegCallback from the API call and navigates to the tabs
	 * page if successful, otherwise displays an error
	 * @param  {LogRegCallback} callBack [description]
	 */
	handleLoginCallback(callBack) {
		console.log("LOGIN CALLBACK");
        switch (callBack.status) {
            case 0:
				console.log("Login success");
                this.navCtrl.push(TabsPage);
                break;
            case 1:
				console.log("Login NOT success");
				this.showAlert(this.loginErrorTitle, callBack.message);
				break;
        }
	}

	/**
	 * Handles the LogRegCallback from the API call and registers the user
	 * if successful, otherwise displays an error.
	 * @param  {LogRegCallback} callBack [description]
	 */
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
