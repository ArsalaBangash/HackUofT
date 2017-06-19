import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HackathonInfoPage } from '../hackathon-info/hackathon-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hackathonInfoPage = HackathonInfoPage
  constructor(public navCtrl: NavController) {

  }

}
