import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage }from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import { CurrentprojectsPage } from '../pages/currentprojects/currentprojects';
import { PastprojectsPage } from '../pages/pastprojects/pastprojects';
import { PastprojectPage } from '../pages/pastproject/pastproject';
import { DocumentsPage } from '../pages/documents/documents'; 
import { DocumentPage } from '../pages/document/document'; 
import { DocumentlistPage } from '../pages/documentlist/documentlist'; 
import { VotingPage } from '../pages/voting/voting';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { Auth } from '../providers/auth/auth';
import { ServicesProvider } from '../providers/services/services';

export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  } // new function. 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    TabsPage,
    CurrentprojectsPage,
    PastprojectsPage,
    PastprojectPage,
    DocumentsPage,
    DocumentPage,
    DocumentlistPage,
    VotingPage,
    ProfilePage,
    PdfViewerComponent,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (setTranslateLoader),
      deps: [HttpClient]
      }
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    TabsPage,
    CurrentprojectsPage,
    PastprojectsPage,
    PastprojectPage,
    DocumentsPage,
    DocumentPage,
    DocumentlistPage,
    VotingPage,
    ProfilePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    ServicesProvider
  ]
})
export class AppModule {
  constructor(public platform: Platform, translate: TranslateService) {
    if(this.platform.lang() === 'en'){
      translate.setDefaultLang('en');
    }else{
      translate.setDefaultLang('chn');
    } 
  }
}
