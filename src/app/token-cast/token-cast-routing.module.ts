import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { Shell } from '../shell/shell.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { DeviceDetailComponent } from './components/modals/device-detail/device-detail.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'token-cast',
      component: ListComponent,
      data: { title: marker('Home') },
      children: [
        {
          path: 'device_detail/:type',
          component: DeviceDetailComponent,
          data: { title: marker('device-detail') },
          outlet: 'DEVICE_DETAIL_MODAL',
        },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenCastRoutingModule {}
