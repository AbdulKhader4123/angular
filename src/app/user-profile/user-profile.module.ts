import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


import { UserProfileComponent } from './user-profile.component';


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
