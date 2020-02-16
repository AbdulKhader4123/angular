import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
 import { AuthGuard } from './auth/guards/auth-guard.service';
import { AnonymousGuard } from './auth/guards/anonymous-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
    { path: '', component: HomeComponent},
    { path: 'product/:id', component: RecipeDetailComponent},
    { path: 'cart', component: ShoppingListComponent},
    { path: 'password-reset', component: PasswordResetComponent},
    { path: 'reset-options', component: PasswordResetComponent},
    { path: 'password-reset/response-reset-password/:id', component: PasswordResetComponent},

    // { path: '', component: HomeComponent,canActivate: [AuthGuard] },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);