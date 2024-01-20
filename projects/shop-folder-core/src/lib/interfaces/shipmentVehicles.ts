import { IBase } from "./_base";
import { ISelectable } from "./_selectable";
import { IContact } from "./contact";

export const contactConfig = {
    contacts: '++id,shipmentId,driverContactId,vehicleType,vehicleNumber,status,createdOn'
}

// export interface IShipmentVehicle extends IBase, ISelectable {
//     shipmentId: number;
//     driverContactId: number;
//     driverContact: IContact;
//     vehicleType: VehicleTypes,
//     vehicleNumber: string;

//     // Shipment Vehicle Running Status
//     status: ShipmentVehicleStatuses;
//     statusChangedOn: Date;
//     statusHistory: IOrderShipmentVehicleStatus[];
// }

// export enum VehicleTypes {
//     twoWheeler = 'TwoWheeler',
//     fourWheeler = 'FourWheeler',
//     air = 'Air',
//     water = 'Water'
// }

// export interface IOrderShipmentVehicleStatus {
//     status: ShipmentVehicleStatuses;
//     createdOn: Date;
// }
// export enum ShipmentVehicleStatuses {
//     assigned = 'Assigned',
//     arrived = 'Arrived',
//     loaded = 'Loaded',
//     inTransit = 'InTransit',
//     delivered = 'Delivered'
// }