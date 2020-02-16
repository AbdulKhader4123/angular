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
  tokenCheck=false;
  token:string="";
private sub: any;
phoneForm:FormGroup;
emailForm:FormGroup;
confirmPasswordForm:FormGroup;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,private router: Router ,private registerService:RegisterService) { 
   
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
          return false;
  }
}

  ngOnInit() {
    this.phoneForm=  this.fb.group({
      phonenumber:["", [Validators.required]]
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
  invalidphonenumber()
  {
  	return (this.submitted && this.phoneForm.controls.phonenumber.errors != null);
  }
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

  PasswordkeyPress(event: any) {
    if (event.charCode==32) {
      event.preventDefault();
    }
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
  	this.submitted = true;
  	if(this.phoneForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
// this.authService.featureSelected.emit("home")

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
      console.log(this.emailForm.value.email)
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
  // unsubscribe to avoid memory leaks
ngOnDestroy() {
  if(this.sub !=undefined){
  
  this.sub.unsubscribe();
  }
}

}
