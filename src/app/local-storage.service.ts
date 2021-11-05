import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Joke } from './Model/joke.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  jokes = new BehaviorSubject<Joke[]>(this.loadFavoriteJokes());

  setAndRefreshJokes(jokeArray: Joke[]){
    localStorage.setItem("favorite_jokes", JSON.stringify(jokeArray));
    this.jokes.next(this.loadFavoriteJokes());
}
  constructor() { }

  saveFavoriteJokes(joke: Joke){
    var jokeArray: Joke[] = this.loadFavoriteJokes();
    if(JSON.stringify(jokeArray).search(joke.id) === -1){
    jokeArray.push(joke);
    this.setAndRefreshJokes(jokeArray)}}

  loadFavoriteJokes(): Joke[] {
    const storage = localStorage.getItem('favorite_jokes');
    if (storage){
      return JSON.parse(storage)
    }
    return []
  }

  deleteJoke(index: number){
   var jokeArray: Joke[]= JSON.parse(localStorage.getItem('favorite_jokes'));
   jokeArray.splice(index, 1);
   this.setAndRefreshJokes(jokeArray)}

  getJokes(): BehaviorSubject<Joke[]>{
    return this.jokes
  }
}
