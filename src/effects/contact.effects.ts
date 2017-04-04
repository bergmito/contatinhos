import { Injectable }                 from '@angular/core';  
import { Effect, toPayload, Actions } from '@ngrx/effects';  
import { Action }                     from '@ngrx/store';
import { Observable }                 from 'rxjs/Observable';

import { Contact }                    from '../interfaces/contact';  
import { ContactsService }            from '../services/contact.service';  
import { ContactActions }             from '../actions/contact.actions';

@Injectable()
export class ContactEffects {

    constructor(
        private actions$: Actions,
        private db: ContactsService,
        private contactActions: ContactActions
    ) { }

    @Effect() addContact$ = this.actions$
        .ofType(ContactActions.ADD_CONTACT)
        .map(toPayload)
        .mergeMap(contact => this.db.add(contact));

    @Effect() updateContact$ = this.actions$
        .ofType(ContactActions.UPDATE_CONTACT)
        .map(toPayload)
        .mergeMap(contact => this.db.update(contact));

    @Effect() deleteContact$ = this.actions$
        .ofType(ContactActions.DELETE_CONTACT)
        .map(toPayload)
        .mergeMap(contact => this.db.delete(contact));

    allContacts$ = this.db.getAll()  
        .map(contacts => this.contactActions.loadContactSuccess(contacts));

    changedContacts$ = this.db.getChanges()  
        .map(change => {
            if (change._deleted)
                return this.contactActions.deleteContactSuccess(change._id)
            else 
                return this.contactActions.addUpdateContactSuccess(change);
        });

    @Effect() getBirthdays$ = Observable.concat(this.allContacts$, this.changedContacts$);          
}