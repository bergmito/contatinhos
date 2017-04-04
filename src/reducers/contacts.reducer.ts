import { ActionReducer, Action } from '@ngrx/store';
import { ContactActions }        from '../actions/contact.actions';
import { Contact }               from '../interfaces/contact';

let nextId = 0;

// export function ContactsReducer(state = [], action) {
//     switch (action.type) {
//         case ContactActions.ADD_CONTACT:
//             return [...state, Object.assign({}, action.payload, { id: nextId++ })];
//         case ContactActions.UPDATE_CONTACT:
//             return state.map(contact => {
//                 return contact.id === action.payload.id ? Object.assign({}, contact, action.payload) : contact;
//             });
//         case ContactActions.DELETE_CONTACT:
//             return state.filter(contact => contact.id !== action.payload.id);
//         default:
//             return state;
//     }
// }

export const ContactsReducer: ActionReducer<Contact[]> = (state: Array<Contact> = [], action: Action) => {  
    switch(action.type) {
        case ContactActions.LOAD_CONTACTS_SUCCESS:
            return action.payload;
        case ContactActions.ADD_UPDATE_CONTACTS_SUCCESS:
            let exists = state.find(contact => contact._id === action.payload._id);
            if (exists)
                // UPDATE
                return state.map(contact => {
                    return contact._id === action.payload._id ? Object.assign({}, contact, action.payload) : contact;
                })
            else 
                // ADD
                return [...state, Object.assign({}, action.payload)];
        case ContactActions.DELETE_CONTACTS_SUCCESS:
            return state.filter(contact => contact._id !== action.payload);
        default:
            return state;
    };
}