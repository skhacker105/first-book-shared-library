import { ColDef } from "ag-grid-community";

export interface IGridView {
    viewName: string;
    columnDefs: ColDef[];
    isDefault: boolean;
    autoGroupColumnDef?: ColDef;
}