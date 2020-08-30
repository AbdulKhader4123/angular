import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../shared/Register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit ,AfterViewInit {
  private sub: any;
  userForm: FormGroup;
  OTPForm:FormGroup;
  addressForm: FormGroup;
  submitted = false;
  submitted1 = false;
  OTPsubmitted = false;
  userExistError ="";
  emailExistError="";
  emailError="";
  emailOTP=false;
  phoneOTP=false;
  phoneOTPError=""
  emailOTPError=""
  phoneOTPFailed=""
  emailOTPFailed=""
  phonetext="";
  emailtext="";
  param="";
  changeAlert="";
  changeAlert1="";
  lblactive=true;
  editSuccess=false;
  //to disable button
  buttonEnabler=false;
  enableEdit=false;
  enableEdit1=false;
  constructor(private formBuilder: FormBuilder,private registerService:RegisterService,private router:Router,private route: ActivatedRoute,private toastr: ToastrService,private cd:ChangeDetectorRef)
  { 
  }

  ngOnInit() {
  let email =localStorage.getItem("email")
    this.registerService.getAddress().subscribe((res:any)=>{
      if(res['msg']=this.registerService.constants.address_exists){
        this.registerService.addresssObj=res['address1'];
        this.addressForm = this.formBuilder.group({
          name: [res['address1'].name,Validators.compose([Validators.required ])],
          phone:[res['address1'].phone, Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
          pincode: [res['address1'].pincode, Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")])],
          address: [res['address1'].address, Validators.compose([Validators.required])],
          city: [res['address1'].city, Validators.compose([Validators.required])],
          state: [res['address1'].state, Validators.compose([Validators.required])]
        },
        )
        this.cd.detectChanges()
      }
  
    })
  
  let username= localStorage.getItem("UserName")
  let phone= localStorage.getItem("phone")
  this.userForm = this.formBuilder.group({
    name: [username ],
    phone:[phone, Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
    email: [email, [Validators.required, Validators.email]],
   
  },
  )
 
  this.addressForm = this.formBuilder.group({
    name: ["",Validators.compose([Validators.required ])],
    phone:["", Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
    pincode: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")])],
    address: ["", Validators.compose([Validators.required])],
    city: ["", Validators.compose([Validators.required])],
    state: ["", Validators.compose([Validators.required])]
  },
  )
 
this.sub=  this.route.queryParams
.subscribe(params => {
  this.buttonEnabler=false;
  if(params["type"]!=undefined){
  this.param=params['type']
  console.log(this.param)

  }
  else{
this.param="profile"
if(this.editSuccess){
  this.userForm.disable()
  this.showSuccess();
}
    //on browser back button to set values
    this.userForm = this.formBuilder.group({
      name: [username ],
      phone:[localStorage.getItem("phone"), Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
      email: [localStorage.getItem("email"), [Validators.required, Validators.email]],
     
    })
  }
  this.OTPForm=  this.formBuilder.group({
    phone:["",[Validators.required]],
      email:["",[Validators.required]]
    })
    this.cd.detectChanges()
 });
 this.OTPForm=  this.formBuilder.group({
  phone:["",[Validators.required]],
    email:["",[Validators.required]]
  })
  this.emailtext=localStorage.getItem("form_email")
 this.phonetext= localStorage.getItem("form_phone")
  }

  ngAfterViewInit(){
   this.userForm.disable()
   this.addressForm.disable()

  }

  invalidUserName()
  {
  	return (this.submitted && this.userForm.value.name != "");
  }
  invalidphoneOTP()
  {
  return (this.submitted && this.OTPForm.controls.phone.errors != null);
  }
  invalidemailOTP()
  {
  return (this.submitted && this.OTPForm.controls.email.errors != null);
  }
  invalidPhone()
  {

  return (this.submitted && this.userForm.controls.phone.errors != null);
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
  invalidEmail()
  {
  	return (this.submitted && this.userForm.controls.email.errors != null);
  }
  emailkeyPress(event: any) {
    //to hide incorrect error message error
    const pattern = /[0-9a-zA-Z@.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if ((event.key != 8 && !pattern.test(inputChar))||event.charCode==32) {
      event.preventDefault();
    }
  }
  otpkeyPress(event: any) {
    const pattern = /[0-9 ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if ((event.key != 8 && !pattern.test(inputChar))||event.charCode==32) {
      event.preventDefault();
    }
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
  onemailPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    const pattern =/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    let pastedText = clipboardData.getData('text');
    console.log(pastedText)
    if (!pattern.test(pastedText)) {
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
  changeAlertmethod(){
    this.changeAlert="";
  }
  changeAlertmethod1(){
    this.changeAlert1="";
  }
  ChangeHandler(){
    this.changeAlert="";
   this.phoneOTPError=""

  }
  ChangeHandler1(){
    this.changeAlert1="";

  }
  EmailHandler(){
    this.changeAlert="";
    this.emailExistError="";
    this.emailError="";
     this.emailOTPError=""
  }
  showSuccess(param?:any) {
    if(param="ADDRESS"){
      this.toastr.success('Address Updated Successfully',"",{timeOut: 3000});
    }
    else{
      this.toastr.success('Profile Updated Successfully',"",{timeOut: 3000});
    }
  }
  onemailOTPSubmit(){
    //to disable updATE BUTTON
    this.buttonEnabler=true;
    this.submitted = true;
    this.phoneOTPError=""
    this.emailOTPError=""
  	if(this.OTPForm.value.email =="")
  	{
  		return;
    }
  	else
  	{
      this.registerService.verifyOTPToMail(this.OTPForm.value.email,localStorage.getItem("secret_key"))
      .subscribe((res)=>{
        console.log(res)
        if(res['msg']=='Email OTP Verified'){
          this.registerService.changeEmailPhone(localStorage.getItem("UserName"),localStorage.getItem("form_email"),localStorage.getItem("form_phone")).subscribe((res)=>{
            if(res['msg']="changed sucessfully"){
              //to set values
              this.param="profile"
              this.editSuccess=true;
              this.enableEdit=false;
              this.userForm.disable()
              localStorage.setItem("email",localStorage.getItem("form_email"))
            this.router.navigate(['/profile']);
          
            }
           })
        }
        else{
          this.buttonEnabler=false;
          this.emailOTPError="aaa"
        }
      })
    }
  }
  onphoneOTPSubmit(){
    //to disable updATE BUTTON
    this.buttonEnabler=true;
    this.submitted = true;
    // this.phoneOTPError=""
    // this.emailOTPError=""
  	if(this.OTPForm.value.phone =="")
  	{
  		return;
  	}
  	else
  	{
      this.registerService.VerifyOTP(this.OTPForm.value.phone,localStorage.getItem("OTP_SessionId"))
      .subscribe((res)=>{
        // console.log(res)
        if(res['message']=='OTP Verified successfully.'){
          this.registerService.changeEmailPhone(localStorage.getItem("UserName"),localStorage.getItem("form_email"),localStorage.getItem("form_phone")).subscribe((res)=>{
            if(res['msg']="changed sucessfully"){
              //to set values
              this.param="profile"
              this.editSuccess=true;
              this.enableEdit=false;
              this.userForm.disable()

            localStorage.setItem("phone",localStorage.getItem("form_phone"))
            this.router.navigate(['/profile']);
          
            }
           })
        }
        else{
          this.buttonEnabler=false;
            this.phoneOTPError="aaa"
        }
      })
    }
  }
  onOTPSubmit(){
    //to disable updATE BUTTON
    this.buttonEnabler=true;
    this.submitted = true;
    this.phoneOTPError=""
    this.emailOTPError=""
  	if(this.OTPForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
      this.registerService.VerifyOTP(this.OTPForm.value.phone,localStorage.getItem("OTP_SessionId"))
      .subscribe((res)=>{
         console.log(res)
        if(res['message']=='OTP Verified successfully.'){
          console.log(localStorage.getItem("secret_key"))
          this.registerService.verifyOTPToMail(this.OTPForm.value.email,localStorage.getItem("secret_key"))
          
          .subscribe((res)=>{
             console.log(res)
            if(res['msg']=='Email OTP Verified'){
              console.log(localStorage.getItem("UserName"))
      
 this.registerService.changeEmailPhone(localStorage.getItem("UserName"),localStorage.getItem("form_email"),localStorage.getItem("form_phone")).subscribe((res)=>{
  if(res['msg']="changed sucessfully"){
    //to set values
    this.param="profile"
    this.editSuccess=true;
    localStorage.setItem("email",localStorage.getItem("form_email"))
  localStorage.setItem("phone",localStorage.getItem("form_phone"))
  this.router.navigate(['/profile']);


  }
 })
            }
            else{
              this.buttonEnabler=false;
              this.emailOTPError="aaa"
            }
          })
        }
        else{
          this.buttonEnabler=false;
            this.phoneOTPError="aaa"
        }
      })
    }
    
  }
  onSubmit()  
  {
    //to disable updATE BUTTON
    this.buttonEnabler=true;

    this.changeAlert="";
   this.submitted = true;
    //to make them false so if user tries again it has to check again.
    this.emailOTP=false;
    this.phoneOTP=false;
    
  	if(this.userForm.invalid == true)
  	{
     this.buttonEnabler=false;
  		return;
  	}
  	else
  	{
      this.emailtext=this.userForm.value.email.trim();
      this.phonetext=this.userForm.value.phone;
      localStorage.setItem("form_email",this.userForm.value.email.trim())
      localStorage.setItem("form_phone",this.userForm.value.phone)
     
      if(this.userForm.value.phone.trim()!=localStorage.getItem("phone") && this.userForm.value.email.trim()!=localStorage.getItem("email")){
      this.registerService.checkUpdateUser(this.userForm.value).subscribe((res)=>{
        if(res['msg']=="Username Available"){
              this.submitted = false;
                  this.registerService.SendOTPToMAIL(this.userForm.value.email.trim()).subscribe((res)=>{
                    if(res['msg']=="A Email change OTP is sent to your email Id"){
                  this.emailOTP=true
                  localStorage.setItem("secret_key",res['secret'])
                  console.log(res['secret'])

                  this.registerService.SendOTPtoPhone(this.userForm.value.phone)
                .subscribe((res)=>{
                  // console.log(res)
                  if(res['message']=='OTP Sent successfully.'){
                    console.log(res['SessionId'])
                            localStorage.setItem("OTP_SessionId",res['SessionId']);
                            this.phoneOTP=true;
                            if(this.emailOTP && this.phoneOTP){
                              //navigate to otp enter screen
                                //to enable update button
                              this.buttonEnabler=false;
                              this.router.navigate(['/profile'],{ queryParams: { type: "OtpVerify"} })
                              this.param="OtpVerify"
                            }     
                            else{

                            }
                          }
                          else{
                            this.buttonEnabler=false;
                            this.phoneOTPFailed="aaa"
                          }
                          },
                          err => {console.log( err)},
                          );
                  }
                  else{
                    this.buttonEnabler=false;
                    //email otp failed.
                    this.emailOTPFailed="aaa"
                  }
                  })
        }
        else{
          this.buttonEnabler=false;
           if(res['msg']=="Email Already Exists"){
            this.emailExistError="aaa";
            return;
          }
          else if(res['msg']=="Invalid Email"){
            this.emailError="aaaa"
            return;
          }
          else{
            this.emailExistError="aaa";
            return;
          }
        }
      })
      }
      else{
          if( localStorage.getItem("phone").trim()!=this.userForm.value.phone){
            this.registerService.SendOTPtoPhone(this.userForm.value.phone)
            .subscribe((res)=>{
            if(res['message']=='OTP Sent successfully.'){
            localStorage.setItem("OTP_SessionId",res['SessionId']);
            this.router.navigate(['/profile'],{ queryParams: { type: "phoneVerify"} })
            }
            else{
            this.buttonEnabler=false;
            this.phoneOTPFailed="aaa"
            }
            },
            err => {console.log( err)},
            );
          }
          else if(this.userForm.value.email.trim()!=localStorage.getItem("email")){
            this.registerService.checkUpdateUser(this.userForm.value).subscribe((res)=>{
              console.log(res);
              if(res['msg']=="Username Available"){
                this.submitted = false;
                this.registerService.SendOTPToMAIL(this.userForm.value.email.trim()).subscribe((res)=>{
                  if(res['msg']=="A Email change OTP is sent to your email Id"){
                    localStorage.setItem("secret_key",res['secret'])
                this.router.navigate(['/profile'],{ queryParams: { type: "emailVerify"} })
                console.log("sdada")
                }
                else{
                  this.buttonEnabler=false;
                  //email otp failed.
                  this.emailOTPFailed="aaa"
                }
                })
              }
              else{
                this.buttonEnabler=false;
                  if(res['msg']=="Email Already Exists"){
                  this.emailExistError="aaa";
                  return;
                }
                else if(res['msg']=="Invalid Email"){
                  this.emailError="aaaa"
                  return;
                }
                else{
                  this.emailExistError="aaa";
                  return;
                }
              }
            })
          }
          else{
            // if user clicks on update button withouth changing values
            this.changeAlert="aaa";
            this.buttonEnabler=false;
          }
        }
    }
  this.submitted = false;
}
  onSubmit1(){
  this.submitted1=true;
  this.buttonEnabler=true;

  if(this.addressForm.invalid == true)
  {
  this.buttonEnabler=false;
    return;
  }
  else if(this.addressForm.pristine){
    this.buttonEnabler=false;
    this.changeAlert1="aaa"
    return;
  }
  else{
    this.registerService.editAddress(this.addressForm.value).subscribe((res)=>{
     if(res=this.registerService.constants.success){
      this.submitted1 = false;
      this.buttonEnabler=false;
      this.enableEdit1=false;
      this.addressForm.markAsPristine()
      this.addressForm.disable()
      this.cd.detectChanges()
      this.showSuccess("ADDRESS")
     }
    })
  }

  this.changeAlert1="";


  }
  editable(){
    this.enableEdit=true;
   this.userForm.enable()

   this.enableEdit1=false;
   this.changeAlert=""
   this.changeAlert1=""
   this.addressForm.disable()
   this.reInitAddressForm()
  }
  editable1(){
    this.enableEdit1=true;
   this.addressForm.enable()

   this.enableEdit=false;
    this.changeAlert=""
    this.userForm.disable()
    this.reInitUserForm()
  }
  uneditable(){
    this.enableEdit=false;
    this.changeAlert=""

    this.userForm.disable()
    this.reInitUserForm()
    this.submitted=false;
  }
reInitUserForm(){
  this.userForm = this.formBuilder.group({
    name: [localStorage.getItem("UserName") ],  
    phone:[localStorage.getItem("phone"), Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
    email: [localStorage.getItem("email"), [Validators.required, Validators.email]],
   
  })
}
reInitAddressForm(){
 let  res =this.registerService.addresssObj

  this.addressForm = this.formBuilder.group({
    name: [res.name,Validators.compose([Validators.required ])],
    phone:[res.phone, Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
    pincode: [res.pincode, Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")])],
    address: [res.address, Validators.compose([Validators.required])],
    city: [res.city, Validators.compose([Validators.required])],
    state: [res.state, Validators.compose([Validators.required])]
  },
  )
  this.addressForm.markAsPristine()
}
uneditable1(){
  this.enableEdit1=false;
  this.changeAlert1=""
  this.addressForm.disable()
  this.reInitAddressForm()
  this.submitted1=false;
}
ngOnDestroy() {
  if(this.sub !=undefined){
  
  this.sub.unsubscribe();
  }
}
}
