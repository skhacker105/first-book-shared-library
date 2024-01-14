import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-packing-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
    [attr.height]="height" [attr.width]="width" 
    [ngClass]="'bg-' + this.colorTheme + '-logo text-' + colorTheme + '-logo fill-' + colorTheme + '-logo'">
    
    <g id="Outline"><path d="m448 480v-128h40a8 8 0 0 0 6.4-12.8l-48-64a8 8 0 0 0 -6.4-3.2h-368a8 8 0 0 0 -6.4 3.2l-48 64a8 8 0 0 0 6.4 12.8h40v128h-48v16h480v-16zm-16 0h-224v-176l33.6 44.8a8 8 0 0 0 6.4 3.2h184zm4-192 36 48h-220l-36-48zm-360 0h108l-36 48h-108zm4 64h72a8 8 0 0 0 6.4-3.2l33.6-44.8v176h-112z"/><path d="m400 448h16v16h-16z"/><path d="m368 448h16v16h-16z"/><path d="m194.793 206.074 56 48a8 8 0 0 0 10.414 0l56-48a8 8 0 0 0 2.793-6.074v-24a8 8 0 0 0 -8-8h-24v-120h-16v128a8 8 0 0 0 8 8h24v12.32l-48 41.144-48-41.144v-12.32h24a8 8 0 0 0 8-8v-128h-16v120h-24a8 8 0 0 0 -8 8v24a8 8 0 0 0 2.793 6.074z"/><path d="m224 16h16v16h-16z"/><path d="m272 16h16v16h-16z"/><path d="m338.793 206.074 56 48a8 8 0 0 0 10.414 0l56-48a8 8 0 0 0 2.793-6.074v-24a8 8 0 0 0 -8-8h-24v-120h-16v128a8 8 0 0 0 8 8h24v12.32l-48 41.144-48-41.144v-12.32h24a8 8 0 0 0 8-8v-128h-16v120h-24a8 8 0 0 0 -8 8v24a8 8 0 0 0 2.793 6.074z"/><path d="m368 16h16v16h-16z"/><path d="m416 16h16v16h-16z"/><path d="m50.793 206.074 56 48a8 8 0 0 0 10.414 0l56-48a8 8 0 0 0 2.793-6.074v-24a8 8 0 0 0 -8-8h-24v-120h-16v128a8 8 0 0 0 8 8h24v12.32l-48 41.144-48-41.144v-12.32h24a8 8 0 0 0 8-8v-128h-16v120h-24a8 8 0 0 0 -8 8v24a8 8 0 0 0 2.793 6.074z"/><path d="m128 16h16v16h-16z"/><path d="m80 16h16v16h-16z"/></g>
    
    </svg>
  `,
  styles: ``
})
export class PackingLogoComponent {
  @Input() colorTheme = '';
  @Input() height = '20px';
  @Input() width = '20px';
}
