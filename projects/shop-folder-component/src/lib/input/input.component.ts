import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Optional } from 'ag-grid-community';
import { IInput } from 'shop-folder-core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  config: IInput;
  constructor(
    public dialogRef: MatDialogRef<InputComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IInput
  ) {
    this.config = {
      title: this.data && data.title ? data.title : 'Enter',
      label: this.data && this.data.label ? this.data.label : 'Your data here',
      placeHolder: this.getPlaceHolder(data.placeHolder),
      okDisplay: this.data && data.okDisplay ? data.okDisplay : 'OK',
      color: this.data && data.color ? data.color : '',
      value: this.data && data.value ? data.value : ''
    };
  }

  getPlaceHolder(p: string | null | undefined): string {
    return p ? p : '...'
  }
}
