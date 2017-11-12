import { Component } from '@angular/core';
import { IonicPage, 
         NavController, NavParams,
         LoadingController,AlertController  } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { DocumentPage } from '../document/document';

// import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the VotingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voting',
  templateUrl: 'voting.html',
})

// @Pipe({name: 'replaceLineBreaks'})

export class VotingPage {
  public isDisabled: boolean = false;
  public poll:any;
  public pollFiles: any;
  public files = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public getService: ServicesProvider,
    public loadingCtrl: LoadingController,
    public alertCtril: AlertController,) {
      this.navParams.data.poll.summary = this.addParagraph(this.navParams.data.poll.summary);
      console.log(this.navParams.data.poll.summary);

      this.poll = this.navParams.data.poll;
  }

  ionViewDidLoad() {
    const loading = this.loadingCtrl.create({
      content: "Loading"
    });
    loading.present();
    this.getService.viewPoll(this.navParams.data.query).
    then((info) => {
      // loading.present();
      this.pollFiles = info["links"];
      for(var i=0; i<this.poll.fileLinks.length; i++){
        var object = {fileName: this.poll.fileLinks[i], fileLink: this.pollFiles[i]}  
        this.files.push(object);
      }
      console.log(this.files);
      loading.dismiss();
    }, (err) => {
      loading.present();
       const alert = this.alertCtril.create({
         title: 'Errors',
         message: 'Internet Connection',
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
  onViewFile(file){

    this.navCtrl.push(DocumentPage, {link: file.fileLink});
  }

  onViewMessage(option) {
    const f_alert = this.alertCtril.create({
      title: 'Warning',
      subTitle: 'They cannot withdraw their vote, click yes to proceed.',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.onConfirmMessage(option);
          }
        },
      ]
    });
    f_alert.present();
  }

  onConfirmMessage(option) {
    const alert = this.alertCtril.create({
      title: 'Confirm',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.onClickOption(option);
          }
        }
      ]
    });
    alert.present();
  }

  onClickOption(option){ 

    var object = {
      choice: option,
      id: this.poll._id
    };
    const loading = this.loadingCtrl.create({
      content: "Loading"
    });
    this.getService.vote(object).
    then((info) => {
      loading.present();
      loading.dismiss();
       this.isDisabled = true;
    }, (err) => {
      loading.present();
       const alert = this.alertCtril.create({
         title: 'Errors',
         message: 'Internet Connection',
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

  addParagraph(character) {
    return character.replace('&', '<br/>');
  }

}
