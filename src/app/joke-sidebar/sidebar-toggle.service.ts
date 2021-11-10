import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {

  sidebarSubject= new BehaviorSubject<boolean>(false);
  sidebarOpenSubject = new BehaviorSubject<boolean>(false);

  onToggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
    if (this.sidebarSubject.value === true) {
      setTimeout(() => (this.sidebarSubject.next(!this.sidebarSubject.value)), 500);
    } else {
      this.sidebarSubject.next(!this.sidebarSubject.value);
    }
  }

  constructor() { }
}
