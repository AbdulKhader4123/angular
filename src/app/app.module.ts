import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
// import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { routing }   from './app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
    PasswordResetComponent
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
    ShowHidePasswordModule
  ],
  // providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},ShoppingService,AuthGuard,AuthenticationService,AnonymousGuard,RecipeService],
  providers: [ShoppingService,AuthGuard,AuthenticationService,AnonymousGuard,RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
