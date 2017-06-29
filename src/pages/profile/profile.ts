import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user'
import { SettingsPage } from './settings/settings';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

let options = new RequestOptions({ headers: this.headers });
let url = "http://edmondumolu.me:3001/users"


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  searchQuery: string = '';
  items: (string | number)[][];

  currentUser: User;
  currentUserId: string;
  username: string = "";
  userlocation: string = "";
  followValue: string = "";
  followerValue: string = "";
  storageService: Storage;

  public hideSearch: Boolean = false;
  public showSearchBar: Boolean = true;
  public followingUser: Boolean = false;


constructor(public navCtrl: NavController, private http: Http,private navParams: NavParams,private storage: Storage) {

    this.storageService = storage;
    //If MAIN User clicks on another user
    if (navParams.get('showSearchBar') == false) {
      this.showSearchBar = false;
      //We want to display info about clicked user
      this.currentUser = navParams.get('otherUser');
      this.displayUserInfo(navParams.get('otherUser'));
    } else {
        //Main User View - Get User from storage
        this.storageService.get('currentUser').then((user) => {
          this.currentUserId = user._id;
          this.displayUserInfo(user);
        });
      }

  }

  displayUserInfo(user) {
    console.log(user);
    //Display the name
    this.username = user.name;
    //Display follower/following value
    this.followValue = "0";
    this.followerValue  = user.following.length;
    this.setUserInfo(user,false);
  }

  ionViewWillEnter() {
    console.log("ENTERING VIEW");

    if (!this.showSearchBar) {
      this.displayUserInfo(this.currentUser);
    } else {
      this.storageService.get('currentUser').then((user) => {
        this.displayUserInfo(user);
      });
    }
  }

  nextPage() {
  	this.navCtrl.push(SettingsPage);
  }

  followUser() {

    this.storageService.get('currentUser').then((user) => {
      user.following_users.push(this.currentUser._id);
      this.storageService.set('currentUser', user);
      this.http.put(url + "/" + this.currentUserId ,user ,options).map(res => res.json());
    });

    //this.currentUser.following_users.p
    //this.http.put(url + "/" + this.currentUserId ,this.currentUser ,options).map(res => res.json());
  }

  setUserInfo(user,toPush) {

    console.log("In Set User Info");
    this.http.get(url).map(res => res.json()).subscribe(data => {
      if (toPush) {
        console.log("PUSHING VIEW");
        this.showSearchList();
        this.navCtrl.push(ProfilePage, {showSearchBar:false, otherUser:user});
        return;
      }
        this.items = [];
        var i:number;
        for(i = 0;i < data.length;i++) {
           this.items.push(data[i]);
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
