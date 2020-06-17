import { TestBed } from '@angular/core/testing';

import { CardGameService } from './card-game.service';

describe('CardGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardGameService = TestBed.get(CardGameService);
    expect(service).toBeTruthy();
  });
});
