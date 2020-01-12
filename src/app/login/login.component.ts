import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import{LoginService} from '../shared/login.Service'
import { Tokens } from '../shared/token.model';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService,AuthenticationService]
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private loginService:LoginService,private authService:AuthenticationService,private router:Router) { }
  loginForm:FormGroup;
  submitted = false;
  loggedIn=false;
 

  invalidUserName()
  {
  	return (this.submitted && this.loginForm.controls.username.errors != null);
  }

  invalidPassword()
  {
  	return (this.submitted && this.loginForm.controls.password.errors != null);
  }

  ngOnInit() {
this.loginForm=  this.fb.group({
username:["",Validators.required],
password:["",[Validators.required,Validators.minLength(5)]]
})
  }
  onSubmit()
  {
  	this.submitted = true;
  	if(this.loginForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
      this.loggedIn = true;
      this.loginService.LoginUser(this.loginForm.value).subscribe((res)=>{
        console.log(res)
this.authService.doLoginUser(res['userName'],res['token'])
        this.router.navigate(['/home'])
      
      }
      );
  	}
  }
  
}
