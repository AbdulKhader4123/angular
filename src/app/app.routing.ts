import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
 import { AuthGuard } from './auth/guards/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { EditproductComponent } from './editproduct/editproduct.component';

const appRoutes: Routes = [

   {path: 'register', loadChildren:'./regstr-logn/regstr-logn.module#RegstrLognModule'},
   {path: 'cart', loadChildren:'./cart/cart.module#CartModule'},
   //shared module
   {path: 'login', loadChildren:'./login/login.module#LoginModule'},
   {path: 'reset', loadChildren:'./password-reset/password-reset.module#PasswordResetModule'},
   { path: 'account', loadChildren: './user-profile/user-profile.module#UserProfileModule'},

    { path: 'product/:id', component: RecipeDetailComponent},
    { path: 'productEdit', component: EditproductComponent,canActivate: [AuthGuard] },
    { path: '', component: HomeComponent},

    // { path: '', component: HomeComponent,canActivate: [AuthGuard] },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes,{
	onSameUrlNavigation: 'reload',
	scrollPositionRestoration: 'enabled',
  });