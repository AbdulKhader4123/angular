import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { PasswordResetComponent } from './password-reset.component';


@NgModule({
  declarations: [PasswordResetComponent],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    ShowHidePasswordModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PasswordResetModule { }
