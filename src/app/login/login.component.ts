import { Component, OnInit,OnDestroy, HostBinding, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../shared/login.Service'
import { Tokens } from '../shared/token.model';
import { AuthenticationService } from '../shared/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from '../custom-validators';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit  {

  constructor(private fb:FormBuilder,private loginService:LoginService,private authService:AuthenticationService,private router:Router,private modalService:NgbModal,private route:ActivatedRoute) { 

  }
  @Output() dismissError: EventEmitter<any> = new EventEmitter();
  loginForm:FormGroup;
  submitted = false;
  loggedIn=false;
  closeResult: string;
  loginPage =false;
  param:string="";
  ResetPass:string="";

 
  // myBackgroundImageUrl = './login/login.jpg'
 
//   @HostBinding('style.backgroundImage')
// getBackgroundImageUrl() {
//     return `url(${this.myBackgroundImageUrl})`
//   }

 dismissAlert() {
  this.dismissError.emit()
}

openBackDropCustomClass(content) {
  //console.log(content)
  this.modalService.open(content, {backdropClass: 'light-blue-backdrop',centered: true,backdrop: 'static'});
}
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
      password: ['', Validators.compose([Validators.required,Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ])],
      })
    
//after password reset navigating to login
    if(this.router.url.indexOf("resetPass")>0){
this.ResetPass="reset-password-success"
 this.loginForm.controls['username'].setValue(this.route.snapshot.queryParamMap.get('username'))
    }  

//if url has login i.e main login page
    if(this.router.url.indexOf("login")>0){
     this.loginPage =true;
    }

}

  PasswordkeyPress(event: any) {
    //to hide incorrect error message error
    this.param="";
    if (event.charCode==32) {
      event.preventDefault();
    }
  }
  UsernamekeyPress(event: any) {
    //to hide incorrect error message error
    this.param="";
    this.ResetPass="";
    const pattern = /[0-9a-zA-Z]/;
    const inputChar = String.fromCharCode(event.charCode);
    if ((event.key != 8 && !pattern.test(inputChar))||event.charCode==32) {
      event.preventDefault();
    }
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
// this.authService.featureSelected.emit("home")
      this.param="";
      this.loggedIn = true;
      this.loginService.LoginUser(this.loginForm.value).subscribe((res)=>{
        console.log(res)
this.authService.doLoginUser(res['userName'],res['token'])
// this.authService.featureSelected.emit("home")
localStorage.setItem("UserName", res['userName']);
localStorage.setItem("phone", res['phone']);
localStorage.setItem("email",res['email']);
this.authService.observableMethod();

     this.modalService.dismissAll()
     this.dismissAlert();

     if(this.loginPage){
      this.router.navigate(['/'])
     }
      }
      ,
   err => {

     if( err.error.msg=="Incorrect Password"){
this.param="incorrectPassword";
   }
   else if( err.error.msg=="User not exist in the Database"){

    this.param="invalidUsername";
       }
  },
      );
  	}
  }

}
              // in scripts array in angular.json
              // "node_modules/jquery/dist/jquery.min.js",
              // "node_modules/popper.js/dist/umd/popper.min.js",
              // "node_modules/bootstrap/dist/js/bootstrap.min.js"