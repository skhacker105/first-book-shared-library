import { IBase } from "./_base";
import { ISelectable } from "./_selectable";

export const contactConfig = {
    contacts: '++id,name,mainPhoneNumber,types,isAdHocContact'
}

export interface IContact extends IBase, ISelectable {
    name: string;
    mainPhoneNumber: string;
    otherPhoneNumbers: string[];
    openingBalance: number;
    isMe: boolean;
    types: string[];
    checkIfItIsMe(phoneNumbers: string): boolean;
    compare(ct: IContact): ICompareOutput;
    getName(): string;
}

export interface ICompareOutput {
    mainPhoneIsDifferent: boolean;
    otherPhonesUpdateNeeded: boolean;
}