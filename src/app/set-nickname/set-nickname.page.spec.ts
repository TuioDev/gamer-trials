import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetNicknamePage } from './set-nickname.page';

describe('SetNicknamePage', () => {
  let component: SetNicknamePage;
  let fixture: ComponentFixture<SetNicknamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNicknamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
