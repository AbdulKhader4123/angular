import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component'
import { OrderComponent } from '../order/order.component';
import { ViewOrderComponent } from '../order/view-order/view-order.component';

const routes: Routes = [
   { path: '', component: ShoppingListComponent},
   { path: 'ReviewOrder', component: OrderComponent},
   { path: 'home_orders', component: ViewOrderComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
