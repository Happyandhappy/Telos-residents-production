import { Component } from '@angular/core';
import { IonicPage, 
  NavController, NavParams,
  LoadingController,AlertController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { PastprojectPage } from '../pastproject/pastproject';
/**
 * Generated class for the PastprojectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pastprojects',
  templateUrl: 'pastprojects.html',
})
export class PastprojectsPage {
  public pastPolls:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public getService: ServicesProvider,
    public loadingCtrl: LoadingController,
    public alertCtril: AlertController) {
  }

  ionViewDidLoad() {
      const loading = this.loadingCtrl.create({
    content: "Loading"
  });
  this.getService.getPastPolls().then((pastpolls) => {
    loading.dismiss();
    this.pastPolls = pastpolls["polls"];
    console.log(this.pastPolls);
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
  onClickPastProject(poll){
    this.navCtrl.push(PastprojectPage, {poll: poll});
  }
}
