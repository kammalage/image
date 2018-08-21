import { Component } from '@angular/core';
import { IonicPage, 
	NavController,
	ViewController, 
	NavParams, 
	AlertController,
	PopoverController, 
	ModalController,
	ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { DocPopoverComponent } from '../../components/doc-popover/doc-popover';


@IonicPage()
@Component({
  selector: 'page-document-modal',
  templateUrl: 'document-modal.html',
})
export class DocumentModalPage {
	public images: Image[] = [];
	testImage: string ="";
	imageNames: string[] = [];
	docTypes = [];
	imageCount: number = 0;
	editFlag: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public toastCtrl: ToastController, private DomSanitizer: DomSanitizer) {
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
	    	console.log("capturedDocs: " + capturedDocs);
	    	for(let i = 0; i < capturedDocs.length; i++){
	    		this.images.push(new Image(this.imageCount.toString(), capturedDocs[i]));
	    		this.imageCount++;
	    	}
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
			let profileModal = this.modalCtrl.create('DocViewModalPage', { imageData: image.imageData });
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

hardcodedImage: string = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABMNDhEODBMRDxEVFBMXHTAfHRoaHToqLCMwRT1JR0Q9Q0FMVm1dTFFoUkFDX4JgaHF1e3x7SlyGkIV3j214e3b/2wBDARQVFR0ZHTgfHzh2T0NPdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnb/wAARCAMqBDgDASIAAhEBAxEB/8QAGwAAAwEBAQEBAAAAAAAAAAAAAQIDAAQFBgf/xAAwEAACAgICAQMEAgIBBQEBAQAAAQIRITEDEkEEUWEFEyJxMoGRoUIUIzOxwdEVUv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHBEBAQEBAQEBAQEAAAAAAAAAAAERAhIhMUFR/9oADAMBAAIRAxEAPwDoTS0NbexKpjo8L0kms4CrqloZoCxgmDL2ZqQaD4LgSSbDbC1YtZJii9bBYJSehkniwhUslYqhaqzN0alwNIivxkUTsSaV2L9VRu0mK9hi7RmiBU8izXkaqDVjBGelQYaQZRFjadPwTBSWMo0l2hk20b4A5pKpYGi2DmxIWMskaPNU7QssoovyiLxx/Lqzc+oELlrYvPPpB5OnquFts8f1/qfucjUdDz9S1zc0nObZJ5od2wV7HeME62xmv8DCsaQG2dvpV1Sr+zjhFz5EkelxRVUjHV+NR0OLaQi92W44txyJOUYWpHP9a1mrylkPV4ZGXrIcccZOPm9dOeIukWcmu+XNDik+zwcnL627XHg4ZTby3kyNzlnVpckuR22xc172Km7sZJ/0aQywNvyBRQ0U60RGSCkN1xQa0NUFH3G61jwGsgSbxFMyBVWZvR2cP0/n5WsUj0PT/SuPjac32LIza8fi9LycjqMXk9P0v0db5XZ6nHxQgqjFJFF+OzTOo8fpOPjilGKwP0UXaKdlQuwAb9mZiDLAGkmMlgxcAQTJAALAqQbFkZwF/AEsm1sKeRg1ASoLAUFOjW9IyBlBTJWDTD2BdsYMFZAzMYg0a2BsFsYDd4rIsk0rGTDNqSKJ1SJNdXgq37Aq9kwIt2PpULKlkEXcrA5+ePSafhnPNOmvc6fWPSOaXgo8b1sb5V8Eo4iX9XjmOacsYNxGk80NxJKXz4JXWWV4027X9FoaZzy42dUtEySjlarBtxKciq8CJeDWhE68jXYsVbotGHwQRksE22jqnDNvBCUbZYhVgtBt/oX7f43YY2kAeSkrQOJqxeRuqG4otoKunghO7/ZZqkTl8+CBEguLSwBSp5Nd/oBXj5Ed1grJEn+ywoRwHs7FM7s0yZtsaMnEX9MDRFPKXySbY3W0gSQGSb/QY4CljYaWMga8bFeHljVgRoDWbIKphd+CoW3Zs6HSxlAaXgDJMV7DlA2Bg2xcjYoqCpPQZJuNE08lIvAqgo0FNxfyOngnJ5Ioyf8AkVumMk2I1kqCnaGi/cEdpDPdFobsmtATzd5FarQtkkFnkRqjKQyqSQpC8e2YeCpsxJYY+xivcK2IngZex43c/hitNDL4NK6GDXaAwRfuaUkiKPb+iblYspWw8au0RWTzktWCUlTRRStAaxHkLlUjJ1L4YAWAvQKpjPQE4OnkexJ4djxacQMzVlGvZm20UCZKWyyprIk1aA0XZngVXdD9bSaCufmdkoN3gvyw6xbZx/8AUQhaexIa7+FJ7Kc/Jw8C7dlZ5E/qDjagcfJzS5HcmzfMZrq9X6+XK2kcDebGuwNexvELdsbtgDQrx5KyorePAHiL9wCzl+IV0+j425d2ehxz4+N3JpHkw9RKMElg0uRy2yXlderz/UorHGv7PO5uefK3b2Rehq8WMhobBVhiDFsYNV4aHSETZSO6KhkvYdRxs0Y3tjrHkitVDLRqetnRwej5eXUXRE1BDx4+TkpQjdnq8P0mOHyO/g9Hh9Px8SqMUhiWvH9N9LnyP/u/ij0vT/T+Lg1G38nXSTAVnWpJYRvILCgNo12HYKooy0MkLlBhKwNLYFgL8gA1MGzeQpgZIDQzYrIN/RgJ+4WIDSYHVgeDPwAXoCA3g0fkDXnAbsD+AANoyyKmG/YKNpAvIlNvIy0EM3gRux3oRAMnkLeAAvIAeEDwPaaoRX5AXkwt5JptMbkjScmTk3SpgT525PeiEnjeS0tWc0mm7A831WeZ3sg+PLZ0eqxyN+4kZfib1HNLj/wU4pUNL8tIn0d3oCsn2VISmho2sBloghPO0SnS15LyVkOXyaAgvyOuMV4pnFx2pWdUJPqMG5I3Ej9ssp+4jkrIMoYJtNHRF4qjSiib9HFJ5OnhWES5Eu9rJWGDVFJpM5+SOSzBSeyaOVp+xvNFpx9tkmsmhm8CVYexlbCBHFWjS3gMlQrZRooZL3EUq0WTtUwE6+XoVotJpqqIydAZLBnsaOUGrATPgCeR3gSWwgyF0zdgXdlDoWQ0FoPJH/AVFsO0FRG6lQiWAMZoFMBVZaOkTTodTrVANYkt6HvAGrIBeFQuWytCVkQCqDZmzMoyl4FeXQaDBW0wG+3+OAQwyvbqvcSrkFUUfxtGDpKjDB9XYyacbEeAppnidjxlka/cm8BcgBJ9XgDViu7yVj/Eypft+QVTwVsSawFCTsWMqbQISbbVAks2iCjzkVP2CnYFhhTLLKRyqIx/kUi6ZuM0OSNi8b6yorJEZqnZJFUkA13E0U2sjUZbN1dDNKOW6RLm9Vx8UbtWWQZw6vLFn6rj4YvNnm+p+oud9ThnySm/ybZfJrt9X698icY6OByt5BvIPJuRNHAFnYTa+S4M6o1i0NSSKgPIKw/cZLAJaASxG78hkBPBcDRSGVE+1B7lqKPKB3whMhRMUbNQBk9JAHRSDtk+r8l/S9HzRjN0n5Imqw45Ta6ps9D0/wBL5OSnNdUz1fS+n4YQi4xT+TrWiJrh4fpvFxZatnXBRgqSGeQBDNKjRVgQ2ijNWbXg3YBAFvATZRgCmkjbYKpG0UF7wBKmF6B4IMYGVoxRnnQULYbwQFoz0C6A8gbeDNmTrZnTADNYGL2AZtC9nYqfuNigCmF6Es3bwFM9A7Au2ZukQMMqomnY1vwVDNgTTQHkVPNANZqwB/AE/Ag1mvAJ0ngDYCzlcUiddgy1oVSqLRJRKVptHPI6Z5/wcs3n9lHl+un/ANxUifHNPA3rF+bsjxxp2bHQ9gUqN4sW1VEDbpmawxU/YDxomBkrJTh5ZWN0L5r3NI53GsjQ5HVFnxv2sRcbS0URbbbyPBBfE9UPxwp0Sh4KtjtWMo0hU8MmCM+PyIk1IvLRKqb0VWq0a6ElLqJfa2MQ0pZIyyWguzyM+NO6RYjk65KL8SnVCzRQsvyJVZZRbiBxaAkkvkdOjOORowvxgAOTom1ZZpCqNgLDeR7Ekq0BXbfkB9sSUR0r2zSwBNoVDXToVs0ikWkG72Sj8j3QU0ktIDVAtBu1kgHW3nAGvYZPYtoqFaAsMehuqaKFjvPkzlQcLZNvZFOp+7N2yTSsLRahnkDMrGjlECKyvHSV6N0yZ6oqGTUvAWumxeLErG5M7Jqkc0jCSWTBX2T9wdvY20ZI8D0YdW0jP5FbaYz/ACLoLyjQfhixeQvYlD3T2GxHjQy0REJrrOx/0GcbiT45bQaNDYzwxP4ysovyQCt4xsKeAaNRdQ6dgasyqO3RPm9TDizaNYisEkvyJ83quPhjh5PO9R9QcsRwcM+WU3+TLOUdvqfqUp4icHJzS5HbdsS22ZexvAU8me7BVPILNAvILWjeDJZyEZKw1WDJ0g3YUKC8bFcvFiSn4EQzlQspZwI22hG2akDecgbzoBkVBsLAk/CKw4XLLWAhUNGMngouFQQ6vGCGkXFXnIYpVgd/BNYkE1njDJ9is2lHKOe3ehg9z6V9XcHHg5n+Phn0UJqcbR8C7VNYZ7n0T6s3JcHM/wBNksH0gScZp6HTMjGu2ZtAWQGwEBrALNgXbNkBpUKa/INoBvgDYLoDyAUwXTB8hvGgM92g+BbaMsgFsBstmukBvALrZ";
}

class Image {
	name: string;
	docId: string;
	docType: string;
	imageData: string;
	checkbox: boolean;

	constructor(name, imageData="", docId ="", docType= "MISC", checkbox = false){
		this.name = name;
		this.imageData = imageData;
		this.docId = docId;
		this.docType = docType;
		this.checkbox = checkbox;

	}
}
