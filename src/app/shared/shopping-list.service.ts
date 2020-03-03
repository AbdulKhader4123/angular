import { Ingredients } from './Ingredients.model';
import { EventEmitter } from '@angular/core';

export class ShoppingService{
  ingredients:Ingredients[]=[]

  shoppingEvent= new EventEmitter<Ingredients[]>();
  getShoppingList(){
      return this.ingredients.slice();
  }
  AddIngredient(ingredient:Ingredients){
      this.ingredients.push(ingredient);
      this.shoppingEvent.emit(this.ingredients.slice());
  }
  AddIngredientsToShoppingList(Ingredients:Ingredients[]){
    this.ingredients.push(...Ingredients)
  }
}