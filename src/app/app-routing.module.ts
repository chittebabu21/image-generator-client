import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { userGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [userGuardGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: '', component: LoginComponent, canActivate: [userGuardGuard] },
  { path: '**', component: LoginComponent, canActivate: [userGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
