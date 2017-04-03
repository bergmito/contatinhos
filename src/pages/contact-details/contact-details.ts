import { Component }                 from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Contact }                   from '../../interfaces/contact';
import { ContactsService }           from '../../services/contact.service';

@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html'
})
export class ContactDetailsPage {

    public contact: Contact = <Contact>{};
    public isNew = true;
    public action = 'Add';

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private _contactService: ContactsService) {
    }

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
        if (this.isNew) {
            this._contactService.add(this.contact)
                .catch(console.error.bind(console));
        } else {
            this._contactService.update(this.contact)
                .catch(console.error.bind(console));
        }
        this.dismiss();
    }

    delete() {
        this._contactService.delete(this.contact)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.contact);
    }

}
