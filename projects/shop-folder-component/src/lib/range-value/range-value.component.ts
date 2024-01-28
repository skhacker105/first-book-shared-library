import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IRangeValueFilter } from 'shop-folder-core';

@Component({
  selector: 'lib-range-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './range-value.component.html',
  styleUrl: './range-value.component.scss'
})
export class RangeValueComponent implements OnInit {
  @Input() filter: IRangeValueFilter | undefined;

  async ngOnInit() {
    if (this.filter && this.filter.getRange) {
      const range = await this.filter.getRange();
      this.filter.minValue = range.minValue;
      this.filter.maxValue = range.maxValue;
    }
  }
}
