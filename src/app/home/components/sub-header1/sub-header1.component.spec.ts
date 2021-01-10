import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeader1Component } from './sub-header1.component';

describe('SubHeader1Component', () => {
  let component: SubHeader1Component;
  let fixture: ComponentFixture<SubHeader1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubHeader1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeader1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
