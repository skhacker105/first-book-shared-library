import { IGridView } from "../interfaces";
import { ActivatedRoute, } from "@angular/router";

export class GridService<T> {
  data: T[] = [];
  gridViews: IGridView[];

  selectMode = false;
  selectedView: IGridView | undefined;
  selectedIds: number[] = [];
  
  isDataLoading = false;
  viewParameterName = 'view';

  get enableSelectedAction(): boolean {
    return this.selectedIds.length > 0;
  }

  constructor(allViews: IGridView[], route?: ActivatedRoute, viewParam?: string) {
    this.gridViews = allViews;
    this.setDefaultIfNotFound();
    if (!this.loadViewFromParameter(route, viewParam)) this.loadDefaultView();
  }

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
    this.selectedView = view;
  }

  resetRowSelection() {
    this.selectedIds = [];
  }

  updateRowSelection(id: number, selected: boolean) {
    const idx = this.selectedIds.indexOf(id);
    if (!selected && idx >= 0) this.selectedIds.splice(idx, 1);
    else if (selected && idx < 0) this.selectedIds.push(id);
  }
}
