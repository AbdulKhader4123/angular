import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../products.model';
import { RecipeService } from '../../../shared/recipe.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-recipe-item',
templateUrl: './recipe-item.component.html',
styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

@Input()  product:Product;

constructor(private recipeService: RecipeService,private route:Router) { }

productSelected(){
this.recipeService.productSelected.emit(this.product);
this.route.navigate(['/product',this.product.productId])
}
ngOnInit() {
}

}
