import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database'

import { LoginPage } from '../pages/login/login'; 
 
declare var FCMPlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(private platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen, private databaseProvider: DatabaseProvider) {
    this.initialieApp();
    this.databaseProvider.createDatabase();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      FCMPlugin.onTokenRefresh(function (token){
        //alert(token);
      });
      FCMPlugin.getToken(function (token){
        //alert(token);
      });

      //subscripe topic, aplikasi akan menerima notif berdasarkan topik
      //yang dikirim.
      //bagian ini bisa kita isi dengan email setiap user agar server 
      //dapat mengirim notifpada user tertentu
      FCMPlugin.subscribeToTopic('promosi');

 FCMPlugin.onNotification(function(data) {
   if(data.wasTapped) {
     //Notification was received on device tray and tapped by the user.
     alert(JSON.stringify(data));
    } else{
      //Notification was received in foreground. Maybe the user needs to be notified.
      alert(JSON.stringify(data));
    }
  });
  //Konfigurasi chanel notifikasi
  //Android dengan SDK versi 27 ke atasmenggunakan chanel
  FCMPlugin.createNotificationChannelAndroid({
    id:"urgent_alert",// required
    name:"Urgent Alert",// required
    description:"Very urgent message alert",
    importance:"high",
    // https://developer.android.com/guide/topics/ui/notifiers/notifications#importance
    visibility:"public",
    // https://developer.android.com/training/notify-user/build-notification#lockscreenNotification
    sound:"alert_sound",
    // In the "alert_sound" example, the file should located as resources/raw/alert_sound.mp3
    lights:true,// enable lights for notifications
    vibration:true// enable vibration for notifications
  });
    });
  }

  initialieApp() {
    this.statusBar.overlaysWebView(true);
    if(this.platform.is('android')) {
      this.statusBar.backgroundColorByHexString("#33000000");
    }
  }
}

