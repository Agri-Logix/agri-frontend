import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAddCycleModalComponent } from './recipe-add-cycle-modal.component';

describe('RecipeAddCycleModalComponent', () => {
  let component: RecipeAddCycleModalComponent;
  let fixture: ComponentFixture<RecipeAddCycleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeAddCycleModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAddCycleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
