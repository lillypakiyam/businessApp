import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {ApiService} from 'src/app/services/api.service';
//import {AngularFireStorage} from '@angular/fire/storage'


@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  

  constructor(private camera : Camera,
               private apiserve : ApiService) { }

   options: CameraOptions = {
    quality: 100,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  ngOnInit() {
  }
 Accesscamera(){
  this.apiserve.openCamera();
  }
  AccessGallery(){

    this.apiserve.openGallery();
  }

}
