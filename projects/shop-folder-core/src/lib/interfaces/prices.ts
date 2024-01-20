import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";
import { IProduct } from "./products";
import { IRawMaterial } from "./rawMaterials";
import { IUnit } from "./units";

export const pricesConfig = {
    prices: '++id,unitId,contactId,itemId,isRawMaterial,price'
}

export interface IPrice extends IBase, ISelectable {
    unitId: number;
    objUnit?: IUnit;
    contactId: number;
    objContact?: IContact;
    itemId: number;
    objProduct?: IProduct;
    isRawMaterial: boolean;
    objRawMaterial?: IRawMaterial;
    price: number;
}