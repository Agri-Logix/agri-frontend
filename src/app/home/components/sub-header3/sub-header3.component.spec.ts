import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeader3Component } from './sub-header3.component';

describe('SubHeader3Component', () => {
  let component: SubHeader3Component;
  let fixture: ComponentFixture<SubHeader3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubHeader3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeader3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
