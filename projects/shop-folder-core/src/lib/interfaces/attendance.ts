import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";

export const attendanceConfig = {
    attendance: '++id,contactId,message,createdBy'
}

export interface IAttendance extends IBase, ISelectable {
     contactId: string;
     objContact?: IContact;
     state: AttendanceState;
     attendanceDate: Date;
}

export enum AttendanceState {
    login = 'Login',
    logout = 'Logout'
}