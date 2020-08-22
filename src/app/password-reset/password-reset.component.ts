import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../shared/Register.service';
import { CustomValidators } from '../custom-validators';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers:[RegisterService]
})
export class PasswordResetComponent implements OnInit {
  param: string="Options";
  submitted = false;
  userExistError ="";
  tokenCheck=false;
  token:string="";
  phoneNumber:string;
  UserNameForPhone:string="";
private sub: any;
phoneForm:FormGroup;
emailForm:FormGroup;
otpForm:FormGroup;
confirmPasswordForm:FormGroup;
data:object;
  constructor(private fb:FormBuilder,private route: ActivatedRoute,private router: Router ,private registerService:RegisterService) { 
   
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
          return false;
  }
}

  ngOnInit() {
    this.userExistError=""
    this.phoneForm=  this.fb.group({
      // phonenumber:["", [Validators.required]],
      email:["", [Validators.required]]
      })
      this.otpForm=  this.fb.group({
        // phonenumber:["", [Validators.required]],
        otpCode:["", [Validators.required]]
        })
      this.emailForm=  this.fb.group({
        email:["", [Validators.required, Validators.email]]
        })
        this.confirmPasswordForm= this.fb.group({
          password: ['', Validators.compose([Validators.required,Validators.minLength(8),
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          ])],
          confirmPassword: ["", Validators.compose([Validators.required])]
            
          },
          {
            // check whether our password and confirm password match
            validator: [CustomValidators.passwordMatchValidator]
         })
         
    if(this.router.url.indexOf("response-reset-password")>0){
   console.log(this.router.url)
   this.param= "reset-password";
   this.token=this.route.snapshot.paramMap.get('id');
   //console.log(this.route.snapshot.paramMap.get('id'));
  this.registerService.ValidateToken( this.token).subscribe((res)=>{
    if(res['message']=="Token verified successfully."){
this.tokenCheck=true;
    }
  });
     }

    if(this.router.url.indexOf("reset-options")>0){

    this.sub=  this.route.queryParams
    .subscribe(params => {
    this.param=params['type'];
    console.log(params['type'])
     });
    }
     
  }
  invalidOTP()
  {
  	return (this.submitted && this.otpForm.controls.otpCode.errors != null );
  }
  invalidUserName()
  {
  	return (this.submitted && this.phoneForm.controls.email.errors != null );
  }
  // invalidphonenumber()
  // {
  // 	return (this.submitted && this.phoneForm.controls.phonenumber.errors != null);
  // }
  invalidEmail()
  {
  	return (this.submitted && this.emailForm.controls.email.errors != null);
  }
  invalidPassword()
  {
  	return (this.submitted && this.confirmPasswordForm.controls.password.errors != null);
  }
  keyPress(event: any) {
    const pattern = /[0-9 ]/;
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
  UsernamekeyPress(event: any) {
    if (event.charCode==32) {
      event.preventDefault();
    }
  }
  PasswordkeyPress(event: any) {
    if (event.charCode==32) {
      event.preventDefault();
    }
  }
  ChangeHandler(){
    this.userExistError="";
  }
  onPaste(event: ClipboardEvent) {
    const pattern = /^-?(0|[1-9]\d*)?$/;
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
  }
  onInput(password:any){
  }
  onPhoneSubmit()
  {
    this.userExistError="";
  	this.submitted = true;
  	if(this.phoneForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
this.UserNameForPhone=this.phoneForm.value.email;
      this.registerService.checkUser(this.phoneForm.value.email).subscribe((res)=>{
        console.log(res);
        this.data=res;
        if(this.data['msg']=="Username Available"){
          this.userExistError="aaa";
          return;
        }
        else{
          this.registerService.SendOTPtoPhone(this.data['phone'])
          .subscribe((res)=>{
            console.log(res)
            if(res['message']=='OTP Sent successfully.'){
              this.submitted = false;
              localStorage.setItem("OTP_SessionId",res['SessionId']);
              this.param='phoneSuccess';
            }
           },
           err => {console.log( err)},
           );
        }
      })
  	}
  }
  onOTPSubmit(){
    this.submitted = true;
    
  	if(this.otpForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
     // console.log(this.emailForm.value.email)
   this.registerService.VerifyOTP(this.otpForm.value.otpCode,localStorage.getItem("OTP_SessionId")).subscribe((res)=>{
    if(res['message']=='OTP Verified successfully.'){
      this.submitted = false;
      this.param='reset-password';
   }
    console.log(res)
    
   },
   err => {console.log( err)},
   );
// th
  	}
  }
  onEmailSubmit()
  {
    this.submitted = true;
    
  	if(this.emailForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
   this.registerService.SendPasswordToMAIL(this.emailForm.value.email).subscribe((res)=>{
     console.log(res)
   },
   err => {console.log( err)},
   );
   this.param='emailSuccess';
// th
  	}
  }

  onConfirmPasswordSubmit(){
    this.submitted = true;
    
  	if(this.confirmPasswordForm.invalid == true)
  	{
  		return;
    }
    else if(this.UserNameForPhone!=""){
      this.registerService.ChangePasswordByPhone( this.UserNameForPhone,this.confirmPasswordForm.value.password).subscribe((res)=>{
        if(res['msg']=="Password changed sucessfully"){
          // this.param= "reset-password-success";
          this.router.navigate(['/login'], { queryParams: { resetPass: "Success",username:res['username'] }})
        }
              })
    }
  	else
  	{
      this.registerService.ChangePassword( this.token,this.confirmPasswordForm.value.password).subscribe((res)=>{
if(res['msg']=="Password changed sucessfully"){
  // this.param= "reset-password-success";
  this.router.navigate(['/login'], { queryParams: { resetPass: "Success",username:res['username'] }})
}
      })
          
      
    }
  }
  ngAfterViewInit(){
    if(document.getElementById("icon")!=undefined){
      document.getElementById("icon").addEventListener("click", () => {
  
      if(document.getElementById("icon").classList.contains("fa-eye-slash")){
        document.getElementById("password").setAttribute("type","text")
        document.getElementById("icon").classList.add("fa-eye")
        document.getElementById("icon").classList.remove("fa-eye-slash")
      }
      else{
        document.getElementById("password").setAttribute("type","password")
        document.getElementById("icon").classList.add("fa-eye-slash")
        document.getElementById("icon").classList.remove("fa-eye")
      }
    });
  }
  }

  // unsubscribe to avoid memory leaks
ngOnDestroy() {
  if(this.sub !=undefined){
  
  this.sub.unsubscribe();
  }
}

}
