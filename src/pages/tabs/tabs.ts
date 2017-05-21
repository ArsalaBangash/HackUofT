import { Component } from '@angular/core';

import { ForumPage } from '../forum/forum';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ForumPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
