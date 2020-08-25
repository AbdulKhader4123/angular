import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {User} from './User.model'


@Injectable({
    providedIn: 'root'
  })
export class RegisterService{

    user:User;
    // readonly baseUrl='http://localhost:4000/api'
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
}   