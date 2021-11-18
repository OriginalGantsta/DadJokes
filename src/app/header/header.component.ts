import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { User } from '../Model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnDestroy {
  signedIn: BehaviorSubject<boolean>;
  userSubscription: Subscription;
  user: User = undefined;
  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,

  ) {
    this.userSubscription = this.databaseService.user.subscribe((authUser) => { this.user = authUser })

  }

  signOut() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
}
