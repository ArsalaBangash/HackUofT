import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ForumPage } from '../pages/forum/forum';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/profile/settings/settings';
import { RegionPage } from '../pages/profile/settings/region/region';
import { UserInfoPage } from '../pages/userinfo/userinfo';


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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
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

  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserInfoPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
