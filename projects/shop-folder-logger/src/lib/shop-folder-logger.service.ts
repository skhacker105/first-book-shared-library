import { Injectable } from '@angular/core';

export interface ILogMessageType {
  userId?: string,
  type: 'normal' | 'success' | 'error',
  message: any,
  stackTrace?: string,
  createdOn: Date
}

@Injectable({
  providedIn: 'root'
})
export class ShopFolderLoggerService {

  logs: ILogMessageType[] = [];

  constructor() { }

  log(msg: any, userId?: string, stackTrace?: string) {
    this.logs.push({
      message: msg,
      type: 'normal',
      stackTrace: stackTrace,
      userId,
      createdOn: new Date()
    });
    console.log('Log Message: ' + msg);
  }

  logSuccess(msg: any, userId?: string, stackTrace?: string) {
    this.logs.push({
      message: msg,
      type: 'success',
      stackTrace: stackTrace,
      userId,
      createdOn: new Date()
    });
    console.log('Log Success: ' + msg);
  }

  logError(msg: any, userId?: string, stackTrace?: string) {
    this.logs.push({
      message: msg,
      type: 'error',
      stackTrace: stackTrace,
      userId,
      createdOn: new Date()
    });
    console.log('Log Error: ' + msg);
  }
}
