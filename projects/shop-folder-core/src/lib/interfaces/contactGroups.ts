import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";

export const contactGroupConfig = {
    contactGroups: '++id,name,isBusinessAccount,createdBy'
}

export interface IContactGroup extends IBase, ISelectable {
    name: string;
    isBusinessAccount: boolean;
    members: IContactGroupMember[];
    addMember(contact: IContact, isAdmin?: boolean): void;
    removeMember(contactId: number): void;
    setAdmin(contactId: number): void;
}

export interface IContactGroupMember {
    memberId: number;
    member?: IContact;
    isAdmin: boolean;
}