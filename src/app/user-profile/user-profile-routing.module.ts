import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { ViewOrderComponent } from '../order/view-order/view-order.component';
import { OrderDetailsComponent } from '../order/order-details/order-details.component';


const routes: Routes = [
    { path: '', component: UserProfileComponent},
   { path: 'home_orders', component: ViewOrderComponent},
   { path: 'order_details/:id', component:OrderDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
