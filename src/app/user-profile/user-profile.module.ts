import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { ViewOrderComponent } from '../order/view-order/view-order.component';
import { DatePipe } from '../date.pipe';
import { OrderDetailsComponent } from '../order/order-details/order-details.component';

@NgModule({
  declarations: [UserProfileComponent,
    ViewOrderComponent,
    DatePipe,
    OrderDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
