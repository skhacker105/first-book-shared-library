import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginPageComponent, PageLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [LoginPageComponent, PageLayoutComponent]
})
export class ShopFolderComponentModule { }
