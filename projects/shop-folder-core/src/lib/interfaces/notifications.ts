import { IBase } from "./_base";
import { ISelectable } from "./_selectable";

export const notificationsConfig = {
    notifications: '++id,name,message,route,dashboard'
}

export interface INotifications extends IBase, ISelectable {
    title: string;
    message: string;
    route?: string;
    isRead: boolean;
    dashboard: string; // name of dashboard on which to show notification
    data: any;
}