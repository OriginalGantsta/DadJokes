import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { DatabaseService } from '../services/database.service';
import { Joke } from '../Model/joke.model';

@Component({
  selector: 'app-joke-sidebar',
  templateUrl: './joke-sidebar.component.html',
  styleUrls: ['./joke-sidebar.component.css'],
})
export class JokeSidebarComponent implements OnInit, OnDestroy {
  jokes: BehaviorSubject<Joke[]>;
  undoLocation: String | null;
  undoIndex: number;

  constructor(
    private databaseService: DatabaseService
  ) {}

  removeFromFavorites(joke: Joke, i) {
    console.log(i)
    if (i < this.jokes.value.length -1){
      this.undoLocation = "above";
      this.undoIndex = i;
    }
    else if (i === this.jokes.value.length - 1){
      this.undoLocation = 'below';
      this.undoIndex = i - 1;
    }
    else if (this.jokes.value.length === 1){
      this.undoIndex = -1;
    }
    console.log(this.undoLocation);
    console.log(this.undoIndex);
    this.databaseService.removeJoke(joke);
  }

  undoRemoveFromFavorites(){
    this.undoLocation = null;
    this.undoIndex = null;
    this.databaseService.saveFavoriteJoke(this.databaseService.removedJoke);
  }

  favoriteJoke(joke) {
      this.databaseService.saveFavoriteJoke(joke);
    }


  ngOnInit(): void {
    this.jokes = this.databaseService.jokes
  }

  ngOnDestroy() {
  }
}
