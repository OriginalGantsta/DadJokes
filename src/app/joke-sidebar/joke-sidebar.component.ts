import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DatabaseService } from '../services/database.service';
import { Joke } from '../Model/joke.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-joke-sidebar',
  templateUrl: './joke-sidebar.component.html',
  styleUrls: ['./joke-sidebar.component.css'],
})
export class JokeSidebarComponent implements OnInit, OnDestroy {
  jokes: BehaviorSubject<Joke[]>;
  jokesSubscription: Subscription;
  undoLocation: String | null;
  undoIndex: number;
  jokeArrayLength: number;

  constructor(private databaseService: DatabaseService) {}

  removeFromFavorites(joke: Joke, i) {
    if (i < this.jokes.value.length - 1) {
      this.undoLocation = 'above';
      this.undoIndex = i;
    } else if (i === this.jokes.value.length - 1) {
      this.undoLocation = 'below';
      this.undoIndex = i - 1;
    } else if (this.jokes.value.length === 1) {
      this.undoIndex = -1;
    }
    this.databaseService.removeJoke(joke);
    this.jokeArrayLength = this.jokes.value.length;

  }

  undoRemoveFromFavorites() {
    this.undoLocation = null;
    this.undoIndex = null;
    this.databaseService.saveFavoriteJoke(this.databaseService.removedJoke);
  }

  ngOnInit(): void {
    this.jokes = this.databaseService.jokes;
    this.jokesSubscription = this.jokes.pipe(
      tap((jokes) => {
        if (jokes.length >= this.jokeArrayLength) {
          this.undoLocation = null;
          this.undoIndex = null;
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {this.jokesSubscription.unsubscribe}
}
