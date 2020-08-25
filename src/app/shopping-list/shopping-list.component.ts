import { Component, OnInit, HostBinding } from '@angular/core';
import{Ingredients} from '../shared/Ingredients.model';
import { ShoppingService } from '../shared/shopping-list.service';
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
UserLoggedIn=false;
ngOnInit() {
this.obs=this._authService.currentCartProducts.subscribe(()=>{
  if (this._authService.isLoggedIn()){
    this.UserLoggedIn =true;
  }
  else{
    this.UserLoggedIn =false;
  }
})
if (this._authService.isLoggedIn()||(localStorage.getItem("CartProducts")!=null && localStorage.getItem("CartProducts")!="[]")) {
  this.UserLoggedIn=true;

}
else{
  this.UserLoggedIn=false;
}
}

showErrorMsg() {
this.UserLoggedIn = true;
}
hideErrorMsg() {
this.UserLoggedIn = true;
}
ngOnDestroy(){
  this.obs.unsubscribe();
}
}
