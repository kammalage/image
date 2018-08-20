import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'doc-popover',
  templateUrl: 'doc-popover.html'
})
export class DocPopoverComponent {

  text: string;
  capturedDocs: string[] = [];

  constructor(public viewCtrl: ViewController, public toastCtrl: ToastController, public camera: Camera) {
    console.log('Hello DocPopoverComponent Component');
    this.text = 'Hello World';
  }

  options: CameraOptions = {
  quality: 42,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

  captureDocument() {

            this.camera.getPicture(this.options).then((imageData) => {
                console.log("getPicture(): " + imageData);   

                let base64Image = 'data:image/jpeg;base64,' + imageData;     
                this.presentToast(base64Image);  
                this.capturedDocs.push(base64Image);
                this.close();
            }, (error) => {
            	 this.presentToast('Error while selecting image.');
            	console.log("ERROR -> " + JSON.stringify(error));
            });


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
