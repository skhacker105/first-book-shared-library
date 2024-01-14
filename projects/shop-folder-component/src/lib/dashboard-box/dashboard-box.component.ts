import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ExpandCollapseAnimation } from 'shop-folder-core';

@Component({
  selector: 'lib-dashboard-box',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule],
  templateUrl: './dashboard-box.component.html',
  styleUrl: './dashboard-box.component.scss',
  animations: [ExpandCollapseAnimation]
})
export class DashboardBoxComponent {
  @Input() title = '';
  @Input() badge = '';
  @Input() isExpanded = false;
  @Input() colorTheme = 'default'


  getClasses(container: string) {
    return `bg-${this.colorTheme}-${container} text-${this.colorTheme}-${container} ${(this.isExpanded ? ' expanded' : '')}`;
  }

  getTitleBorder() {
    return ` border-b-${this.colorTheme}-title`;
  }
}
