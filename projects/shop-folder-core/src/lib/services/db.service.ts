import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { IAddress, IAssets, IAttendance, ICatalogs, IContact, IContactGroup, IContactGroupMessage, INotifications, IOrder, IOrderItems, IPrice, IProduct, IRawMaterial, IStore, ITodo, ITodoGroup, ITransaction, IUnit, addressConfig, assetConfig, attendanceConfig, catalogConfig, contactConfig, contactGroupConfig, contactGroupMessageConfig, notificationsConfig, orderConfig, orderItemConfig, pricesConfig, productConfig, rawMaterialConfig, sotoreConfig, todoConfig, todoGroupConfig, transactionConfig, unitsConfig } from '../interfaces';
import { DEFAULT_UNITS } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageManager, LocalStorageManagerService } from './';
import { IFolder } from '../interfaces/_folder';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  myFolder: IFolder = { name: 'MyFolder' };
  private _allFolders = new BehaviorSubject<IFolder[]>([this.myFolder]);
  private _selectedFolder = this.myFolder;
  private _selectedDB: BehaviorSubject<AppDB>;

  // storage manager
  private folderStorageKey = 'folders'
  private folderStorageManager: LocalStorageManager;

  public allFolders = this._allFolders.asObservable();
  public selectedDB: Observable<AppDB>;


  // Entities that are not commented are not yet configured
  statusEntitiesDeclarations = {
    // contacts: '++id,name,mainPhoneNumber,isAdHocContact',
    // contactGroups: '++id,name,isBusinessAccount,createdBy',
    // contactGroupMessages: '++id,contactId,message,createdBy',
    access: '++id,name,',
    // images: '++id,name,type',

    // addresses: '++id,name,ctId,isGroup,city,state,pin',
    // attendance: '++id,contactId,state,attendanceDate,createdOn',
    // units: '++id,name',
    // notifications: '++id,title,message,isRead',

    // rawMaterials: '++id,name,description,isPakingItem',
    // products: '++id,name,description',
    // prices: '++id,unitId,contactId,itemId,isRawMaterial,price',
    // catalogs: '++id,title,description',
    // store: '++id,itemId,isRawMaterial,quantity',

    // orders: '++id,orderNumber,contactId,isSales,isBillGenerated,isAdHocContact,isFullyPaid,status,statusChangedOn,isPackingAdded,isPacked,packingStatus,packingStatusChangedOn,isShippingAdded,isShippingCompleted,shippingId,createdOn',
    // orderItems: '++id,orderId,itemId,isRawMaterial,description,quantity,price,isDelivered,isReturnRequested,isReturned,statusChangedOn,createdOn',

    shipments: '++id,shipmentNumber,status,statusChangedOn,createdOn',
    shipmentVehicles: '++id,shipmentId,driverContactId,vehicleType,vehicleNumber,status,createdOn',
    shipmentItems: '++id,shipmentId,orderItem',

    // transactions: '++id,fromContactId,toContactId,viaContactId,amount,isCheque,createdOn',

    // todoGroups: '++id,name',
    // todos: '++id,todoGroupId,name,description,targetDate,status,createdOn',

  };
  constructor(private localStorageManagerService: LocalStorageManagerService) {
    this.folderStorageManager = this.localStorageManagerService.getManager(this.folderStorageKey, true);
    if (this.folderStorageManager.isEmpty()) this.folderStorageManager.set(this._allFolders);
    else this._allFolders.next(this.folderStorageManager.get())

    this._selectedDB = new BehaviorSubject<AppDB>(this.getDB(this.myFolder));
    this.selectedDB = this._selectedDB.asObservable();
  }

  getDB(folder: IFolder): AppDB {
    return new AppDB(folder);
  }

  private folderExists(folder: IFolder): boolean {
    return this._allFolders.value.findIndex(f => f.name === folder.name) >= 0;
  }

  addFolder(folder: IFolder, navigateAfterAdd = false): void {
    if (!this.folderExists(folder)) {
      const curFolders = Object.assign([], this._allFolders.value);
      curFolders.push(folder);
      this._allFolders.next(curFolders);
    }
    if (navigateAfterAdd) {
      this.changeFolder(folder);
    }
  }

  changeFolder(folder: IFolder): void {
    if (!this.folderExists(folder)) throw new Error('Folder do not exists');

    this._selectedFolder = folder;
    this._selectedDB.next(this.getDB(folder));
  }

  isSelected(folder: IFolder): boolean {
    return folder.name === this._selectedFolder.name;
  }

}


export class AppDB extends Dexie {
  addresses!: Table<IAddress, number>;
  attendance!: Table<IAttendance, number>;
  assets!: Table<IAssets, number>;
  catalogs!: Table<ICatalogs, number>;
  contact!: Table<IContact, number>;
  contactGroupMessages!: Table<IContactGroupMessage, number>;
  contactGroups!: Table<IContactGroup, number>;
  notifications!: Table<INotifications, number>;
  orderItems!: Table<IOrderItems, number>;
  orders!: Table<IOrder, number>;
  prices!: Table<IPrice, number>;
  products!: Table<IProduct, number>;
  rawMaterials!: Table<IRawMaterial, number>;
  store!: Table<IStore, number>;
  todoGroups!: Table<ITodoGroup, number>;
  todos!: Table<ITodo, number>;
  transactions!: Table<ITransaction, number>;
  units!: Table<IUnit, number>;

  constructor(folder: IFolder) {
    super(folder.name);
    this.version(1).stores(this.collectoV1TablesConfig());
    this.on('populate', () => this.populateV1());
  }

  collectoV1TablesConfig(): { [key: string]: string } {
    return Object.assign(
      addressConfig,
      attendanceConfig,
      assetConfig,
      catalogConfig,
      contactConfig,
      contactGroupMessageConfig,
      contactGroupConfig,
      notificationsConfig,
      orderItemConfig,
      orderConfig,
      pricesConfig,
      productConfig,
      rawMaterialConfig,
      sotoreConfig,
      todoGroupConfig,
      todoConfig,
      transactionConfig,
      unitsConfig
    );
  }

  populateV1() {
    this.units.bulkAdd(DEFAULT_UNITS);
  }
}
