import { Injectable, ErrorHandler } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';
import { environment } from 'src/environments/environment.prod';
import { isDevMode } from '@angular/core';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

baseUrl: string = environment.backend.baseURL;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token=this.authService.getJwtToken();
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
    // return request.clone({
    //   setHeaders: {
    //     'Authorization': `${token}`,
    //     'Cache-Control': 'no-cache',
    //   }
    // });
    return request.clone({
      url: `https://sleepy-basin-67900.herokuapp.com/${request.url}` ,
      setHeaders: {
        'Authorization': `${token}`,
        'Cache-Control': 'no-cache',
      }
    });
  }
  private endToken(request: HttpRequest<any>, token: string) {
    // return request.clone({
    //   setHeaders: {
    //     'Authorization': "",

    //   }
    // })
    return request.clone({
      url: `https://sleepy-basin-67900.herokuapp.com/${request.url}` ,
      setHeaders: {
        'Authorization': "",

      }
    })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
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
          this.refreshTokenSubject.next(jwt.jwt);
          return next.handle(this.addToken(request, jwt.jwt));
        }));
}
}