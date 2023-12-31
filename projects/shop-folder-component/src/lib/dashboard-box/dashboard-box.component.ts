import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-dashboard-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-box.component.html',
  styleUrl: './dashboard-box.component.scss'
})
export class DashboardBoxComponent {
  @Input() title = '';
  @Input() colorTheme = 'default'

  getClasses(container: string) {
    return `bg-${this.colorTheme}-${container} text-${this.colorTheme}-${container}`;
  }
}
