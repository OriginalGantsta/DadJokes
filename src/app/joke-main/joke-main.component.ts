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
export class JokeMainComponent {
joke: Joke=null;

  constructor(private http: HttpClient, private jokeAPI: JokeAPIService, private localStorage: LocalStorageService) { }

  getJoke(){
    this.jokeAPI.fetchJoke().subscribe((j: Joke)=>{this.joke=j })
  }

  favoriteJoke(){
    this.localStorage.saveFavoriteJokes(this.joke);
  }



}
