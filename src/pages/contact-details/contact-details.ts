import { Component }                 from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Store }                     from '@ngrx/store';

import { AppState }                  from '../../services/app-state';
import { ContactActions }            from '../../actions/contact.actions';
import { Contact }                   from '../../interfaces/contact';

@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html'
})
export class ContactDetailsPage {

    public contact: Contact = <Contact>{};
    public isNew: boolean = true;
    public action: string = 'Add';

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private store: Store<AppState>,
        private contactActions: ContactActions) { }

    ionViewDidLoad() {
        let editContact: Contact; 
        editContact = <Contact>this.navParams.get('contact');

        if (editContact) {
            this.contact = editContact;
            this.isNew = false;
            this.action = 'Edit';
        }
    }

    save() {
        if (this.isNew)
            this.store.dispatch(this.contactActions.addContact(this.contact))
        else
            this.store.dispatch(this.contactActions.updateContact(this.contact));

        this.dismiss();
    }

    delete() {
        this.store.dispatch(this.contactActions.deleteContact(this.contact));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.contact);
    }

}
