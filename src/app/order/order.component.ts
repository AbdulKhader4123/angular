import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../shared/Register.service';
import { RecipeService } from '../shared/recipe.service';
import { Product } from '../recipes/products.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

enableEdit=false;
enableEdit1=false;
addressForm:FormGroup
changeAlert1="";
submitted1=false;
userName;
Address;
displayCancelbtn=false;
CartProductArray;
cartTotal;
cartSavings;
email;
constructor(private formBuilder:FormBuilder,private registerService:RegisterService,private recipeService:RecipeService) { }

ngOnInit() {
this.email=localStorage.getItem("email");
if(this.registerService.addresssObj==null){
  this.addressForm = this.formBuilder.group({
    name: ["",Validators.compose([Validators.required ])],
    phone:["", Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
    pincode: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")])],
    address: ["", Validators.compose([Validators.required])],
    city: ["", Validators.compose([Validators.required])],
    state: ["", Validators.compose([Validators.required])]
  },
  )
  this.registerService.getAddress().subscribe((res:any)=>{
  if(res['msg']=this.registerService.constants.address_exists){
    this.registerService.addresssObj=res['address1'];
    
    this.reInitAddressForm();
    if(this.addressForm.valid){
      this.displayCancelbtn=true;
    }
  }
  })
}
else{
  this.reInitAddressForm();
  if(this.addressForm.valid){
    this.displayCancelbtn=true;
  }
}
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
})

}
editable(identifier?:any){
  if(this.enableEdit){
    this.enableEdit=false;
    this.enableEdit1=true;

  }
  else{
    this.enableEdit=true;
    this.enableEdit1=false;
  }
}
ChangeHandler1(){

}
PhonekeyPress(event: any) {
  if (event.charCode==32) {
    event.preventDefault();
  }
  const pattern = /[0-9]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
onPaste(event: ClipboardEvent) {
  let clipboardData = event.clipboardData;
  const pattern = /^[0-9]*$/;
  let pastedText = clipboardData.getData('text');
  console.log(pastedText)
  if (!pattern.test(pastedText)) {
    event.preventDefault();
  }
}
invalidPhone1()
{

return (this.submitted1 && this.addressForm.controls.phone.errors != null);
}
invalidPincode(){
return (this.submitted1 && this.addressForm.controls.pincode.errors != null
    );
}
invalidUserName1()
{
  return (this.submitted1 && this.addressForm.controls.name.errors != null);
}
invalidState(){
  return (this.submitted1 && this.addressForm.controls.state.errors != null );

}
invalidCity(){
  return (this.submitted1 && this.addressForm.controls.city.errors != null);

}
invalidAddress(){
  return (this.submitted1 && this.addressForm.controls.address.errors != null  );

}
changeAlertmethod1(){
this.changeAlert1="";
}
reInitAddressForm(){
  let  res =this.registerService.addresssObj
  
  this.userName=res.name;
  this.Address=res.address+","+res.city+","+res.state+"-"+res.pincode;

   this.addressForm = this.formBuilder.group({
     name: [res.name,Validators.compose([Validators.required ])],
     phone:[res.phone, Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
     pincode: [res.pincode, Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")])],
     address: [res.address, Validators.compose([Validators.required])],
     city: [res.city, Validators.compose([Validators.required])],
     state: [res.state, Validators.compose([Validators.required])]
   },
   )
   if(this.addressForm.valid){
     this.enableEdit1=true;
     this.enableEdit=false;
   }
   else{
    this.enableEdit=true;
    this.enableEdit1=false;
   }
 }
onSubmit(){
this.submitted1=true;

if(this.addressForm.invalid == true)
{
  return;
}
else if(this.addressForm.pristine){
  this.changeAlert1="aaa"
  return;
}
else{
  this.submitted1 = false;
  this.enableEdit=false;
  this.displayCancelbtn=true;
  this.registerService.addresssObj=this.addressForm.value;
  this.reInitAddressForm();
  this.registerService.editAddress(this.addressForm.value).subscribe((res)=>{
    if(res=this.registerService.constants.success){
    console.log(res)
    // this.cd.detectChanges()
    }
  })
}
this.changeAlert1="";
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
    this.cartTotal=discountedPrice.toFixed(0)
    this.cartSavings=savings.toFixed(0)
  },0)
}
}
