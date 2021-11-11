import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 constructor(private database: AngularFireDatabase, private databaseService: DatabaseService){
    database.object('hello/itsme').update({'foo':'bar'});
  }

  onTestButton(){
    this.database.object('users/' + this.databaseService.user.uid + '/data' + '/favoriteJokes/').update({'foo':'bar'});
  }

  ngOnInit(){
  }
  title = 'dadJokes';
}
