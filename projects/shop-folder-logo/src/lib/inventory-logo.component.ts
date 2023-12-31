import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-inventory-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
    [attr.height]="height" [attr.width]="width" 
    [ngClass]="'bg-' + this.colorTheme + '-logo text-' + colorTheme + '-logo fill-' + colorTheme + '-logo'">
    
    <path d="m460.896 398.656v-189.896h-48.274v-189.895h-219.896v189.895h-141.622v189.896h-51.104v94.479h512v-94.479zm-30-159.896v159.896h-159.896v-159.896h33.053v65.555h93.79v-65.555zm-96.843 0h33.79v35.555h-33.79zm-48.275-189.895h33.79v35.555h-33.79zm-63.052 0h33.053v65.556h93.79v-65.556h33.053v159.895h-159.896zm-78.569 189.895h33.79v35.555h-33.79zm-63.053 0h33.053v65.555h93.79v-65.555h33.053v159.896h-159.896zm400.896 224.375h-452v-34.479h452z"></path>
    
    </svg>
  `,
  styles: ``
})
export class InventoryLogoComponent {
  @Input() colorTheme = '';
  @Input() height = '20px';
  @Input() width = '20px';
}
