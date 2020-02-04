import { Component, OnInit,OnDestroy, HostBinding, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../shared/login.Service'
import { Tokens } from '../shared/token.model';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss'],
  providers:[LoginService,AuthenticationService]
})
export class LoginComponent implements OnInit  {

  constructor(private fb:FormBuilder,private loginService:LoginService,private authService:AuthenticationService,private router:Router,private modalService:NgbModal) { }
  @Output() dismissError: EventEmitter<any> = new EventEmitter();

  loginForm:FormGroup;
  submitted = false;
  loggedIn=false;
  closeResult: string;
  // myBackgroundImageUrl = './login/login.jpg'
 
//   @HostBinding('style.backgroundImage')
// getBackgroundImageUrl() {
//     return `url(${this.myBackgroundImageUrl})`
//   }

 dismissAlert() {
  this.dismissError.emit()
}

openBackDropCustomClass(content) {
  this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
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
// this.authService.featureSelected.emit("home")

      this.loggedIn = true;
      this.loginService.LoginUser(this.loginForm.value).subscribe((res)=>{
        console.log(res)
this.authService.doLoginUser(res['userName'],res['token'])
// this.authService.featureSelected.emit("home")

     this.modalService.dismissAll()
     this.dismissAlert();
// this.router.navigate(['/'])
// this.ngOnDestroy()
      }
      );
  	}
  }
//   ngOnDestroy() {
//     console.log("267")
// this.authService.featureSelected.emit("home")
    
//   }
}
              // in scripts array in angular.json
              // "node_modules/jquery/dist/jquery.min.js",
              // "node_modules/popper.js/dist/umd/popper.min.js",
              // "node_modules/bootstrap/dist/js/bootstrap.min.js"