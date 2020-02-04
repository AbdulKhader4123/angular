import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../recipes/products.model';
import { Ingredients } from './Ingredients.model';
import { ShoppingService } from './shopping-list.service';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable()
export class RecipeService{
product:Product[]=[];
productSelected = new EventEmitter<Product>();

      constructor(private shoppingService:ShoppingService,private http:HttpClient){

      }

      getProducts(){
          console.log(this.product.length)

          if(this.product.length==0 ){

                //   return this.recipes.slice();
                this.http.get("/api/products/getProducts").subscribe((res) => {

                      for (var i in res) {
                            // console.log(res[i])
                            let prod = new Product(res[i]);
                            this.product.push(prod)
                      }
});
return  this.product;
}
else{
      console.log("this.product")

      return  this.product;
}
          }
        
 getProduct(id:number){
             return this.http.post("/api/products/getProduct",{Id:id})
            }

      AddToShoppingService(Ingredients:Ingredients[]){
this.shoppingService.AddIngredientsToShoppingList(Ingredients);
      }
}