import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarToggleService } from '../joke-sidebar/sidebar-toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sidebar: boolean = null;
  sidebarOpen: boolean = false;
  sidebarSubjectSubscription: Subscription;
  sidebarOpenSubjectSubscription: Subscription;

  constructor(private sidebarToggleService: SidebarToggleService) { }

  ngOnInit() {
    this.sidebarSubjectSubscription = this.sidebarToggleService.sidebarSubject.subscribe((value) => this.sidebar = value);
    this.sidebarOpenSubjectSubscription = this.sidebarToggleService.sidebarOpenSubject.subscribe((value) => this.sidebarOpen = value)
  }

  ngOnDestroy() {
    this.sidebarSubjectSubscription.unsubscribe();
    this.sidebarOpenSubjectSubscription.unsubscribe()

  }

}
