import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeomapPage } from './geomap.page';

const routes: Routes = [
  {
    path: '',
    component: GeomapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeomapPageRoutingModule {}
