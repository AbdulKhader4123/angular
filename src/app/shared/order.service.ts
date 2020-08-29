import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService{
constructor(private http:HttpClient,private authService:AuthenticationService){ }

placeOrder(){
  return this.http.post("/api/products/order/placeOrder",{})
}
}