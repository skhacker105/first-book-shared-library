import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-return-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
    [attr.height]="height" [attr.width]="width" 
    [ngClass]="'bg-' + this.colorTheme + '-logo text-' + colorTheme + '-logo fill-' + colorTheme + '-logo'">
    
    <g><g><path d="M317.959,115.859H210.158V58.365h-44.864L0,223.66l165.294,165.294h44.864V331.46h136.548 c67.367,0,122.174,54.807,122.174,122.174H512V309.9C512,202.905,424.953,115.859,317.959,115.859z M468.88,342.412 c-30.253-33.206-73.82-54.071-122.174-54.071H167.038v41.378L60.981,223.661l106.057-106.057v41.375h150.921 c83.219,0,150.921,67.703,150.921,150.921V342.412z"/></g></g>
    
    </svg>
  `,
  styles: ``
})
export class ReturnLogoComponent {
  @Input() colorTheme = '';
  @Input() height = '20px';
  @Input() width = '20px';
}
