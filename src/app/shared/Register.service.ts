import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {User} from './User.model'


@Injectable()
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
   SendPasswordToMAIL(email:String){
    return this.http.post("/api/password-reset/req-reset-password",{email:email})
   }
   ValidateToken(token:string){
    return this.http.post("/api/password-reset/response-reset-password",{resettoken:token})
   }
   ChangePassword(token:string,password:string){
return this.http.post("/api/password-reset/new-password",{resettoken:token,newPassword:password})
   }
}   