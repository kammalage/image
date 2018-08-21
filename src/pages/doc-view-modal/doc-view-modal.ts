import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DocViewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-view-modal',
  templateUrl: 'doc-view-modal.html',
})
export class DocViewModalPage {
	imageData: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.imageData = this.navParams.get('imageData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocViewModalPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
