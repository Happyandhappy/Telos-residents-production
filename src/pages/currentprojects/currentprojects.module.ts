import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentprojectsPage } from './currentprojects';

@NgModule({
  declarations: [
    CurrentprojectsPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentprojectsPage),
  ],
})
export class CurrentprojectsPageModule {}
