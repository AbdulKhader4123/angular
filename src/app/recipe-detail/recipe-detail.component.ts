import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../recipes/products.model';
import { RecipeService } from '../shared/recipe.service';
import {ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

//  @Input() product:Product
@Input() product:Product;
prodarr:Product[];
prodDetails:string[]=[];
 prodId :number;
 isLoaded =false;
  constructor(private recipeService: RecipeService,private route: ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit() {
    // debugger;
//  this.recipeService.productSelected.subscribe(
//       (product:Product)=>{
//         this.product=product;
//         console.log(this.product)
//       }
//     )
this.isLoaded =false;
    this.route.queryParams.subscribe(params => {
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
                // console.log(key + '|' + value)
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
// this.product.imagePath=res[6];
// this.product.description=res["description"]
// this.product.name=res["title"]
//         this.product.discount= res["discount"];
//         this.product.price=res["price"];
this.isLoaded =true;
        })
  }

  });
  
  }
  AddToShoppingList(){
 this.recipeService.AddToCart(this.product);
 this.toastr.success('Product added to cart',"",{timeOut: 3000});
  }
}
