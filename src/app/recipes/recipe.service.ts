import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();
   private  recipes :Recipe[]=[
        new Recipe('A test Recipe','This is an Awesome recipe','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQoGEyxJ-53jIS2PZMCdfwECFja0ZCYFnrgZlfecyeeSqNybazb')
      ,
      new Recipe(' Recipe','This is an Awesome recipe','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQoGEyxJ-53jIS2PZMCdfwECFja0ZCYFnrgZlfecyeeSqNybazb')
      
      ];

      getRecipes(){
          return this.recipes.slice();
      }
}