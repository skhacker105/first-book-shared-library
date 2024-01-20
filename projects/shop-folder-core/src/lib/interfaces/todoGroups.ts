import { IBase } from "./_base";
import { ISelectable } from "./_selectable";

export const todoGroupConfig = {
    todoGroups: '++id,name'
}

export interface ITodoGroup extends IBase, ISelectable {
    name: string;
}