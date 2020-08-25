import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../recipes/products.model';
import { RecipeService } from '../shared/recipe.service';
import {ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

@Input() product:Product;
prodarr:Product[];
prodDetails:string[]=[];
prodId :number;
isLoaded =false;
obs:Subscription;
constructor(private recipeService: RecipeService,private route: ActivatedRoute,private toastr:ToastrService) { }

ngOnInit() {
this.isLoaded =false;
   this.obs= this.route.queryParams.subscribe(params => {
      // debugger;
     this.prodId =Number(this.route.snapshot.paramMap.get('id'));
    //  console.log(this.prodId);
     this.prodarr=this.recipeService.product;
    //  console.log(this.prodarr)
     if(this.prodarr.length>0){
      for (var i=0; i < this.prodarr.length; i++) {
        if (this.prodarr[i].productId === this.prodId ) {
            this.product= this.prodarr[i];
            for (let [key, value] of Object.entries(this.product.productDetails)) {
              if(value!=""){
                this.prodDetails.push(key + '|' + value)
              }
           }
      this.isLoaded =true;
     }
      }
  }
  else{
        this.recipeService.getProduct(this.prodId).subscribe((res)=>{
          // debugger;
          
     this.product= new Product(res);
     for (let [key, value] of Object.entries(this.product.productDetails)) {
       if(value!=""){
         this.prodDetails.push(key + '|' + value)
       }
    }
this.isLoaded =true;
        })
  }

  });
  
  }
AddToShoppingList(){
this.recipeService.AddToCart(this.product);
this.toastr.success('Product added to cart',"",{timeOut: 3000});
}
ngOnDestroy(){
this.obs.unsubscribe();
}
}