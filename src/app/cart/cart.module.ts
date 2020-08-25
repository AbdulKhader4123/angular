import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';


import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingItemComponent } from '../shopping-list/shopping-item/shopping-item.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingItemComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    //loginmodule has to be last otherwise,it will redirect its route
    LoginModule,

  ]
})
export class CartModule { }