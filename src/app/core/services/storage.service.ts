import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(private storage: Storage) { }

    getUserId(): string {
        return 'sawyer';
    }
}