import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpeningPage } from './opening.page';

const routes: Routes = [
  {
    path: '',
    component: OpeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpeningPageRoutingModule {}
