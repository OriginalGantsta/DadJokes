import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 loggedIn: BehaviorSubject<boolean>;
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private angularFireAuth: AngularFireAuth){
    this.loggedIn = authService.loggedIn
  }

  ngOnInit(){
  }

  title = 'dadJokes';
}
