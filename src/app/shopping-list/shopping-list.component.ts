import { Component, OnInit, HostBinding } from '@angular/core';
import{Ingredients} from '../shared/Ingredients.model';
import { ShoppingService } from '../shared/shopping-list.service';
import { AuthenticationService } from '../shared/authentication.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  constructor(private shoppingService: ShoppingService ,private _authService:AuthenticationService) {
    // this._authService.featureSelected.subscribe((feature : string)=>{
    //   console.log("458")
    // })
   }
  ingredients:Ingredients[];
UserLoggedIn=false;
  ngOnInit() {
    this._authService.currentCartProducts.subscribe(()=>{
      this.UserLoggedIn =false;
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
  
//   AddIngredients(ingredient:Ingredients){
// this.ingredients.push(ingredient);
  // }
}
