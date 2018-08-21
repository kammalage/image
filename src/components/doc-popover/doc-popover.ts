import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker} from '@ionic-native/image-picker';


@Component({
  selector: 'doc-popover',
  templateUrl: 'doc-popover.html'
})
export class DocPopoverComponent {

  text: string;
  capturedDocs: string[] = [];

  constructor(public viewCtrl: ViewController, public toastCtrl: ToastController, public camera: Camera, public imagePicker: ImagePicker) {
    console.log('Hello DocPopoverComponent Component');
    this.text = 'Hello World';
  }

  options: CameraOptions = {
  quality: 42,
  destinationType: this.camera.DestinationType.FILE_URI,
  sourceType: this.camera.PictureSourceType.CAMERA,
  encodingType: this.camera.EncodingType.JPEG,
  targetHeight: 1920,
  targetWidth: 1080,
  correctOrientation: true
}

  captureDocument() {

    this.camera.getPicture(this.options).then((imageData) => {
        //console.log("getPicture(): " + imageData);      
        this.capturedDocs.push(imageData);
        this.close();
    }, (error) => {
    	 this.presentToast('Error while selecting image.');
    	console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  openGallery(){
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.capturedDocs.push(results[i]);
        this.close();
      }
    }, (err) => { });
  }

  presentToast(text) {
  		let toast = this.toastCtrl.create({
    	message: text,
    	duration: 3000,
    	position: 'bottom'
  	});
  	toast.present();
	}

  close() {
    this.viewCtrl.dismiss(this.capturedDocs);
  }
}
