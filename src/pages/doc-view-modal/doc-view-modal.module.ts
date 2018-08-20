import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocViewModalPage } from './doc-view-modal';

@NgModule({
  declarations: [
    DocViewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DocViewModalPage),
  ],
})
export class DocViewModalPageModule {}
