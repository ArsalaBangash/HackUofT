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

  loginFailedAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: 'One or more of the fields was incorrectly entered. Please Try again!',
      buttons: ['OK']
    });
    alert.present();
  }

  register() {
    var emailCheck = this.inputEmail.match(/^(\w|[\.])+@((mail\.)?utoronto\.ca|cs.toronto.edu)$/);
    if (emailCheck == null) {
        console.log("Match Not Successful");
    } else {
        console.log("Match Successful");
    }
  }

  


}
