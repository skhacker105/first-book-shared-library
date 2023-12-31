import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-contact-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 35" 
  [attr.height]="height" [attr.width]="width" 
  [ngClass]="'bg-' + this.colorTheme + '-logo text-' + colorTheme + '-logo fill-' + colorTheme + '-logo'" id="contacts">

  <path d="M26 0H2a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 2h4v28H2V2zm24 28H8V2h18v28zM13.862 10.734a3.028 3.028 1080 1 0 6.056 0 3.028 3.028 1080 1 0-6.056 0zm3.09 4.238c-2.734 0-4.952 2.974-4.952 6.642s9.906 3.668 9.906 0-2.218-6.642-4.954-6.642zM30 2h2v6h-2zm0 8h2v6h-2zm0 8h2v6h-2z"></path></svg>
  `,
  styles: ``
})
export class ContactLogoComponent {
  @Input() colorTheme = '';
  @Input() height = '20px';
  @Input() width = '20px';
}
