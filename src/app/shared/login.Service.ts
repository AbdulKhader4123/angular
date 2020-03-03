import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'

import{User} from './LoginUser.model'

@Injectable()
export class LoginService{

    user:User;
        // readonly baseUrl='http://localhost:4000/api'
    constructor(private http:HttpClient){
    }
LoginUser(user:User){
    return this.http.post("api/user/loginUser",user)
}
   
}