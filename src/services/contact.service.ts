import { Injectable }      from '@angular/core';  
import { Platform }        from 'ionic-angular';
import { Observable }      from 'rxjs/Observable';
import { Contact }         from '../interfaces/contact';

import * as PouchDB        from 'pouchdb';  

@Injectable()
export class ContactsService {  
    
	private _db;

	constructor(
		private _platform: Platform
	) 
	{ 
		window["PouchDB"] = PouchDB;
	}

    initDB(): Promise<any> {
		return this._platform.ready()
			.then(() => {
		        this._db = new PouchDB('contacts.db', { adapter: 'websql' });
			});        
    }

    add(contact: Contact): Promise<any> {
        return this._db.post(contact);
    }

	update(contact: Contact): Promise<any> {  
    	return this._db.put(contact);
	}

	delete(contact: Contact): Promise<any> {  
    	return this._db.remove(contact);
	}

	getAll(): Observable<any> {
		return Observable.fromPromise(
			this.initDB()
				.then(() => {
					return this._db.allDocs({ include_docs: true });
				})
				.then(docs => {
					return docs.rows.map(row => {
						return row.doc;
				});
			}));
	}

	getChanges(): Observable<any> {
		return Observable.create(observable => {
			this._db.changes({ live: true, since: 'now', include_docs: true })
				.on('change', change => {
					observable.next(change.doc);
				});
		});
	}
}