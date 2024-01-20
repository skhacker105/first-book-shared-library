import { IBase } from "./_base";
import { ISelectable } from "./_selectable";

export const todoConfig = {
    todos: '++id,todoGroupId,name,description,targetDate,statusChangedOn,status,createdOn'
}

export interface ITodo extends IBase, ISelectable {
    name: string;
    description: string;
    todoGroupId: number;
    targetDate: Date;

    // order status
    status: TodoStatuses;
    statusChangedOn: Date;
    statusHistory: ITodoStatus[];
}


export interface ITodoStatus {
    status: TodoStatuses;
    createdOn: Date;
}
export enum TodoStatuses {
    backlog = 'Backlog',
    working = 'Working',
    done = 'Done'
}