import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IOrder } from "./orders";

export const shipmentConfig = {
    shipments: '++id,shipmentNumber,status,statusChangedOn,createdOn'
}

// export interface IShipment extends IBase, ISelectable {
//     shipmentNumber: string;
//     orders: IOrder[];

//     // Shipment Status
//     status: ShipmentStatuses;
//     statusChangedOn: Date;
//     statusHistory: IOrderShipmentStatus[];
// }


// export interface IOrderShipmentStatus {
//     status: ShipmentStatuses;
//     createdOn: Date;
// }
// export enum ShipmentStatuses {
//     assigned = 'Assigned',
//     arrived = 'Arrived',
//     loaded = 'Loaded',
//     inTransit = 'InTransit',
//     delivered = 'Delivered'
// }