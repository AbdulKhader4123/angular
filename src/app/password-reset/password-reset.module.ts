import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { PasswordResetComponent } from './password-reset.component';


@NgModule({
  declarations: [PasswordResetComponent],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PasswordResetModule { }
