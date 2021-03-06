import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {EthereumPage} from "../pages/ethereum/ethereum";
import {AllPage} from "../pages/all/all";
import {AlertsPage} from "../pages/alerts/alerts";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {CouponsPage} from "../pages/coupons/coupons";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public push: Push) {
    this.initializeApp();
    this.initializeNotifications();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Bitcoin Price', component: HomePage },
      { title: 'Ethereum Price', component: EthereumPage },
      { title: 'All Coins', component: AllPage },
      { title: 'Alerts', component: AlertsPage },
      { title: 'Coupons', component: CouponsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeNotifications() {
    if (this.platform.is('cordova')) {
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }

        });

      const options: PushOptions = {
        android: {
          sound:true,
          forceShow:true
        }
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

      pushObject.on('registration').subscribe((registration: any) => {
        localStorage.setItem("device_id",registration.registrationId);
      });


      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

    }
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
