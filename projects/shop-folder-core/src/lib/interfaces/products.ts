import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IUnit } from "./units";

export const productConfig = {
    products: '++id,name,description'
}

export interface IProduct extends IBase, ISelectable {
    name: string;
    description: string;
    categories: string[];
    images: IProductImage[];
    storeUnits: IProductStoreUnits[];
}

export interface IProductStoreUnits {
    objUnit: IUnit;
    genralSellingPrice: number;
}

export interface IProductImage {
    isMainImage: boolean;
    imageId: number;
}