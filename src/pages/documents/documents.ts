import { Component } from '@angular/core';
import { IonicPage, 
         NavController, 
         NavParams,
         LoadingController,AlertController } from 'ionic-angular';
import { DocumentPage } from '../document/document';
import { DocumentlistPage } from '../documentlist/documentlist';
import { ServicesProvider } from '../../providers/services/services';

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {
  public allpollsList:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public getService: ServicesProvider,
    public loadingCtrl: LoadingController,
    public alertCtril: AlertController) {

  }

  ionViewWillLoad() {
    const loading = this.loadingCtrl.create({
      content: "Loading"
    });
    loading.present();
    const self = this;
    this.getService.getPolls().then((info) => {
      this.allpollsList = info["polls"];
      console.log(this.allpollsList);
      self.getService.getPastPolls()
      .then((pastpolls) => {
        this.allpollsList = this.allpollsList.concat(pastpolls["polls"]);
        console.log(this.allpollsList)
        loading.dismiss();
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
      })
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
  onClickPoll(poll){
    // this.navCtrl.push(DocumentPage, {link: this.pdfSrc});
    this.navCtrl.push(DocumentlistPage, {poll: poll});
  }
}
