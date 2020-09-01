import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';


import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingItemComponent } from '../shopping-list/shopping-item/shopping-item.component';
import { LoginModule } from '../login/login.module';
import { OrderComponent } from '../order/order.component';
import { ViewOrderComponent } from '../order/view-order/view-order.component';
import { DatePipe } from '../date.pipe';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingItemComponent,
    OrderComponent,
    ViewOrderComponent,
    DatePipe,

  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    //loginmodule has to be last otherwise,it will redirect its route
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CartModule { }
