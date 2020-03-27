import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {User} from '../../services/user';
import {auth} from 'firebase/app';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	userData: User;

	constructor( public afs: AngularFirestore, public afAuth: AngularFireAuth, public route: Router, public ngZone: NgZone) {
		this.afAuth.authState.subscribe( user => {
			if ( user){
				this.userData = user;
				localStorage.setItem( 'user', JSON.stringify( this.userData));
				JSON.parse( localStorage.getItem('user'));
			} else{
				localStorage.setItem( 'user', null);
				JSON.parse( localStorage.getItem( 'user'));
			}
		});
	}

	signIn(email, password) {
		return this.afAuth.auth.signInWithEmailAndPassword( email, password).then( (result) => {
			this.ngZone.run( () => {
				this.route.navigate( ['main']);
			});
			this.setUserData( result.user);
		}).catch( (error) => {
			window.alert( error.message);
		});
	}


	signUp(email, password){
		return this.afAuth.auth.createUserWithEmailAndPassword( email, password).then(
			(result) => {
				this.sendEmailVerification();
				this.setUserData( result.user);
			}
		).catch(
			(error) => {
				window.alert( error.message);
			}
		);
	}

	sendEmailVerification() {
		return this.afAuth.auth.currentUser.sendEmailVerification().then(
			() => {
				this.route.navigate( ['']);
			}
		).catch();
	}

	setUserData(user: User) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified
		};

		return userRef.set( userData, { merge: true});
	}

	authLogin( provider) {
		console.log( 'authLogin', provider);
		return this.afAuth.auth.signInWithPopup( provider).then(
			(result) => {
				console.log( 'authLogin-signInWithPopup', result);
				this.ngZone.run( () => {
					console.log( 'authLogin-ngZone', )
					this.route.navigate( ['/welcome']).then();
				});
				console.log( 'authLogin-after-ngZone', result);
				this.setUserData( result.user);
			}
		).catch( (error) => {
			window.alert( error.message);
		});
	}

	loginWithGoogle(){
		console.log( 'loginWithGoogle', 'Starting');
		return this.authLogin( new auth.GoogleAuthProvider());
	}

	loginOut() {
		return this.afAuth.auth.signOut().then(
			() => {
				localStorage.removeItem( 'user');
				this.route.navigate( ['login']);
			}
		).catch(
			(error) => {
				window.alert( error.message);
			}
		);
	}

	get isLoggedIn(): boolean {
		const user = JSON.parse( localStorage.getItem( 'user'));
		return (user !== null && user.emailVerified !== false);
	}
}
