import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ApiService } from '../app/services/api.service';
import { FirestoreService } from './services/firestore.service';
import { UserproviderService } from './services/userprovider.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormsModule } from '@angular/forms'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { StorageService } from './services/firestorage.service'
import { AmazingTimePickerModule } from 'amazing-time-picker'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core'
import { AngularFireFunctionsModule } from '@angular/fire/functions'
import { GoogleMapsAPIWrapper } from '@agm/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp
    (environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AmazingTimePickerModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCBgMGdnSjRXTjH9FQX7qoqVEUpq3ZaDfw',
    }),
    HttpClientModule,
    NgbModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    FormsModule,
    FormBuilder,
    FormControl, Validators,
    Geolocation,
    StorageService,
    UserproviderService,
    GoogleMapsAPIWrapper,
    Camera,
    FirestoreService,
  { provide: APP_INITIALIZER, useFactory: userProvider, deps: [UserproviderService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function userProvider(provider: UserproviderService) {
  return () => provider.load();
}

