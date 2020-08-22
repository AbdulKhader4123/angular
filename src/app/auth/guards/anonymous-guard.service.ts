import { AuthenticationService } from '../../shared/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AnonymousGuard implements CanActivate {


  constructor(private _authService: AuthenticationService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
    if (this._authService.isLoggedIn()) {
//  logged in so redirect to homr page with the return url
this._router.navigate(['/'], { queryParams: { returnUrl: state.url }});
     return false
    }
return true
    // not logged in so redirect to login page with the return url
    
  }

}