import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';

import {LoginComponent} from './login.component'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ShowHidePasswordModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
