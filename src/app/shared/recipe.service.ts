import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../recipes/products.model';
import { ShoppingService } from './shopping-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RecipeService{
product:Product[]=[];
CartProduct:Product[]=[]
CartProductString:string=""
CartProductArray:Product[]=[]

productSelected = new EventEmitter<Product>();

      constructor(private shoppingService:ShoppingService,private http:HttpClient){

      }

      getProducts(){
          console.log(this.product.length)

          if(this.product.length==0 ){

                //   return this.recipes.slice();
                this.http.get("/api/products/getProducts",
                {
                   headers: new HttpHeaders().set('Content-Type', 'application/json'),
                   responseType: 'text' 
                }).subscribe((res) => {
console.log(res)
                  //     for (var i in res) {
                  //       //      console.log(res[i])
                  //           let prod = new Product(res[i]);
                  //           this.product.push(prod)
                  //     }
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

      AddToCart(product:Product){
      //     localStorage.removeItem("CartProducts")
      console.log(product.productId)
            var counter=0;
            this.CartProductArray= localStorage.getItem("CartProducts")!=null?JSON.parse(localStorage.getItem("CartProducts")):[];
            
            this.CartProductArray.forEach(Product=>{

if(Product.productId==product.productId){
      console.log(Product.productId+"localstorage")
      console.log(product.productId+"selected")

      console.log("id exists")
     return counter=1;
}
  }  )

  if(counter==0){
        this.CartProductArray.push(product)
        localStorage.setItem("CartProducts",JSON.stringify(this.CartProductArray));
  }
            // this.CartProductString= localStorage.getItem("CartProducts")!=null?localStorage.getItem("CartProducts"):""|"";
            // if (this.CartProductString.indexOf("|"+Product.productId.toString()+"|")<0){
            //       console.log("dsd")
            //       this.CartProductString+=Product.productId.toString()+"|";
            //       localStorage.setItem("CartProducts", this.CartProductString);
            // }
        
            console.log(this.CartProductArray)
      }
}