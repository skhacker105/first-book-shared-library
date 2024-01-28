import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FilterFunction, IMultiValueFilter, IRangeValueFilter } from 'shop-folder-core';
import { MatIconModule } from '@angular/material/icon';
import { MultiValueCheckboxComponent } from '../multi-value-checkbox/multi-value-checkbox.component';
import { MultiValueChipComponent } from '../multi-value-chip/multi-value-chip.component';
import { RangeValueComponent } from '../range-value/range-value.component';
import { CommonModule } from '@angular/common';

type anyFilters = IMultiValueFilter | IRangeValueFilter;

@Component({
  selector: 'lib-filter-layout',
  standalone: true,
  imports: [
    CommonModule, MatListModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule,
    MultiValueCheckboxComponent, MultiValueChipComponent, RangeValueComponent
  ],
  templateUrl: './filter-layout.component.html',
  styleUrl: './filter-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterLayoutComponent implements OnChanges {
  @Input() filters: anyFilters[] = [];

  selectedFilter: anyFilters | undefined;
  selectedFilterIndex = -1;
  filterFunctions: { [key: number]: FilterFunction<any> } = {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
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
}
