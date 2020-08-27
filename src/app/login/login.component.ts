import { Component, OnInit,ViewChild,ElementRef, ViewEncapsulation, EventEmitter, Output, ɵConsole, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../shared/login.Service'
import { AuthenticationService } from '../shared/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from '../custom-validators';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss'],
  

})
export class LoginComponent implements OnInit  {

  constructor(private fb:FormBuilder,private loginService:LoginService,private authService:AuthenticationService,private router:Router,private modalService:NgbModal,private route:ActivatedRoute) { 

  }
  @ViewChild('username',{static: false}) usernameInputRef :ElementRef;
  @ViewChild('content',{static: false}) content1InputRef :ElementRef;

  @Output() dismissError: EventEmitter<any> = new EventEmitter();
  @Input() parent;
  loginForm:FormGroup;
  submitted = false;
  loggedIn=false;
  closeResult: string;
  loginPage =false;
  param:string="";
  ResetPass:string="";
  obs:Subscription;
 
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
  this.modalService.open(content, {centered: true,backdrop: 'static'});
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
//     if(this.router.url.indexOf("PlaceOrder")>0){
//       //  this.modalService.open(this.content1InputRef, {centered: true,backdrop: 'static'});
//           }  
//if url has login i.e main login page
//    else 
   if(this.router.url.indexOf("login")>0){
     this.loginPage =true;
    }
   
   this.obs= this.authService.doLoginForOrderObs.subscribe((res)=>{
   this.modalService.open(this.content1InputRef, {centered: true,backdrop: 'static'});
    })
}

  showHidePass(){
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
    const pattern = /[0-9a-zA-Z@.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if ((event.key != 8 && !pattern.test(inputChar))||event.charCode==32) {
      event.preventDefault();
    }
  }
  Usernamekeyup(value: string) {
this.usernameInputRef.nativeElement.value=value.toLowerCase();
  }
  Usernamekeyup1(value: string) {
    //NOT WORKING FOR MODAL
   // this.usernameInputRef1.nativeElement.value=value.toLowerCase();
   this.loginForm.controls['username'].setValue(value.toLowerCase());
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
      this.param="";
      this.loggedIn = true;
      this.loginService.LoginUser(this.loginForm.value).subscribe((res)=>{
this.authService.doLoginUser(res['userName'],res['token'])
localStorage.setItem("UserName", res['userName']);
localStorage.setItem("phone", res['phone']);
localStorage.setItem("email",res['email']);
localStorage.setItem("role",res['role']);

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
  ngOnDestroy(){
    if(this.obs){
    this.obs.unsubscribe();

    }
}
}