import { AuthenticationService } from '../../shared/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {


  constructor(private _authService: AuthenticationService, private _router: Router ){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(state.url.indexOf("productEdit")>=0){
     if(localStorage.getItem("role")=='admin'){
       return true
     }
     else{
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
     }
          }

    if (this._authService.isLoggedIn()) {

     return true
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}