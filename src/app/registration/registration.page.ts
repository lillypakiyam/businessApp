import { Component, OnInit, NgZone, ViewChild } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FirestoreService } from '../services/firestore.service'
import { IonSlides, ActionSheetController, MenuController, PickerController } from '@ionic/angular'
import { PickerOptions } from '@ionic/core'
import { IonContent } from '@ionic/angular'
import { AgmMap, MarkerManager, MapsAPILoader } from '@agm/core'
import firebase from 'firebase/app'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleMapsAPIWrapper } from '@agm/core'
import { environment } from 'src/environments/environment';
import { UserproviderService } from '../services/userprovider.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public mobile = {
    mobilenumber: '',
  }

  public slideOpts = {
    pagination: false,
    allowTouchMove: false,
  }

  public myForm: FormGroup;
  private phoneNumber: number = 1;

  public myTimeFormMon: FormGroup
  private OpenTimeMon: number = 1;

  public myTimeForm: FormGroup;
  private OpenTime: number = 1;

  public myTimeFormwed: FormGroup;
  private OpenTimewed: number;

  public myTimeFormthurs: FormGroup
  private OpenTimethurs: number = 1;

  public myTimeFormfri: FormGroup
  private OpenTimefri: number = 1;

  public myTimeFormsat: FormGroup
  private OpenTimesat: number = 1;

  public myTimeFormsun: FormGroup
  private OpenTimesun: number = 1;

  autoCompleteItems = [];
  searchTerm = '';
  place = '';
  zoom = 16;
  disableDefaultUI = true;
  zoomControl = false;
  fullscreenControl = false;
  markerDraggable = false;
  styles = environment.MAP_STYLE;

  @ViewChild('#slides') slides: IonSlides
  @ViewChild(AgmMap) map: AgmMap
  @ViewChild('content') content: IonContent

  //agm-map
  public location = {
    latitude: '',
    longitude: '',
    viewport: '',
    address: '',
    city: '',
    zipcode: '',
    marker: MarkerManager

  }//agm-map

  public user = {

    phone2: '',
    dialcode: '+91',
    businessname: '',
    name: '',
    Email: '',
    phone: '',
    phone3:'',
    phone4:'',
    address: '',
  }
  value: any;
  mobileno: any;
  google: any;//agm-map
  geocoder: any;//agm-map
  public category: any = [];

  value0 = 'closed';
  value1 = 'closed';
  value2 = 'closed';
  value3 = 'closed';
  value4 = 'closed';
  value5 = 'closed';
  value6 = 'closed';
  checked = false
  checked1 = false
  checked2 = false
  checked3 = false
  checked4 = false
  checked5 = false
  checked6 = false

  latitude: any;
  longitude: any;
  draggable: boolean;
  address: string;

  mobiledata: any;
  mobilenum = [];
  mobilenu : any;
  constructor(private router: Router,
    private ngfire: AngularFireAuth,
    private api: ApiService,
    private firestore: FirestoreService,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private pickercontrl: PickerController,

    //agm-map
    private mapsapiloader: MapsAPILoader,
    private wrapper: GoogleMapsAPIWrapper,
    private zoon: NgZone,
    private menuCtrl: MenuController,
    private userProvide: UserproviderService

  ) {
    this.myForm = formBuilder.group({
      phoneNumber1: ['', Validators.required]
    });

    this.myTimeFormMon = formBuilder.group({
      OpenTimeMon: ['', Validators.required]
    })

    this.myTimeForm = formBuilder.group({
      OpenTime1: ['', Validators.required]
    })

    this.myTimeFormwed = formBuilder.group({
      OpenTimewed: ['', Validators.required]
    })

    this.myTimeFormthurs = formBuilder.group({
      OpenTimethurs: ['', Validators.required]
    })

    this.myTimeFormfri = formBuilder.group({
      OpenTimefri: ['', Validators.required]
    })

    this.myTimeFormsat = formBuilder.group({
      OpenTimesat: ['', Validators.required]
    })

    this.myTimeFormsun = formBuilder.group({
      OpenTimesun: ['', Validators.required]
    })

  }

  timeget: any[] = [
    [
      '0:00', '0:05', '0:10', '0:15', '0:20', '0:25', '0:30', '0:35', '0:40', '0:45', '0:50', '0:55',
      '1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:35', '1:40', '1:45', '1:50', '1:55',
      '2:00', '2:05', '2:10', '2:15', '2:20', '2:25', '2:30', '2:35', '2:40', '2:45', '2:50', '2:55',
      '3:00', '3:05', '3:10', '3:15', '3:20', '3:35', '3:30', '3:35', '3:40', '3:45', '3:50', '3:55',
      '4:00', '4:05', '4:10', '4:15', '4:20', '4:25', '4:30', '4:35', '4:40', '4:45', '4:50', '4:55',
      '5:00', '5:05', '5:10', '5:15', '5:20', '5:25', '5:30', '5:35', '5:40', '5:45', '5:50', '5:55',
      '6:00', '6:05', '6:10', '6:15', '6:20', '6:25', '6:30', '6:35', '6:40', '6:45', '6:50', '6:55',
      '7:00', '7:05', '7:10', '7:15', '7:20', '7:25', '7:30', '7:35', '7:40', '7:45', '7:50', '7:55',
      '8:00', '8:05', '8:10', '8:15', '8:20', '8:25', '8:30', '8:35', '8:40', '8:45', '8:50', '8:55',
      '9:00', '9:05', '9:10', '9:15', '9:20', '9:25', '9:30', '9:35', '9:40', '9:45', '9:50', '9:55',
      '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55',
      '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55',
      '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55',
    ],
    [
      '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55',
      '14:00', '14:00', '14:00', '14:00', '14:00', '14:00', '14:00', '14:00', '14:00', '14:45', '14:50', '14:55',
      '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55',
      '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55',
      '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55',
      '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55',
      '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55',
      '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55',
      '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55',
      '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55',
      '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55',
      '00:00'
    ]
  ]//thurs


  numColumns: number = 2;
  numOptions: number = 156;

  addControltime1() {
    this.OpenTimeMon++
    this.myTimeFormMon.addControl('OpenTimewed' + this.OpenTimeMon, new FormControl('', Validators.required))
  }
  removeControlTime1(control) {
    this.OpenTimeMon--
    this.myTimeFormMon.removeControl(control.key)

  }

  addControltime() {
    //this.add = true;
    this.OpenTime++
    this.myTimeForm.addControl('OpenTime' + this.OpenTime, new FormControl('', Validators.required));
  }

  removeControlTime(control) {
    this.OpenTime--
    this.myTimeForm.removeControl(control.key)
    // this.add = false;
  }

  addControltime2() {
    //this.add = true;
    this.OpenTimewed++
    this.myTimeFormwed.addControl('OpenTimewed' + this.OpenTimewed, new FormControl('', Validators.required))
  }

  removeControlTime2(control) {
    this.OpenTimewed--
    this.myTimeFormwed.removeControl(control.key)
    //this.add = false
  }

  addControltime3() {
    this.OpenTimethurs++
    this.myTimeFormthurs.addControl('OpenTimewed' + this.OpenTimethurs, new FormControl('', Validators.required))
  }
  removeControlTime3(control) {
    this.OpenTimethurs--
    this.myTimeFormthurs.removeControl(control.key)

  }

  addControltime4() {
    this.OpenTimefri++
    this.myTimeFormfri.addControl('OpenTimewed' + this.OpenTimefri, new FormControl('', Validators.required))
  }
  removeControlTime4(control) {
    this.OpenTimefri--
    this.myTimeFormfri.removeControl(control.key)

  }

  addControltime5() {
    this.OpenTimesat++
    this.myTimeFormsat.addControl('OpenTimewed' + this.OpenTimesat, new FormControl('', Validators.required))
  }
  removeControlTime5(control) {
    this.OpenTimesat--
    this.myTimeFormsat.removeControl(control.key)

  }

  addControltime6() {
    this.OpenTimesun++
    this.myTimeFormsun.addControl('OpenTimewed' + this.OpenTimesun, new FormControl('', Validators.required))
  }
  removeControlTime6(control) {
    this.OpenTimesun--
    this.myTimeFormsun.removeControl(control.key)

  }

  onSelecteCheckBox(e) {
    console.log('checkbox event', e)
    this.checked = e.detail.checked
    if(e.detail.checked===true){
       this.value2='9:00-18:00'
    }else{
      this.value2 ="closed"
    }
  }

  onSelectTusday(ev) {
    console.log('checkbox', ev)
    this.checked1 = ev.detail.checked
    if(ev.detail.checked===true){
      this.value3="9:00-18:00"
    }else {
      this.value3="closed"
    }
  };
  onSelecteCheckBoxwed(e) {
    console.log('checkbox event', e)
    this.checked2 = e.detail.checked
    if(e.detail.checked===true){
      this.value1="9:00-18:00"
    }else {
      this.value1="closed"
    }

  }
  onSelecteCheckBoxthurs(e) {
    console.log('checkbox event', e)
    this.checked3 = e.detail.checked
    if(e.detail.checked===true){
      this.value0="9:00-18:00"
    }else {
      this.value0="closed"
    }

  }
  onSelecteCheckBoxfri(e) {
    console.log('checkbox event', e)
    this.checked4 = e.detail.checked
    if(e.detail.checked===true){
      this.value4="9:00-18:00"
    }else {
      this.value4="closed"
    }
  }
  onSelecteCheckBoxsat(e) {
    console.log('checkbox event', e)
    this.checked5 = e.detail.checked
    if(e.detail.checked===true){
      this.value5="9:00-18:00"
    }else{
      this.value5="closed"
    }
  }
  onSelecteCheckBoxsun(e) {
    console.log('checkbox event', e)
    this.checked6 = e.detail.checked
    if(e.detail.checked===true){
      this.value6="9:00-18:00"
    }else{
      this.value6="closed"
    }
  }

  async ngOnInit() {;
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
    this.api.address = '';
    this.api.city = '';
    this.api.zipcode = '';
    this.userProvide.getJSON().then((result) => {
      this.category = result;
    });
    this.mobilenu = this.userProvide.loggedUser
    

    //this.content.scrollToBottom(300)
    await navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      // this.findAddressbyCoordinates()
    })//agm-map
    //this.location.marker.draggable=true
    //this.phonedatails();
    this.searchPlace();
  }

  public next(slides) {
    console.log(slides);
    slides.slideNext();
  }

  public prev(slides) {
    console.log(slides);
    slides.slidePrev();
  }

  async nxtEmail(slides) {
    const check = await this.userProvide.validateEmail(this.user.Email);
    if (check) {
      slides.slideNext();
    } else {
      const toast = await this.userProvide.createToast('Please enter valid email', false, 'top');
      await toast.present();
    }
  }


  register(){

    const client = {
      id: this.userProvide.loggedUser.id,
      name: this.user.name,
      bussinessname: this.user.businessname,
      Email: this.user.Email,
      latitude: this.latitude,
      longitude: this.longitude, 
      address: this.api.address + this.api.city+ this.api.zipcode,
     // phone: this.user.phone,
    };
    this.firestore.update('users', client.id, client).then(res => {
      console.log('result', res)
      this.router.navigate(['/home'])
    });
  }

  async phoneStorage(slides){
    const numberstore={
      phone:this.user.phone,
      phone2:this.user.phone2,
    }
    console.log('numbers update',numberstore)
    this.api.updateprofile(this.userProvide.loggedUser.id, { PhoneNumbers : numberstore}).subscribe(async res=>{
      console.log('hours', res);
    })
    slides.slideNext();
  }


 async savehours(slides){
    const OpeningTime={
      Monday: this.value2,
      Tusday: this.value3,
      Wednesday: this.value1,
      Thursday: this.value0,
      Friday: this.value4,
      saturday: this.value5,
      Sunday: this.value6
    }
    console.log('opening Time', OpeningTime)
    this.api.updateprofile(this.userProvide.loggedUser.id, { OpeningHours : OpeningTime}).subscribe(async res=>{
      console.log('hours', res);
    })
    slides.slideNext();
    const toast = await this.userProvide.createToast('Opening Time Updated', false, 'top');
    toast.present();
  }

  async searchPlace() {
    if (this.searchTerm) {
      //const place = ev.target.value;
      //console.log(place);
      this.place = '';
      const predictions = await this.api.getGooglePlaceAutoCompleteList(this.searchTerm, {}, 'IN');
      this.autoCompleteItems = [];
      //console.log(predictions);
      this.zoon.run(() => {
        if (predictions !== null) {
          predictions.forEach((prediction) => {
            this.autoCompleteItems.push(prediction.description);
            //console.log(this.autoCompleteItems);
          });
        }
      });
    }
  }

  async itemSelected(item, slides) {
    this.api.getLatLan(item).subscribe(result => {
      this.zoon.run(async () => {
        this.api.latitude = result.lat();
        this.api.longitude = result.lng();
        console.log(this.api.latitude, this.api.longitude);
        this.searchTerm = '';
        this.autoCompleteItems = [];
        const address = await this.api.getGeoCodedAddress(this.api.latitude, this.api.longitude);
        //this.api.street = `${address.block}, ${address.street}`
        this.api.address = `${address.frmtAddr}`;
        this.api.city = `${address.region}`;
        this.api.zipcode = `${address.zipCode}`;
        slides.slideNext();
      });
    });
  }

  async editedAddress(slides) {
    if (this.api.city.length !== 0 || this.api.zipcode.length !== 0 || this.api.address.length !== 0) {
      this.api.getLatLan(this.api.address).subscribe(result => {
        this.api.latitude = result.lat() + (0.0000000000100 * Math.random());
        this.api.longitude = result.lng() + (0.0000000000100 * Math.random());
        slides.slideNext();
      });
    } else {
      const toast = await this.userProvide.createToast('Please fill the address (or) city (or) zipcode', false, 'top');
      await toast.present();
    }
  }

  reset() {
    this.searchTerm = '';
  }

  close() {
    this.place = '';
  }

  nxtCategory(slides) {
    slides.slideNext();
  }

  checkBoxEvnt(ev: any) {
    if (ev.detail.checked === true) {
      this.api.category.push(ev.detail.value);
    } else if (ev.detail.checked === false) {
      this.api.category.forEach((data, index) => {
        if (data === ev.detail.value) { this.api.category.splice(index, 1); }
      });
    }
    console.log(this.api.category);
  }

  nxtService(slides) {
    this.category.filter(data => {
      this.api.category.forEach(categ => {
        if (data.category === categ) {
          this.api.services.push(data);
        }
      });
    });
    console.log(this.api.services);
    this.category = [];
    this.userProvide.getJSON().then((result) => {
      this.category = result;
      //console.log(result);
    });
    slides.slideNext();
  }

  savePrevService(slides) {
    this.api.services = [];
    this.api.category = [];
    slides.slidePrev();
  }

  saveService(slides) {
    this.api.createService(this.userProvide.loggedUser.id, { services: this.api.services }).subscribe(async res => {
      const toast = await this.userProvide.createToast('Service Updated', false, 'top');
      toast.present();
      console.log('Services Updated', this.api.services);
      slides.slideNext();
    });
  }

  addControl() {
    // this.user.phone.push({ value: '' })
    if (this.phoneNumber >= 4) {
     // alert('Oops! Only 5 Numbers are allowed.')
    }
    else {
      // this.phoneNumber++;
      this.phoneNumber = this.phoneNumber + 1
      this.value = this.user.phone
      console.log('phone value', this.value)
      this.myForm.addControl('phoneNumber' + this.phoneNumber, new FormControl('', Validators.required));
    }
    console.log('phnone numbers', this.phoneNumber)
  }
  removeControl(control) {
    // this.phoneNumber--;
    this.phoneNumber = this.phoneNumber - 1
    this.myForm.removeControl(control.key);
    //this.user.phone.splice(i, 1)
  }

  getphonenumber(e){
    console.log('numbersss',e)
  }
  addPhoto() {
    this.presentActionSheet()
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose',
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          icon: 'camera',
          handler: () => {
            this.Accesscamera()
          }

        }, {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.AccessGallery();
          }
        }, {
          text: 'Cancel',
          role: 'close',
          icon: 'close',
          handler: () => {
          }
        }
      ],
      cssClass: 'my-css',
      animated: false,
      backdropDismiss: false,
      keyboardClose: false,
    });
    await actionSheet.present();
    actionSheet.onWillDismiss().then(() => {
      console.log('the action sheet is about to close');
    });
    actionSheet.onDidDismiss().then(() => {
      console.log('the action sheet has already closed');
    });
  }
  Accesscamera() {
    this.api.openCamera();
  }
  AccessGallery() {
    this.api.openGallery();
  }
  save() {
    this.router.navigate(['/home'])
  }
  skip() {
    this.router.navigate(['/home'])
  }


  getGeolocation() {
    this.router.navigate(['/geomap']);
  }

  //picker time using open
  //wednesday
  async wednesdaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value1: any) => {
            console.log(value1);
            this.value1 = value1['col -0'].text + '-' + value1['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnswed()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()

  }
  getcolumnswed() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionswed(i)
      })
    }
    return columns;
  }
  getColumnOptionswed(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value1: i
      })
    }
    return options;
  }


  //thursday
  async thursdaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value0: any) => {
            console.log(value0);
            this.value0 = value0['col -0'].text + '-' + value0['col -1'].text;
          }
        }
      ],
      columns: this.getcolumns()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()

  }

  getcolumns() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptions(i)
      })
    }
    return columns;
  }
  getColumnOptions(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value: i
      })
    }
    return options;
  }

  //monday
  async Mondaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value2: any) => {
            console.log(value2);
            this.value2 = value2['col -0'].text + '-' + value2['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnsmon()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnsmon() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsmon(i)
      })
    }
    return columns;
  }
  getColumnOptionsmon(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value2: i
      })
    }
    return options;
  }

  //tusday
  async Tusdaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value3: any) => {
            console.log(value3);
            this.value3 = value3['col -0'].text + '-' + value3['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnstus()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnstus() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionstus(i)
      })
    }
    return columns;
  }
  getColumnOptionstus(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value3: i
      })
    }
    return options;
  }

  //friday
  async Fridaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value4: any) => {
            console.log(value4);
            this.value4 = value4['col -0'].text + '-' + value4['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnsfri()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnsfri() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsfri(i)
      })
    }
    return columns;
  }
  getColumnOptionsfri(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value4: i
      })
    }
    return options;
  }

  //saturday
  async saturdaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value5: any) => {
            console.log(value5);
            this.value5 = value5['col -0'].text + '-' + value5['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnsSat()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnsSat() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsSat(i)
      })
    }
    return columns;
  }
  getColumnOptionsSat(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value5: i
      })
    }
    return options;
  }

  async sundaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value6: any) => {
            console.log(value6);
            this.value6 = value6['col -0'].text + '-' + value6['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnsSun()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnsSun() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsSun(i)
      })
    }
    return columns;
  }
  getColumnOptionsSun(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value6: i
      })
    }
    return options;
  }

}
