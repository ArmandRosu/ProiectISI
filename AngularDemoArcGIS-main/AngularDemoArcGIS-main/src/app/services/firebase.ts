import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface IDatabaseItem {
    name: string;
    val: string;
}

@Injectable()
export class FirebaseService {

    listFeed: Observable<any[]>;
    objFeed: Observable<any>;

    constructor(public db: AngularFireDatabase, private afAuth: AngularFireAuth) {
        console.log('FirebaseService initialized');
    }

    async connectToDatabase() {
        // console.log('Connecting to database...');
        // this.listFeed = this.db.list('list').valueChanges();
        // this.objFeed = this.db.object('obj').valueChanges();
        const user = await this.afAuth.currentUser;
        if (user) {
            console.log('Firebase user authenticated:', user.email);
            this.listFeed = this.db.list('list').valueChanges();
            this.objFeed = this.db.object('obj').valueChanges();
        } else {
            console.error('User not authenticated. Cannot connect to Firebase.');
        }
    }

    getChangeFeedList() {
        return this.listFeed;
    }

    getChangeFeedObject() {
        return this.objFeed;
    }

    removeListItems() {
        console.log('Removing all items');
        this.db.list('list').remove();
    }

    addListObject(val: string) {
        console.log(`Adding: ${val}`);
        let item: IDatabaseItem = {
            name: "test",
            val: val
        };
        this.db.list('list').push(item);
    }

    updateObject(val: string) {
        let item: IDatabaseItem = {
            name: "test",
            val: val
        };
        this.db.object('obj').set([item]);
    }
}
