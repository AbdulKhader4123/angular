import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tokens } from './token.model';
import { tap } from 'rxjs/operators/tap';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService   implements OnInit{
 
    loggedUser:string
     JWT_TOKEN :string 
     REFRESH_TOKEN : string
     baseUrl: string = environment.backend.baseURL;
    //  private feature= new Subject();
    //  feature$ =this.feature.asObservable();
      featureSelected =new EventEmitter<string>();

      private ModuleTitle = new Subject<string>();
      currentModuleTitle = this.ModuleTitle.asObservable();

      private CartProducts = new Subject<string>();
      currentCartProducts = this.CartProducts.asObservable();
      
      private CartTotal = new Subject<string>();
      CartTotalObservable = this.CartProducts.asObservable();

      private tabChange = new BehaviorSubject<string>("");
      currenttab = this.tabChange.asObservable();

      private displayFooter = new Subject<string>();
      displayFooterObs = this.displayFooter.asObservable();

    constructor(private http: HttpClient,private route:Router) {
      
    }
 
    ngOnInit() {
    }
    CartProductsobMethod(){
      this.CartProducts.next("");
          }
    observableMethod(){
this.ModuleTitle.next("");
    }
    cartTotalobsMethod(){
      this.CartTotal.next("");
    }
    TabChangeobsMethod(tab:string){
      this.tabChange.next(tab);
    }
    DisplayFooterobMethod(){
      this.displayFooter.next("");
          }
    isLoggedIn() {
        return this.getJwtToken();
      }
    
      doLoginUser(username: string, tokens: Tokens) {
        this.loggedUser = username;
        this.storeTokens(tokens);
      }
    
      private storeTokens(tokens: Tokens) {
      // console.log(localStorage.getItem("REFRESH_TOKEN"))
      // console.log(localStorage.getItem("JWT_TOKEN"))

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
       // return this.http.post<any>(`${this.baseUrl}`+"/api/
       return this.http.post<any>("/api/refreshToken/refresh",{
          'refreshToken': this.getRefreshToken()
        },{responseType: 'json'}).pipe(tap((jwt: any) => {
        
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
        localStorage.removeItem("UserName");
        this.loggedUser = null;
        this.removeTokens();
 this.route.navigate(['/login'])

      }
}