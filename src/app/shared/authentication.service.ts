import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/User.model';
import { Tokens } from './token.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 
    loggedUser:string
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    constructor(private http: HttpClient) {
      
    }

    isLoggedIn() {
        return this.getJwtToken();
      }
    
      doLoginUser(username: string, tokens: string) {
        this.loggedUser = username;
        this.storeTokens(tokens);
      }
    
      private storeTokens(tokens: string) {
        localStorage.setItem(this.JWT_TOKEN, tokens);
        // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
      }
      private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
      }
      getJwtToken() {
        return localStorage.getItem(this.JWT_TOKEN);
      }
      private removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
      }
       doLogoutUser() {
        this.loggedUser = null;
        this.removeTokens();
      }
}