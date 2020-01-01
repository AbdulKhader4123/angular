import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/observable'

import {User} from './User.model'


@Injectable()
export class RegisterService{

    user:User;
    readonly baseUrl='http://localhost:4000/api'
    constructor(private http:HttpClient){
    }
postUser(user:User){
    return this.http.post(this.baseUrl+"/user/registerUser",user)
}
   
}