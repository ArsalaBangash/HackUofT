import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  Favorite: string = "home"
  items = [
    {
      name: "Event1",
      city: "Mississauga",
      country: "Canada",
      address: "3359 Mississauga Rd, Mississauga, Ontario",
      start: "July 2nd",
      end: "July 2nd",
      picture: "no pic",
      links: [],
      type: "meetup",
      description: "Regular Event"
    },
    {
      name: "Event2",
      city: "Toronto",
      country: "Canada",
      address: "459 Spadina Avenue, Toronto, Ontario",
      start: "July 3nd",
      end: "July 3nd",
      picture: "no pic",
      links: [],
      type: "meetup",
      description: "Regular Event"
    },
    {
      name: "Event3",
      city: "Mississauga",
      country: "Canada",
      address: "3359 Mississauga Rd, Mississauga, Ontario",
      start: "July 3nd",
      end: "July 3nd",
      picture: "no pic",
      links: [],
      type: "meetup",
      description: "Regular Event"
    }
  ];


  constructor( public platform: Platform,
    public actionsheetCtrl: ActionSheetController) {

  }



  public changeIcon(theItem): void {
    if(theItem.iconName == "ios-star")
      theItem.iconName = "ios-star-outline";
    else
      theItem.iconName = "ios-star";
  }


  doInfinite(infiniteScroll): void {
    // console.log('Begin async operation');
    //
    // setTimeout(() => {
    //   for (let i = 0; i < 30; i++) {
    //     this.items.push( {
    //     "iconName": "ios-star-outline",
    //   } );
    //   }
    //
    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 10);
  }
  getFriendsList() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Friends Going',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Arsala',

        },
        {
          text: 'Bola',


        },
        {
          text: 'Jay',
        },
        {
          text: 'Santi',

        },
        {
          text: 'Ose',
        }
      ]
    });
    actionSheet.present();
  }

}
