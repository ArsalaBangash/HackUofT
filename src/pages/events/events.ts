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
      "iconName": "ios-star-outline",
    }
  ];

  constructor( public platform: Platform,
    public actionsheetCtrl: ActionSheetController) {
      for (let i = 0; i < 30; i++) {
        this.items.push({"iconName": "ios-star-outline",});
      }
  }



  public changeIcon(theItem): void {
    if(theItem.iconName == "ios-star")
      theItem.iconName = "ios-star-outline";
    else
      theItem.iconName = "ios-star";
  }


  doInfinite(infiniteScroll): void {
    console.log('Begin async operation');

    setTimeout(() => {

      for (let i = 0; i < 30; i++) {
        this.items.push( {
        "iconName": "ios-star-outline",
      } );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 10);
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
