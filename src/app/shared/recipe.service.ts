import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../recipes/products.model';
import { ShoppingService } from './shopping-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

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
constructor(private http:HttpClient){ }

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
            var counter=0;
            this.CartProductArray= localStorage.getItem("CartProducts")!=null?JSON.parse(localStorage.getItem("CartProducts")):[];
            this.CartProductArray.forEach(Product=>{

if(Product.productId==product.productId){
     return counter=1;
}
  }  )
  if(counter==0){
        this.CartProductArray.push(product)
        localStorage.setItem("CartProducts",JSON.stringify(this.CartProductArray));
  }
      }
}