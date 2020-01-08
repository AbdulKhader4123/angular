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

//   private UserNameExist(): ValidatorFn {
//     return (control: AbstractControl): {[key: string]: any} => {
//       this.registerService.checkUser((control.get('name').value).subscribe((res)=>{
//         this.data=res;
//       }))
//         if(this.data['msg']="Username Available"){
//           // this.userExistError=true;
//         return null;
//         }
//         else{
//           return {'AlreadyExist': true};
//           // this.userExistError=false;
//         } 
//     }
// }


  //  UserNameExist(control: AbstractControl) 
  // {
      
    // return this.userExistError;
  // }

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
  		email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required,Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ])],
      confirmPassword: [null, Validators.compose([Validators.required])]
        
    },
    {
      // check whether our password and confirm password match
      validator: [CustomValidators.passwordMatchValidator]
   })
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
        this.data=res;
        if(this.data['msg']=="Username Available"){
          this.userExistError="";
          this.registered = true;
          this.registerService.postUser(this.userForm.value).subscribe((res)=>{
            if(res['msg']=="User sucessfully created"){
this.authService.doLoginUser(this.userForm.value.name,res['token'])
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