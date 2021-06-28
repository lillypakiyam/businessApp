import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx'
import {ApiService} from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

public productDetail = {
    productname : '',
    productcolor: '',
    productmodel: '',
    productprice:''
  };
  allDetail:any;
  proInfo = [];

  constructor(private camera: Camera,
              private api : ApiService,
              private firestore: FirestoreService) { }

    options: CameraOptions = {
           quality: 100,
           sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
           destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
           mediaType: this.camera.MediaType.PICTURE
              }
                         
  ngOnInit() {

  }

  loadDetail() {
    // this.firestore.find('productdetail').subscribe(res=>{
    //   this.allDetail=res;
    //   console.log(this.allDetail);
    //   this.product();
    // })
  }
 Accesscamera(){
  this.api.openCamera();
  }
  AccessGallery(){

    this.api.openGallery();
  }
  addProductDetail(){
    const selectedProduct={
    id:null,
    productname: this.productDetail.productname,
    productcolor: this.productDetail.productcolor,
    productmodel:this.productDetail.productmodel,
    productprice:this.productDetail.productprice
  };
  console.log(this.productDetail);
//   this.firestore.upload(selectedProduct).subscribe(res=>{
//     this.loadDetail();
// })
}
product(){
    for(let i of this.allDetail){
        this.proInfo.push(i);
    }
}
}
