import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  public members = {
    staffname: '',
    worktime: '',
    phone: '',
    service: '',
  }

  staffdata: any;
  staffmember = [];


  constructor(private firestore: FirestoreService,
    private api: ApiService) { }

  ngOnInit() {
    //this.getStaffData()
  }

  // getStaffData() {
  //   this.members.staffname = this.api.staffname
  //   this.members.worktime = this.api.worktime
  //   this.members.phone = this.api.phone
  //   this.members.service = this.api.service
  //   const membersdetails = {
  //     id: '+919092085728',
  //     StaffName: this.members.staffname,
  //     WorkTime: this.members.worktime,
  //     Phone: this.members.phone,
  //     Service: this.members.service
  //   }
  //   this.firestore.getdata('users', membersdetails.id, 'staff', membersdetails).subscribe(res => {
  //     this.staffdata = res
  //     console.log('result', this.staffdata)
  //     for (let i of this.staffdata) {
  //       this.staffmember.push(i)
  //     }
  //   })
  // }



}
