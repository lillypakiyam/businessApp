import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  public inventory = {
    categories: [],
  }

  public categories1 = {
    id: '',
    service1: '',
    service2: '',
    service3: '',
    service4: '',
    price: ''
  }
  servicedata: any;
  servicedatalist = [];

  constructor(private router: Router,
    private api: ApiService,
    private firestore: FirestoreService) { }

  ngOnInit() {
    this.defaultservices()
  }
  save() {
    // let businessname=''
    // if(){
    //   businessname='nailsaloon'
    // }
    // else if ()
    const getcategories = {
      id: '+919092085728',
      categories: this.inventory.categories,
      //business : businessname
    }
    this.firestore.update('users', getcategories.id, getcategories).then(res => {

      //  this.router.navigate(['/registration']);
      //this.router.navigate(['/home'])
    });
    console.log("categories", this.inventory)
  }

  elmentchange(ev: any, value) {
    // this.inventory.categories =[...this.inventory.categories,ev.detail] 
    console.log('getEve', ev, 'value', value)
    console.log("categor", this.inventory.categories)
    if (ev.detail.checked) {
      this.inventory.categories = [...this.inventory.categories, ev.detail.value]
    } else {


    }
  }
  checkElement(value) {

  }

  back() {
    this.router.navigate(['/home'])
  }

  defaultservices() {
    // this.categories1.id = this.api.id
    this.categories1.service1 = this.api.service1
    this.categories1.service2 = this.api.service2
    this.categories1.service3 = this.api.service3
    this.categories1.service4 = this.api.service4
    const defaultservicelist = {
      id: 'hairsaloon',
      service1: this.categories1.service1,
      service2: this.categories1.service2,
      service3: this.categories1.service3,
      service4: this.categories1.service4
    }
    this.firestore.findCategories('categories').subscribe(res => {
      this.servicedata = res;
      // console.log("result",res)
      for (let i of this.servicedata) {
        this.servicedatalist.push(i)
      }
    })
  }

  saveservices() {
    const servicesInfo = {
      id: '+919092085728',
      service1: this.categories1.service1,
      // service2 : this.categories1.service2,
      // service3 : this.categories1.service3,
      // service4 : this.categories1.service4,
      price: this.categories1.price
    }
    this.firestore.updateField('users', 'defaultServices', servicesInfo.id, servicesInfo).then(res => {
      console.log('result', res)
    })
  }

}
