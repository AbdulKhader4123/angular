import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../recipes/products.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
      providedIn: 'root'
    })
export class RecipeService{
product:Product[]=[];
AllProductString:Object[]=[];
Kurtiproduct:Product[]=[];
kurtiDone=false
sareeDone=false
sareeProduct:Product[]=[];
CartProduct:Product[]=[]
CartProductString:string=""
CartProductArray:Product[]=[]
//baseUrl: string = environment.backend.baseURL;
productSelected = new EventEmitter<Product>();
selectedCat;
check;
constants={
      cart_success:"Product updated successfully",
      cart_delete_success:"Product removed from cart successfully",
      cart_delete_failed:"Unable to remove from cart",
      cart_add_success:"Product added to cart",
      cart_add_failed:"Unable to add to cart",
      cartupdateInd:'U',
     
}
constructor(private http:HttpClient,private authService:AuthenticationService){ }

getProducts(){
      if(this.AllProductString.length!=0){
               // this.http.get(`${this.baseUrl}`+"/api/products/
               this.http.get("/api/products/getProducts").subscribe((res) => {
                      for (var i in res) {
                            this.AllProductString.push(res[i])
                      }
      return  this.AllProductString

      }
);
}
else{
      return this.AllProductString
}
   }
   getFilteredProducts(productType:string,id:string){
      if(this.check){
            return this.http.post("/api/products/getFilteredProducts",{category:productType,last_id:id,mobile:true})
      }
      return this.http.post("/api/products/getFilteredProducts",{category:productType,last_id:id})
     }
        
getProduct(id:number){
             return this.http.post("/api/products/getProduct",{Id:id})
            }

AddToCart(product:Product){
      if(product.quantity==0){
            product.quantity+=1;
      }
  if (this.authService.isLoggedIn()){
      return this.http.post("/api/products/cart/addProductToCart",{productId:product.productId,email:localStorage.getItem("email"),quantity:'ToCart'})
  }
else{
      var counter=0;
      this.CartProductArray= localStorage.getItem("CartProducts")!=null?JSON.parse(localStorage.getItem("CartProducts")):[];
      this.CartProductArray.every((Product)=>{
            if(Product.productId==product.productId){
                  Product.quantity= Product.quantity+1;
                   counter=1;
                   return false
            }
            return true
      })
      if(counter==0){
            this.CartProductArray.push(product)
      }
      else{

      }
      localStorage.setItem("CartProducts",JSON.stringify(this.CartProductArray));
    
}

}
UpdateManyCart(products:Array<Product>,indicator:string){
          return this.http.post("/api/products/cart/updateProductsCart",{products:products,email:localStorage.getItem("email"),indicator:indicator})
    }
UpdateCart(product:Product){
     
  if (this.authService.isLoggedIn()){
      return this.http.post("/api/products/cart/addProductToCart",{productId:product.productId,email:localStorage.getItem("email"),quantity:product.quantity})
  }
else{
      this.CartProductArray= localStorage.getItem("CartProducts")!=null?JSON.parse(localStorage.getItem("CartProducts")):[];
      this.CartProductArray.every((Product)=>{
            if(Product.productId==product.productId){
                  Product.quantity= product.quantity;
                   return false
            }
            return true
      })
      localStorage.setItem("CartProducts",JSON.stringify(this.CartProductArray));
      return of({});
}

}
DeleteCart(productId:number){
return this.http.post("/api/products/cart/deleteProductFromCart",{productId:productId,email:localStorage.getItem("email")})
}

getCartProducts(){
      return this.http.post("/api/products/cart/getCartProducts",{email:localStorage.getItem("email")})
}
 
}