import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { TranslateService } from '@ngx-translate/core';

import { DocumentsPage } from '../documents/documents';
import { CurrentprojectsPage } from '../currentprojects/currentprojects';
import { PastprojectsPage } from '../pastprojects/pastprojects';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  cpPage=CurrentprojectsPage;
  docPage=DocumentsPage;
  ppPage=PastprojectsPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      console.log(this.navParams.data);

    }
    onClickHome(){
      this.navCtrl.push(TabsPage);
    }
}
