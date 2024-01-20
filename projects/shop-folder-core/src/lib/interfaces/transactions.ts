import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";

export const transactionConfig = {
    transactions: '++id,fromContactId,toContactId,viaContactId,amount,isCheque,createdOn'
}

export interface ITransaction extends IBase, ISelectable {
    fromContactId: number;
    fromContact: IContact;

    toContactId: number;
    toContact: IContact;
    
    viaContactId?: number;
    viaContact?: IContact;

    amount: number;
    isCheque: boolean;
    chequeNumber?: string,
    chequeDate?: string,
    getMyBalance(contact: IContact): number;
}