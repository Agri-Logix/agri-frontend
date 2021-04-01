import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightsDetailComponent } from './lights-detail.component';

describe('LightsDetailComponent', () => {
  let component: LightsDetailComponent;
  let fixture: ComponentFixture<LightsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LightsDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
