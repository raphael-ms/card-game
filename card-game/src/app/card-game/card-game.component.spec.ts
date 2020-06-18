import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGameComponent } from './card-game.component';

describe('CardGameComponent', () => {
  let component: CardGameComponent;
  let fixture: ComponentFixture<CardGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
