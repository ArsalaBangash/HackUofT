import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  tabsPage = TabsPage;
  inputEmail: string = "";
  inputPassword: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl: AlertController) {
  }

  loginFailedAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  register() {
    var emailCheck = this.inputEmail.match(/^(\w|[\.])+@((mail\.)?utoronto\.ca|cs.toronto.edu)$/);
    if (emailCheck == null) {
        var errorMessage = "You need one of the following email addresses:\
        @mail.utoronto.ca\ @utoronto.ca\ @cs.toronto.edu";
        this.loginFailedAlert(errorMessage);
        console.log("Match Not Successful");
    } else {
        console.log("Match Successful");
    }
  }




}
