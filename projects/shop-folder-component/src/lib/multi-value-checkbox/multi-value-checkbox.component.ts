import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { IFilterOption, IMultiValueFilter } from 'shop-folder-core';

@Component({
  selector: 'lib-multi-value-checkbox',
  standalone: true,
  imports: [CommonModule, MatListModule, FormsModule],
  templateUrl: './multi-value-checkbox.component.html',
  styleUrl: './multi-value-checkbox.component.scss'
})
export class MultiValueCheckboxComponent implements OnInit {
  @Input() filter: IMultiValueFilter | undefined;
  @Output() onSelectionChange = new EventEmitter<IFilterOption[]>();

  isDataReady = false;

  async ngOnInit() {
    if (this.filter && this.filter.getOptions) {
      this.filter.options = await this.filter.getOptions();
    }
    this.applyIfAlreadySelected();
  }

  compareFunction = (o1: any, o2: any) => o1.value === o2.value;

  applyIfAlreadySelected() {
    if (!this.filter) {
      this.isDataReady = true;
      return;
    }

    if (this.filter.options.length === 0) this.filter.options = this.filter.selectedOptions;
    else {
      this.filter.options.forEach(o => {
        if (this.filter?.selectedOptions.some(so => so.value === o.value)) o.isSelected = true;
        else o.isSelected = false;
      });
    }
    this.isDataReady = true;
  }

  selectionChanged(options: MatSelectionListChange) {
    if (!this.filter) return;

    const selectedOptions: IFilterOption[] = options.options.map((o: any) => o.value);
    this.onSelectionChange.emit(selectedOptions);
  }
}
