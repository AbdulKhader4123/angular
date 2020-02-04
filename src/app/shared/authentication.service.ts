import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/User.model';
import { Tokens } from './token.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService   implements OnInit{
 
    loggedUser:string
     JWT_TOKEN :string 
     REFRESH_TOKEN : string
    //  private feature= new Subject();
    //  feature$ =this.feature.asObservable();
      featureSelected =new EventEmitter<string>();

    constructor(private http: HttpClient,private route:Router) {
      
    }
    // featureSelect(todo){
// this.feature.next(todo)
//     }
    ngOnInit() {
      // if(localStorage.getItem("REFRESH_TOKEN")==""){
      //   localStorage.setItem("REFRESH_TOKEN",'REFRESH_TOKEN')
      // localStorage.setItem("JWT_TOKEN",'JWT_TOKEN');

      // }
    }

    isLoggedIn() {
        return this.getJwtToken();
      }
    
      doLoginUser(username: string, tokens: Tokens) {
        this.loggedUser = username;
        this.storeTokens(tokens);
      }
    
      private storeTokens(tokens: Tokens) {
      console.log(localStorage.getItem("REFRESH_TOKEN"))
      console.log(localStorage.getItem("JWT_TOKEN"))

        localStorage.setItem("JWT_TOKEN", tokens["jwt"]);
        localStorage.setItem("REFRESH_TOKEN",tokens["refreshToken"]);
      }
      private getRefreshToken() {
// if(localStorage.getItem("REFRESH_TOKEN")==null){
//   localStorage.setItem("REFRESH_TOKEN","REFRESH_TOKEN");

// }
        return localStorage.getItem("REFRESH_TOKEN");

      }
      private storejwtTokens(tokens:string){
        localStorage.setItem("JWT_TOKEN", tokens);
      }
      refreshToken() {
        return this.http.post<any>("/api/refreshToken/refresh", {
          'refreshToken': this.getRefreshToken()
        }).pipe(tap((jwt: any) => {
        
          this.storejwtTokens(jwt.jwt);
        }));
      }
      getJwtToken() {
        // if(localStorage.getItem("JWT_TOKEN")==null){
        //   localStorage.setItem("JWT_TOKEN","JWT_TOKEN");
        
        // }
        return localStorage.getItem("JWT_TOKEN");
      }
      private removeTokens() {
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
      }
       doLogoutUser() {
        console.log(localStorage.getItem("REFRESH_TOKEN"))
        console.log(localStorage.getItem("JWT_TOKEN"))
        this.loggedUser = null;
        this.removeTokens();
 this.route.navigate(['/login'])

      }
}