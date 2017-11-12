import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, MenuController,
  LoadingController,AlertController } from 'ionic-angular';
import {VotingPage } from '../voting/voting';
import { ServicesProvider } from '../../providers/services/services';

@IonicPage()
@Component({
  selector: 'page-currentprojects',
  templateUrl: 'currentprojects.html',
})
export class CurrentprojectsPage {
  public currentPolls:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public getService: ServicesProvider,
    public loadingCtrl: LoadingController,
    public alertCtril: AlertController,
  public menu:MenuController) {
    // this.menu = menu;
    this.menu.enable(true, 'myMenu')
  }

  ionViewDidLoad() {
    const loading = this.loadingCtrl.create({
      content: "Loading"
    });
    loading.present();
    this.getService.getPolls().then((info) => {
      loading.dismiss();
      this.currentPolls = info["polls"];
    }, (err) => {
      loading.present();
       const alert = this.alertCtril.create({
         title: 'Errors',
         message: 'Failed to retrieve documents',
         buttons: [
           {
             text: 'Ok',
             role: 'cancel',
           }
         ] 
       });
        loading.dismiss();
        alert.present();
    });
    }

  onClickProject(poll){
    console.log("innnn",poll)
    //we will fetch project data here, including images' links, voting options 
    this.navCtrl.push(VotingPage, {"query": poll._id, "poll": poll});
  }
}
