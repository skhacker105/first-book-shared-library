import { FilterFunction } from "../types";

type valueType = string | number | Date;
type numDate = number | Date;

export interface IFilter {
    name: string;
    description: string;
    column: string;
}

export interface IMultiValueFilter extends IFilter {
    filterType: 'multiValue';
    type: 'checkbox' | 'chip';
    options: IFilterOptions[];
    getOptions?: () => Promise<IFilterOptions[]>;
    createFilterFunction?: (selectedOptions: IFilterOptions[]) => FilterFunction<any>
}

export interface IFilterOptions {
    label: string;
    value: valueType;
    isSelected: boolean;
}


export interface IRangeValueFilter extends IFilter {
    filterType: 'rangeValue';
    minValue: numDate;
    maxValue: numDate;
    selectedMin: numDate;
    selectedMax: numDate;
    getRange?: () => Promise<{ minValue: numDate; maxValue: numDate; }>;
    createFilterFunction?: () => FilterFunction<any>
}
