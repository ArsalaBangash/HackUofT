import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        private storage: Storage) {
            storage.clear();
        /*
        storage.get('isLoggedIn').then((loginStatus) => {
            if (loginStatus == true) {
                this.rootPage = TabsPage;
            } else {
                this.rootPage = LoginPage;
            }
        });
        */
        this.rootPage = TabsPage;
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

        });
    }
}
