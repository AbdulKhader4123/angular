import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { RegisterService } from '../shared/Register.service';
import { CustomValidators } from '../custom-validators';
import { stringify } from '@angular/compiler/src/util';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent implements OnInit {
  registered = false;
  submitted = false;
  userExistError ="";
  emailExistError="";
  emailError="";
  userForm: FormGroup;
  otpForm:FormGroup;
  data:object;
  param: string="register";
  constructor(private formBuilder: FormBuilder,private registerService:RegisterService,private authService:AuthenticationService,private router:Router)
  {

  }

  invalidUserName()
  {
  	return (this.submitted && this.userForm.value.name != "");
  }

  invalidPhone()
  {
  return (this.submitted && this.userForm.controls.phone.errors != null);
  }
  invalidEmail()
  {
  	return (this.submitted && this.userForm.controls.email.errors != null);
  }
  ChangeHandler(){
    this.userExistError="";
  }
  EmailHandler(){
    this.emailExistError="";
    this.emailError="";
  }

  invalidPassword()
  {
  	return (this.submitted && this.userForm.controls.password.errors != null);
  }
  invalidOTP()
  {
  	return (this.submitted && this.otpForm.controls.otpCode.errors != null );
  }

  ngOnInit()
  {
    this.otpForm=  this.formBuilder.group({
      // phonenumber:["", [Validators.required]],
      otpCode:["", [Validators.required]]
      })
  	this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone:['', Validators.compose([Validators.required,Validators.pattern("[0-9]{10}")])],
  		email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required,Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ])],
      confirmPassword: ['', Validators.compose([Validators.required])]
        
    },
    {
      // check whether our password and confirm password match
      validator: [CustomValidators.passwordMatchValidator]
   })
   if(this.router.url.indexOf("verifyphone")>0){
     this.param="Otp";
   }
  }
  PasswordkeyPress(event: any) {
    if (event.charCode==32) {
      event.preventDefault();
    }
  }
  UsernamekeyPress(event: any) {
    if (event.charCode==32) {
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
  otpkeyPress(event: any) {
    const pattern = /[0-9 ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if ((event.key != 8 && !pattern.test(inputChar))||event.charCode==32) {
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
  onSubmit()  
  {
    
    this.submitted = true;
    
  	if(this.userForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
      this.registerService.checkRegisterUser(this.userForm.value).subscribe((res)=>{
       // console.log(res);
        this.data=res;
        if(this.data['msg']=="Username Available"){
          this.param="Otp"
         this.submitted = false;

          this.userExistError="";
          this.registered = true;
           this.router.navigate(['/register'],{ queryParams: { verifyphone: this.userForm.value.phone} })
          this.registerService.SendOTPtoPhone(this.userForm.value.phone)
          .subscribe((res)=>{
           // console.log(res)
            if(res['message']=='OTP Sent successfully.'){
              localStorage.setItem("OTP_SessionId",res['SessionId']);
          this.router.navigate(['/register'],{ queryParams: { verifyphone: this.userForm.value.phone} })
            }
           },
           err => {console.log( err)},
           );
        }
        else{
          if(this.data['msg']=="Username Already Exists"){
            this.userExistError="aaa";
            return;
          }else if(this.data['msg']=="Email Already Exists"){
            this.emailExistError="aaa";
            return;
          }
          else if(this.data['msg']=="Invalid Email"){
            this.emailError="aaaa"
            return;
          }
          else{
            this.userExistError="aaa";
            this.emailExistError="aaa";
            return;
          }
        
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
  //  this.registerService.VerifyOTP(this.otpForm.value.otpCode,localStorage.getItem("OTP_SessionId")).subscribe((res)=>{
  //   if(res['message']=='OTP Verified successfully.'){
      this.submitted = false;
               this.registerService.postUser(this.userForm.value).subscribe((res)=>{
                console.log(res['msg'])
            if(res['msg']=="User sucessfully created"){
              console.log(res['msg'])
this.authService.doLoginUser(this.userForm.value.name,res['token'])
this.authService.observableMethod();
this.router.navigate(['/home'])
          //   }
          // });
   }
    
   },
   err => {console.log( err)},
   );
// th
  	}
  }
};