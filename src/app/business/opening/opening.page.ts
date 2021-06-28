import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { UserproviderService } from 'src/app/services/userprovider.service';


@Component({
  selector: 'app-opening',
  templateUrl: './opening.page.html',
  styleUrls: ['./opening.page.scss'],
})
export class OpeningPage implements OnInit {

  // public open = {
  //   Monday: 'am' + 'pm',
  //   am: '',
  //   pm: '',
  //   tusday: 'am1' + 'pm1',
  //   am1: '',
  //   pm1: '',
  //   wednesday: 'am2' + 'pm2',
  //   am2: '',
  //   pm2: '',
  //   thursday: 'am3' + 'pm3',
  //   am3: '',
  //   pm3: '',
  //   friday: 'am4' + 'pm4',
  //   am4: '',
  //   pm4: '',
  //   saturday: 'am5' + 'pm5',
  //   am5: '',
  //   pm5: '',
  //   sunday: 'am6' + 'pm6',
  //   am6: '',
  //   pm6: '',
  // }

  public myTimeFormMon: FormGroup
  private OpenTimeMon: number = 1;

  public myTimeForm: FormGroup;
  private OpenTime: number = 1;

  public myTimeFormwed: FormGroup;
  private OpenTimewed: number = 1;

  public myTimeFormthurs: FormGroup
  private OpenTimethurs: number = 1;

  public myTimeFormfri: FormGroup
  private OpenTimefri: number = 1;

  public myTimeFormsat: FormGroup
  private OpenTimesat: number = 1;

  public myTimeFormsun: FormGroup
  private OpenTimesun: number = 1;

  value0 = '9:00-18:00';
  value1 = '9:00-18:00';
  value2 = '9:00-18:00';
  value3 = '9:00-18:00';
  value4 = '9:00-18:00';
  value5 = '9:00-18:00';
  value6 = '9:00-18:00';

  checked = false
  checked1 = false
  checked2 = false
  checked3 = false
  checked4 = false
  checked5 = false
  checked6 = false

  public openingTime: any=[];
  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userProvider: UserproviderService,
    private firestore: FirestoreService) {

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

  ngOnInit() {
    this.openingTime=this.userProvider.loggedUser;
    console.log("loggeed openinngTime", this.openingTime);
  }

  //monday
  addControltime1() {
    this.OpenTimeMon++
    this.myTimeFormMon.addControl('OpenTimeMon' + this.OpenTimeMon, new FormControl('', Validators.required))
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

  //checkbox time
  onSelecteCheckBox(e) {
    console.log('checkbox event', e)
    this.checked = e.detail.checked
  }
  onSelectTusday(ev) {
    console.log('checkbox', ev)
    this.checked1 = ev.detail.checked
  }
  onSelecteCheckBoxwed(e) {
    console.log('checkbox event', e)
    this.checked2 = e.detail.checked
  }
  onSelecteCheckBoxthurs(e) {
    console.log('checkbox event', e)
    this.checked3 = e.detail.checked
  }
  onSelecteCheckBoxfri(e) {
    console.log('checkbox event', e)
    this.checked4 = e.detail.checked
  }
  onSelecteCheckBoxsat(e) {
    console.log('checkbox event', e)
    this.checked5 = e.detail.checked
  }
  onSelecteCheckBoxsun(e) {
    console.log('checkbox event', e)
    this.checked6 = e.detail.checked
  }

  // getOpenningDetails() {
  //   // this.time.Monday=this.time.Monday
  //   // this.time.tusday=this.time.tusday 
  //   const openingInfo = {
  //     id: '+919092085728',
  //     Monday: this.open.am + ' ' + 'to' + ' ' + this.open.pm,
  //     tusday: this.open.am1 + ' ' + 'to' + ' ' + this.open.pm1,
  //     wednesday: this.open.am2 + ' ' + 'to' + ' ' + this.open.pm2,
  //     thursday: this.open.am3 + ' ' + 'to' + ' ' + this.open.pm3,
  //     friday: this.open.am4 + ' ' + 'to' + ' ' + this.open.pm4,
  //     saturday: this.open.am5 + ' ' + 'to' + ' ' + this.open.pm5,
  //     sunday: this.open.am6 + ' ' + 'to' + ' ' + this.open.pm6,
  //   }
  //   this.firestore.update('users', openingInfo.id, openingInfo).then(res => {

  //   });
  //   console.log("openning hours", this.open)
  // }

  back() {
    this.router.navigate(['/home'])
  }
}
