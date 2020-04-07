import { Component, OnInit, NgZone,OnDestroy } from '@angular/core';
import { Product } from '../products.model';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../../shared/recipe.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { switchMap,map, flatMap, concatMap, takeUntil, take } from 'rxjs/operators'
import 'rxjs/add/observable/empty' 
import {  of } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  providers:[]
})
export class RecipeListComponent implements OnInit,OnDestroy{

  // @Output() recipeWasSelected =new EventEmitter<Recipe>();
  private subscription: ISubscription;
  products :Product[];
  constructor(private recipeService:RecipeService,private http:HttpClient,private authservice :AuthenticationService,private ngZone: NgZone,private ngxService: NgxUiLoaderService) {

   }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);

  // }
  
  ngOnInit() {
    //this.products=this.recipeService.getProducts()
    this.subscription=  this.authservice.currenttab.pipe(
//       map(res=>{
//       if(res==""){
//         res="kurti"
//       }
// return res
//     })
      // ,
      switchMap(response=>{
        if(response==""){
          response="kurti"
        }
        if(response.toString().toLowerCase()=="kurti"){
          if(this.recipeService.Kurtiproduct.length==0){
          return  this.recipeService.getFilteredProducts(response.toString().toLowerCase())
          }
          else{
            this.products=this.recipeService.Kurtiproduct;
     //this is for detail component
     this.recipeService.product=this.products
     return of({});
       }
   }
   else if(response.toString().toLowerCase()=="saree"){
    if(this.recipeService.sareeProduct.length==0){
      return this.recipeService.getFilteredProducts(response.toString().toLowerCase())
    }
    else{
     this.products=this.recipeService.sareeProduct;
//this is for detail component
this.recipeService.product=this.products
return of({});
}
  }
  else{
  
return of({});
}
        // this.recipeService.getFilteredProducts(response.toString().toLowerCase())
        // return response
      }
        )).subscribe((res)=>{
          console.log(res)
          if(res[0]!=undefined   && res!="No Products found"){
            if(res[0].category=="kurti"){
            for (var i in res) {
              let prod = new Product(res[i]);
              this.recipeService.Kurtiproduct.push(prod);
}
 //to set in service so it exists across components
 this.products=this.recipeService.Kurtiproduct;
//this is for detail component
this.recipeService.product=this.products
            }
            else if(res[0].category=="saree"){
              for (var i in res) {
                                  let prod = new Product(res[i]);
                                  //to set in service so it exists across components
                                  this.recipeService.sareeProduct.push(prod)
                }
                  this.ngZone.run( () => {
                this.products=this.recipeService.sareeProduct;
                  //this is for detail component
                  this.recipeService.product=this.products
                  this.ngxService.stopAll();
                 });
            }
          }
    })

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
