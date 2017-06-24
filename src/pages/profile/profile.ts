import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SettingsPage } from './settings/settings';
import { Storage } from '@ionic/storage';

let url = "http://edmondumolu.me:3001/users"


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  searchQuery: string = '';
  items: (string | number)[][];

  currentUser: Object;

  username: string = "";
  userlocation: string = "";
  followValue: string = "";
  followerValue: string = "";

  public hideSearch: Boolean = false;
  public showSearchBar: Boolean = true;
  public selfProfile: Boolean = false;
  public followingUser: Boolean = false;


constructor(public navCtrl: NavController, private http: Http,private navParams: NavParams,private storage: Storage) {

    if (navParams.get('showSearchBar') == false) {
      this.showSearchBar = false;
      this.selfProfile = true;
    }

    console.log("created PP");
    console.log("Hide search: "+ this.hideSearch);
    //this.setUserInfo(this.userinfo.user_id, false);
  }

  ionViewWillEnter() {
    console.log("ENTERING VIEW");
    //this.setUserInfo(this.userinfo.user_id, false);
  }

  nextPage() {
  	this.navCtrl.push(SettingsPage);
  }

  followUser() {

  }

  setUserInfo(index, toPush) {

    console.log("In Set User Info");
    //this.userlocation = this.userinfo.userlocation;
    //this.userinfo.user_id = index;

    this.http.get(url).map(res => res.json()).subscribe(data => {

      if (toPush) {
        console.log("PUSHING VIEW");
        this.showSearchList();
        this.navCtrl.push(ProfilePage, {showSearchBar:false});
        return;
      }
        this.items = [];
        this.currentUser = data[index];
        this.username = data[index].name;


        this.followValue = data[index].following_users.length;
        this.followerValue = data[index].following_users.length;

        var i:number;

        for(i = 0;i < data.length;i++) {
           this.items.push([i, data[i].name]);
        }
      });
  }

  showSearchList() {

    let searchBox: HTMLElement = document.getElementById("searchBox");
    let searchIcon: HTMLElement = document.getElementById("searchIcon");
    let input: HTMLElement = document.getElementById("input");


    if (!this.hideSearch) {
      searchBox.style.border = "1px solid black";
      searchIcon.style.color = "black";
      input.style.color = "black";
    } else {
      searchBox.style.border = "1px solid white";
      searchIcon.style.color = "white";
      input.style.color = "white";
    }
    this.hideSearch = !this.hideSearch;
  }

}
