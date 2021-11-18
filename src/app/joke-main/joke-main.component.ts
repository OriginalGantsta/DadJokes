import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';
import { JokeAPIService } from '../services/joke-api.service';
import { SidebarToggleService } from '../joke-sidebar/sidebar-toggle.service';
import { Joke } from '../Model/joke.model';

@Component({
  selector: 'app-joke-main',
  templateUrl: './joke-main.component.html',
  styleUrls: ['./joke-main.component.css'],
})
export class JokeMainComponent implements OnDestroy {
  joke: Joke = null;
  alreadyAdded: boolean = false;
  jokeAdded: boolean = false;
  jokes: Joke[];
  jokesSubscription: Subscription;

  constructor(
    private jokeAPI: JokeAPIService,
    private sidebarToggleService: SidebarToggleService,
    private databaseService: DatabaseService
  ) {
    this.jokesSubscription = this.databaseService.jokes.subscribe((jokes) => {
      if (this.jokes != null && this.jokes != undefined) {
        if (jokes.length > this.jokes.length) {
          this.jokeAdded = true;
          this.alreadyAdded = false;
        } else if (jokes.length <= this.jokes.length) {
          this.jokeAdded = false;
          this.alreadyAdded = false;
        }
      }
      this.jokes = jokes;
    });
  }

  getJoke() {
    this.alreadyAdded = false;
    this.jokeAdded = false;
    this.jokeAPI
      .fetchJoke()
      .pipe(take(1))
      .subscribe((j: Joke) => {
        this.joke = j;
        if (this.jokes[j.id]) {
          this.jokeAdded = true;
        }
      });
  }

  favoriteJoke() {
    var notFavorited = true;
    outerLoop: for (var joke in this.jokes) {
      if (this.jokes[joke].id === this.joke.id) {
        notFavorited = false;
        this.alreadyAdded = true;
        this.jokeAdded = false;
        break outerLoop;
      }
    }
    if (notFavorited === true) {
      this.databaseService.saveFavoriteJoke(this.joke);
    }
  }

  onToggleSidebar() {
    this.sidebarToggleService.onToggleSidebar();
  }

  ngOnDestroy() {
    this.jokesSubscription.unsubscribe;
  }
}
