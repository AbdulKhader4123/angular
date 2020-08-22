import { Component, OnInit, ChangeDetectorRef ,NgZone} from '@angular/core';

import { Product } from './products.model';
import { RecipeService } from '../shared/recipe.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { switchMap,map, flatMap, concatMap, takeUntil, take } from 'rxjs/operators'
import 'rxjs/add/observable/empty' 
import {  of } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'], 
  providers:[]
})
export class RecipesComponent implements OnInit {
selectedProduct:Product;
displayFooter=false;
private subscription: ISubscription;
products :Product[];
config: any;
done=false;

constructor(private recipeService:RecipeService,private cd:ChangeDetectorRef,private authservice :AuthenticationService,private ngZone: NgZone,private ngxService: NgxUiLoaderService) {

}

ngOnInit() {
  if(this.recipeService.check==undefined){
    this.isMobile(navigator.userAgent||navigator.vendor);
  }

this.subscription=  this.authservice.currenttab.pipe(
  switchMap((response:String)=>{
  if(response==""){
    response="kurti"
  }
  this.recipeService.selectedCat=response.toString().toLowerCase();
  if(response.toString().toLowerCase()=="kurti"){
    if(this.recipeService.Kurtiproduct.length==0){
      this.done=false;
    }
    if(this.recipeService.Kurtiproduct.length==0 && !this.recipeService.kurtiDone){
      this.done=false;
    return  this.recipeService.getFilteredProducts(response.toString().toLowerCase(),null);
    }
    else{
    this.products=this.recipeService.Kurtiproduct;
    this.cd.detectChanges();
    //this is for detail component
    this.recipeService.product=this.products
    return of({});
    }
  }
  else if(response.toString().toLowerCase()=="saree"){
    if(this.recipeService.sareeProduct.length==0){
      this.done=false;
    }
    if(this.recipeService.sareeProduct.length==0  && !this.recipeService.sareeDone){
      this.done=false;
      return this.recipeService.getFilteredProducts(response.toString().toLowerCase(),null)
    }
    else{
      this.products=this.recipeService.sareeProduct;
      //this is for detail component
      this.recipeService.product=this.products
      this.cd.detectChanges();
      return of({});
    }
  }
  else{
    return of({});
  }
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
  // this.config = {
  //   itemsPerPage: 3,
  //   currentPage: 1,
  //   maxSize :3,
  //   responsive:true,
  //   totalItems: this.products.length
  // };
  // this.products.forEach((elem,index)=>{
  //   elem.id=index+1;
  // })
  })
}
onScroll(){
  console.log(this.recipeService.Kurtiproduct)
if(this.done){
  return
}
let prod :Product= this.products[this.products.length-1]
this.recipeService.getFilteredProducts(this.recipeService.selectedCat,prod.id).subscribe((res)=>{
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
  });
  }
} 
else{
  if(this.recipeService.selectedCat=="saree"){
    this.recipeService.sareeDone=true;
  }
  else{
    this.recipeService.kurtiDone=true;

  }
  this.done=true;
}
})
}
pageChanged(event){
  this.config.currentPage = event;
}

isMobile(a){
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
    this.recipeService.check=true;
  }
  else{
    this.recipeService.check=false;
  }
}

ngOnDestroy() {
this.subscription.unsubscribe();
}
}
