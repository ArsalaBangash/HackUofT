import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SettingsPage } from './settings/settings';
import { UserInfoPage } from '../userinfo/userinfo';

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
  public followingUser: Boolean = false;

  constructor(public navCtrl: NavController, private http: Http, public userinfo:UserInfoPage) {
    this.setUserInfo();
  }

  ionViewWillEnter() {
    this.setUserInfo();
  }

  nextPage() {
  	this.navCtrl.push(SettingsPage);
  }

  followUser() {

  }

  setUserInfo() {
    // return this.http.get(url).map(res => res.json()).subscribe(data => {
    // });
    this.userlocation = this.userinfo.userlocation;

    this.http.get(url).map(res => res.json()).subscribe(data => {

        this.items = [];
        this.currentUser = data[2];
        this.username = data[2].name;


        this.followValue = data[2].following_users.length;
        this.followerValue = data[2].following_users.length;

        var i:number;

        for(i = 0;i < data.length;i++) {
           this.items.push([i, data[i].name]);
        }
        console.log(this.items);
      });
  }

  showUser(index) {
    this.http.get(url).map(res => res.json()).subscribe(data => {

        this.navCtrl.push(ProfilePage);

        this.items = [];
        this.currentUser = data[2];
        this.username = data[2].name;


        this.followValue = data[2].following_users.length;
        this.followerValue = data[2].following_users.length;

        var i:number;

        for(i = 0;i < data.length;i++) {
           this.items.push([i, data[i].name]);
        }
        console.log(this.items);
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
