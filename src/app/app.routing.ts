import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
//import { LoginComponent } from './login/login.component';
//import { AppComponent } from './app.component';
//import { RegisterComponent } from './register/register.component';
// import { AuthGuard } from './auth/guards/auth-guard.service';
//import { AnonymousGuard } from './auth/guards/anonymous-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
//import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { PasswordResetComponent } from './password-reset/password-reset.component';
//import { UserProfileComponent } from './user-profile/user-profile.component';

const appRoutes: Routes = [

    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
   // { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
   {path: 'register', loadChildren:'./regstr-logn/regstr-logn.module#RegstrLognModule'},
   {path: 'cart', loadChildren:'./cart/cart.module#CartModule'},
   //shared module
   {path: 'login', loadChildren:'./login/login.module#LoginModule'},
   {path: 'reset', loadChildren:'./password-reset/password-reset.module#PasswordResetModule'},
   { path: 'profile', loadChildren: './user-profile/user-profile.module#UserProfileModule'},

//    { path: 'admin', loadChildren: () => import(`./regstr-logn/regstr-logn.module`).then(m => m.RegstrLognModule) },
   //{ path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
    { path: 'product/:id', component: RecipeDetailComponent},
   // { path: 'cart', component: ShoppingListComponent},
    // { path: 'password-reset', component: PasswordResetComponent},
    // { path: 'reset-options', component: PasswordResetComponent},
    // { path: 'password-reset/response-reset-password/:id', component: PasswordResetComponent},
    //{ path: 'profile', component: UserProfileComponent},
    // wildcard routes has to be last
    { path: '', component: HomeComponent},

    // { path: '', component: HomeComponent,canActivate: [AuthGuard] },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes,{
	onSameUrlNavigation: 'reload',
	scrollPositionRestoration: 'enabled',
  });