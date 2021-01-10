import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { SubHeader1Component } from '@app/home/components/sub-header1/sub-header1.component';
import { SubHeader2Component } from '@app/home/components/sub-header2/sub-header2.component';
import { IrrigationComponent } from '@app/home/components/irrigation/irrigation.component';
import { GrowthPalnComponent } from '@app/home/components/growth-paln/growth-paln.component';
import { SubHeader3Component } from '@app/home/components/sub-header3/sub-header3.component';
import { GreenCrackComponent } from '@app/home/components/green-crack/green-crack.component';
import { AddRecipeDetailsComponent } from '@app/home/components/add-recipe-details/add-recipe-details.component';
import {Confirm} from '@app/@shared/components/confirm';
import { SearchComponent } from './components/search/search.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, RouterModule, CommonModule],
  declarations: [
    LoaderComponent,
    SubHeader1Component,
    SubHeader2Component,
    SubHeader3Component,
    GreenCrackComponent,
    IrrigationComponent,
    GrowthPalnComponent,
    AddRecipeDetailsComponent,
    SearchComponent,
    Confirm
  ],
  exports: [
    LoaderComponent,
    SubHeader1Component,
    SubHeader2Component,
    SubHeader3Component,
    GreenCrackComponent,
    IrrigationComponent,
    GrowthPalnComponent,
    AddRecipeDetailsComponent,
    SearchComponent,
    Confirm
  ],
})
export class SharedModule {}
