import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Joke } from '../Model/joke.model';

@Component({
  selector: 'app-joke-sidebar',
  templateUrl: './joke-sidebar.component.html',
  styleUrls: ['./joke-sidebar.component.css']
})
export class JokeSidebarComponent implements OnInit {
favoriteJokes: Joke[] = [];
  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    // this.favoriteJokes = this.localStorage.loadFavoriteJokes()
    this.localStorage.getJokes().subscribe((jokes)=>{
      this.favoriteJokes = jokes;
    })
  }

}
