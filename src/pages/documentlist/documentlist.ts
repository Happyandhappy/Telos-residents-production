import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocumentlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documentlist',
  templateUrl: 'documentlist.html',
})
export class DocumentlistPage {
  public pollFiles:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pollFiles = this.navParams.data.poll["fileLinks"];
    console.log(this.pollFiles);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentlistPage');
  }
  onClickDocument(){
    console.log('clicked');
  }
}
