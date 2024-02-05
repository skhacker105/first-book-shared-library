import { FilterFunction, numDate, valueType } from "../types";

export interface IFilter {
    name: string;
    description: string;
    column: string;
}

export interface IMultiValueFilter extends IFilter {
    filterType: 'multiValue';
    type: 'checkbox' | 'chip';
    options: IFilterOptions[];
    selectedOptions: IFilterOptions[];
    getOptions?: () => Promise<IFilterOptions[]>;
    createMultiFilter?: (selectedOptions: IFilterOptions[]) => FilterFunction<any> | undefined
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
    createRangeFilter?: (min: numDate, max: numDate) => FilterFunction<any> | undefined
}
