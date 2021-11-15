import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { User } from '../Model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy{
  signedIn: BehaviorSubject<boolean>;
  userSubscription: Subscription;
  user: User = undefined;
  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,

  ) {
    this.userSubscription = this.databaseService.user.subscribe((authUser) => {this.user = authUser} )

  }

  ngOnInit(): void {}

  signOut() {
    this.authService.logout()
  }

  ngOnDestroy(){
  }
}
