import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PastprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pastproject',
  templateUrl: 'pastproject.html',
})
export class PastprojectPage {
  public pastPoll: any;
  public pollFiles: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pastPoll = this.navParams.data.poll;
    this.pollFiles = this.pastPoll.fileLinks;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PastprojectPage');
  }

}
