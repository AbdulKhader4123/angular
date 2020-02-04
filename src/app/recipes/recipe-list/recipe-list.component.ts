import { Component, OnInit, Output,EventEmitter, ɵConsole } from '@angular/core';
import { Product } from '../products.model';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../../shared/recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  providers:[]
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected =new EventEmitter<Recipe>();
  products :Product[];
  
  constructor(private recipeService:RecipeService,private http:HttpClient) {

   }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);

  // }
  ngOnInit() {
    this.products=this.recipeService.getProducts()
  }
checkToken(){
// this.authservice.refreshToken().subscribe((res)=>{
//     console.log(res)
//     console.log(localStorage.getItem("REFRESH_TOKEN"))

    
//   });;
  return this.http.get("/api/checktoken").subscribe((res)=>{
    console.log(res)
  });
}
}
