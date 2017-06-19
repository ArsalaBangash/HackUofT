import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegionPage } from './region/region';
import { ProfilePage } from '../profile';
import { UserInfoPage } from '../../userinfo/userinfo';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public userinfo:UserInfoPage) {
  }

  nextPage() {
    this.navCtrl.push(RegionPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
