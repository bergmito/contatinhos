import { NgModule, ErrorHandler }                   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen }                             from '@ionic-native/splash-screen';
import { StatusBar }                                from '@ionic-native/status-bar';
import { StoreModule }                              from '@ngrx/store';
import { EffectsModule }                            from '@ngrx/effects';

import { MyApp }                                    from './app.component';
import { ContactActions }                           from '../actions/contact.actions';
import { ContactEffects }                           from '../effects/contact.effects';
import { ContactsService }                          from '../services/contact.service';
import { AboutPage }                                from '../pages/about/about';
import { ContactDetailsPage }                       from '../pages/contact-details/contact-details';
import { ContactPage }                              from '../pages/contact/contact';
import { HomePage }                                 from '../pages/home/home';
import { TabsPage }                                 from '../pages/tabs/tabs';
import { ContactsReducer }                          from '../reducers/contacts.reducer';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ContactDetailsPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({ contacts: ContactsReducer}),
    EffectsModule.run(ContactEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ContactDetailsPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
    ContactActions,
    ContactsService
  ]
})
export class AppModule {}
