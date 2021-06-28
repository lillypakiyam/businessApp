import { Injectable } from '@angular/core';
import { User,Services, ServiceCatagory} from '../models/user';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserproviderService {

  public loggedUser: User;
  public serviceDetails:Services;
  public serviceCatagory : ServiceCatagory;

  constructor(private api: ApiService,
              private http: HttpClient,
              private navCtrl: NavController,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController) { }


   getUserData(): User{
      return this.loggedUser;
  }
  getServiceDetails(): Services{
    return this.serviceDetails;
  }
  getService2Details(): ServiceCatagory{
    return this.serviceCatagory;
  }

  emtyUser(){
    this.loggedUser = {
      id: null,
      name: '',
      mobile: '',
      bussinessname: ''
    }
  }

  async load(){
    return new Promise((resolve, rejected) => {
       this.getItem().then(uid => {
          this.api.updateID(uid);
          this.api.getUser().subscribe((usr: any) => {
             if(usr){
               this.setLoggedInUser(usr);
             }
             resolve(true);
          }, err => { 
            resolve(true);
            console.log(err);
           });
       }); 
    });
  }


  goForward(page){
     this.navCtrl.navigateForward(page); 
  }

  goBackward(page){
    this.navCtrl.navigateBack(page);
  }

  goToNew(page){
     this.navCtrl.navigateRoot(page); 
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async getJSON(){
     return new Promise((resolve, reject) => {
        this.http.get("assets/services/input.json").subscribe((response) => {
          resolve(response);
        });
     });
  }

  async setItem(value): Promise<void>{
    this.api.updateID(value);
    console.log('value',value)
    await Storage.set({
       key: 'uid' ,
       value: JSON.stringify(value)
    });
  }

  async getItem(){
    const item = await Storage.get({
      key: 'uid'
    });
    return JSON.parse(item.value);
  }

  async logout(): Promise<any>{
    this.emtyUser();
    await this.api.logout();
    await Storage.clear();
  }

  async setLoggedInUser(user){
    this.loggedUser = user;
    console.log('Logged In User', this.loggedUser);
  }

  //setservice
  async setservice(use){
    this.serviceDetails =use ;
    console.log('Logged In service', this.serviceDetails);
  }

  async setservicecategory(res){
    this.serviceCatagory =res ;
    console.log('Logged In serviceCATEGORY', this.serviceCatagory);
  }


  async createLoader(message): Promise<HTMLIonLoadingElement>{
    const load = await this.loadCtrl.create({
      message
    });
    return load;
  }

  async createToast(message, showCloseButton = false, position="bottom" as "top" | "middle" | "bottom", duration=3500): Promise<HTMLIonToastElement>{
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration,
      buttons:[{
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('clear toast');
        }
      }]
    })
    return toast;
  }

}
