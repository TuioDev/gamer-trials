import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GameListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});