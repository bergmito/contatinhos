import { Injectable } from '@angular/core';  
import { Action }     from '@ngrx/store';

import { Contact }    from '../interfaces/contact';

@Injectable()
export class ContactActions {

    static ADD_CONTACT: string = 'ADD_CONTACT';
    addContact(contact: Contact): Action {
        return {
            type: ContactActions.ADD_CONTACT,
            payload: contact
        }
    }

    static UPDATE_CONTACT: string = 'UPDATE_CONTACT';
    updateContact(contact: Contact): Action {
        return {
            type: ContactActions.UPDATE_CONTACT,
            payload: contact
        }
    }

    static DELETE_CONTACT: string = 'DELETE_CONTACT';
    deleteContact(contact: Contact): Action {
        return {
            type: ContactActions.DELETE_CONTACT,
            payload: contact
        }
    }

    static LOAD_CONTACTS_SUCCESS: string = 'LOAD_CONTACTS_SUCCESS';
    loadContactSuccess(contacts: Array<Contact>): Action {
        return {
            type: ContactActions.LOAD_CONTACTS_SUCCESS,
            payload: contacts
        }
    }

    static ADD_UPDATE_CONTACTS_SUCCESS: string = 'ADD_UPDATE_CONTACTS_SUCCESS';
    addUpdateContactSuccess(contacts: Contact): Action {
        return {
            type: ContactActions.ADD_UPDATE_CONTACTS_SUCCESS,
            payload: contacts
        }
    }

    static DELETE_CONTACTS_SUCCESS: string = 'DELETE_CONTACTS_SUCCESS';
    deleteContactSuccess(id: string): Action {
        return {
            type: ContactActions.DELETE_CONTACTS_SUCCESS,
            payload: id
        }
    }    

}