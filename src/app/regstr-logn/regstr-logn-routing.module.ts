import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { AnonymousGuard } from '../auth/guards/anonymous-guard.service';
// import { LoginComponent } from '../login/login.component';


const routes: Routes = [
  { path: '', component: RegisterComponent, canActivate: [AnonymousGuard] },
  // { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegstrLognRoutingModule { }
