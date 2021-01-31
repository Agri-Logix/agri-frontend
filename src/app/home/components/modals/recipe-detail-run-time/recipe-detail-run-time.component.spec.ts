import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailRunTimeComponent } from './recipe-detail-run-time.component';

describe('RecipeDetailRunTimeComponent', () => {
  let component: RecipeDetailRunTimeComponent;
  let fixture: ComponentFixture<RecipeDetailRunTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetailRunTimeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailRunTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
