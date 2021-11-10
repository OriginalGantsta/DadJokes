import { Component, OnInit } from '@angular/core';
import { SidebarToggleService } from '../joke-sidebar/sidebar-toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
sidebar: boolean=null;
sidebarOpen: boolean=false;

  constructor(private sidebarToggleService: SidebarToggleService) {}

  ngOnInit(): void {
    this.sidebarToggleService.sidebarSubject.subscribe((value)=> this.sidebar = value);
    this.sidebarToggleService.sidebarOpenSubject.subscribe((value)=> this.sidebarOpen = value)
  }

}
