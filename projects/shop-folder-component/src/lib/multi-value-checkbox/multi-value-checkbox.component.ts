import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FilterFunction, IFilterOptions, IMultiValueFilter } from 'shop-folder-core';

@Component({
  selector: 'lib-multi-value-checkbox',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './multi-value-checkbox.component.html',
  styleUrl: './multi-value-checkbox.component.scss'
})
export class MultiValueCheckboxComponent implements OnInit {
  @Input() filter: IMultiValueFilter | undefined;
  @Output() onSelectionChange = new EventEmitter<FilterFunction<any>>();

  async ngOnInit() {
    if (this.filter && this.filter.getOptions) {
      this.filter.options = await this.filter.getOptions();
    }
  }

  selectionChanged(options: any) {
    if (!this.filter || !this.filter.createFilterFunction) return;
    const selectedOptions: IFilterOptions[] = options.selected.map((o: any) => o.value);
    this.onSelectionChange.emit(this.filter.createFilterFunction(selectedOptions));
  }
}
