import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilterOptions, IMultiValueFilter } from 'shop-folder-core';
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
  @Output() onSelectionChange = new EventEmitter<IFilterOptions[]>();

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

  onValueChange(changeValue: MatChipListboxChange) {
    if (!this.filter) return;

    const selectedOptions: IFilterOptions[] = changeValue.value;
    this.onSelectionChange.emit(selectedOptions);
  }
}
