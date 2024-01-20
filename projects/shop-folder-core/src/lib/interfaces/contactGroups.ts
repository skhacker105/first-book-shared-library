import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";

export const contactGroupConfig = {
    contactGroups: '++id,name,isBusinessAccount,createdBy'
}

export interface IContactGroup extends IBase, ISelectable {
    name: string;
    isBusinessAccount: boolean;
    members: number[];
    admins: number[];
    objMembers?: IContact[];
    objAdmins?: IContact[];
    addMember(contactId: number): Promise<number>;
    removeMember(contactId: number): Promise<any>;
    createAdmin(contactId: number): void
}