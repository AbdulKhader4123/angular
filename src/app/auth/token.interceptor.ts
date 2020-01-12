import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';
import { Tokens } from '../shared/token.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((jwt: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(jwt.jwt);
          return next.handle(this.addToken(request, jwt.jwt));
        }));

    // } else {
    //   return this.refreshTokenSubject.pipe(
    //     filter(jwt => jwt != null),
    //     take(1),
    //     switchMap(jwt => {
    //       return next.handle(this.addToken(request, jwt));
    //     }));
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
