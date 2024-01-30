import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FilterFunction, anyFilters } from 'shop-folder-core';
import { MatIconModule } from '@angular/material/icon';
import { MultiValueCheckboxComponent } from '../multi-value-checkbox/multi-value-checkbox.component';
import { MultiValueChipComponent } from '../multi-value-chip/multi-value-chip.component';
import { RangeValueComponent } from '../range-value/range-value.component';
import { CommonModule } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'lib-filter-layout',
  standalone: true,
  imports: [
    CommonModule, MatListModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule,
    MultiValueCheckboxComponent, MultiValueChipComponent, RangeValueComponent
  ],
  templateUrl: './filter-layout.component.html',
  styleUrl: './filter-layout.component.scss'
})
export class FilterLayoutComponent implements OnInit {

  filters: anyFilters[] = [];
  selectedFilter: anyFilters | undefined;
  selectedFilterIndex = -1;
  filterFunctions: { [key: string]: FilterFunction<any> } = {};

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FilterLayoutComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: anyFilters[]
  ) {
    this.filters = data;
  }

  ngOnInit(): void {
    if (this.filters && this.filters.length > 0) {
      this.changeFilter(0, this.filters[0]);
    }
  }

  changeFilter(index: number, filter: anyFilters) {
    this.selectedFilter = filter;
    this.selectedFilterIndex = index;
  }

  updateFilterFunction(filterFunction: FilterFunction<any>) {
    if (this.selectedFilterIndex < 0) return;

    this.filterFunctions[this.selectedFilterIndex] = filterFunction;
  }

  applyFilter() {
    const filterfunctions = Object.keys(this.filterFunctions).map(key => this.filterFunctions[key]);
    this._bottomSheetRef.dismiss(filterfunctions);
  }

  handleCancel() {
    this._bottomSheetRef.dismiss();
  }
}
