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
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})

export class EventInfoPage {
  event: Event;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public pageService: PageService) {
      this.event = this.pageService.pageData;
  }

  ionViewDidLoad() {
    console.log(JSON.stringify(this.event))
  }

  public formatDate(date: string): string {
    return (new Date(date)).toLocaleString('en-us');
  }

}
