import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeader2Component } from './sub-header2.component';

describe('SubHeader2Component', () => {
  let component: SubHeader2Component;
  let fixture: ComponentFixture<SubHeader2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubHeader2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
