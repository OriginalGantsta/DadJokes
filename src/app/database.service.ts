import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Joke } from './Model/joke.model';
import { User } from './Model/user.model';
import { UserSignup } from './Model/userSignUp.model';

@Injectable({
  providedIn: 'root',
})

export class DatabaseService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private database: AngularFireDatabase
  ) {

  }

  jokes: Observable<any>;
  user = new User(null, null, null, null);

 async writeUserData(userSignup: UserSignup) {
     this.user.firstName = userSignup.firstName;
     this.user.lastName =  userSignup.lastName;
     await this.angularFireAuth.onAuthStateChanged((authUser) => {
      this.user.uid = authUser.uid;
      this.user.email = authUser.email;
      this.jokes = this.database.object('users/' + this.user.uid + '/data' + '/favoriteJokes').valueChanges();
      console.log(this.user)
    });
    this.database.object('users/' + this.user.uid).set(this.user);
  }

  async userLoggedIn(){
    await this.angularFireAuth.onAuthStateChanged((authUser) => {
      this.user.uid = authUser.uid;
      this.user.email = authUser.email;
      this.jokes = this.database.object('users/' + this.user.uid + '/data' + '/favoriteJokes').valueChanges();
      console.log(authUser)
    })
  }

  async saveFavoriteJokes(joke: Joke) {
    if (
      () => {
        var notFavorited = true;
        for (let key in this.jokes) {
          if (key === joke.id) {
            notFavorited = false;
          }
          return notFavorited;
        }
      }
    ) {
      this.setJokes(joke);
    }
  }

 async setJokes(joke: Joke) {
    this.database.object('users/' + this.user.uid + '/data' + '/favoriteJokes/' + joke.id).set(joke);
  }
}
