import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IConfirmation } from 'shop-folder-core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-confirmation-dialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  config: IConfirmation;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IConfirmation
  ) {
    this.config = {
      title: this.data && data.title ? data.title : 'Confirm',
      message: this.data && data.message ? data.message : 'Are you sure ?',
      matIcon: this.data && data.matIcon ? data.matIcon : '',
      okDisplay: this.data && data.okDisplay ? data.okDisplay : 'OK',
      color: this.data && data.color ? data.color : ''
    };
  }
}
