import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { IFilterOption, IMultiValueFilter } from 'shop-folder-core';

@Component({
  selector: 'lib-multi-value-checkbox',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './multi-value-checkbox.component.html',
  styleUrl: './multi-value-checkbox.component.scss'
})
export class MultiValueCheckboxComponent implements OnInit {
  @Input() filter: IMultiValueFilter | undefined;
  @Output() onSelectionChange = new EventEmitter<IFilterOption[]>();

  async ngOnInit() {
    if (this.filter && this.filter.getOptions) {
      this.filter.options = await this.filter.getOptions();
    }
    this.applyIfAlreadySelected();
  }

  applyIfAlreadySelected() {
    if (!this.filter) return;

    if (this.filter.options.length === 0) this.filter.options = this.filter.selectedOptions;
    else {
      this.filter.options.forEach(o => {
        if (this.filter?.selectedOptions.some(so => so.value === o.value)) o.isSelected = true;
        else o.isSelected = false;
      });
    }
  }

  selectionChanged(options: any) {
    if (!this.filter) return;
    const selectedOptions: IFilterOption[] = options.selected.map((o: any) => o.value);
    this.onSelectionChange.emit(selectedOptions);
  }
}
