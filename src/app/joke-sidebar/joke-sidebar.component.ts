import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { LocalStorageService } from '../local-storage.service';
import { Joke } from '../Model/joke.model';

@Component({
  selector: 'app-joke-sidebar',
  templateUrl: './joke-sidebar.component.html',
  styleUrls: ['./joke-sidebar.component.css'],
})
export class JokeSidebarComponent implements OnInit, OnDestroy {
  jokes: Observable<any>;

  constructor(
    private localStorage: LocalStorageService,
    private databaseService: DatabaseService
  ) {}

  removeFromFavorites(joke: Joke) {
    this.databaseService.removeJoke(joke);
  }

  ngOnInit(): void {
    this.jokes = this.databaseService.jokes
  }

  ngOnDestroy() {
  }
}
