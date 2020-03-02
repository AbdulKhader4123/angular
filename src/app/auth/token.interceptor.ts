import { Injectable, ErrorHandler } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';
import { Tokens } from '../shared/token.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
const token=this.authService.getJwtToken();
console.log(token)
      request = this.addToken(request, token);

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        console.log("error")
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`,
        'Cache-Control': 'no-cache',
        responseType: 'text' 
      }
    });
  }
  private endToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': "",
        responseType: 'text' 

      }
    })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    //  if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
     this.authService.refreshToken().subscribe((res)=>{
       if(res['jwt']==""){
        this.authService.doLogoutUser();
       return next.handle(this.endToken(request, ""));

       }
     })
    
        
      return this.authService.refreshToken().pipe(
      // step 1 source observable is emitted
      //step 3 when a new source observable is created,switchmap switches to new source observable and unsubscribes previous one
        switchMap((jwt: any) => {
          // step 2 inner observable is created and subscribed to(map)
          //step 4 new inner observable is created and it subscribed to(map)
          this.isRefreshing = false;
          this.refreshTokenSubject.next(jwt.jwt);
          return next.handle(this.addToken(request, jwt.jwt));
        }));

  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(jwt => jwt != null),
  //       take(1),
  //       switchMap(jwt => {
  //         return next.handle(this.addToken(request, jwt));
  //       }));
  //   }
  // }
}
}

// const token =this.authService.getJwtToken()
// let newHeaders = request.headers;

//     if (token) { 
//       console.log('INTERCEPTOR');
//       newHeaders = newHeaders.append('authtoken', token);
//     }
//       const authReq = request.clone({headers: newHeaders});
//       // request = this.addToken(request, this.authService.getJwtToken());
//       return next.handle(authReq);
//   }
