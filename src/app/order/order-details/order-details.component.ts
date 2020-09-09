import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private orderService:OrderService ,private route: ActivatedRoute,private router:Router) { }
  OrderId;
  order:Order;
  obs:Subscription
  userName;
  Address;
  phone;
  ngOnInit() {
    this.obs= this.route.queryParams.subscribe(params => {
     this.OrderId =Number(this.route.snapshot.paramMap.get('id'));
    })
    this.orderService.getOrder(this.OrderId).subscribe((res:any)=>{
      if(res!=this.orderService.constants.order_not_found){
        this.order=res[0];
        this.orderService.selectedOrder=this.order;
        this.init()
      }
  })
  }
  init(){
    let orderObj:Order=this.orderService.selectedOrder;
    this.userName=orderObj.name;
    this.Address=orderObj.address+","+orderObj.city+","+orderObj.state+"-"+orderObj.pincode;
    this.phone=orderObj.phone;
  }
ngOnDestroy(){
  this.obs.unsubscribe();
  }
}