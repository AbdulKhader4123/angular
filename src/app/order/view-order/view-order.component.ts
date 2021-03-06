import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/recipes/products.model';
import { OrderService } from 'src/app/shared/order.service';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
 orders:Order[]
  constructor(private orderService:OrderService) { }

  ngOnInit() {
    if(this.orderService.Orders.length==0){
      this.orderService.getOrders().subscribe((res:any)=>{
        if(res!=this.orderService.constants.orders_not_found){
          this.orders=res;
          this.orders.reverse()
          this.orderService.Orders=this.orders;
        }
    })
    }
    else{
      this.orders=this.orderService.Orders;
    }
   
  }

}
