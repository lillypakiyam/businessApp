import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PickerController, AlertController } from '@ionic/angular'
import { PickerOptions } from '@ionic/core'
import { UserproviderService } from 'src/app/services/userprovider.service';
import { duration } from 'moment';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

  public getservice = {
    Servicename: '',
    price: '',
    duration:''
  }

  public services = {
    ServiceName: '',
    categories: '',
    duration: '',
    price: ''
  }
  servicehide = false;
   serv: any;
   serviceprofile:any;
   categoryservice: any;
  servicedata: any;
  servicedatacopy:any;
  servicelist = [];
  categoriesdata: any;
  categoriesdatalist: any = [];
   
  timeget: any[] = [
    [
      '5min', '10min', '15min', '20min', '25min', '30min', '35min', '40min', '45min',
      '50min', '55min', '60min'
    ]
  ]


  value0 = 'Service duration';
  numColumns: number = 1;
  numOptions: number = 10;

  public serviceDatalist: any =[];
  public service2list: any = [];

  serviceList: any=[];
  constructor(private router: Router,
    private api: ApiService,
    private pickercontrl: PickerController,
    private alertcontroller: AlertController,
    private userProvideserv: UserproviderService,
    private firestore: FirestoreService) { }

  ngOnInit() {
    //this.servicedata = this.userProvideserv.serviceDetails;
     this.servicedetails()
     this.servicedetails2()
     this.api.getaddservice(this.userProvideserv.loggedUser.id).subscribe(res=>{
     console.log('service get fulll ', res)
     this.servicedata =res
     for(let i of this.servicedata){
       this.servicelist.push(i)
     }
   });

   this.api.getservice(this.userProvideserv.loggedUser.id).subscribe(data=>{
    this.api.serviceDatalist=data;
    console.log('service register api',this.api.serviceDatalist)
      for(let i of this.api.serviceDatalist)
      this.api.service2list.push(i)
   });
  }
  
  back() {
    this.router.navigate(['/home'])
  }

  getServiceDetails() {
    const serviceInfo = {
      id: this.userProvideserv.loggedUser.id,
      ServiceName: this.services.ServiceName,
      duration: this.value0, 
      price: this.services.price,
    }
    this.firestore.updateField('users', 'service', serviceInfo.id, serviceInfo).then(response => {
      console.log("response", response)
    });
    this.servicehide=false;
    console.log('services', serviceInfo);
    this.api.getaddservice(this.userProvideserv.loggedUser.id).subscribe(res=>{
        this.servicedata =res
        for(let i of this.servicedata){
          this.servicelist.push(i)
        }
       })
  }

  servicedetails() {
    this.api.getaddservice(this.userProvideserv.loggedUser.id).subscribe((res:any)=>{
      this.userProvideserv.setservice(res);
      console.log('uerprovider service',res)
      this.serv=this.userProvideserv.getServiceDetails()
      console.log('user servicedetails', this.serv)
    })
  }
   
  servicedetails2(){
    this.api.getservice(this.userProvideserv.loggedUser.id).subscribe((data:any)=>{
      this.userProvideserv.setservicecategory(data);
    this.categoryservice = this.userProvideserv.getService2Details()
    console.log('users',this.categoryservice);
        
   });
  }
  //hideform
  serviceHideForm() {
    this.servicehide = !this.servicehide
  }

  //duration timepicker
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
            this.value0 = value['col -0'].text;
            console.log('value', this.value0);
          }
        }
      ],
      columns: this.getcolumns()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()

  };

  getcolumns() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptions(i)
      })
    }
    return columns;
  };
  getColumnOptions(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value: i
      })
    }
    return options;
  };

  
  async EditService(item){
    const alert = await this.alertcontroller.create({
      
      cssClass: 'my-custom-class',
       
      inputs:[
        {
          name: 'ServiceName',
          value: item.ServiceName,
          type: 'text' 
        },
        {
          name: 'duration',
        placeholder: "Duration (mins)",
          type: 'text',
        },
        {
          name : 'price',
          placeholder: "Price (₹)",
          type:'text'
        }
      ],
      
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async(data: any) => {
              
            console.log('Confirm Cancel');
            await alert.dismiss();
          }
        }, {
          text: 'Ok',
          handler: async (data: any) => {
            const service = {
              id : item.id,
              ServiceName: item.ServiceName,
              duration : data.duration,
              price: data.price,
            }
             console.log('Confirm Ok', data);
             this.api.updatedservice(this.userProvideserv.loggedUser.id, service).subscribe((res)=>{
              console.log('users update the service',res);
            
               })
              
            
           await alert.dismiss();
            
          }
        }
      ]
    });
    await alert.present()
  }

  async swipeEnd(item){
    const alert = await this.alertcontroller.create({
      message: `<b>Edit Services:-</b>`,
      inputs:[
       {
        label: "Service",
        type: "text",
        name: "service",
        value: item.service
      },
      {
        label: "Duration (mins)",
        type: "text",
        name: "time",
        placeholder: "Duration (mins)",
        value: "" 
      },
      {
       label: "Price (₹)",
       type: "text",
       name: "price",
       placeholder: "Price (₹)",
       value: ""
      }],
      buttons:[{
        text: 'Cancel',
        role: 'cancel',
        handler: async (data: any) => {
           console.log(`Cancel Clicked`);
           await alert.dismiss();
        }
      },
      {
        text: 'Submit',
        handler: async (datang:any) => {
           //console.log(data);
           this.api.serviceDatalist.forEach(data => {
             data.services.forEach(dat => {
                dat.services.forEach((csv, index) => {
                   if(csv.service === item.service){
                     csv.time = datang.time;
                     csv.price = datang.price;
                   }   
                });
                this.serviceList.push(dat);
                console.log(this.serviceList);
             });
           });
           this.api.updateService(this.userProvideserv.loggedUser.id, { services: this.serviceList }).subscribe(res => {
               console.log("Service Updated", this.serviceList);
           });
           await alert.dismiss();
        }
      }]
    });
    await alert.present();
 }

}
