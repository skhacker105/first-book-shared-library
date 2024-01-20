import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IProduct } from "./products";

export const catalogConfig = {
    catalogs: '++id,title,description'
}

export interface ICatalogs extends IBase, ISelectable {
    title: string;
    description: string;
    bannerAssetId?: number;
    products: IProduct[];
}