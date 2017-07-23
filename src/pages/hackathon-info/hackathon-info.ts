import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PageService} from '../../services/page_service';
import { Event } from '../../models/event'

/**
 * Generated class for the HackathonInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-hackathon-info',
  templateUrl: 'hackathon-info.html',
})

export class HackathonInfoPage {
  hackathon: Event;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public pageService: PageService) {
      this.hackathon = this.pageService.pageData;
  }

  ionViewDidLoad() {
    console.log(JSON.stringify(this.hackathon))
  }

  public formatDate(date: string): string {
    return (new Date(date)).toLocaleString('en-us');
  }

}
