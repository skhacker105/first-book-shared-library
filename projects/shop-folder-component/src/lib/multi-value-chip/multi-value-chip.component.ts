import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterFunction, IFilterOptions, IMultiValueFilter } from 'shop-folder-core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-multi-value-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './multi-value-chip.component.html',
  styleUrl: './multi-value-chip.component.scss'
})
export class MultiValueChipComponent implements OnInit {
  @Input() filter: IMultiValueFilter | undefined;
  @Output() onSelectionChange = new EventEmitter<FilterFunction<any>>();

  async ngOnInit() {
    if (this.filter && this.filter.getOptions) {
      this.filter.options = await this.filter.getOptions();
    }
  }

  onValueChange(changeValue: MatChipListboxChange) {
    if (!this.filter || !this.filter.createFilterFunction) return;

    const selectedOptions: IFilterOptions[] = changeValue.value;
    this.onSelectionChange.emit(this.filter.createFilterFunction(selectedOptions));
  }
}
