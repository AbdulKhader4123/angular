import { Component, OnInit } from '@angular/core';
import{Ingredients} from '../shared/Ingredients.model';
import { ShoppingService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  constructor(private shoppingService: ShoppingService) { }
  ingredients:Ingredients[];

  ngOnInit() {
  this.ingredients=this.shoppingService.getShoppingList();
  this.shoppingService.shoppingEvent
  .subscribe(
    (ingredientsArray:Ingredients[])=>{
this.ingredients=ingredientsArray;
    }
  )

  }

//   AddIngredients(ingredient:Ingredients){
// this.ingredients.push(ingredient);
  // }
}
