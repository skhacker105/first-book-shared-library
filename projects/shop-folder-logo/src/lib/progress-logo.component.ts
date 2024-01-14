import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-progress-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512 " 
    [attr.height]="height" [attr.width]="width" 
    [ngClass]="'bg-' + this.colorTheme + '-logo text-' + colorTheme + '-logo fill-' + colorTheme + '-logo'">
    
    <path d="m0 136v240h512v-240zm482 210h-452v-180h452z"/><path d="m452 196h-392v120h392zm-241.333 30h30.333v60h-30.333zm-30 60h-30.334v-60h30.334zm-90.667-60h30.333v60h-30.333zm332 60h-151v-60h151z"/>
    
    </svg>
  `,
  styles: ``
})
export class ProgressLogoComponent {
  @Input() colorTheme = '';
  @Input() height = '20px';
  @Input() width = '20px';
}
