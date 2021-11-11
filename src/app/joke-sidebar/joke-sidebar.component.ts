import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { LocalStorageService } from '../local-storage.service';
import { Joke } from '../Model/joke.model';

@Component({
  selector: 'app-joke-sidebar',
  templateUrl: './joke-sidebar.component.html',
  styleUrls: ['./joke-sidebar.component.css']
})
export class JokeSidebarComponent implements OnInit {
favoriteJokes: Joke[] = [];
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
    this.databaseService.jokes.subscribe(data => {
      for (let key in data){
        console.log(data);
        console.log (key);
        console.log(data['key']);
        this.favoriteJokes.push(data['key'])
      }})
  }

}
