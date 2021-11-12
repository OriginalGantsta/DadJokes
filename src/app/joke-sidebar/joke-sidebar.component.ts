import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { LocalStorageService } from '../local-storage.service';
import { Joke } from '../Model/joke.model';

@Component({
  selector: 'app-joke-sidebar',
  templateUrl: './joke-sidebar.component.html',
  styleUrls: ['./joke-sidebar.component.css']
})
export class JokeSidebarComponent implements OnInit, OnDestroy {
favoriteJokes: Joke[] = [];
jokesSubscription: Subscription;

constructor(
    private localStorage: LocalStorageService,
    private databaseService: DatabaseService) { }

removeFromFavorites(index){
  this.localStorage.deleteJoke(index)
};

  ngOnInit(): void {
    // this.localStorage.getJokes().subscribe((jokeArray)=>{
    //   this.favoriteJokes = jokeArray;
    // })
   this.jokesSubscription =  this.databaseService.jokes.subscribe(data => {
      for (let key in data){
        this.favoriteJokes.push(data[key])
      }})
  }

  ngOnDestroy(){
    this.jokesSubscription.unsubscribe()
  }

}
