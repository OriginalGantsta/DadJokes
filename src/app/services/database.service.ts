import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Joke } from '../Model/joke.model';
import { User } from '../Model/user.model';
import { UserSignup } from '../Model/userSignUp.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements OnInit {
  private jokeSubscription: Subscription;
  private userSubscription: Subscription;
  jokes: BehaviorSubject<Joke[]> = new BehaviorSubject<Joke[]>(null);
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  removedJoke: Joke;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private database: AngularFireDatabase
  ) {}

  onLoggedIn(authUser) {
    this.jokeSubscription = this.database
      .object('users/' + authUser.uid + '/data' + '/favoriteJokes')
      .valueChanges()
      .subscribe(
        (data: object) => {
          var newFavoriteJokes: Joke[] = [];
          for (let key in data) {
            newFavoriteJokes.push(data[key]);
          }
          this.jokes.next(newFavoriteJokes);
        },
        (error: any) => this.jokeSubscription.unsubscribe
      );
    this.userSubscription = this.database
      .object('users/' + authUser.uid + '/userInfo')
      .valueChanges()
      .subscribe(
        (authUser: any) => {
          if (authUser != null) {
            this.user.next(authUser);
          }
        },
        (error: any) => this.userSubscription.unsubscribe
      );
  }

  onLoggedOut() {
    this.user.next(new User(null, null, null, null));
  }

  ngOnInit() {}

  async writeUserData(userSignup: UserSignup) {
    await this.angularFireAuth.user.pipe(take(1)).subscribe((authUser) => {
      this.user.next({
        firstName: userSignup.firstName,
        lastName: userSignup.lastName,
        email: authUser.email,
        uid: authUser.uid,
      });
      this.database
        .object('users/' + authUser.uid + '/userInfo')
        .set(this.user.value);
    });
  }

  async saveFavoriteJoke(joke: Joke) {
    this.setJoke(joke);
  }

  private setJoke(joke: Joke) {
    console.log('joke setting');
    this.database
      .object(
        'users/' + this.user.value.uid + '/data' + '/favoriteJokes/' + joke.id
      )
      .set(joke);
  }

  removeJoke(joke: Joke) {
    this.removedJoke = joke;
    this.database
      .object(
        'users/' + this.user.value.uid + '/data' + '/favoriteJokes/' + joke.id
      )
      .remove();
  }
}
