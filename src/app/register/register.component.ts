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
  providers:[RegisterService]
})
export class RegisterComponent implements OnInit {
  registered = false;
  submitted = false;
  userExistError ="";
  userForm: FormGroup;
  data:object;

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
  

  invalidPassword()
  {
  	return (this.submitted && this.userForm.controls.password.errors != null);
  }

  ngOnInit()
  {
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
      this.registerService.checkUser(this.userForm.value.name).subscribe((res)=>{
        console.log(res);
        this.data=res;
        if(this.data['msg']=="Username Available"){
          this.userExistError="";
          this.registered = true;
          this.registerService.postUser(this.userForm.value).subscribe((res)=>{
         // console.log(res);
            if(res['msg']=="User sucessfully created"){
this.authService.doLoginUser(this.userForm.value.name,res['token'])
this.authService.observableMethod();
this.router.navigate(['/home'])

            }
          console.log(res);
          });
        }
        else{
        this.userExistError="aaa";
        return;
        }
      })
    }
  }
};