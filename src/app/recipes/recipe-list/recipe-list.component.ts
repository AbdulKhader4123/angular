import { Component, OnInit, Output,EventEmitter, ɵConsole } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { HttpClient } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { AuthenticationService } from 'src/app/shared/authentication.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  providers:[TokenInterceptor]
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected =new EventEmitter<Recipe>();
  recipes :Recipe[];
  
  constructor(private recipeService:RecipeService,private http:HttpClient,private intercept:TokenInterceptor,private authservice:AuthenticationService) {

   }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);

  // }
  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();
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
