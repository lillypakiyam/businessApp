import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private ngfireAuth : AngularFireAuth,
                private router : Router)  {}


Logout() {
  this.ngfireAuth.signOut().then(use =>{
    this.router.navigate(['/login']);
  })
}              
   register(){
     this.router.navigate(['/registration']);
   }
}
