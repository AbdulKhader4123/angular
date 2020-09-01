import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Product } from '../recipes/products.model';
import { Address } from './address';

@Injectable({
  providedIn: 'root'
})

export class OrderService{
constructor(private http:HttpClient,private authService:AuthenticationService){ }
constants={
  order_success:"Placed order successfully",
  order_Failed:"Unable to place order",
  orders_not_found:"No Orders found",
}
placeOrder(products:Product[],addressObj:Address,amountObj){
return this.http.post("/api/products/order/placeOrder",{products:products,addressObj:addressObj,amountObj:amountObj,email:localStorage.getItem("email")})
}
getOrders(){
  return this.http.post("/api/products/order/getOrders",{email:localStorage.getItem("email")})
  }
}