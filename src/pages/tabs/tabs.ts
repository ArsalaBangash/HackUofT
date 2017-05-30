import { Component } from '@angular/core';

import { ForumPage } from '../forum/forum';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab4Root = SearchPage;
  tab2Root = ForumPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
