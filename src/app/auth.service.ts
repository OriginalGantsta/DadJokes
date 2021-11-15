import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';
import { UserSignup } from './Model/userSignUp.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private databaseService: DatabaseService,
    private router: Router
  ) {
    this.angularFireAuth.onAuthStateChanged((authUser) => {
      if (authUser != null) {
        this.loggedIn.next(true);
        this.databaseService.onLoggedIn(authUser)
      } else {
        this.loggedIn.next(false);
        this.databaseService.onLoggedOut()}
    });
  }

  ngOnInit() {}

  signUp(userSignup: UserSignup) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(userSignup.email, userSignup.password)
      .then((result) => {
        this.databaseService.writeUserData(userSignup);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signIn(email, password) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.loggedIn.next(false);
      this.router.navigate(['']);
    });
  }
}
