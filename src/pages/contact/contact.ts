import { Component, ChangeDetectionStrategy } from "@angular/core";  
import { ModalController, NavController }     from 'ionic-angular'; 
import { Store }                              from '@ngrx/store';
import { Observable }                         from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState }                           from '../../services/app-state';
import { Contact }                            from '../../interfaces/contact';  
import { ContactDetailsPage }                 from '../../pages/contact-details/contact-details';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPage {

    public contacts: Observable<Contact[]>;

    constructor(
        private nav: NavController,
        private store: Store<AppState>,
        private modalCtrl: ModalController) 
    { 
        this.contacts = this.store.select(state => state.contacts);
    }

    showDetail(contact: Contact) {
        let modal = this.modalCtrl.create(ContactDetailsPage, { contact: contact });
        modal.present();
    }  

}
