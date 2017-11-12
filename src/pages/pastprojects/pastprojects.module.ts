import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastprojectsPage } from './pastprojects';

@NgModule({
  declarations: [
    PastprojectsPage,
  ],
  imports: [
    IonicPageModule.forChild(PastprojectsPage),
  ],
})
export class PastprojectsPageModule {}
