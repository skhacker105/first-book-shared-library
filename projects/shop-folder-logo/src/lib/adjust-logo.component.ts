import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-adjust-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" 
    [attr.height]="height" [attr.width]="width" 
    [ngClass]="'bg-' + this.colorTheme + '-logo text-' + colorTheme + '-logo fill-' + colorTheme + '-logo'">
    
    <g id="_24_adjust" data-name="24 adjust"><path d="m19.857 20.515-3 5a1 1 0 0 1 -1.714 0l-3-5a1 1 0 1 1 1.714-1.03l1.143 1.905v-18.39a1 1 0 0 1 2 0v18.39l1.143-1.905a1 1 0 0 1 1.714 1.03zm10-5.03-3-5a1.04 1.04 0 0 0 -1.714 0l-3 5a1 1 0 1 0 1.714 1.03l1.143-1.905v14.39a1 1 0 0 0 2 0v-14.39l1.143 1.905a1 1 0 1 0 1.714-1.03zm-23-8a1.04 1.04 0 0 0 -1.714 0l-3 5a1 1 0 0 0 1.714 1.03l1.143-1.905v17.39a1 1 0 0 0 2 0v-17.39l1.143 1.905a1 1 0 0 0 1.714-1.03zm-.857-1.485a1 1 0 0 0 1-1v-2a1 1 0 0 0 -2 0v2a1 1 0 0 0 1 1zm10 21a1 1 0 0 0 -1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0 -1-1zm10-18a1 1 0 0 0 1-1v-5a1 1 0 0 0 -2 0v5a1 1 0 0 0 1 1z"/></g>
    
    </svg>
  `,
  styles: ``
})
export class AdjustLogoComponent {
  @Input() colorTheme = '';
  @Input() height = '20px';
  @Input() width = '20px';
}
