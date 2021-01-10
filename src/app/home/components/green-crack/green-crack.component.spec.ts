import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenCrackComponent } from './green-crack.component';

describe('GreenCrackComponent', () => {
  let component: GreenCrackComponent;
  let fixture: ComponentFixture<GreenCrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GreenCrackComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenCrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
