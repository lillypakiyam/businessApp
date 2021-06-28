import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { WindowService } from '../window/window.service';
import { environment } from 'src/environments/environment';
import { FirestoreService } from '../services/firestore.service';
import { ApiService } from '../services/api.service';



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

  constructor(private auth: AngularFireAuth,
    private router: Router,
    private api: ApiService,
    private windowservice: WindowService,
    private firestore: FirestoreService) { }

  ngOnInit() {
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
      'id': this.mobileno,
      'mobile': this.mobileno,
      'name': null,
      bussinessname: null,
      Email: null,
      phone: null,
      whatsappnumber: null,
      address: null,
      latitude: null,
      longitude: null,

    };
    this.windowref.confirmationResult.confirm(this.otp).then(usr => {
      var client1 = firebase.default.auth().currentUser;
      client.id = client1.uid;
      this.api.id = client1.uid;
      this.firestore.createId('users', client).then(res => {
        this.otpsend = false;
        this.user.Phone = '';
        this.router.navigate(['/registration']);
        console.log(this.user.Phone);
      });

    });
  }


}
