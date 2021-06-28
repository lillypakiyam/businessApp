import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../services/api.service';
//import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-geomap',
  templateUrl: './geomap.page.html',
  styleUrls: ['./geomap.page.scss'],
})
export class GeomapPage implements OnInit {
  latitude: any;
  longitude: any;
  address: string;

  constructor(private ngfireA: AngularFireAuth,
    private router: Router,
    private geolocation: Geolocation,
    private api: ApiService,
    // private platform: Platform
  ) { }

  async ngOnInit() {
    await this.geolocation.getCurrentPosition().then(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    })
  }

  logout() {
    this.api.latitude = this.latitude;
    this.api.longitude = this.longitude;
    this.api.address = this.address;
    this.router.navigate(['/registration'])

  }


}
