import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";

export const contactGroupMessageConfig = {
    contactGroupMessages: '++id,contactId,message,createdBy'
}

export interface IContactGroupMessage extends IBase, ISelectable {
    contactGroupId: number;
    contactId: number;
    objContact?: IContact;
    message: string;
    replyOf: number[];
    objReplyOf?: IContactGroupMessage[];
    isDeleted: boolean;
    route?: string;
    type: MessageType;
}

export enum MessageType {
    normal = 'Normal',
    product = 'Product',
    catalog = 'Catalog',
    document = 'Document'
}