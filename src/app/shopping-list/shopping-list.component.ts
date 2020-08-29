import { Component, OnInit, HostBinding } from '@angular/core';
import{Ingredients} from '../shared/Ingredients.model';

import { AuthenticationService } from '../shared/authentication.service';
import { Subscription } from 'rxjs';
@Component({
selector: 'app-shopping-list',
templateUrl: './shopping-list.component.html',
styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

constructor(private _authService:AuthenticationService) {}
obs:Subscription
ingredients:Ingredients[];
showLogIn=false;
ngOnInit() {
this.obs=this._authService.currentCartProducts.subscribe(()=>{
  if (this._authService.isLoggedIn()){
    this.showLogIn =true;
  }
  else{
    this.showLogIn =false;
  }
})
if (this._authService.isLoggedIn()||(localStorage.getItem("CartProducts")!=null && localStorage.getItem("CartProducts")!="[]")) {
  this.showLogIn=true;

}
else{
  this.showLogIn=false;
}
}

showErrorMsg() {
this.showLogIn = true;
}
hideErrorMsg() {
this.showLogIn = true;
}
ngOnDestroy(){
  this.obs.unsubscribe();
}
}
