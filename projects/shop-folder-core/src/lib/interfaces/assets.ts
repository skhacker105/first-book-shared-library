import { IBase } from "./_base";
import { ISelectable } from "./_selectable";

export const assetConfig = {
    assets: '++id,name,type'
}

export interface IAssets extends IBase, ISelectable {
    name: string;
    type: string;
    document: any;
}