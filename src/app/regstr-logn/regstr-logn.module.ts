import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { RegstrLognRoutingModule } from './regstr-logn-routing.module';

import { RegisterComponent } from '../register/register.component';
// import { LoginComponent } from '../login/login.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RegstrLognRoutingModule
  ]
})
export class RegstrLognModule { }
