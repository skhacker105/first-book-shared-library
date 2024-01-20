import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IProduct } from "./products";
import { IRawMaterial } from "./rawMaterials";

export const orderItemConfig = {
    orderItems: '++id,orderId,itemId,isRawMaterial,description,quantity,price,isDelivered,isReturnRequested,isReturned,statusChangedOn,createdOn',
}

export interface IOrderItems extends IBase, ISelectable {
    orderId: number;
    itemId: number;
    item: IProduct | IRawMaterial;
    isRawMaterial: boolean;
    description: string;
    isDelivered: boolean;
    isReturnRequested: boolean;
    isReturned: boolean;

    // User Entrys
    quantity: number,
    price: number,

    // Order Item Status
    status: OrderItemStatuses;
    statusChangedOn: Date;
    statusHistory: IOrderItemStatus[];

    // // Shipment
    // shipmentId?: number;
    // returnShipmentId?: number;
}

export interface IOrderItemStatus {
    status: OrderItemStatuses;
    createdOn: Date;
}

export enum OrderItemStatuses {
    draft = 'Draft',
    pending = 'Pending',
    packed = 'Packed',
    loaded = 'Loaded',
    shipped = 'Shipped',
    delivered = 'Delivered',
    cancelled = 'Cancelled'
}