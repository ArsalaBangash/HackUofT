import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  searchQuery: string = '';
  items: string[];

  public hideSearch: Boolean = false;

  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      "hey",
      "yo"
    ];
    //this.hideSearch = false;
  }

  nextPage() {
  	this.navCtrl.push(SettingsPage);
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
