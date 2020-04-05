import { Component, OnInit, Output,EventEmitter, ɵConsole } from '@angular/core';
import { Product } from '../products.model';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../../shared/recipe.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  providers:[]
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected =new EventEmitter<Recipe>();
  products :Product[];
  constructor(private recipeService:RecipeService,private http:HttpClient,private authservice :AuthenticationService) {

   }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);

  // }
  ngOnInit() {
    //this.products=this.recipeService.getProducts()
    this.authservice.currenttab.subscribe((res)=>{
      if(res==""){
        res="kurti"
      }
      if(res.toString().toLowerCase()=="kurti"){
        if(this.recipeService.Kurtiproduct.length==0){
          this.recipeService.getFilteredProducts(res.toString().toLowerCase()).subscribe((res) => {
            for (var i in res) {
                  let prod = new Product(res[i]);
                  //to set in service so it exists across components
                  this.recipeService.Kurtiproduct.push(prod)
}
});
this.products=this.recipeService.Kurtiproduct;
        }
        else{
         this.products=this.recipeService.Kurtiproduct;

    }
    //this is for detail component
    this.recipeService.product=this.products

      }
    })
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
