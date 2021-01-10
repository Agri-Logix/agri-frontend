import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { SubHeader1Component } from './components/sub-header1/sub-header1.component';
import { SubHeader2Component } from './components/sub-header2/sub-header2.component';
import { SubHeader3Component } from './components/sub-header3/sub-header3.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    {
      path: 'component1',
      component: SubHeader1Component,
      data: { title: marker('Home') },
    },
    {
      path: 'component1/add-recipe',
      component: AddRecipeComponent,
      data: { title: marker('Add Recipe') },
    },

    {
      path: 'component2',
      component: SubHeader2Component,
      data: { title: marker('Home') },
    },
    {
      path: 'component3',
      component: SubHeader3Component,
      data: { title: marker('Irrigation') },
    },
    {
      path: 'component4',
      component: SubHeader3Component,
      data: { title: marker('Devices') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
