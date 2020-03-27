import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {WelcomeComponent} from './auth/welcome/welcome.component';
import {SecureInnerPagesGuard} from './auth/guard/secure-inner-pages.guard';
import {AuthGuard} from './auth/guard/auth.guard';


const routes: Routes = [
	{ path: '', component: LoginComponent, },
	{ path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
	{ path: 'signUp', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
	{ path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
