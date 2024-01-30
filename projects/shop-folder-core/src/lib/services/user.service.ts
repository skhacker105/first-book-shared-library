import { Injectable } from '@angular/core';
import { IContact, IUser } from '../interfaces';
import { LocalStorageManager, LocalStorageManagerService } from './local-storage-manager.service';
import { Subject } from 'rxjs';
import { AppDB, DBService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userChanged = new Subject<IUser>();
  private userStorageKey = 'loggedInUser';
  private userStorageManager: LocalStorageManager;
  private noUser: IUser = {
    name: '',
    mainPhoneNumber: '',
    otherPhoneNumbers: []
  };

  constructor(private localStorageManagerService: LocalStorageManagerService, private dbService: DBService) {
    this.userStorageManager = this.localStorageManagerService.getManager(this.userStorageKey, true);
    this.dbService.selectedDB.subscribe({
      next: db => this.handleFolderChange(db)
    });
  }

  loginUser(user: IUser) {
    this.userStorageManager.set(user);
    this.userChanged.next(user);
  }

  getUser(): IUser {
    if (this.userStorageManager.isEmpty()) return this.noUser;
    else return this.userStorageManager.get();
  }

  async handleFolderChange(db: AppDB) {
    const user = this.getUser();
    if (db.folder.name === this.dbService.myFolder.name) this.userStorageManager.reset();
    else {
      const contacs: IContact[] = await db.contacts.where('mainPhoneNumber').anyOf(user.mainPhoneNumber, ...user.otherPhoneNumbers).toArray();
      if (contacs && contacs.length > 0) {
        const curusr: IUser | undefined = this.userStorageManager.get();
        if (curusr) {
          curusr.selectedFolderContactId = contacs[0].id;
        }
      }
    }
  }
}
