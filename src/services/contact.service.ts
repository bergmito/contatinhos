import { Injectable }      from '@angular/core';  
import * as PouchDB        from 'pouchdb';  
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import { Contact }         from '../interfaces/contact';

@Injectable()
export class ContactsService {  
    private _db;
    private _contacts;

    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('contacts.db', { adapter: 'cordova-sqlite' });
    }

    add(contact: Contact) {
        return this._db.post(contact);
    }

	update(contact: Contact) {  
    	return this._db.put(contact);
	}

	delete(contact: Contact) {  
    	return this._db.remove(contact);
	}

	private onDatabaseChange = (change) => {
		let index: number = this.findIndex(this._contacts, change.id);
		let contact: Contact = this._contacts[index];

		if (change.deleted) {
			if (contact) {
				this._contacts.splice(index, 1);
			}
		} else {
			change.doc.Date = new Date(change.doc.Date);
			if (contact && contact._id === change.id) {
				this._contacts[index] = change.doc;
			} else
				this._contacts.splice(index, 0, change.doc);
		}
	}

	private findIndex(array, id) {  
		let low = 0, high = array.length, mid;
		while (low < high) {
			mid = (low + high) >>> 1;
			array[mid]._id < id ? low = mid + 1 : high = mid
		}
	
		return low;
	}	

	getAll() {
		if (!this._contacts) {
			return this._db.allDocs({ include_docs: true})
				.then(docs => {
					this._contacts = docs.rows.map(row => {
						row.doc.Date = new Date(row.doc.Date);
						return row.doc;
					});
					this._db.changes({ live: true, since: 'now', include_docs: true})
						.on('change', this.onDatabaseChange);

					return this._contacts;
				});
		} else
			return Promise.resolve(this._contacts);
	}	
}