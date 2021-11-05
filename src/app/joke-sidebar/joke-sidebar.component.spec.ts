import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeSidebarComponent } from './joke-sidebar.component';

describe('JokeSidebarComponent', () => {
  let component: JokeSidebarComponent;
  let fixture: ComponentFixture<JokeSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
