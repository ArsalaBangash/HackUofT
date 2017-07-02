import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user'
import { SettingsPage } from './settings/settings';
import { Storage } from '@ionic/storage';
import { Endpoints } from '../../models/endpoints';
import 'rxjs/add/operator/map';

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers});
let currentUserId = "";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  searchQuery: string = '';
  items: (string | number)[][];

  url: string;
  getUserByIdUrl: string;
  followingUrl: string;
  followerUrl: string;
  getFollowingUrl: string;
  getFollowerUrl: string;
  deleteFollowingUrl: string;
  deleteFollowerUrl: string;

  currentUser: User;
  username: string = "";
  userlocation: string = "";
  followerValue: string = "";
  followingValue: string = "";
  storageService: Storage;

  public hideSearch: Boolean = false;
  public showSearchBar: Boolean = true;
  public followingUser: Boolean = false;


constructor(public navCtrl: NavController, private http: Http,private navParams: NavParams,private storage: Storage, private endpoints: Endpoints) {

    this.url = endpoints.API_REGISTER;
    this.getUserByIdUrl = endpoints.API_GET_USER_BY_ID;
    this.followingUrl = endpoints.API_USER_FOLLOWING;
    this.followerUrl = endpoints.API_USER_FOLLOWER;
    this.getFollowerUrl = endpoints.API_GET_USER_FOLLOWER;
    this.getFollowingUrl = endpoints.API_GET_USER_FOLLOWING;
    this.deleteFollowerUrl = endpoints.API_DELETE_USER_FOLLOWER;
    this.deleteFollowingUrl = endpoints.API_DELETE_USER_FOLLOWING;

    this.storageService = storage;
    //If MAIN User clicks on another user
    if (navParams.get('showSearchBar') == false) {

      this.showSearchBar = false;

      //We want to display info about clicked user
      this.currentUser = navParams.get('otherUser');
      console.log(`${this.getFollowerUrl}/${this.currentUser._id}`);
      this.getUserService(`${this.getFollowerUrl}/${this.currentUser._id}`).subscribe(
        //result => this.isUserFollowing(result),
        data => this.isUserFollowing(data),
        error =>  console.log(error));

      this.displayUserInfo(navParams.get('otherUser'));
    } else {
        //Main User View - Get User from storage
        this.storageService.get('currentUser').then((user) => {
          currentUserId = user._id;
          this.displayUserInfo(user);
        });
      }

  }

  isUserFollowing(followers) {
    for (let follower of followers) {
      if (currentUserId == follower) {
        this.followingUser = true;
      }
    }
  }

  displayUserInfo(user) {
    console.log(user);
    //Display the name
    this.username = user.name;
    //Display follower/following value
    this.followerValue = user.followers.length;
    this.followingValue  = user.following.length;
    this.setUserInfo(user,false);
  }

  updateFollowerValue(userId) {
    // this.getUserService(`${this.getUserByIdUrl}/${userId}`).subscribe(
    //   result => this.followerValue = result.followers.length,
    //   error =>  console.log(error));

    this.http.get(`${this.getUserByIdUrl}/${userId}`).map(res => res.json()).subscribe(data => {
      this.followerValue = data.followers.length;
    });
  }

  ionViewWillEnter() {

    this.http.get(this.url).map(res => res.json()).subscribe(data => {
      this.items = [];
      var i:number;
      for(i = 0;i < data.length;i++) {
         this.items.push(data[i]);
      }
    });
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

  updateUserService(url: string, param: any): Observable<any> {
    //let body = JSON.stringify(param);
    return this.http.put(url, param, options).map(this.extractData).catch(this.handleError);
  }

  getUserService(url: string): Observable<any> {
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  followUser() {

    this.storageService.get('currentUser').then((user) => {

      //Unfollow functionality set
      this.followingUser = true;

      //Main user local storage set
      user.following.push(this.currentUser._id);
      this.storageService.set('currentUser', user);

      this.updateUserService(`${this.followerUrl}/${this.currentUser._id}`, user).subscribe(
        result => console.log(result),
        error =>  console.log(error));

      this.updateUserService(`${this.followingUrl}/${currentUserId}`, this.currentUser).subscribe(
        result => this.updateFollowerValue(this.currentUser._id),
        error =>  console.log(error));

    });
  }

  unfollowUser() {

    this.storageService.get('currentUser').then((user) => {

      //Unfollow functionality set
      this.followingUser = false;
      var index = user.following.indexOf(this.currentUser._id);
      if (index !== -1) {
        user.following.splice(index, 1);
      }
      //Main user local storage set
      this.storageService.set('currentUser', user);

      //Main user unfollows, so we want to make sure his following array is updated
      this.updateUserService(`${this.deleteFollowingUrl}/${currentUserId}`, this.currentUser).subscribe(
        result => console.log(result),
        error =>  console.log(error));

      //Other user is not followed by main user. update other user follower array
      this.updateUserService(`${this.deleteFollowerUrl}/${this.currentUser._id}`, user).subscribe(
        result => this.updateFollowerValue(this.currentUser._id),
        error =>  console.log(error));

      this.updateFollowerValue(this.currentUser._id);
    });


  }

  setUserInfo(user,toPush) {

    console.log("In Set User Info");
    this.http.get(this.url).map(res => res.json()).subscribe(data => {

      if (toPush) {
        console.log("PUSHING VIEW");
        this.showSearchList();
        this.navCtrl.push(ProfilePage, {showSearchBar:false, otherUser:user});
        return;
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
