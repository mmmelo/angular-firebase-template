import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from './auth/services/auth.service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignUpComponent,
		WelcomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		AngularFireModule.initializeApp( environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
	],
	providers: [ AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
