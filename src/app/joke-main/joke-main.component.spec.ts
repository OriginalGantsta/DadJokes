import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeMainComponent } from './joke-main.component';

describe('JokeMainComponent', () => {
  let component: JokeMainComponent;
  let fixture: ComponentFixture<JokeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
