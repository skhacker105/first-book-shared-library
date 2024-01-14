import { Injectable } from '@angular/core';
import { IDBFilter } from './db-filter.interface';
import { IDBPaging, PagingUtil } from './db-pagination.interface';


@Injectable({
  providedIn: 'root'
})
export class DBService {

  private myFolder = 'MyFolder';
  public allFolders = [this.myFolder];
  private selectedFolder = this.myFolder;
  private keyColumn: string;


  lstEntities = {
    contacts: '++id,name,phoneNumbers',
    contactGroups: '++id,name,isBusinessAccount,createdBy',
    access: '++id,name,',

    addresses: '++id,name,ctId,isGroup,city,state,pin',
    attendance: '++id,name,state,createdOn',
    units: '++id,name',
    notifications: '++id,name,message,route',

    rawMaterials: '++id,name,description',
    products: '++id,name,description',
    productPrices: '++id,productId,contactId,price',
    catalogs: '++id,name',
    store: '++id,itemId,isRawMaterial,quantity',

    orders: '++id,orderNumber,contact,isSales,isAdHocClient,status,createdOn',
    orderItems: '++id,orderId,item,isRawMaterial,description,status,isReturn,createdOn',

    shipments: '++id,contact,order,vehicleType,vehicleNumber,status,isReturn,createdOn',
    shipmentItems: '++id,shipmentId,orderItem',

    transactions: '++id,orderId,fromContact,toContact,viaContact,amount,createdOn',
    
    todoGroups: '++id,name',
    todos: '++id,todoGroupId,name,description,targetDate,status,createdOn',
    
  };

  constructor() {
    this.keyColumn = 'id';
  }

  private connectDB(): Promise<IDBDatabase> {
    // Open (or create) the database
    var db = indexedDB || window.indexedDB;
    var request: IDBOpenDBRequest = db.open(this.selectedFolder, 1);

    return new Promise<IDBDatabase>((resolve, reject) => {
      request.onerror = (err) => reject(err);
      request.onsuccess = (e: any) => {
        resolve(request.result);
      }

      request.onupgradeneeded = (e: any) => {
        const Db = e.currentTarget.result;//var Db = e.target.result;

        //uncomment if we want to start clean
        //if(Db.objectStoreNames.contains(storeName)) Db.deleteObjectStore("note");

        //Create store
        Object.keys(this.lstEntities).forEach(t => {
          const storeName = ({ ...this.lstEntities })[t]
          if (!Db.objectStoreNames.contains(storeName)) {
            const store = Db.createObjectStore(storeName, { keyPath: this.keyColumn, autoIncrement: true });
            store.createIndex("name", "name", { unique: true });
            store.createIndex("createdOn", "createdOn", { unique: false });
          }
        });
        // this.connectDB(db, keyColumn)
        //   .then(result => resolve(result))
        //   .catch(err => reject(err));
      }
    });

  }

  private getObjectStore(db: IDBDatabase, storeName: string): IDBObjectStore {
    return db.transaction([storeName], "readwrite").objectStore(storeName);
  }

  public add(storeName: string, obj: any): Promise<any> {
    if (!obj[this.keyColumn]) {
      throw new Error(`Object must contain the key column ${this.keyColumn}`);
    }

    return new Promise((resolve, reject) => {
      this.connectDB()
        .then(db => {
          const request = this.getObjectStore(db, storeName).add(obj);
          request.onsuccess = () => resolve(obj);
          request.onerror = (err) => reject(err);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  public delete(storeName: string, obj: any): Promise<any> {
    if (!obj[this.keyColumn]) {
      throw new Error(`Object must contain the key column ${this.keyColumn}`);
    }

    return new Promise((resolve, reject) => {
      this.connectDB()
        .then(db => {
          const request = this.getObjectStore(db, storeName).delete(obj[this.keyColumn]);
          request.onsuccess = () => resolve(obj);
          request.onerror = (err) => reject(err);
        })
        .catch(err => {
          console.log('Error: ', err);
          throw err;
        })
    });
  }

  public update(storeName: string, obj: any): Promise<any> {
    if (!obj[this.keyColumn]) {
      throw new Error(`Object must contain the key column ${this.keyColumn}`);
    }

    return new Promise((resolve, reject) => {
      this.connectDB()
        .then(db => {
          const store = this.getObjectStore(db, storeName);
          const request = store.put(obj);
          request.onsuccess = () => resolve(obj);
          request.onerror = (err) => reject(err);
        })
        .catch(err => {
          console.log('Error: ', err);
          throw err;
        })
    });
  }

  public get(storeName: string, keyValue: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connectDB()
        .then(db => {
          const request = this.getObjectStore(db, storeName).get(keyValue);
          request.onsuccess = () => resolve(request.result);
          request.onerror = (err) => reject(err);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  public getAll(storeName: string, filter?: IDBFilter | undefined | null, paging?: IDBPaging | undefined | null): Promise<any> {
    const rows: any[] = [];
    let hasSkipped = false;
    let [start, end] = paging ? PagingUtil.getRange(paging) : [0, 100];
    return new Promise((resolve, reject) => {
      this.connectDB()
        .then(db => {
          const store = this.getObjectStore(db, storeName)
          const request = !filter ? store.openCursor() : store.index(filter.index).getAll(filter.filter);
          request.onsuccess = (e: any) => {
            let cursor = e.target.result;

            if(!hasSkipped && start > 0) {
              hasSkipped = true;
              cursor.advance(start);
              return;
            }
            if (cursor) {
              if (!paging) rows.push(cursor.value);
              else {
                rows.push(cursor.value);
                if (rows.length <= paging.pageSize) cursor.continue();
                else resolve(rows);
              }
              cursor.continue();
            }
            else {
              resolve(rows);
            }
          };
          request.onerror = (err) => reject(err);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

}
