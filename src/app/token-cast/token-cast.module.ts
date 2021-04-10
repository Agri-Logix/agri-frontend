import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenCastRoutingModule } from './token-cast-routing.module';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeviceDetailComponent } from './components/modals/device-detail/device-detail.component';

@NgModule({
  declarations: [ListComponent, DeviceDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TokenCastRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class TokenCastModule {}
