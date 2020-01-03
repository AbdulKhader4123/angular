import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import{LoginService} from '../shared/login.Service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private loginService:LoginService) { }
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
        console.log(res);
      
      }
      );
  	}
  }
}
