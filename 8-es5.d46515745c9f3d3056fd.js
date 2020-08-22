(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"2Gap":function(l,n,u){"use strict";u.r(n);var e=u("8Y7J");class s{}var t=u("pMnS"),r=u("s7LF"),o=u("SVse"),a=u("tGwE"),i=u("lmlb"),d=u("kedu");class b{constructor(l,n,u,e){this.formBuilder=l,this.registerService=n,this.authService=u,this.router=e,this.registered=!1,this.submitted=!1,this.userExistError="",this.emailExistError="",this.emailError="",this.param="register"}invalidUserName(){return this.submitted&&""!=this.userForm.value.name}invalidPhone(){return this.submitted&&null!=this.userForm.controls.phone.errors}invalidEmail(){return this.submitted&&null!=this.userForm.controls.email.errors}Usernamekeyup(l){this.userExistError="",this.usernameInputRef.nativeElement.value=l.toLowerCase()}EmailHandler(){this.emailExistError="",this.emailError=""}invalidPassword(){return this.submitted&&null!=this.userForm.controls.password.errors}invalidOTP(){return this.submitted&&null!=this.otpForm.controls.otpCode.errors}ngOnInit(){this.otpForm=this.formBuilder.group({otpCode:["",[r.q.required]]}),this.userForm=this.formBuilder.group({name:["",r.q.required],phone:["",r.q.compose([r.q.required,r.q.pattern("[0-9]{10}")])],email:["",[r.q.required,r.q.email]],password:["",r.q.compose([r.q.required,r.q.minLength(8),i.a.patternValidator(/\d/,{hasNumber:!0}),i.a.patternValidator(/[A-Z]/,{hasCapitalCase:!0}),i.a.patternValidator(/[a-z]/,{hasSmallCase:!0})])],confirmPassword:["",r.q.compose([r.q.required])]},{validator:[i.a.passwordMatchValidator]}),this.router.url.indexOf("verifyphone")>0&&(this.param="Otp")}ngAfterViewInit(){null!=document.getElementById("icon")&&document.getElementById("icon").addEventListener("click",()=>{document.getElementById("icon").classList.contains("fa-eye-slash")?(document.getElementById("password").setAttribute("type","text"),document.getElementById("icon").classList.add("fa-eye"),document.getElementById("icon").classList.remove("fa-eye-slash")):(document.getElementById("password").setAttribute("type","password"),document.getElementById("icon").classList.add("fa-eye-slash"),document.getElementById("icon").classList.remove("fa-eye"))})}PasswordkeyPress(l){32==l.charCode&&l.preventDefault()}UsernamekeyPress(l){const n=String.fromCharCode(l.charCode);(8!=l.key&&!/[0-9a-zA-Z@.]/.test(n)||32==l.charCode)&&l.preventDefault()}PhonekeyPress(l){32==l.charCode&&l.preventDefault();let n=String.fromCharCode(l.charCode);8==l.keyCode||/[0-9]/.test(n)||l.preventDefault()}otpkeyPress(l){const n=String.fromCharCode(l.charCode);(8!=l.key&&!/[0-9 ]/.test(n)||32==l.charCode)&&l.preventDefault()}onPaste(l){let n=l.clipboardData.getData("text");console.log(n),/^[0-9]*$/.test(n)||l.preventDefault()}onemailPaste(l){let n=l.clipboardData.getData("text");console.log(n),/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(n)||l.preventDefault()}onSubmit(){this.submitted=!0,1!=this.userForm.invalid&&this.registerService.checkRegisterUser(this.userForm.value).subscribe(l=>{if(this.data=l,"Username Available"!=this.data.msg)return"Username Already Exists"==this.data.msg?void(this.userExistError="aaa"):"Email Already Exists"==this.data.msg?void(this.emailExistError="aaa"):"Invalid Email"==this.data.msg?void(this.emailError="aaaa"):(this.userExistError="aaa",void(this.emailExistError="aaa"));this.param="Otp",this.submitted=!1,this.userExistError="",this.registered=!0,this.router.navigate(["/register"],{queryParams:{verifyphone:this.userForm.value.phone}}),this.registerService.SendOTPtoPhone(this.userForm.value.phone).subscribe(l=>{"OTP Sent successfully."==l.message&&(localStorage.setItem("OTP_SessionId",l.SessionId),this.router.navigate(["/register"],{queryParams:{verifyphone:this.userForm.value.phone}}))},l=>{console.log(l)})})}onOTPSubmit(){this.submitted=!0,1!=this.otpForm.invalid&&(this.submitted=!1,this.registerService.postUser(this.userForm.value).subscribe(l=>{console.log(l.msg),"User sucessfully created"==l.msg&&(console.log(l.msg),this.authService.doLoginUser(this.userForm.value.name,l.token),this.authService.observableMethod(),this.router.navigate(["/home"]))},l=>{console.log(l)}))}}var c=u("iInd"),m=e.ob({encapsulation:0,styles:[["@media screen and (max-width:500px){.column[_ngcontent-%COMP%]{margin-top:25%}}@media screen and (min-width:500px) and (max-width:800px){.column[_ngcontent-%COMP%]{margin-top:15%}}@media screen and (min-width:1000px){.column[_ngcontent-%COMP%]{margin-top:7%}}"]],data:{}});function p(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","userName_error"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["User name is required."]))],null,null)}function g(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","userName_error1"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["User name already exists."]))],null,null)}function h(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","email_error"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Invalid email address."]))],null,null)}function C(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","email_error"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Email is required."]))],null,null)}function f(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","email_error1"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Email already Registered."]))],null,null)}function v(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","email_error2"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Invalid Email."]))],null,null)}function y(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","phone_error"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Invalid phone #"]))],null,null)}function q(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","phone_error"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Phone # is required."]))],null,null)}function k(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["id","password_error"],["style"," width: 100%;margin-top: .25rem;font-size: 80%;color: #dc3545;"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Invalid password."]))],null,null)}function E(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["id","confirmPassword_error1"],["style"," width: 100%;margin-top: .25rem;font-size: 80%;color: #dc3545;"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Password do not match."]))],null,null)}function P(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,96,"div",[["class","row column"]],null,null,null,null,null)),(l()(),e.qb(1,0,null,null,0,"div",[["class","col-md-4"]],null,null,null,null,null)),(l()(),e.qb(2,0,null,null,94,"div",[["class","col-md-4"]],null,null,null,null,null)),(l()(),e.qb(3,0,null,null,93,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(l,n,u){var s=!0,t=l.component;return"submit"===n&&(s=!1!==e.Cb(l,5).onSubmit(u)&&s),"reset"===n&&(s=!1!==e.Cb(l,5).onReset()&&s),"ngSubmit"===n&&(s=!1!==t.onSubmit()&&s),s}),null,null)),e.pb(4,16384,null,0,r.v,[],null,null),e.pb(5,540672,null,0,r.f,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),e.Gb(2048,null,r.b,null,[r.f]),e.pb(7,16384,null,0,r.n,[[4,r.b]],null,null),(l()(),e.qb(8,0,null,null,15,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.qb(9,0,null,null,1,"label",[["class","control-label"],["for","name"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["UserName"])),(l()(),e.qb(11,0,[[1,0],["username",1]],null,8,"input",[["class","form-control"],["formControlName","name"],["id","name"],["name","name"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keyup"],[null,"keypress"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var s=!0,t=l.component;return"input"===n&&(s=!1!==e.Cb(l,12)._handleInput(u.target.value)&&s),"blur"===n&&(s=!1!==e.Cb(l,12).onTouched()&&s),"compositionstart"===n&&(s=!1!==e.Cb(l,12)._compositionStart()&&s),"compositionend"===n&&(s=!1!==e.Cb(l,12)._compositionEnd(u.target.value)&&s),"keyup"===n&&(s=!1!==t.Usernamekeyup(e.Cb(l,11).value)&&s),"keypress"===n&&(s=!1!==t.UsernamekeyPress(u)&&s),s}),null,null)),e.pb(12,16384,null,0,r.c,[e.C,e.k,[2,r.a]],null,null),e.Gb(1024,null,r.k,(function(l){return[l]}),[r.c]),e.pb(14,671744,null,0,r.e,[[3,r.b],[8,null],[8,null],[6,r.k],[2,r.t]],{name:[0,"name"]},null),e.Gb(2048,null,r.l,null,[r.e]),e.pb(16,16384,null,0,r.m,[[4,r.l]],null,null),e.Gb(512,null,o.A,o.B,[e.r,e.s,e.k,e.C]),e.pb(18,278528,null,0,o.j,[o.A],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Eb(19,{"is-invalid":0}),(l()(),e.fb(16777216,null,null,1,null,p)),e.pb(21,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.fb(16777216,null,null,1,null,g)),e.pb(23,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.qb(24,0,null,null,19,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.qb(25,0,null,null,1,"label",[["class","control-label"],["for","email"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["E-mail"])),(l()(),e.qb(27,0,null,null,8,"input",[["class","form-control"],["formControlName","email"],["id","email"],["name","email"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keyup"],[null,"keypress"],[null,"paste"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var s=!0,t=l.component;return"input"===n&&(s=!1!==e.Cb(l,28)._handleInput(u.target.value)&&s),"blur"===n&&(s=!1!==e.Cb(l,28).onTouched()&&s),"compositionstart"===n&&(s=!1!==e.Cb(l,28)._compositionStart()&&s),"compositionend"===n&&(s=!1!==e.Cb(l,28)._compositionEnd(u.target.value)&&s),"keyup"===n&&(s=!1!==t.EmailHandler()&&s),"keypress"===n&&(s=!1!==t.UsernamekeyPress(u)&&s),"paste"===n&&(s=!1!==t.onemailPaste(u)&&s),s}),null,null)),e.pb(28,16384,null,0,r.c,[e.C,e.k,[2,r.a]],null,null),e.Gb(1024,null,r.k,(function(l){return[l]}),[r.c]),e.pb(30,671744,null,0,r.e,[[3,r.b],[8,null],[8,null],[6,r.k],[2,r.t]],{name:[0,"name"]},null),e.Gb(2048,null,r.l,null,[r.e]),e.pb(32,16384,null,0,r.m,[[4,r.l]],null,null),e.Gb(512,null,o.A,o.B,[e.r,e.s,e.k,e.C]),e.pb(34,278528,null,0,o.j,[o.A],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Eb(35,{"is-invalid":0}),(l()(),e.fb(16777216,null,null,1,null,h)),e.pb(37,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.fb(16777216,null,null,1,null,C)),e.pb(39,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.fb(16777216,null,null,1,null,f)),e.pb(41,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.fb(16777216,null,null,1,null,v)),e.pb(43,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.qb(44,0,null,null,18,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.qb(45,0,null,null,1,"label",[["class","control-label"],["for","phone"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Phone #"])),(l()(),e.qb(47,0,null,null,11,"input",[["class","form-control"],["formControlName","phone"],["id","phone"],["maxlength","10"],["minlength","10"],["name","phone"],["type","text"]],[[1,"minlength",0],[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keypress"],[null,"paste"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var s=!0,t=l.component;return"input"===n&&(s=!1!==e.Cb(l,48)._handleInput(u.target.value)&&s),"blur"===n&&(s=!1!==e.Cb(l,48).onTouched()&&s),"compositionstart"===n&&(s=!1!==e.Cb(l,48)._compositionStart()&&s),"compositionend"===n&&(s=!1!==e.Cb(l,48)._compositionEnd(u.target.value)&&s),"keypress"===n&&(s=!1!==t.PhonekeyPress(u)&&s),"paste"===n&&(s=!1!==t.onPaste(u)&&s),s}),null,null)),e.pb(48,16384,null,0,r.c,[e.C,e.k,[2,r.a]],null,null),e.pb(49,540672,null,0,r.i,[],{minlength:[0,"minlength"]},null),e.pb(50,540672,null,0,r.h,[],{maxlength:[0,"maxlength"]},null),e.Gb(1024,null,r.j,(function(l,n){return[l,n]}),[r.i,r.h]),e.Gb(1024,null,r.k,(function(l){return[l]}),[r.c]),e.pb(53,671744,null,0,r.e,[[3,r.b],[6,r.j],[8,null],[6,r.k],[2,r.t]],{name:[0,"name"]},null),e.Gb(2048,null,r.l,null,[r.e]),e.pb(55,16384,null,0,r.m,[[4,r.l]],null,null),e.Gb(512,null,o.A,o.B,[e.r,e.s,e.k,e.C]),e.pb(57,278528,null,0,o.j,[o.A],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Eb(58,{"is-invalid":0}),(l()(),e.fb(16777216,null,null,1,null,y)),e.pb(60,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.fb(16777216,null,null,1,null,q)),e.pb(62,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.qb(63,0,null,null,15,"div",[["class","form-group user-box"]],null,null,null,null,null)),(l()(),e.qb(64,0,null,null,1,"label",[["class","control-label"],["for","password"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Password"])),(l()(),e.qb(66,0,null,null,8,"input",[["autocomplete","off"],["class","form-control"],["formControlName","password"],["id","password"],["name","password"],["title","Password Must contain Atleast one Upper-case,lower-case,numeric letter & should be min 8 characters"],["type","password"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keypress"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var s=!0,t=l.component;return"input"===n&&(s=!1!==e.Cb(l,67)._handleInput(u.target.value)&&s),"blur"===n&&(s=!1!==e.Cb(l,67).onTouched()&&s),"compositionstart"===n&&(s=!1!==e.Cb(l,67)._compositionStart()&&s),"compositionend"===n&&(s=!1!==e.Cb(l,67)._compositionEnd(u.target.value)&&s),"keypress"===n&&(s=!1!==t.PasswordkeyPress(u)&&s),s}),null,null)),e.pb(67,16384,null,0,r.c,[e.C,e.k,[2,r.a]],null,null),e.Gb(1024,null,r.k,(function(l){return[l]}),[r.c]),e.pb(69,671744,null,0,r.e,[[3,r.b],[8,null],[8,null],[6,r.k],[2,r.t]],{name:[0,"name"]},null),e.Gb(2048,null,r.l,null,[r.e]),e.pb(71,16384,null,0,r.m,[[4,r.l]],null,null),e.Gb(512,null,o.A,o.B,[e.r,e.s,e.k,e.C]),e.pb(73,278528,null,0,o.j,[o.A],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Eb(74,{"is-invalid":0}),(l()(),e.qb(75,0,null,null,1,"span",[["class","icon"]],null,null,null,null,null)),(l()(),e.qb(76,0,null,null,0,"i",[["aria-hidden","true"],["class","fa  fa-eye-slash"],["id","icon"]],null,null,null,null,null)),(l()(),e.fb(16777216,null,null,1,null,k)),e.pb(78,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.qb(79,0,null,null,13,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.qb(80,0,null,null,1,"label",[["class","control-label"],["for","confirmPassword"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Confirm Password"])),(l()(),e.qb(82,0,null,null,8,"input",[["autocomplete","off"],["class","form-control"],["formControlName","confirmPassword"],["id","confirmPassword"],["name","confirmPassword"],["type","password"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keypress"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var s=!0,t=l.component;return"input"===n&&(s=!1!==e.Cb(l,83)._handleInput(u.target.value)&&s),"blur"===n&&(s=!1!==e.Cb(l,83).onTouched()&&s),"compositionstart"===n&&(s=!1!==e.Cb(l,83)._compositionStart()&&s),"compositionend"===n&&(s=!1!==e.Cb(l,83)._compositionEnd(u.target.value)&&s),"keypress"===n&&(s=!1!==t.PasswordkeyPress(u)&&s),s}),null,null)),e.pb(83,16384,null,0,r.c,[e.C,e.k,[2,r.a]],null,null),e.Gb(1024,null,r.k,(function(l){return[l]}),[r.c]),e.pb(85,671744,null,0,r.e,[[3,r.b],[8,null],[8,null],[6,r.k],[2,r.t]],{name:[0,"name"]},null),e.Gb(2048,null,r.l,null,[r.e]),e.pb(87,16384,null,0,r.m,[[4,r.l]],null,null),e.Gb(512,null,o.A,o.B,[e.r,e.s,e.k,e.C]),e.pb(89,278528,null,0,o.j,[o.A],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Eb(90,{"is-invalid":0}),(l()(),e.fb(16777216,null,null,1,null,E)),e.pb(92,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.qb(93,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.qb(94,0,null,null,2,"div",[["class","form-group is-invalid"],["style","text-align:center"]],null,null,null,null,null)),(l()(),e.qb(95,0,null,null,1,"button",[["class","btn btn-primary"],["type","submit"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Register"]))],(function(l,n){var u=n.component;l(n,5,0,u.userForm),l(n,14,0,"name");var e=l(n,19,0,(u.userForm.controls.name.hasError("required")||""!=u.userExistError)&&u.submitted);l(n,18,0,"form-control",e),l(n,21,0,u.userForm.controls.name.hasError("required")&&u.submitted),l(n,23,0,""!=u.userExistError&&!u.userForm.controls.name.hasError("required")),l(n,30,0,"email");var s=l(n,35,0,u.invalidEmail()||""!=u.emailExistError||""!=u.emailError);l(n,34,0,"form-control",s),l(n,37,0,u.invalidEmail()&&!u.userForm.controls.email.hasError("required")),l(n,39,0,u.userForm.controls.email.hasError("required")),l(n,41,0,""!=u.emailExistError&&!u.userForm.controls.email.hasError("required")),l(n,43,0,""!=u.emailError&&!u.userForm.controls.email.hasError("required")),l(n,49,0,"10"),l(n,50,0,"10"),l(n,53,0,"phone");var t=l(n,58,0,u.invalidPhone());l(n,57,0,"form-control",t),l(n,60,0,u.invalidPhone()&&!u.userForm.controls.phone.hasError("required")),l(n,62,0,u.userForm.controls.phone.hasError("required")),l(n,69,0,"password");var r=l(n,74,0,u.invalidPassword());l(n,73,0,"form-control",r),l(n,78,0,u.invalidPassword()),l(n,85,0,"confirmPassword");var o=l(n,90,0,u.userForm.controls.confirmPassword.hasError("NoPassswordMatch")&&u.submitted);l(n,89,0,"form-control",o),l(n,92,0,u.userForm.controls.confirmPassword.hasError("NoPassswordMatch"))}),(function(l,n){l(n,3,0,e.Cb(n,7).ngClassUntouched,e.Cb(n,7).ngClassTouched,e.Cb(n,7).ngClassPristine,e.Cb(n,7).ngClassDirty,e.Cb(n,7).ngClassValid,e.Cb(n,7).ngClassInvalid,e.Cb(n,7).ngClassPending),l(n,11,0,e.Cb(n,16).ngClassUntouched,e.Cb(n,16).ngClassTouched,e.Cb(n,16).ngClassPristine,e.Cb(n,16).ngClassDirty,e.Cb(n,16).ngClassValid,e.Cb(n,16).ngClassInvalid,e.Cb(n,16).ngClassPending),l(n,27,0,e.Cb(n,32).ngClassUntouched,e.Cb(n,32).ngClassTouched,e.Cb(n,32).ngClassPristine,e.Cb(n,32).ngClassDirty,e.Cb(n,32).ngClassValid,e.Cb(n,32).ngClassInvalid,e.Cb(n,32).ngClassPending),l(n,47,0,e.Cb(n,49).minlength?e.Cb(n,49).minlength:null,e.Cb(n,50).maxlength?e.Cb(n,50).maxlength:null,e.Cb(n,55).ngClassUntouched,e.Cb(n,55).ngClassTouched,e.Cb(n,55).ngClassPristine,e.Cb(n,55).ngClassDirty,e.Cb(n,55).ngClassValid,e.Cb(n,55).ngClassInvalid,e.Cb(n,55).ngClassPending),l(n,66,0,e.Cb(n,71).ngClassUntouched,e.Cb(n,71).ngClassTouched,e.Cb(n,71).ngClassPristine,e.Cb(n,71).ngClassDirty,e.Cb(n,71).ngClassValid,e.Cb(n,71).ngClassInvalid,e.Cb(n,71).ngClassPending),l(n,82,0,e.Cb(n,87).ngClassUntouched,e.Cb(n,87).ngClassTouched,e.Cb(n,87).ngClassPristine,e.Cb(n,87).ngClassDirty,e.Cb(n,87).ngClassValid,e.Cb(n,87).ngClassInvalid,e.Cb(n,87).ngClassPending)}))}function I(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"p",[["class","invalid-feedback"],["id","OTP_error"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Invalid OTP."]))],null,null)}function w(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,32,"div",[["class","row"],["style","margin-top: 70px;margin-right:10px;margin-left:5px"]],null,null,null,null,null)),(l()(),e.qb(1,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.qb(2,0,null,null,0,"div",[["class","col-md-4"]],null,null,null,null,null)),(l()(),e.qb(3,0,null,null,29,"div",[["class","col-md-4"]],null,null,null,null,null)),(l()(),e.qb(4,0,null,null,28,"div",[["class","card card-outline-secondary"]],null,null,null,null,null)),(l()(),e.qb(5,0,null,null,27,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.qb(6,0,null,null,1,"h5",[["class","mb-0"],["style","text-align:center"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Login verification"])),(l()(),e.qb(8,0,null,null,1,"p",[["style","font-size:14px;text-align:center;padding-top: 4%"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["We sent a verification code to"])),(l()(),e.qb(10,0,null,null,1,"p",[["style","font-size:14px;text-align:center;padding-top: 3%"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Please check your phone for a text message with your code. Your code is 6 characters in length..."])),(l()(),e.qb(12,0,null,null,20,"div",[["style","Padding-top: 4%;"]],null,null,null,null,null)),(l()(),e.qb(13,0,null,null,19,"form",[["autocomplete","off"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(l,n,u){var s=!0,t=l.component;return"submit"===n&&(s=!1!==e.Cb(l,15).onSubmit(u)&&s),"reset"===n&&(s=!1!==e.Cb(l,15).onReset()&&s),"ngSubmit"===n&&(s=!1!==t.onOTPSubmit()&&s),s}),null,null)),e.pb(14,16384,null,0,r.v,[],null,null),e.pb(15,540672,null,0,r.f,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),e.Gb(2048,null,r.b,null,[r.f]),e.pb(17,16384,null,0,r.n,[[4,r.b]],null,null),(l()(),e.qb(18,0,null,null,11,"div",[["class","form-group"],["style","padding-left: 12%;padding-right: 12%"]],null,null,null,null,null)),(l()(),e.qb(19,0,null,null,8,"input",[["class","form-control"],["formControlName","otpCode"],["id","otpCode"],["name","otpCode"],["placeholder","Enter Code"],["title","Received OTP. "],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keypress"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var s=!0,t=l.component;return"input"===n&&(s=!1!==e.Cb(l,20)._handleInput(u.target.value)&&s),"blur"===n&&(s=!1!==e.Cb(l,20).onTouched()&&s),"compositionstart"===n&&(s=!1!==e.Cb(l,20)._compositionStart()&&s),"compositionend"===n&&(s=!1!==e.Cb(l,20)._compositionEnd(u.target.value)&&s),"keypress"===n&&(s=!1!==t.otpkeyPress(u)&&s),s}),null,null)),e.pb(20,16384,null,0,r.c,[e.C,e.k,[2,r.a]],null,null),e.Gb(1024,null,r.k,(function(l){return[l]}),[r.c]),e.pb(22,671744,null,0,r.e,[[3,r.b],[8,null],[8,null],[6,r.k],[2,r.t]],{name:[0,"name"]},null),e.Gb(2048,null,r.l,null,[r.e]),e.pb(24,16384,null,0,r.m,[[4,r.l]],null,null),e.Gb(512,null,o.A,o.B,[e.r,e.s,e.k,e.C]),e.pb(26,278528,null,0,o.j,[o.A],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Eb(27,{"is-invalid":0}),(l()(),e.fb(16777216,null,null,1,null,I)),e.pb(29,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.qb(30,0,null,null,2,"div",[["style","text-align:center;padding-top:3%"]],null,null,null,null,null)),(l()(),e.qb(31,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","submit"]],null,null,null,null,null)),(l()(),e.Jb(-1,null,["Submit"]))],(function(l,n){var u=n.component;l(n,15,0,u.otpForm),l(n,22,0,"otpCode");var e=l(n,27,0,u.invalidOTP()&&u.submitted);l(n,26,0,"form-control",e),l(n,29,0,u.invalidOTP())}),(function(l,n){l(n,13,0,e.Cb(n,17).ngClassUntouched,e.Cb(n,17).ngClassTouched,e.Cb(n,17).ngClassPristine,e.Cb(n,17).ngClassDirty,e.Cb(n,17).ngClassValid,e.Cb(n,17).ngClassInvalid,e.Cb(n,17).ngClassPending),l(n,19,0,e.Cb(n,24).ngClassUntouched,e.Cb(n,24).ngClassTouched,e.Cb(n,24).ngClassPristine,e.Cb(n,24).ngClassDirty,e.Cb(n,24).ngClassValid,e.Cb(n,24).ngClassInvalid,e.Cb(n,24).ngClassPending)}))}function x(l){return e.Lb(0,[e.Hb(671088640,1,{usernameInputRef:0}),(l()(),e.qb(1,0,null,null,4,"div",[["class","container"]],null,null,null,null,null)),(l()(),e.fb(16777216,null,null,1,null,P)),e.pb(3,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),(l()(),e.fb(16777216,null,null,1,null,w)),e.pb(5,16384,null,0,o.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,3,0,"register"==u.param),l(n,5,0,"Otp"==u.param)}),null)}var S=e.mb("app-register",b,(function(l){return e.Lb(0,[(l()(),e.qb(0,0,null,null,1,"app-register",[],null,null,null,x,m)),e.pb(1,4308992,null,0,b,[r.d,a.a,d.a,c.o],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),A=u("fTs2");class _{}u.d(n,"RegstrLognModuleNgFactory",(function(){return F}));var F=e.nb(s,[],(function(l){return e.zb([e.Ab(512,e.j,e.Y,[[8,[t.a,S]],[3,e.j],e.w]),e.Ab(4608,r.s,r.s,[]),e.Ab(4608,r.d,r.d,[]),e.Ab(4608,o.n,o.m,[e.t,[2,o.D]]),e.Ab(1073742336,r.r,r.r,[]),e.Ab(1073742336,r.g,r.g,[]),e.Ab(1073742336,r.p,r.p,[]),e.Ab(1073742336,o.b,o.b,[]),e.Ab(1073742336,c.s,c.s,[[2,c.y],[2,c.o]]),e.Ab(1073742336,_,_,[]),e.Ab(1073742336,s,s,[]),e.Ab(1024,c.m,(function(){return[[{path:"",component:b,canActivate:[A.a]}]]}),[])])}))},lmlb:function(l,n,u){"use strict";u.d(n,"a",(function(){return e}));class e{static patternValidator(l,n){return u=>u.value?l.test(u.value)?null:n:null}static passwordMatchValidator(l){l.get("password").value!==l.get("confirmPassword").value&&l.get("confirmPassword").setErrors({NoPassswordMatch:!0})}}}}]);