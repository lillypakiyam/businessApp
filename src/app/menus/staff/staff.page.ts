import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PickerOptions } from '@ionic/core'
import { PickerController, ActionSheetController} from '@ionic/angular'
import { UserproviderService } from 'src/app/services/userprovider.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {


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
  ]

  value0 = 'Working Time';

  numColumns: number = 2;
  numOptions: number = 144;


  public members = {
    staffname: '',
    worktime: '',
    phone: '',
    service: '',
  }

  public staff = {
    staffname: '',
    worktime: '',
    phone: '',
    service: '',
    ServiceName: '',
    service1: '',

  }

  staffdatamb: any;
  staffmembermb = []; //staffmembers

  public servicedatas:any=[];
  public servicelist: any =[];
  public staffmber = [];

  public service1data: any =[];
  public service1list: any = [];
  servicevalues = [];

  public staffs:any=[];
  public staffdata: any =[];
  public staffmember = [];

  staffmb = false;
  constructor(private ngAuth: AngularFireAuth,
    private router: Router,
    private actionsheet :ActionSheetController,
    private firestore: FirestoreService,
    private pickercontrl: PickerController,
    private userProvideserv : UserproviderService,
    private api: ApiService) { }

  ngOnInit() {
    // this.servicedetails()
    // this.service1details()
    // this.getStaffData()
    this.api.staffmember=[];
    this.api.staffdata=[];
    this.api.getaddstaff(this.userProvideserv.loggedUser.id).subscribe(use=>{
      console.log('staff details',use);
       this.api.staffdata=use;
       console.log('staffdetailssss', this.api.staffdata)
       for(let i of this.api.staffdata){
         this.api.staffs.push(i)
       }
    });
   //service registration
   this.api.getservice(this.userProvideserv.loggedUser.id).subscribe(data=>{
    this.api.service1data=data;
    console.log('service register',this.api.service1data)
      for(let i of this.api.service1data)
      this.api.service1list.push(i)
   });
  //service in manua
   this.api.getaddservice(this.userProvideserv.loggedUser.id).subscribe(res=>{
     console.log('service add manual',res);
     this.api.servicedatas=res;
     for(let i of this.api.servicedatas)
     {
       this.api.servicelist.push(i);
     }
   });
  }

  back() {
    this.router.navigate(['/home'])
  }

  getStaffDetails() {

    const staffInfo = {
      id: this.userProvideserv.loggedUser.id,
      staffName: this.staff.staffname,
      worktime: this.value0,
      phone: this.staff.phone,
      service: this.staff.service
      //serviceothers: this.service.ServiceName
 
    }
    console.log('result', staffInfo)
    this.firestore.updateField('users', 'staff', staffInfo.id, staffInfo).then((response) => {
      console.log('response', response)
    })
      .catch((error) => {
        console.log('error', error)
      });
      this.staffmb=false;
      this.api.getaddstaff(this.userProvideserv.loggedUser.id).subscribe(use=>{
        console.log('staff details',use);
         this.api.staffdata=use;
         //console.log('staffdetailssss', this.api.staffdata)
         for(let i of this.api.staffdata){
           this.api.staffs.push(i)
         }
      });
  };



  //hideform
  staffHideForm() {
    this.staffmb = !this.staffmb;
    
  }

  //workTime for staffs
  async Durationtime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.value0 = value['col -0'].text + '-' + value['col -1'].text;
            console.log('value', this.value0);
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
}
