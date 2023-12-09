import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ShopFolderLoggerService } from 'shop-folder-logger';

@Component({
  selector: 'lib-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  @Input() className = 'login-page-default-container';
  @Input() phoneEmailSubmitResponse: Subject<any> | undefined;
  @Output() onPhoneEmailSubmit = new EventEmitter<string>();
  @Output() onOTPSubmit = new EventEmitter<string>();

  isOTPSent = false;
  phoneemail = new FormControl<string>('', Validators.required);
  otp = new FormControl<string>('', Validators.required);

  constructor(private shopFolderLoggerService: ShopFolderLoggerService) { }

  ngOnInit(): void {
    this.phoneEmailSubmitResponse?.subscribe({
      next: res => res ? this.isOTPSent = true : null,
      error: err => this.shopFolderLoggerService.logError(err)
    })
  }

  handlePhoneEmailSubmit() {
    if (!this.phoneemail.value) return;

    this.onPhoneEmailSubmit.emit(this.phoneemail.value);
  }

  handleOTPSubmit() {
    if (!this.otp.value) return;

    this.onOTPSubmit.emit(this.otp.value);
  }
}
