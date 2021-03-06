import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Product } from '../recipes/products.model';
import { Address } from './address';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})

export class OrderService{
constructor(private http:HttpClient,private authService:AuthenticationService){ }
selectedOrder:Order;
Orders:Order[]=[];

constants={
  order_success:"Placed order successfully",
  order_Failed:"Unable to place order",
  orders_not_found:"No Orders found",
  order_not_found:"Order not found",

}
placeOrder(products:Product[],addressObj:Address,amountObj){
  this.Orders=[]
return this.http.post("/api/products/order/placeOrder",{products:products,addressObj:addressObj,amountObj:amountObj,email:localStorage.getItem("email")})
}
getOrders(){
return this.http.post("/api/products/order/getOrders",{email:localStorage.getItem("email")})
}
getOrder(orderId:number){
  return this.http.post("/api/products/order/getOrder",{orderId:orderId})
  }
}