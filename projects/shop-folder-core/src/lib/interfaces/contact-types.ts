import { IBase } from "./_base";
import { ISelectable } from "./_selectable";

export const contactTypeConfig = {
    contactTypes: '++id,name'
}

export interface IContactType extends IBase, ISelectable {
    name: string;
}