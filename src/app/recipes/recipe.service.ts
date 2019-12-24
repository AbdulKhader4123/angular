import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/Ingredients.model';

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();
   private  recipes :Recipe[]=[
        new Recipe('Burger','This is an Awesome recipe','https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/165384.jpg',
        [new Ingredients('Bun',2),new Ingredients('meat',1),new Ingredients('salads',2)])
      ,
      new Recipe('French Fries','This is an Awesome recipe','https://assets3.thrillist.com/v1/image/2831330/size/gn-gift_guide_variable_c.jpg',
      [new Ingredients('potatoes',2),new Ingredients('ketchup',1),new Ingredients('seasoning',2)]
      )
      
      ];

      getRecipes(){
          return this.recipes.slice();
      }
}