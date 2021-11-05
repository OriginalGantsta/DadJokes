import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Joke } from './Model/joke.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  jokes = new BehaviorSubject<Joke[]>(this.loadFavoriteJokes());

  constructor() { }
  saveFavoriteJokes(jokes: Joke[]){
    localStorage.setItem("favorite_jokes", JSON.stringify(jokes))
  }

  loadFavoriteJokes(): Joke[] {
    const storage = localStorage.getItem('favorite_jokes');
    if (storage){
      return JSON.parse(storage)
    }
    return []
  }
  getJokes(){
    return this.jokes
  }
}
