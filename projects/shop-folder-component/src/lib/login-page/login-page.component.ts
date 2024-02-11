import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SimCard } from '@jonz94/capacitor-sim';
import { Subject } from 'rxjs';
import { CapacitorManagerService, UserService } from 'shop-folder-core';
import { ShopFolderLoggerService } from 'shop-folder-logger';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'lib-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatListModule]
})
export class LoginPageComponent implements OnInit {
  @Input() className = 'login-page-default-container';
  @Input() logoURL: string | undefined;
  @Input() logoText: string | undefined;
  @Input() showContinueWithoutLogin = true;
  @Input() phoneEmailSubmitResponse: Subject<any> | undefined;
  @Output() onPhoneEmailSubmit = new EventEmitter<string>();
  @Output() onOTPSubmit = new EventEmitter<string>();
  @Output() onContinueClick = new EventEmitter<void>();

  isOTPSent = false;
  isFirstFocus = true;
  phone = new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  otp = new FormControl<string>('', Validators.required);
  @ViewChild('simOptions') simOptions!: TemplateRef<any>;

  constructor(
    private shopFolderLoggerService: ShopFolderLoggerService,
    private capacitorManagerService: CapacitorManagerService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.phoneEmailSubmitResponse?.subscribe({
      next: res => res ? this.isOTPSent = true : null,
      error: err => this.shopFolderLoggerService.logError(err)
    })
  }

  handlePhoneEmailSubmit() {
    if (!this.phone.value) return;

    this.onPhoneEmailSubmit.emit(this.phone.value);
  }

  handleOTPSubmit() {
    if (!this.otp.value) return;

    this.onOTPSubmit.emit(this.otp.value);
  }

  handleOnFocus() {
    console.log(this.isFirstFocus)
    if (!this.isFirstFocus) return;

    this.isFirstFocus = false;
    this.capacitorManagerService.getPhoneSims()
      .then(simCardResult => {
        this.handleSimSelections(simCardResult.simCards);
      })
      .catch(err => this.shopFolderLoggerService.logError(err));
  }

  handleSimSelections(simsCards: SimCard[]) {
    const ref = this.dialog.open(this.simOptions, {
      width: '80%',
      data: { simsCards }
    });
    ref.afterClosed().subscribe(result => {

    });
  }
}
