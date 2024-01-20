import { IBase } from "./_base";

export const unitsConfig = {
    units: '++id,type,name,description'
}

export interface IUnit extends IBase {
    type: UnitTypes;
    name: string;
    description: string;
}

export const enum UnitTypes {
    quantity = 'Quantity',
    weight = 'Weight',
    volume = 'Volume',
    length = 'Length',
    area = 'Area',
    time = 'Time',
    packing = 'Packing'
}