import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";

export const orderConfig = {
    orders: '++id,orderNumber,contactId,isSales,isBillGenerated,isAdHocContact,isFullyPaid,status,statusChangedOn,isPackingAdded,isPacked,packingStatus,packingStatusChangedOn,isShippingAdded,isShippingCompleted,createdOn',
}

export interface IOrder extends IBase, ISelectable {
    orderNumber: number;
    contactId: number;
    contact: IContact;
    isSales: boolean;
    isBillGenerated: boolean;
    isAdHocContact: boolean;
    originalCreatedOn: Date;

    // price
    totalAmount: number;
    offerDiscountAmount: number;
    taxAmount: number;
    toBePaidAmount: number;
    paidAmount: number;
    pendingAmount: number;
    isFullyPaid: boolean;

    // order status
    status: OrderStatuses;
    statusChangedOn: Date;
    statusHistory: IOrderStatus[];

    // packing status
    isPackingAdded: boolean;
    isPacked: boolean;
    // packingStatus: PackingStatuses;
    // packingStatusChangedOn: Date;
    // packingStatusHistory: IOrderPackingStatus[];

    // shipping status
    isShippingAdded: boolean;
    isShippingCompleted: boolean;
    // shippingId?: number;
    // shippingCost?: number;
}


// Order Statuses
export interface IOrderStatus {
    status: OrderStatuses;
    createdOn: Date;
}
export const enum OrderStatuses {
    draft = 'Draft',
    pending = 'Pending',
    processing = 'Processing',
    completed = 'Completed',
    cancelled = 'Cancelled'
}

// // Packing Stasuses
// export interface IOrderPackingStatus {
//     status: PackingStatuses;
//     createdOn: Date;
// }
// export const enum PackingStatuses {
//     pending = 'Pending',
//     ready = 'Ready',
//     inProgress = 'InProgress',
//     packed = 'Packed'
// }