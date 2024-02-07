import { IFilterOption, IMultiValueFilter, IRangeValueFilter } from "../interfaces";
import { anyFilters } from "../types";

export function isMultiValueFilter(filter: anyFilters): filter is IMultiValueFilter {
    return filter.filterType === 'multiValue';
}

export function isRangeValueFilter(filter: anyFilters): filter is IRangeValueFilter {
    return filter.filterType === 'rangeValue';
}

export function mapMultiValueParamOptions(preselectedValues: string[], options: IFilterOption[]): IFilterOption[] {
    return options.filter(o => preselectedValues.some(value => value===o.label || (value==o.value)));
}