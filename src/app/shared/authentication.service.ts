import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/User.model';
import { Tokens } from './token.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 
    loggedUser:string
     JWT_TOKEN :string 
     REFRESH_TOKEN : string

    constructor(private http: HttpClient) {
      if(localStorage.getItem("REFRESH_TOKEN")==""){
        localStorage.setItem("REFRESH_TOKEN",'REFRESH_TOKEN')
      localStorage.setItem("JWT_TOKEN",'JWT_TOKEN');

      }
    }

    isLoggedIn() {
        return this.getJwtToken();
      }
    
      doLoginUser(username: string, tokens: Tokens) {
        this.loggedUser = username;
        this.storeTokens(tokens);
      }
    
      private storeTokens(tokens: Tokens) {
      
        localStorage.setItem("JWT_TOKEN", tokens["jwt"]);
        localStorage.setItem("REFRESH_TOKEN",tokens["refreshToken"]);
      }
      private getRefreshToken() {
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
        return localStorage.getItem("JWT_TOKEN");
      }
      private removeTokens() {
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
      }
       doLogoutUser() {
        this.loggedUser = null;
        this.removeTokens();
      }
}