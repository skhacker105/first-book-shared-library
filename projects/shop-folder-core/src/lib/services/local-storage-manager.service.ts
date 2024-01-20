import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {
  private keyCollection: { [key: string]: LocalStorageManager } = {};

  constructor() { }

  getManager(key: string, needStrConvert: boolean, data?: any) {
    if(!this.keyCollection[key])
      this.keyCollection[key] = new LocalStorageManager(key, needStrConvert, data);
    return this.keyCollection[key];
  }
}


export class LocalStorageManager {
  private data: any;
  constructor(private key: string, private needStrConvert: boolean, data?: any) {
    if (!data) this.loadFromStorage()
    else this.loadToStorage(data);
  }
  private loadFromStorage() {
    const dt = localStorage.getItem(this.key)
    if (dt) {
      this.data = this.needStrConvert ? JSON.parse(dt) : dt;
    } else {
      this.data = undefined;
    }
  }
  private loadToStorage(data: any) {
    this.data = data;
    if (this.needStrConvert) localStorage.setItem(this.key, JSON.stringify(data));
    else localStorage.setItem(this.key, data);
  }
  public get() {
    return this.data;
  }
  public set(data: any) {
    this.loadToStorage(data)
  }
  public isEmpty(): boolean {
    return !this.data;
  }
  public isNotEmpty(): boolean {
    return !!this.data;
  }
}