import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { WindowService } from '../window/window.service';
import { environment } from 'src/environments/environment';
import { FirestoreService } from '../services/firestore.service';
import { UserproviderService } from '../services/userprovider.service';
import { ApiService } from '../services/api.service';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    Phone: '',
    dialcode: '+91'
  }
  mobileno: any;
  windowref: any;
  otp: string;
  otpsend = false;
  checked:boolean=true;

  loggedInUser: any;


  constructor(private auth: AngularFireAuth,
    private router: Router,
    private windowservice: WindowService,
    private firestore: FirestoreService,
    private userProvide: UserproviderService,
    private api: ApiService, 
    private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
    this.windowref = this.windowservice.windowRef;
  }

  ngAfterViewInit() {
    // firebase.default.initializeApp(environment.firebase);
    this.windowref.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container',
      {
        'size': 'invisible',
        'callback': (response) => { }
      });
    //console.log(this.windowref.recaptchaVerifier)
    this.windowref.recaptchaVerifier.render();
  }

  Otp() {
    this.otpsend = true;
    this.mobileno = this.user.dialcode + this.user.Phone;
    this.auth.signInWithPhoneNumber(this.mobileno, this.windowref.recaptchaVerifier)
      .then((confirmationResult) => {
        this.windowref.confirmationResult = confirmationResult;
      });
  }

  verifyotp() {

    //this.otpsend = false;
    this.mobileno = this.user.dialcode + this.user.Phone;
    const client = {
      'id': null,
      'mobile': this.mobileno,
      'name': null,
      bussinessname: null,
      Email: null,
      //address : null,
      latitude: null,
      longitude: null,
    };
    this.windowref.confirmationResult.confirm(this.otp).then(usr => {
      var client1 = firebase.default.auth().currentUser;
      client.id = client1.uid;
      this.api.checkUser(client.id).subscribe(user => {
      if(user){
        this.userProvide.setItem(client.id);
        this.api.getUser().subscribe((usr: any) => {
          this.userProvide.setLoggedInUser(usr);  
          this.loggedInUser = this.userProvide.getUserData();
          this.otpsend = false;
          this.user.Phone = '';
          if( this.loggedInUser.bussinessname !== null){
             this.router.navigate(['/home']); 
          }
          else{
            this.router.navigate(['/registration']);   
          }
         //console.log(this.user.Phone);
         });
      }else{  
      this.firestore.createId('users', client).then(res => {
        this.userProvide.setItem(client.id);
        this.api.getUser().subscribe((usr: any) => {
         this.userProvide.setLoggedInUser(usr);  
         this.otpsend = false;
         this.user.Phone = '';
         this.router.navigate(['/registration']);
        });
       });
      }
     });
    });
  }

  addvalue(){
    this.checked=!this.checked;
    console.log(this.checked);
  }
}
