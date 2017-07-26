import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';


import { ForumPage } from '../pages/forum/forum';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HackathonInfoPage } from '../pages/hackathon-info/hackathon-info';
import { EventInfoPage } from '../pages/event-info/event-info';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/profile/settings/settings';
import { RegionPage } from '../pages/profile/settings/region/region';
import { UserInfoPage } from '../models/userInfo';
import { CurrentUserInfoPage } from '../models/currentUserInfo';
import { Endpoints } from '../models/endpoints'


import { PageService } from '../services/page_service';
import { UserService } from '../services/user_service';
import { EventService } from '../services/event_service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';






@NgModule({
  declarations: [
    MyApp,
    ForumPage,
    ProfilePage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage,
    SettingsPage,
    RegionPage,
    HackathonInfoPage,
    EventInfoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    LazyLoadImageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ForumPage,
    ProfilePage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage,
    SettingsPage,
    RegionPage,
    HackathonInfoPage,
    EventInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserInfoPage,
    Endpoints,
    CurrentUserInfoPage,
    PageService,
    UserService,
    EventService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
