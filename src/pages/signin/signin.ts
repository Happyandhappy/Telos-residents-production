import { Component } from '@angular/core';
import { IonicPage,
  NavController, Platform,
  NavParams,LoadingController,AlertController,MenuController} from 'ionic-angular';
  import { NgForm } from '@angular/forms';
  import { TabsPage } from '../tabs/tabs';
  import { SignupPage } from '../signup/signup';
  import { Auth } from '../../providers/auth/auth';

  @IonicPage()
  @Component({
    selector: 'page-signin',
    templateUrl: 'signin.html',
  })
  export class SigninPage {
    tabsPage = TabsPage;
    signupPage = SignupPage;

    constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public platform: Platform,
      public loadingCtrl: LoadingController,
      public alertCtril: AlertController,
      public authService: Auth,
      public menu:MenuController) {
        console.log("language: ", this.platform.lang());
        // this.menu = menu;
        this.menu.enable(false, 'myMenu')
      }
      ionViewDidLoad() {
        const loading = this.loadingCtrl.create({
          content: "Signing in"
        });
        loading.present();
        //Check if already authenticated
         this.authService.checkAuthentication().then((res) => {
             console.log("Signing in");
             this.navCtrl.setRoot(TabsPage);
         }, (err) => {
            const alert = this.alertCtril.create({
              title: 'Authentication',
              message: 'Please sign in',
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
      onSignin(form:NgForm){
      const loading = this.loadingCtrl.create({
        content: "Signing in"
      });
      loading.present();

      let credentials = {
          email: form.value.username.trim(),
          password: form.value.password.trim()
      };

      this.authService.login(credentials).then((result) => {
          console.log(result);
          if(result['success'] === false){
            const alert = this.alertCtril.create({
              title: 'Authentication',
              message: result['message'],
              buttons: [
                {
                  text: "Try Again",
                  role: 'cancel',
                }
              ] 
            });
            loading.dismiss();                   
            
            alert.present();
            
          }else{
            loading.dismiss();                   
            this.navCtrl.setRoot(TabsPage, {token: result["token"]});        
          }
        //  this.navCtrl.setRoot(TabsPage);
      }, (err) => {
        loading.dismiss();
        const alert = this.alertCtril.create({
          title: 'Network Error',
          message: 'Try Again',
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
    }}



    