import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IProduct } from "./products";
import { IRawMaterial } from "./rawMaterials";

export const sotoreConfig = {
    store: '++id,itemId,isRawMaterial,quantity',
}

export interface IStore extends IBase, ISelectable {
    itemId: number;
    objProduct?: IProduct;
    isRawMaterial: boolean;
    objRawMaterial?: IRawMaterial;
    quantity: number;
    balance: number;
    orderId?: number;
}