import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MeComponent } from './components/me/me.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent ,pathMatch: 'full',canActivate: [notAuthGuard]},
  { path:'register',component:RegisterComponent ,pathMatch: 'full',canActivate: [notAuthGuard]},
  { path: '', redirectTo: '/me', pathMatch: 'full' },
  { path:'me',component:MeComponent ,pathMatch: 'full',canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
