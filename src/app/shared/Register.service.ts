import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {User} from './User.model'
import { Address } from './address';

@Injectable({
providedIn: 'root'
})
export class RegisterService{

constants={
success:"Address changed successfully",
address_not_exists:"Address not found",
address_exists:"Address found",
}
addresssObj;
user:User;

constructor(private http:HttpClient){
}
postUser(user:User){
return this.http.post("/api/user/registerUser",user)
}
checkUser(username:String){
return this.http.post("/api/user/checkUser",{name:username})
}
checkRegisterUser(user:User){
return this.http.post("/api/user/checkRegisterUser",user)
}
SendOTPtoPhone(phone:String){
return this.http.post("/api/password-reset/GenerateOTP",{phoneNumber:phone})
}
VerifyOTP(Otp:String,sessionId:string){
return this.http.post("/api/password-reset/VerifyGenerateOTP",{OTP:Otp,sessionID:sessionId})
}
SendPasswordToMAIL(email:String){
return this.http.post("/api/password-reset/req-reset-password",{email:email})
}
ValidateToken(token:string){
return this.http.post("/api/password-reset/response-reset-password",{resettoken:token})
}  
ChangePassword(token:string,password:string){
return this.http.post("/api/password-reset/new-password",{resettoken:token,newPassword:password})
}

ChangePasswordByPhone(userName:string,password:string){
return this.http.post("/api/password-reset/new-password-phone",{UserName:userName,newPassword:password})
    }

checkUpdateUser(user:User){
return this.http.post("/api/user/checkUpdateUser",user)
}
SendOTPToMAIL(email:String){
return this.http.post("/api/user/sendOtp",{email:email})
}
verifyOTPToMail(emailOtp:String,secretKey:string){
return this.http.post("/api/user/totpvalidate",{token:emailOtp,secret:secretKey})
}
changeEmailPhone(name:string,email:String,phone:string){
return this.http.post("/api/user/EditUser",{username:name,email:email,phone:phone})
}
editAddress(addressObj:Address){
//reusing address for orders until the address is edited.
this.addresssObj=null;
addressObj.email=localStorage.getItem("email")
return this.http.post("/api/user/EditAddress",addressObj)
}
getAddress(){
let email =localStorage.getItem("email")
return this.http.post("/api/user/getAddress",{email:email})
}
}   
