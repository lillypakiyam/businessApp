import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserproviderService } from 'src/app/services/userprovider.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  services:any = [];

  constructor(private api: ApiService,
              private userProvide: UserproviderService) { }

  ngOnInit() {
    this.services = [];
    this.services = this.api.services;
    console.log('servvv',this.services)
  }

  goBack(){
    this.services = [];
    this.api.services = [];
    this.api.category = [];
    this.userProvide.goBackward('/inventory');
  }

  async save(){    
     this.api.choosen.forEach(data => {
        this.services.push(data);
     });
     console.log(this.services);
     this.api.updateService(this.userProvide.loggedUser.id, { services: this.services }).subscribe(async res => {
      const toast = await this.userProvide.createToast('Service Updated', false, 'top');
      toast.present();  
      console.log('Services Updated', this.services);
      this.userProvide.goToNew('/home');
     });
  }
}
