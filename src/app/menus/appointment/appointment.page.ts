import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'
import {CalendarComponent, CalendarResult} from 'ion2-calendar'
import {AngularFireDatabase} from '@angular/fire/database'
import { FirestoreService } from 'src/app/services/firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { createElementCssSelector} from '@angular/compiler';
import {AmazingTimePickerService} from 'amazing-time-picker';
import { ApiService } from 'src/app/services/api.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {


  Date : string;
  currentDate= new Date();
  currentMonth : string;

  @ViewChild(CalendarComponent,{static : false}) myCalendar:CalendarComponent;
  showAddEvent : boolean;
  minDate=new Date().toISOString();
  newEvent ={
    clientname : '',
    service : '',
    Date : '',
    time : '',
    ///  staff : '',
    //  staffname : ''
  };
  allEvents:any;
  today=[];

  //staffname
  staffdata: any;
  staffnamedata= [];

  constructor(private router : Router,
              private api : ApiService,
              private atp : AmazingTimePickerService,
               public firestore : FirestoreService,
               private menuCtrl: MenuController) {
                  this.loadEvent()
               }
  onViewTitleChanged(title: string){
    this.currentMonth = title;
  }             

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(false);
    this.loadEvent();
   // staffname

  }

  showHideForm(){
    //this.staffNamedetails()
    this.showAddEvent = !this.showAddEvent;
    this.newEvent ={
      clientname: '',
      service : '',
      Date : new Date().toISOString(),
      time :'',
       //staff : '',
      // staffname :''
    };
    
  }

  addEvent(){
    var date= this.newEvent.Date.split('T') [0];
    const selectedTime={
      id : null,
      clientname : this.newEvent.clientname,
      Date : date,
      service : this.newEvent.service,
      time : this.newEvent.time,
     // staff : this.staffnamelist.staffname + this.newEvent.staff
    };
    console.log(this.newEvent);
    //firestore...
    this.firestore.book(selectedTime).subscribe(res=>{
      this.allEvents=res;
      this.loadEvent();
    })  
    this.showHideForm();
  }

  loadEvent(){
    this.firestore.findAll('booking').subscribe(res=>{
      this.allEvents=res;
      console.log(this.allEvents);
    })
  }
  onTimeSelected(ev : any){
    const selected = new Date (ev.selectedTime);
    this.newEvent.Date = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    console.log(ev);
  }
  async onEventSelected(event: any){
    const selected = new Date(event.selectedEvent);
    this.newEvent.clientname,
    new Date(this.newEvent.Date),
    this.newEvent.service,
    this.newEvent.time,
   // this.staffnamelist.staffname
    console.log(event);
  }

  event(){
    this.today=[];
    for(let i of this.allEvents){
      if(i.Date === this.Date){
        this.today.push(i);
      }
    }
    console.log(this.today);
  }
       
  open(){
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time=>{
      this.newEvent.time=time;
      console.log(time);
    });
    
   }
  // client(){
  //   this.router.navigate(['/client'])
  // }

  // staffNamedetails(){
  //  this.staffnamelist.staffname = this.api.staffname
  //   const staffnameinfo={
  //     id : '+91909205728',
  //     staffName : this.staffnamelist.staffname
  //   }
  //   this.firestore.getdata('users',staffnameinfo.id,'staff',staffnameinfo).subscribe(res =>{
  //    this.staffdata =res
  //    console.log('staffname',this.staffdata)
  //    for(let i of this.staffdata){
  //      this.staffnamedata.push(i)
  //    }
  //   })
  // }

}

