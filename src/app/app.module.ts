import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ForumPage } from '../pages/forum/forum';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
//import { EventsPage } from '../pages/events/events';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
//import { EventsPage } from '../pages/events/events';


@NgModule({
  declarations: [
    MyApp,
    ForumPage,
    ProfilePage,
    HomePage,
    EventsPage,
    TabsPage,
    SearchPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ForumPage,
    ProfilePage,
    HomePage,
    EventsPage,
    TabsPage,
    SearchPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
