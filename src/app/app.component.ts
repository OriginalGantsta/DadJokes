import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 loggedIn: BehaviorSubject<boolean>;
  constructor(authService: AuthService,){
    this.loggedIn = authService.loggedIn
  }


  title = 'dadJokes';
}
