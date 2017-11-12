import { Component } from '@angular/core';
import { IonicPage, 
         NavController, Platform,
         NavParams,LoadingController,AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Auth } from '../../providers/auth/auth';

import { SigninPage } from '../signin/signin';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms'


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signinPage = SigninPage;
  user: FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtril: AlertController,
    public authService: Auth) {
      console.log("language: ", this.platform.lang());
      this.user = new FormGroup({
        password: new FormControl('', [Validators.required]),
        re_password: new FormControl('', [Validators.required,this.equalto('password')]),
        fullName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$')]),
        inviteCode: new FormControl('', [Validators.required]),
        estateName: new FormControl('', [Validators.required])
      });
    }

    equalto(field_name): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
      
      let input = control.value;
      
      let isValid=control.root.value[field_name]==input
      if(!isValid) 
      return { 'equalTo': {isValid} }
      else 
      return null;
      };
    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad SignupPage');
    }
    onSignup(form:NgForm){
      console.log("reached signup")
      const loading = this.loadingCtrl.create({
        content: "Signing up"
      });
      const alert = this.alertCtril.create();
      loading.present();
      console.log(form.value);
      let signupCredentials = {
        email: form.value.email,
        estateName: form.value.estateName,
        inviteCode: form.value.inviteCode,
        password: form.value.password,
        // email: form.value.email,
      
      };
      this.authService.createAccount(signupCredentials).then((result) => {
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
      this.navCtrl.setRoot(SigninPage, {token: result["token"]});
      
       }
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
  }
}