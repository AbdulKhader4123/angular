import { Component, OnInit, Input } from '@angular/core';
import { Product } from './products.model';
import { AuthenticationService } from '../shared/authentication.service';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'], 
  providers:[]
})
export class RecipesComponent implements OnInit {
  selectedProduct:Product;

  constructor(private recipeService:RecipeService,private authService: AuthenticationService) { }
  ngOnInit() {
    // this.recipeService.productSelected.subscribe(
    //   (product:Product)=>{
    //     this.selectedProduct=product;
    //     console.log(this.selectedProduct)
    //   }
    // )
    //to return from detail component to home page
    // this.authService.featureSelected.subscribe(()=>{
    //   this.selectedProduct=null;
    // })
  }

}
