import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UserproviderService } from './services/userprovider.service';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins;
import firebase from 'firebase/app'
import { FirestoreService } from './services/firestore.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {


  mobiledata: any;
  mobilenum = [];
  mobilenu : any;
  public loggedInUser: any;


  constructor(private router: Router,
    private plt: Platform,
    private firestore: FirestoreService,
    private userProvide: UserproviderService) {
    this.initializeApp();
    this.loggedInUser = this.userProvide.getUserData();
    if (this.loggedInUser) {
      if (this.loggedInUser.bussinessname !== null) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/registration']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit() {
    this.mobilenu = this.userProvide.loggedUser
    // firebase.auth().onAuthStateChanged(user => {
    //   console.log('Authusers', user)
    //   if (user) {
    //     this.firestore.getOne('users', user.uid).subscribe(use => {
    //       this.mobilenu.push(use)
    //       console.log('oneuser', use)
    //     })
    //   }     
    // })
    //this.mobilenumberdetails()
  }

  initializeApp() {
    this.plt.ready().then(() => {
      StatusBar.setStyle({
        style: StatusBarStyle.Dark
      }).catch(err => { console.log(`ERROR ${err}`) });
      if (this.plt.is('android')) {
        StatusBar.setOverlaysWebView({
          overlay: false
        }).catch(err => { console.log(`ERROR ${err}`) });
        StatusBar.setBackgroundColor({
          color: '#228B22'
        }).catch(err => { console.log(`ERROR ${err}`) });
      }
      SplashScreen.hide();
    });
  }

  async close() {
    await this.userProvide.logout();
    this.router.navigate(['/login'])
  }

}
