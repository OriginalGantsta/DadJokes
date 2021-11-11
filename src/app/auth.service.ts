import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from './database.service';
import { UserSignup } from './Model/userSignup.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private databaseService: DatabaseService
  ) {}
  signUp(userSignup: UserSignup) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(userSignup.email, userSignup.password)
      .then((result) => {
        this.databaseService.writeUserData(userSignup);
        console.log(this.angularFireAuth.currentUser);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }




}
