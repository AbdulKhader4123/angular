import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { RegstrLognRoutingModule } from './regstr-logn-routing.module';

import { RegisterComponent } from '../register/register.component';
// import { LoginComponent } from '../login/login.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ShowHidePasswordModule,
    RegstrLognRoutingModule
  ]
})
export class RegstrLognModule { }
