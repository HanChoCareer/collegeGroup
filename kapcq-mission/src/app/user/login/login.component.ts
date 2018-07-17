import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';
  email: string;
  password: string;

  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.items = db.list('messages',ref => ref.orderByKey().limitToLast(25));

    this.user = this.afAuth.authState;

	}

	login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorMessage);
});
	}

	logout() {
	    this.afAuth.auth.signOut();
	}

	createAccount() {
		this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
	}
}