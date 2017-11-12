import { Component,ViewChild } from '@angular/core';
import { Platform, NavController,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { SigninPage }from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs'; 
import { CurrentprojectsPage } from '../pages/currentprojects/currentprojects';
import { PastprojectsPage } from '../pages/pastprojects/pastprojects';
import { DocumentsPage } from '../pages/documents/documents'; 
import { VotingPage } from '../pages/voting/voting';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';

import { Auth } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  signinPgae = SigninPage;
  signupPage = SignupPage
  tabsPage   = TabsPage;
  currentprojectsPage = CurrentprojectsPage;
  profilePage = ProfilePage;
  aboutPage = AboutPage;
  @ViewChild('nav') nav: NavController;
  constructor(
    platform: Platform, 
    private menuCtrl: MenuController,
    public translateService: TranslateService,

    public authService: Auth
  ) {}
  openPage(page:any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  translate(){
    //console.log(this.translateService.getDefaultLang());
    if(this.translateService.getDefaultLang() === 'en'){
      this.translateService.setDefaultLang('chn');
    }else{
      this.translateService.setDefaultLang('en');
    }
    
    console.log(this.translateService.getDefaultLang());
    this.menuCtrl.close();
  }

  logout() {
    this.authService.logout();
    this.openPage(SigninPage);
  }
}

