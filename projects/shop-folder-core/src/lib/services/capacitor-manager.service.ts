import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Contacts, GetContactsResult } from '@capacitor-community/contacts';
import { ShopFolderLoggerService } from 'shop-folder-logger';
import { Device, DeviceInfo } from '@capacitor/device';
import { GetSimCardsResult, Sim, SimCard } from '@jonz94/capacitor-sim';

@Injectable({
  providedIn: 'root'
})
export class CapacitorManagerService {

  constructor(private logger: ShopFolderLoggerService) { }

  isNativeApp(): boolean {
    return Capacitor.isNativePlatform();
  }

  async getDeviceContactPermission(): Promise<boolean | undefined> {
    try {
      let permission = await Contacts.checkPermissions();
      if (permission.contacts !== 'granted') permission = await Contacts.requestPermissions();
      if (permission.contacts !== 'granted') return;

      return true;
    } catch (err) {
      this.logger.logError('Error while checking');
      return false;
    }
  }

  async getPhoneContacts(): Promise<GetContactsResult> {
    const havePermission = await this.getDeviceContactPermission();
    if (!havePermission) throw new Error('Permission denied for contacts');

    return await Contacts.getContacts({
      projection: {
        name: true,
        emails: true,
        organization: true,
        phones: true,
        postalAddresses: true
      }
    });
  }

  async getPhoneSims(): Promise<GetSimCardsResult> {
    return await Sim.getSimCards();
  }
}
