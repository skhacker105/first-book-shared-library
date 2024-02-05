import { IMultiValueFilter, IRangeValueFilter } from "../interfaces";
import { anyFilters } from "../types";

export function isMultiValueFilter(filter: anyFilters): filter is IMultiValueFilter {
    return filter.filterType === 'multiValue';
}

export function isRangeValueFilter(filter: anyFilters): filter is IRangeValueFilter {
    return filter.filterType === 'rangeValue';
}