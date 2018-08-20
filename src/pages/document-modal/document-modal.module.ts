import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentModalPage } from './document-modal';
import { DocViewModalPage } from '../doc-view-modal/doc-view-modal';
import { DocPopoverComponent } from '../../components/doc-popover/doc-popover';

@NgModule({
  declarations: [
    DocumentModalPage,
    DocViewModalPage,
    DocPopoverComponent
  ],
  imports: [
    IonicPageModule.forChild(DocumentModalPage),
  ],
})
export class DocumentModalPageModule {}
