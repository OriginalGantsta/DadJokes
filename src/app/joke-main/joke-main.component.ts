import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JokeAPIService } from '../joke-api.service';
import { LocalStorageService } from '../local-storage.service';
import { Joke } from '../Model/joke.model';

@Component({
  selector: 'app-joke-main',
  templateUrl: './joke-main.component.html',
  styleUrls: ['./joke-main.component.css']
})
export class JokeMainComponent implements OnInit {
joke: Joke=null;
favoriteJokes: Joke[]=[];

  constructor(private http: HttpClient, private jokeAPI: JokeAPIService, private localStorage: LocalStorageService) { }

  getJoke(){
    this.jokeAPI.fetchJoke().subscribe((j: Joke)=>{console.log(j.joke, j.id); this.joke=j })
  }

  favoriteJoke(){
    this.favoriteJokes.push(this.joke);
    this.localStorage.saveFavoriteJokes(this.favoriteJokes);
    this.localStorage.getJokes().next
  }

  ngOnInit(): void {
    // this.favoriteJokes = this.localStorage.loadFavoriteJokes()
    this.localStorage.getJokes().subscribe((jokes)=>{
      this.favoriteJokes = jokes;
    })
  }

}
