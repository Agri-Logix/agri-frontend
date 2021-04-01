import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { AddRecipeModalComponent } from './components/modals/add-recipe/add-recipe.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeDetailRunTimeComponent } from './components/modals/recipe-detail-run-time/recipe-detail-run-time.component';
import { RecipeAddCycleModalComponent } from './components/modals/recipe-add-cycle-modal/recipe-add-cycle-modal.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RecipeComponent } from './components/modals/home/recipe/recipe.component';
import { RoutineComponent } from './components/modals/home/routine/routine.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    SharedModule,
    HomeRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    HomeComponent,
    AddRecipeComponent,
    AddRecipeModalComponent,
    RecipeDetailRunTimeComponent,
    RecipeAddCycleModalComponent,
    RecipeComponent,
    RoutineComponent,
  ],
})
export class HomeModule {}
