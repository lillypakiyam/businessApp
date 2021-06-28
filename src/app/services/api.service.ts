import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UUID } from 'angular2-uuid';
import { StorageService } from './firestorage.service';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  latitude: any;
  longitude: any;
  //street: any;
  address: string = '';
  city: string = '';
  zipcode: string = '';

  //staff//members
  staffname: any;
  worktime: any;
  phone: any;
  service: any;
  //registeration//profile
  businessname: any;
  name: any;
  Email: any;
  mobileno: any;
  //services
  ServiceName: any;
  price: any;
  duration:any;
  //ctaegories from db
  categories: any;
  id: any;
  service1: any;
  service2: any;
  service3: any;
  service4: any;
  //staffff
  public servicedatas:any=[];
  public servicelist: any =[];
  //servicesssss
  public serviceDatalist: any =[];
  public service2list: any = [];

  public service1data: any =[];
  public service1list: any = [];

  public staffs:any=[];
  public staffdata:any=[];
  public staffmember:any=[]

  public category= [];
  public services:any = [];
  public choosen:any = [];

  constructor(private camera: Camera,
    private storageServ: StorageService,
    private firestore: FirestoreService,
    private auth: AngularFireAuth) { }

    updateID(id){
       this.id = id; 
    }


  getUser(): Observable<any>{
    console.log('UID', this.id);
    return this.addObject(this.id, this.firestore.getOne('users', this.id));
  }  
  getUserSer(): Observable<any>{
    console.log('UID', this.id);
    return this.addObject(this.id, this.firestore.getdatacopy('users',this.id,'service'));
  }  

  checkUser(id){
    return this.firestore.getOne('users', id);
  }

  createService(id, data): Observable<any>{
    return from(this.firestore.createInnerId('users',id,'services',data,'categories'));
  }

  updateService(id, data): Observable<any>{
      return from(this.firestore.updateInnerId('users',id,'services',data,'categories','services'));
  }  

  getservice(id): Observable<any>{
    return this.firestore.getServices('users',id,'services','categories');
  }
  //updateprofile
  updateprofile(id, data): Observable<any>{
    return from(this.firestore.update('users', id, data ));
  }  
  getaddservice(id): Observable<any>{
    return this.firestore.getdatacopy('users',id,'service')
  }  //addserv

  getaddstaff(id): Observable<any>{
    return this.firestore.getdatacopy('users',id,'staff')
  }  //addserv
  updatedservice(id,data): Observable<any>{
    return from (this.firestore.updateSubcollection('users','service',id,data.id, data));
  }
   updateInnerservice(id, data): Observable<any>{
    return from(this.firestore.updateInnerId('users',id,'service',data, data.id,'services'));
    
   }

  addObject(id, obj: Observable<any>){
      return new Observable((observer) => {
        if(id){
          obj.subscribe(ref => {
            const newObj = ref;
            newObj.id = id;
            observer.next(newObj); 
          }, err => {
             observer.error(err);
           })
        }else{
          observer.error({ message: 'No ID found' });
          console.log('No ID found');
        }
      })
  }

  makeFileIntoBlob(_imagePath, fileName) {
    return new Promise((resolve, reject) => {
      window['resolveLocalFileSystemURL'](_imagePath, (fileEntry) => {
        fileEntry['file']((resFile) => {
          const reader = new FileReader();
          reader.onload = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };
          reader.onloadend = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };

          reader.onerror = (e) => {

            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        }, (err) => {

          reject(err);
        });
      }, (err) => {
      });
    });
  }


  public logout(): Promise<void>{
    return this.auth.signOut();
  }



  openCamera() {
    const options: CameraOptions = {
      quality: 95,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();
      // let name = url.split('/');
      // TODO
      this.makeFileIntoBlob(url, name).then(imageData => {
        // this.createLoader('waiting...');
        this.storageServ.uploadContent(imageData, name).then(async success => {
          //await this.loadingCtrl.dismiss();
          //  this.createToast('image uploded', true, 'bottom', 2100);
          console.log('success', success);
          // eslint-disable-next-line @typescript-eslint/camelcase
          // this.loggedInUser.profile_img = success.url;
        }).catch(async err => {
          //await this.loadingCtrl.dismiss();
          //this.createToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        });
      });
    }).catch(err => { console.log('err', err); });
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 95,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();

      this.makeFileIntoBlob(url, name).then(imageData => {

        // this.createLoader('waiting...');
        this.storageServ.uploadContent(imageData, name).then(async success => {
          //  await this.loadingCtrl.dismiss();
          // this.createToast('image uploded', true, 'bottom', 2100);
          console.log('success', success);
          // eslint-disable-next-line @typescript-eslint/camelcase
          //   this.loggedInUser.profile_img = success.url;
        }).catch(async err => {
          //  await this.loadingCtrl.dismiss();
          // this.createToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        });
      });
    }).catch(err => {
      console.log('errrrr', err);
    });
  }

  async getGooglePlaceAutoCompleteList(searchText, geolocation?, country?) {
    const service = new window['google'].maps.places.AutocompleteService();
    let pred;
    // var circle = new google.maps.Circle(
    //     {center: geolocation, radius: 10000});
    // autocomplete.setBounds(circle.getBounds());
    await new Promise((resolve, reject) => {
      service.getPlacePredictions({
        input: searchText,
        componentRestrictions: { country: country  || environment.country }
      }, (predictions) => {
        pred = predictions;
        resolve(true);
      });
    });
    return pred;
  }

  async getGeoCodedAddress(lat: number, lng: number) {
    let block, street, building, country, place, region, frmtAddr, zipCode;
    console.log('getGeoL');

    if (navigator.geolocation) {
      const geocoder = await new google.maps.Geocoder();
      const latlng = await new google.maps.LatLng(lat, lng);
      
      //const request = { latLng: latlng };
  
      await new Promise((resolve, reject) => {

        geocoder.geocode({location: latlng}, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const result = results[0];
            const rsltAdrComponent = result.address_components;
            frmtAddr = result.formatted_address;
            if (result !== null) {
              if (rsltAdrComponent[0] !== null) {
                block = rsltAdrComponent[0].long_name;
                street = rsltAdrComponent[2].short_name;
                building = rsltAdrComponent[1].short_name;
              }
              // Find out country of geolocation
              console.log(rsltAdrComponent);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              let local_add_1 = '';
              let local_add_2 = '';
              for (let i = 0; i < rsltAdrComponent.length; i++) {
                if (rsltAdrComponent[i].types && rsltAdrComponent[i].types.includes('country')) {
                  country = rsltAdrComponent[i].short_name;
                }
                if (rsltAdrComponent[i].types && rsltAdrComponent[i].types.includes('administrative_area_level_1')) {
                  local_add_1 = rsltAdrComponent[i].short_name;
                }
                if (rsltAdrComponent[i].types && rsltAdrComponent[i].types.includes('locality')) {
                  local_add_2 = rsltAdrComponent[i].short_name;
                  place = local_add_2;
                }
                if (rsltAdrComponent[i].types && rsltAdrComponent[i].types.includes('administrative_area_level_2')){
                  region = rsltAdrComponent[i].long_name;
                }
                if (rsltAdrComponent[i].types && rsltAdrComponent[i].types.includes('postal_code')){
                  zipCode = rsltAdrComponent[i].short_name;
                  console.log(zipCode);
                }
              }
               //this.userProvider.getUserData().location = local_add_1 + ', ' + local_add_2;
              resolve(true);
              console.log('block resolved');
              //console.log(area);
            } else {
              alert('No address available!');
            }
          }

        });
      });
    }
    return { block, street, building, country, place, region, frmtAddr, zipCode };

  }

   getLatLan(address): Observable<any>{
     const geocoder = new google.maps.Geocoder();
     return Observable.create(observer => {
         geocoder.geocode({address}, function (results, status) {
            if(status === google.maps.GeocoderStatus.OK){
               observer.next(results[0].geometry.location);
               observer.complete();
            }else{
               console.log('Error', results, ' & Status', status);
               observer.next({err: true});
               observer.complete();
            }
         })      
     })
  }



}
