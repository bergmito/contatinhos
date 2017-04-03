import { Component, NgZone }                        from "@angular/core";  
import { ModalController, NavController, Platform } from 'ionic-angular'; 
import { ContactsService }                          from '../../services/contact.service';
import { Contact }                                  from '../../interfaces/contact';  
import { ContactDetailsPage }                       from '../../pages/contact-details/contact-details';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

    public contacts = [];

    constructor(private _contactsService: ContactsService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController) {

    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this._contactsService.initDB();

            this._contactsService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.contacts = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }

    showDetail(contact: Contact) {
        let modal = this.modalCtrl.create(ContactDetailsPage, { contact: contact });
        modal.present();
    }  

}
