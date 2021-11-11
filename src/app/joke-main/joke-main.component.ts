import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { JokeAPIService } from '../joke-api.service';
import { SidebarToggleService } from '../joke-sidebar/sidebar-toggle.service';
import { LocalStorageService } from '../local-storage.service';
import { Joke } from '../Model/joke.model';

@Component({
  selector: 'app-joke-main',
  templateUrl: './joke-main.component.html',
  styleUrls: ['./joke-main.component.css']
})
export class JokeMainComponent {
joke: Joke=null;

  constructor(
    private http: HttpClient,
    private jokeAPI: JokeAPIService,
    private localStorage: LocalStorageService,
    private sidebarToggleService: SidebarToggleService,
    private databaseService: DatabaseService) { }

  getJoke(){
    this.jokeAPI.fetchJoke().subscribe((j: Joke)=>{this.joke=j })
  }

  favoriteJoke(){
    // this.localStorage.saveFavoriteJokes(this.joke);
    this.databaseService.saveFavoriteJokes(this.joke)
  }

  onToggleSidebar(){
    this.sidebarToggleService.onToggleSidebar()
  }

}
