import { Component } from '@angular/core';
import { IonicPage, 
	NavController,
	ViewController, 
	NavParams, 
	AlertController,
	PopoverController, 
	ModalController,
	ToastController } from 'ionic-angular';
import { DocPopoverComponent } from '../../components/doc-popover/doc-popover';


@IonicPage()
@Component({
  selector: 'page-document-modal',
  templateUrl: 'document-modal.html',
})
export class DocumentModalPage {
	public images: Image[] = [];
	imageNames = [];
	docTypes = [];
	editFlag: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public toastCtrl: ToastController) {
  }

  	ngOnInit(){
	  	console.log("document-modal ngOnInit()");
	  	//Manually pushing hard-coded assets from the /imgs folder
	  	//for(let i = 1; i <= 4; i++){
	  	//	this.images.push(new Image(String(i)));
	  	//}

	  	this.getDocTypes();
  	}

	ionViewDidLoad() {

	}

  	presentPopover(event: UIEvent) {
	    let popover = this.popoverCtrl.create(DocPopoverComponent);	    
	    popover.present({
	      ev: event
	    });
	    popover.onDidDismiss(capturedDocs => {
	    	console.log(capturedDocs);
	    	this.presentToast(capturedDocs);
	    });
  	}

	onLongPress(event, image) {	
		this.editFlag = true;
		image.checkbox = true;;
    }

  	onPressRelease(event, image) {

  	}

	onPress(event, image) {

	}

	openDocViewModal(image){
		if(!this.editFlag){
			let profileModal = this.modalCtrl.create('DocViewModalPage', { imageName: image.name });
   			profileModal.present();
		}
		else {
			image.checkbox = !image.checkbox;
		}
		
	}

	close() {	
    	this.editFlag = false;
    	this.resetCheckboxes();
  	}

  	resetCheckboxes(){
  		this.images.forEach(image => {
  			image.checkbox = false;
  		})
  	}

  	getDocTypes(){
  		this.docTypes.push("MISC");
  		this.docTypes.push("TAXPAYER");
  		this.docTypes.push("SPOUSE");
  		this.docTypes.push("W2");
  		this.docTypes.push("1098");
  		this.docTypes.push("1099");
  	}

  	openMoveAlert(){
  		let alert = this.alertCtrl.create();
	    alert.setTitle("Change type");

	    for(let i = 0 ; i < this.docTypes.length; i++){
	    	alert.addInput({
	    		type:'radio',
	    		label: this.docTypes[i],
	    		value: this.docTypes[i]
	    	})
	    }

	    alert.addButton({
	      text: 'Cancel',
	      handler: () => {
	      }
	    });

	    alert.addButton({
	      text: 'Move',
	      handler: (data: any) => {

	      	this.changeDocType(data);
	      	this.resetCheckboxes();
	      }
	    });

	    alert.present();
  	}

  	changeDocType(data){
  		console.log("data: " + data);
  		for(let i = 0; i < this.images.length; i++){
	      		if(this.images[i].checkbox){
	      			this.images[i].docType = data.toString();
	      		}
      	}
  	}

  	presentToast(text) {
  		let toast = this.toastCtrl.create({
    	message: text,
    	duration: 3000,
    	position: 'top'
  	});
  	toast.present();
	}
}

class Image {
	name: string;
	docId: string;
	docType: string;
	imageData: string;
	checkbox: boolean;

	constructor(name, docId ="", docType= "MISC", imageData="", checkbox = false){
		this.name = name;
		this.docId = docId;
		this.docType = docType;
		this.imageData = imageData;
		this.checkbox = checkbox;

	}


}
