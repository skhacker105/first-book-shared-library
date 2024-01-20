import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IUnit } from "./units";

export const rawMaterialConfig = {
    rawMaterials: '++id,name,description,isPakingItem'
}

export interface IRawMaterial extends IBase, ISelectable {
    name: string;
    description: string;
    isPakingItem: boolean;
    categories: string[];
    images: IRMImage[];
    storeUnits: IRMStoreUnits[];
}

export interface IRMStoreUnits {
    objUnit: IUnit;
    genralPurchasePrice: number;
}

export interface IRMImage {
    isMainImage: boolean;
    imageId: number;
}