import { Injectable } from '@angular/core';

interface IMessageType {
  userId?: string,
  type: 'normal' | 'success' | 'error',
  message: string,
  stackTrace?: string
}

@Injectable({
  providedIn: 'root'
})
export class ShopFolderLoggerService {

  logs: IMessageType[] = [];

  constructor() { }

  log(msg: string, userId?: string, stackTrace?: string) {
    this.logs.push({
      message: msg,
      type: 'normal',
      stackTrace: stackTrace,
      userId
    });
    console.log('Log Message: ' + msg);
  }

  logSuccess(msg: string, userId?: string, stackTrace?: string) {
    this.logs.push({
      message: msg,
      type: 'success',
      stackTrace: stackTrace,
      userId
    });
    console.log('Log Success: ' + msg);
  }

  logError(msg: string, userId?: string, stackTrace?: string) {
    this.logs.push({
      message: msg,
      type: 'error',
      stackTrace: stackTrace,
      userId
    });
    console.log('Log Error: ' + msg);
  }
}
