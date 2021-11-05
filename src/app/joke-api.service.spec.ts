import { TestBed } from '@angular/core/testing';

import { JokeAPIService } from './joke-api.service';

describe('JokeAPIService', () => {
  let service: JokeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
