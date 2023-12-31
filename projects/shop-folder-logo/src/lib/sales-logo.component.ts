import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-sales-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" 
  [attr.height]="height" [attr.width]="width" 
  [ngClass]="'bg-' + this.colorTheme + '-logo text-' + colorTheme + '-logo fill-' + colorTheme + '-logo stroke-' + colorTheme + '-logo'">

  <g xmlns="http://www.w3.org/2000/svg">
	<polygon fill="none" stroke-width="2" stroke-miterlimit="10" points="21.903,5 55,38.097 34.097,59 1,25.903    1,5  "/>
	<polyline fill="none" stroke-width="2" stroke-miterlimit="10" points="29.903,5 63,38.097 42.097,59  "/>
	<circle fill="none" stroke-width="2" stroke-miterlimit="10" cx="14" cy="18" r="5"/>
</g>

    </svg>
  `,
  styles: ``
})
export class SalesLogoComponent {
  @Input() colorTheme = '';
  @Input() height = '20px';
  @Input() width = '20px';
}
