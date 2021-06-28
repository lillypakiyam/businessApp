import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeomapPageRoutingModule } from './geomap-routing.module';
import { RouterModule } from '@angular/router'
import { AgmCoreModule } from '@agm/core'
import { GeomapPage } from './geomap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeomapPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: GeomapPage
      }
    ]),
    AgmCoreModule,
  ],
  declarations: [GeomapPage]
})
export class GeomapPageModule { }
