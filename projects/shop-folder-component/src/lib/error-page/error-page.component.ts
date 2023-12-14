import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
  @Input() errorCode: string | undefined;
  @Input() errorMessage = 'Error';
}
