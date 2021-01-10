import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthPalnComponent } from './growth-paln.component';

describe('GrowthPalnComponent', () => {
  let component: GrowthPalnComponent;
  let fixture: ComponentFixture<GrowthPalnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrowthPalnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthPalnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
