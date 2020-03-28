import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { RegisterService } from '../shared/Register.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit ,AfterViewInit {
  private sub: any;
  userForm: FormGroup;
  OTPForm:FormGroup;
  submitted = false;
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
  lblactive=true;
  editSuccess=false;
  //to disable button
  buttonEnabler=false;
  constructor(private formBuilder: FormBuilder,private registerService:RegisterService,private authService:AuthenticationService,private router:Router,private route: ActivatedRoute,private toastr: ToastrService)
  { 
  }

  ngOnInit() {
    this.loadScript('../assets/js/jquery.min.js');
   // this.loadScript('../assets/js/bootstrap.min.js');
    this.loadScript('../assets/js/mdb.min.js');
  let username= localStorage.getItem("UserName")
  let email =localStorage.getItem("email")
  let phone= localStorage.getItem("phone")
  this.userForm = this.formBuilder.group({
    name: [username ],
    phone:[phone, Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
    email: [email, [Validators.required, Validators.email]],
   
  },
  )
 
this.sub=  this.route.queryParams
.subscribe(params => {
  this.buttonEnabler=false;
  if(params["type"]!=undefined){
  this.param=params['type']

  }
  else{
this.param="profile"
if(this.editSuccess){
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
 });
 this.OTPForm=  this.formBuilder.group({
  phone:["",[Validators.required]],
    email:["",[Validators.required]]
  })
  this.emailtext=localStorage.getItem("form_email")
 this.phonetext= localStorage.getItem("form_phone")
  }

  ngAfterViewInit(){
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
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
  invalidEmail()
  {
  	return (this.submitted && this.userForm.controls.email.errors != null);
  }
  UsernamekeyPress(event: any) {
    if (event.charCode==32) {
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
  ChangeHandler(){
    this.changeAlert="";
   this.phoneOTPError=""

  }
  EmailHandler(){
    this.changeAlert="";
    this.emailExistError="";
    this.emailError="";
     this.emailOTPError=""
  }
  showSuccess() {
    this.toastr.success('Profile Updated Successfully',"",{timeOut: 3000});
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
        console.log(this.emailOTPError)
        if(res['msg']=='Email OTP Verified'){
          this.registerService.changeEmailPhone(localStorage.getItem("UserName"),localStorage.getItem("form_email"),localStorage.getItem("form_phone")).subscribe((res)=>{
            if(res['msg']="changed sucessfully"){
              //to set values
              this.param="profile"
              this.editSuccess=true;
              localStorage.setItem("email",localStorage.getItem("form_email"))
            this.router.navigate(['/profile']);
          
            }
           })
        }
        else{
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
            localStorage.setItem("phone",localStorage.getItem("form_phone"))
            this.router.navigate(['/profile']);
          
            }
           })
        }
        else{
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
              console.log("4353")
              this.emailOTPError="aaa"
            }
          })
        }
        else{
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
                            this.phoneOTPFailed="aaa"
                          }
                          },
                          err => {console.log( err)},
                          );
                  }
                  else{
                    //email otp failed.
                    this.emailOTPFailed="aaa"
                  }
                  })
        }
        else{
          console.log("error")
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
  },
  err => {console.log( err)},
  );
      }
      else if(this.userForm.value.email.trim()!=localStorage.getItem("email")){
        this.registerService.checkUpdateUser(this.userForm.value).subscribe((res)=>{
          // console.log(res);
           if(res['msg']=="Username Available"){
            this.submitted = false;
            this.registerService.SendOTPToMAIL(this.userForm.value.email.trim()).subscribe((res)=>{
              if(res['msg']=="A Email change OTP is sent to your email Id"){
                localStorage.setItem("secret_key",res['secret'])
             this.router.navigate(['/profile'],{ queryParams: { type: "emailVerify"} })
            }
            })
           }
           else{
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
      }
    }
  }
   this.submitted = false;
  }
  ngOnDestroy() {
    if(this.sub !=undefined){
    
    this.sub.unsubscribe();
    }
  }
}
