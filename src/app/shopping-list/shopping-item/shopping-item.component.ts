import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import {Product} from "../../recipes/products.model"
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/shared/order.service';
import { RegisterService } from 'src/app/shared/Register.service';
@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss'],
 
})
export class ShoppingItemComponent implements OnInit {

@ViewChild('nameInput',{static: true}) nameInputRef :ElementRef;
@ViewChild('amountInput',{static: true}) amountInputRef :ElementRef;
CartProductArray:Product[]=[]
closeResult: string;
modalImage :string;
makeLogIn;
constructor(private recipeService:RecipeService,private modalService:NgbModal,private authservice:AuthenticationService,private router:Router,private cd:ChangeDetectorRef,private toastr:ToastrService,private orderService:OrderService,private registerService:RegisterService) { }

ngOnInit() {
if(!this.authservice.isLoggedIn()){
this.makeLogIn=true
}
//inorder to display intiallt till fetched from db
if(this.authservice.isLoggedIn()){
  this.CartProductArray=this.recipeService.CartProductArray;
}
else{
  this.CartProductArray= localStorage.getItem("CartProducts")!=null?JSON.parse(localStorage.getItem("CartProducts")):[];
}
if(this.authservice.isLoggedIn()){
  this.recipeService.getCartProducts().subscribe((res)=>{
  this.CartProductArray=[];
    if(res[0]!=undefined   && res!="No Products found"){
      for ( var i in res) {
      let prod= new Product(res[i]['products_docs'][0]);

        prod.quantity=res[i].quantity
        this.CartProductArray.push(prod);
      }
      this.calculatePrice();
      this.recipeService.CartProductArray=this.CartProductArray;
    }
  });

//in order to display in ordercomponent if user navigates from here
//for immediate display
if(this.registerService.addresssObj==null){
  this.registerService.getAddress().subscribe((res:any)=>{
    if(res['msg']=this.registerService.constants.address_exists){
      this.registerService.addresssObj=res['address1'];
    }
  });
}
}
this.calculatePrice();
}
placeOrder(){
let prodArr:Product[]=[];
if(this.authservice.isLoggedIn()){
let txtValueArray= document.getElementsByClassName("txtValue");
Array.from(txtValueArray).forEach((prod)=>{
  let product:Product={};
  product.productId=Number(prod.id.split('_')[1]);
  product.quantity=Number($(document.getElementById(prod.id)).val())
  prodArr.push(product)
})
this.router.navigate(['cart/ReviewOrder']);

// this.orderService.placeOrder()
}
else{
  //to make user login to place order
  this.authservice.doLoginForOrderobMethod();
}
}
dismissAlert() {
}
deleteProduct(product:Product,content){
this.modalImage=product.imagePath[0];
this.modalService.open(content, {size: 'sm',centered: false,backdrop: true}).result.then(
  (result) => {
  if(result=="Ok click"){
    if(this.authservice.isLoggedIn()){
      this.recipeService.DeleteCart(product.productId).subscribe((res)=>{
      if(res['msg']=this.recipeService.constants.cart_delete_success){
        this.toastr.success(this.recipeService.constants.cart_delete_success,"",{timeOut: 2000});
        this.recipeService.CartProductArray= this.CartProductArray.filter((item)=>item.productId!=product.productId)
        this.CartProductArray=this.recipeService.CartProductArray
        this.calculatePrice();
      }
      else{
        this.toastr.error(this.recipeService.constants.cart_delete_failed,"",{timeOut: 2000});
      }
      })
    }
    else{
      this.toastr.success(this.recipeService.constants.cart_delete_success,"",{timeOut: 2000});
      this.recipeService.CartProductArray= this.CartProductArray.filter((item)=>item.productId!=product.productId)
      this.CartProductArray= this.recipeService.CartProductArray
      this.calculatePrice();
      localStorage.setItem("CartProducts",JSON.stringify(this.CartProductArray));
    }
    if(this.CartProductArray.length==0){
    this.authservice.CartProductsobMethod();
    }
  }
},
  (reason) => {
this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
var finalPriceArray= document.getElementsByClassName("finalPrice");

}
updateQty(prodID:number,identifier){
  let qty  =$(document.getElementById('txt_'+prodID)).val();
  let prod: Product = {};
  prod.productId=prodID;
  if(identifier=='1'){
    prod.quantity=Number(qty)-1;
  }
  else{
    prod.quantity=Number(qty)+1;
  }
  if(prod.quantity==0){
    return
  }
  this.recipeService.UpdateCart(prod).subscribe((res)=>{
if(res!=undefined && res['msg']==this.recipeService.constants.cart_success){
  //only in db calls to update the array
this.recipeService.CartProductArray.every((Product)=>{
  if(Product.productId==prod.productId){
        Product.quantity= prod.quantity;
          return false
  }
  return true
  })
}
//if user logged off we have to fetch data from recipeService.CartProductArray
this.CartProductArray= this.recipeService.CartProductArray;
this.calculatePrice();
// this.cd.detectChanges()
  })

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

calculatePrice(){
  let total:number=0;
  let discountedPrice:number=0;
  let savings:number=0;
  this.CartProductArray.forEach((prod:Product)=>{
    total+=(prod.price*prod.quantity)
    discountedPrice+=(prod.price*prod.quantity)-((prod.price*prod.quantity)*(prod.discount/100))
  })
  savings= total-discountedPrice;
  setTimeout(()=>{
    $('#cartTotal').html("<i class='fa fa-inr'></i>"+discountedPrice.toFixed(0))
    $('#cartSavings').html("<i class='fa fa-inr'></i>"+savings.toFixed(0))
  },0)
}

comment(){
  // $(document).ready(function (e){
     
  //   var PriceArray= document.getElementsByClassName("price");
  
  //   var sumvar=0;
  //   var Pricevar=0;
  //  var finalPriceArray= document.getElementsByClassName("finalPrice");
  // for(var i=0;i<finalPriceArray.length;i++){
  // sumvar+=Number(finalPriceArray[i].textContent.trim());
  // Pricevar+=Number(PriceArray[i].textContent.trim());
  // }

  // $('#cartTotal').html("<i class='fa fa-inr'></i>"+sumvar)
  // $('#cartSavings').html("<i class='fa fa-inr'></i>"+(Pricevar-sumvar))
  

  //   $('.minus-btn').on('click', function(e) {
  //     e.preventDefault();
  //     var $this = $(this);
  //     var itemPrice=$(this).parent().parent().find('.finalPrice');
  //     var discountPrice=$(this).parent().parent().find('.discountPrice');
  
  //     var $input = $this.closest('div').find('input');
  //     var value = Number($input.val());
   
  //     if (value > 1) {
  //         value = value - 1;
  //     itemPrice.html("<i class='fa fa-inr'></i>"+(Number(itemPrice.text())- Number(discountPrice.text())))
  
  //     } else {
  //         value = 1;
  //         itemPrice.html("<i class='fa fa-inr'></i>"+ Number(discountPrice.text()))
  //     }
   
  //   $input.val(value);
  
  //   var PriceArray= document.getElementsByClassName("price");
  
  //   var sumvar=0;
  //   var Pricevar=0;
  //  var finalPriceArray= document.getElementsByClassName("finalPrice");
  //  var txtValueArray= document.getElementsByClassName("txtValue");
  // for(var i=0;i<finalPriceArray.length;i++){
  // //console.log(Number(finalPriceArray[i].textContent.trim()));
  // // console.log($(document.getElementById(txtValueArray[i].id)).val())
  // sumvar+=Number(finalPriceArray[i].textContent.trim());
  // Pricevar+=Number(PriceArray[i].textContent.trim())  *Number($(document.getElementById(txtValueArray[i].id)).val());
  // }
  // $('#cartTotal').html("<i class='fa fa-inr'></i>"+sumvar)
  // $('#cartSavings').html("<i class='fa fa-inr'></i>"+(Pricevar-sumvar))
  // });
  // $('.plus-btn').on('click', function(e) {
  //     e.preventDefault();
  //     var $this = $(this);
  //     var itemPrice=$(this).parent().parent().find('.finalPrice');
  //     var discountPrice=$(this).parent().parent().find('.discountPrice');
  //     var $input = $this.closest('div').find('input');
  //     var value = Number($input.val());
      
  //     if (value < 100) {
  //         value = value + 1;
  //         itemPrice.html("<i class='fa fa-inr'></i>"+(Number(itemPrice.text())+ Number(discountPrice.text())))
  //     } else {
  //         value =100;
  //         itemPrice.html("<i class='fa fa-inr'></i>"+( 100* Number(discountPrice.text())))
  //     }
     
      
   
  //     $input.val(value);
  // //console.log( $this.closest('div').find('input').attr('id').split('_')[1])
  //     var sumvar=0;
  //     var Pricevar=0;
  //   var PriceArray= document.getElementsByClassName("price");
  //     var finalPriceArray= document.getElementsByClassName("finalPrice");
  //     var txtValueArray= document.getElementsByClassName("txtValue");
      
  //     var ProductArray= localStorage.getItem("CartProducts")!=null?JSON.parse(localStorage.getItem("CartProducts")):[];
  //    var ProductId= Number($this.closest('div').find('input').attr('id').split('_')[1].trim())
  
  //   for (var j in ProductArray) {
  //     if (ProductArray[j].productId == ProductId) {
  //       ProductArray[j].quantity = value;
  //        break; //Stop this loop, we found it!
  //     }
  //   }
  //   //console.log(JSON.stringify(ProductArray))
  //     localStorage.setItem("CartProducts",JSON.stringify(ProductArray));
  // for(var i=0;i<finalPriceArray.length;i++){
  //  //(txtValueArray[i].id);
  //  //console.log( document.getElementById(txtValueArray[i].id).innerText )
  //  //console.log( $(document.getElementById(txtValueArray[i].id)).val())
  //  sumvar+=Number(finalPriceArray[i].textContent.trim());
  // Pricevar+=Number(PriceArray[i].textContent.trim()) *Number($(document.getElementById(txtValueArray[i].id)).val());
  // }
  // $('#cartTotal').html("<i class='fa fa-inr'></i>"+sumvar)
  // $('#cartSavings').html("<i class='fa fa-inr'></i>"+((Pricevar)-sumvar))
  // });
  // });
}
}