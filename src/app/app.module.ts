import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule,NgxUiLoaderHttpModule  } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
// import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { routing }   from './app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {HeaderComponent} from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingItemComponent } from './shopping-list/shopping-item/shopping-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import {DropdownDirective} from './shared/DropDownDirective';
import { from } from 'rxjs';
import { ShoppingService } from './shared/shopping-list.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { AuthenticationService } from './shared/authentication.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthModule } from './auth/auth.module';
import { AnonymousGuard } from './auth/guards/anonymous-guard.service';
import { RecipeService } from './shared/recipe.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterService } from './shared/Register.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#563d7c",
  "bgsOpacity": 0.7,
  "bgsPosition": "center-center",
  "bgsSize": 90,
  "bgsType": "square-jelly-box",
  "blur": 6,
  "delay": 0,
  "fgsColor": "#563d7c",
  "fgsPosition": "center-center",
  "fgsSize": 90,
  "fgsType": "cube-grid",
  "gap": 53,
  "logoPosition": "center-center",
  "logoSize": 120,
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#fffbfb",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "Adf fashion",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingItemComponent,
    RecipeDetailComponent,
    DropdownDirective,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    routing,
    HttpClientModule,
    AuthModule,
    NgbModule,
    ShowHidePasswordModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,// import NgxUiLoaderRouterModule. By default, it will show foreground loader.
    NgxUiLoaderHttpModule 
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},ShoppingService,AuthGuard,AuthenticationService,AnonymousGuard,RecipeService,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
