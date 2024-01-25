import { GridApi, GridOptions } from "ag-grid-community";
import { IGridView } from "../interfaces";
import { ActivatedRoute, } from "@angular/router";
import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export abstract class GridService<T> implements OnDestroy {

  // GRID
  data: T[] = [];
  gridViews: IGridView[];
  protected gridApi!: GridApi;
  grid: GridOptions = {};
  defaultColDef: any = {};
  allExpanded = true;

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

  constructor(allViews: IGridView[], route?: ActivatedRoute, viewParam?: string) {
    this.gridViews = allViews;
    this.setDefaultIfNotFound();
    if (!this.loadViewFromParameter(route, viewParam)) this.loadDefaultView();
  }


  // COLUMN VIEW
  setDefaultIfNotFound(): void {
    if (this.gridViews.length === 0) return;
    if (this.gridViews.find(cd => cd.isDefault)) return;
    this.gridViews[0].isDefault = true;
  }

  loadViewFromParameter(route?: ActivatedRoute, viewParam?: string): boolean {
    if (!route) return false;
    if (viewParam) this.viewParameterName = viewParam;

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
