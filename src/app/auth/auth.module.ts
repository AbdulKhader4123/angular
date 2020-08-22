import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { LoginComponent } from '../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthGuard } from './guards/auth-guard.service';
import {AuthenticationService} from '../shared/authentication.service'
// import { RandomGuard } from './guards/random.guard';
import { TokenInterceptor } from './token.interceptor';
import { AnonymousGuard } from './guards/anonymous-guard.service';

@NgModule({
  declarations: [],
  providers: [
    AuthGuard,
    AnonymousGuard,
    AuthenticationService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,

  ]
})
export class AuthModule { }
