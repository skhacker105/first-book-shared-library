import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";
import { IContactGroup } from "./contactGroups";

export const addressConfig = {
    addresses: '++id,name,ctId,isGroup,city,state,pin'
}

export interface IAddress extends IBase, ISelectable {
    name: string;
    ctId: number;
    objContact?: IContact;
    isGroup: boolean;
    objContactGroup?: IContactGroup
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pin: string;
    getFullAddress(): string;
}