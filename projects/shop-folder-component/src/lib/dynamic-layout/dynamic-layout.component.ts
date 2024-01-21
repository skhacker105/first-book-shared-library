import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageLayoutComponent } from '../page-layout/page-layout.component';
import { SwipeDirective } from 'shop-folder-directive';

@Component({
  selector: 'lib-dynamic-layout',
  standalone: true,
  imports: [PageLayoutComponent, SwipeDirective],
  templateUrl: './dynamic-layout.component.html',
  styleUrl: './dynamic-layout.component.scss'
})
export class DynamicLayoutComponent {
  @Input() title = '';
  @Input() backURL = '';
  @Input() hideSearch = false;
  @Output() selectModeChange = new EventEmitter<boolean>();

  selectMode = false;

  handleSwipe(direction: number) {
    this.selectMode = direction < 0 ? true : false;
    this.selectModeChange.emit(this.selectMode);
  }
}
