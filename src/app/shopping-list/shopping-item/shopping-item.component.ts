import { Component, OnInit, ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/Ingredients.model';
import { ShoppingService } from '../../shared/shopping-list.service';
import {Product} from "../../recipes/products.model"
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/shared/authentication.service';
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
  constructor(private shoppingService:ShoppingService,private modalService:NgbModal,private authservice:AuthenticationService) { }

  ngOnInit() {
    $(document).ready(function (e){
     
      var PriceArray= document.getElementsByClassName("price");

      var sumvar=0;
      var Pricevar=0;
      //var Discountvar=0;
     var finalPriceArray= document.getElementsByClassName("finalPrice");
for(var i=0;i<finalPriceArray.length;i++){
  //console.log(Number(finalPriceArray[i].textContent.trim()));
  sumvar+=Number(finalPriceArray[i].textContent.trim());
  Pricevar+=Number(PriceArray[i].textContent.trim());
}
 document.getElementById('cartTotal').innerHTML="<i class='fa fa-inr'></i>"+sumvar;
 document.getElementById('cartSavings').innerHTML="<i class='fa fa-inr'></i>"+(Pricevar-sumvar);

// $('#cartTotal').html("<i class='fa fa-inr'></i>"+sumvar)
// $('#cartSavings').html("<i class='fa fa-inr'></i>"+(Pricevar-sumvar))

      $('.minus-btn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var itemPrice=$(this).parent().parent().find('.finalPrice');
        var discountPrice=$(this).parent().parent().find('.discountPrice');

        var $input = $this.closest('div').find('input');
        var value = Number($input.val());
     
        if (value > 1) {
            value = value - 1;
        itemPrice.html("<i class='fa fa-inr'></i>"+(Number(itemPrice.text())- Number(discountPrice.text())))

        } else {
            value = 1;
            itemPrice.html("<i class='fa fa-inr'></i>"+ Number(discountPrice.text()))
        }
     
      $input.val(value);

      var PriceArray= document.getElementsByClassName("price");

      var sumvar=0;
      var Pricevar=0;
     var finalPriceArray= document.getElementsByClassName("finalPrice");
     var txtValueArray= document.getElementsByClassName("txtValue");
for(var i=0;i<finalPriceArray.length;i++){
  //console.log(Number(finalPriceArray[i].textContent.trim()));
 // console.log($(document.getElementById(txtValueArray[i].id)).val())
  sumvar+=Number(finalPriceArray[i].textContent.trim());
  Pricevar+=Number(PriceArray[i].textContent.trim())  *Number($(document.getElementById(txtValueArray[i].id)).val());
}
$('#cartTotal').html("<i class='fa fa-inr'></i>"+sumvar)
$('#cartSavings').html("<i class='fa fa-inr'></i>"+(Pricevar-sumvar))
    });
    $('.plus-btn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var itemPrice=$(this).parent().parent().find('.finalPrice');
        var discountPrice=$(this).parent().parent().find('.discountPrice');
        var $input = $this.closest('div').find('input');
        var value = Number($input.val());
        
        if (value < 100) {
            value = value + 1;
            itemPrice.html("<i class='fa fa-inr'></i>"+(Number(itemPrice.text())+ Number(discountPrice.text())))
        } else {
            value =100;
            itemPrice.html("<i class='fa fa-inr'></i>"+( 100* Number(discountPrice.text())))
        }
       
        
     
        $input.val(value);
//console.log( $this.closest('div').find('input').attr('id').split('_')[1])
        var sumvar=0;
        var Pricevar=0;
      var PriceArray= document.getElementsByClassName("price");
        var finalPriceArray= document.getElementsByClassName("finalPrice");
        var txtValueArray= document.getElementsByClassName("txtValue");
        
        var ProductArray= localStorage.getItem("CartProducts")!=null?JSON.parse(localStorage.getItem("CartProducts")):[];
       var ProductId= Number($this.closest('div').find('input').attr('id').split('_')[1].trim())

      for (var j in ProductArray) {
        if (ProductArray[j].productId == ProductId) {
          ProductArray[j].quantity = value;
           break; //Stop this loop, we found it!
        }
      }
      //console.log(JSON.stringify(ProductArray))
        localStorage.setItem("CartProducts",JSON.stringify(ProductArray));

   for(var i=0;i<finalPriceArray.length;i++){
     //(txtValueArray[i].id);
     //console.log( document.getElementById(txtValueArray[i].id).innerText )
     //console.log( $(document.getElementById(txtValueArray[i].id)).val())
     sumvar+=Number(finalPriceArray[i].textContent.trim());
  Pricevar+=Number(PriceArray[i].textContent.trim()) *Number($(document.getElementById(txtValueArray[i].id)).val());
   }
   $('#cartTotal').html("<i class='fa fa-inr'></i>"+sumvar)
 
   $('#cartSavings').html("<i class='fa fa-inr'></i>"+((Pricevar)-sumvar))
    });

});
    this.CartProductArray= localStorage.getItem("CartProducts")!=null?JSON.parse(localStorage.getItem("CartProducts")):[];
    
   
  }
  // AddIngredient(){
  //   const ingName=this.nameInputRef.nativeElement.value;
  //   const ingAmount=this.amountInputRef.nativeElement.value;
  //   const ingredient=new Ingredients(ingName,ingAmount);
  //   // this.IngredientsAdded.emit(ingredient);
  //   this.shoppingService.AddIngredient(ingredient);
  // }

  deleteProduct(product,content){
    //this.CartProductArray= JSON.parse(localStorage.getItem("CartProducts"));
  this.modalImage=product.imagePath[0];
    this.modalService.open(content, {size: 'sm',centered: false,backdrop: true}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      if(result=="Ok click"){
        // to delete from array
      this.CartProductArray=this.CartProductArray.filter((item)=>item.productId!=product.productId)
      if(this.CartProductArray.length==0){
this.authservice.CartProductsobMethod();
      }
      localStorage.setItem("CartProducts",JSON.stringify(this.CartProductArray));

      //to calculate total on delete
     // this.authservice.cartTotalobsMethod();
     this.ngOnInit();
      }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    var finalPriceArray= document.getElementsByClassName("finalPrice");
    console.log(finalPriceArray.length)

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
}
