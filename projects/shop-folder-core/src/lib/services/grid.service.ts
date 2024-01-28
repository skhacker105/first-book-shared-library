import { GridApi, GridOptions } from "ag-grid-community";
import { IGridView } from "../interfaces";
import { ActivatedRoute, } from "@angular/router";
import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Collection, Table } from "dexie";
import { FilterFunction } from "../types";


@Directive()
export abstract class GridService<T> implements OnDestroy {

  // GRID
  data: T[] = [];
  gridViews: IGridView[];
  protected gridApi!: GridApi;
  grid: GridOptions = {};
  defaultColDef: any = {};
  allExpanded = true;

  // DEXIES
  pageSize = 10;
  selectedTable: Table<T, number> | undefined;
  private defaultFilteredCollection?: FilterFunction<T>;
  private extendedFilteredCollection?: (FilterFunction<T>)[];
  private defaultOrderBy: { column: string, order: 'asc' | 'desc' } | undefined;
  private finalQuery: Collection<T, number> | undefined;

  // ROW SELECTION
  selectMode = false;
  selectedView: IGridView | undefined;
  selectedIds: number[] = [];

  // OTHERS
  isDataLoading = false;
  viewParameterName = 'view';
  isComponentActive = new Subject<boolean>();

  // GETTER
  get enableSelectedAction(): boolean {
    return this.selectedIds.length > 0;
  }

  // CONSTRUCTOR
  constructor(allViews: IGridView[], route?: ActivatedRoute) {
    this.gridViews = allViews;
    this.setDefaultIfNotFound();
    if (!this.loadViewFromParameter(route)) this.loadDefaultView();
  }


  // COLUMN VIEW
  setDefaultIfNotFound(): void {
    if (this.gridViews.length === 0) return;
    if (this.gridViews.find(cd => cd.isDefault)) return;
    this.gridViews[0].isDefault = true;
  }

  loadViewFromParameter(route?: ActivatedRoute): boolean {
    if (!route) return false;

    const paramName = route.snapshot.paramMap.get(this.viewParameterName);
    if (!paramName) return false;

    let paramView = this.gridViews.find(view => view.viewName === paramName);
    if (!paramView) return false;

    this.updateSelectedView(paramView);
    return true;
  }

  loadDefaultView() {
    if (this.gridViews.length === 0) return;

    const view = this.gridViews.find(view => view.isDefault);
    if (view) this.updateSelectedView(view);
  }

  updateSelectedView(view: IGridView) {
    if (this.selectMode) {
      this.resetRowSelection();
      this.handleSelectModeChange(false);
      this.gridApi.deselectAll()
    }
    this.selectedView = view;
    this.gridApi?.updateGridOptions({
      columnDefs: this.selectedView.columnDefs,
      autoGroupColumnDef: this.selectedView.autoGroupColumnDef
    });
    this.gridApi?.autoSizeAllColumns();
  }

  // Indexed DB - DEXIE
  useTable(table: Table<T, number>) {
    this.selectedTable = table;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }

  setOrderBy(column: string, order: 'asc' | 'desc') {
    this.defaultOrderBy = { column, order };
  }

  setDefaultFilters(filterFunction: FilterFunction<T>) {
    this.defaultFilteredCollection = filterFunction;
    this.updateQuery();
  }

  updateFilters(filterFunctions: (FilterFunction<T>)[]) {
    this.extendedFilteredCollection = filterFunctions;
    this.updateQuery();
  }

  private updateQuery() {
    if (!this.selectedTable) return;

    let c = this.selectedTable.toCollection();

    // apply order by
    if (this.defaultOrderBy) {
      c = this.selectedTable.orderBy(this.defaultOrderBy.column);
      if (this.defaultOrderBy.order === 'desc') c = c.reverse();
    }

    // apply default filter
    if (this.defaultFilteredCollection) {
      c = this.defaultFilteredCollection(c);
    }

    // apply extended filter
    if (this.extendedFilteredCollection) {
      this.extendedFilteredCollection.forEach(filter => {
        c = filter(c);
      });
    }

    this.finalQuery = c;
  }

  async refreshData() {
    // Throw error if no table is present
    if (!this.selectedTable) throw new Error('No table is configured.');

    const c = this.finalQuery ? this.finalQuery : this.selectedTable.toCollection();
    this.data = await c.limit(this.pageSize).toArray();
  }

  async nextPage() {
    // Throw error if no table is present
    if (!this.selectedTable) throw new Error('No table is configured.');

    const c = this.finalQuery ? this.finalQuery : this.selectedTable.toCollection();
    const newData = await c.offset(this.data.length).limit(this.pageSize).toArray();
    if (newData) newData.forEach(d => this.data.push(d));
  }


  // ROW SELECTION
  resetRowSelection() {
    this.selectedIds = [];
  }

  updateRowSelection(id: number, selected: boolean) {
    const idx = this.selectedIds.indexOf(id);
    if (!selected && idx >= 0) this.selectedIds.splice(idx, 1);
    else if (selected && idx < 0) this.selectedIds.push(id);
  }

  onSelectionChanged() {
    this.selectedIds = this.gridApi?.getSelectedNodes().map(node => node.data.id ? node.data.id : 0)
  }

  // GRID
  handleSelectModeChange(selectMode: boolean) {
    if (selectMode != this.selectMode) {
      this.selectMode = selectMode;
      if (this.selectMode) this.handleSelectModeOn();
      else this.handleSelectModeOff();
    }
  }

  abstract handleSelectModeOn(): void;
  abstract handleSelectModeOff(): void;

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.updateGridOptions({
      autoGroupColumnDef: this.selectedView?.autoGroupColumnDef
    });
  }


  // Expand Collapse
  collapseAll() {
    this.allExpanded = false;
    this.gridApi.collapseAll();
  }

  expandAll() {
    this.allExpanded = true;
    this.gridApi.expandAll();
  }

  // On Destroy
  ngOnDestroy(): void {
    this.isComponentActive.next(true);
    this.isComponentActive.complete();
  }
}
