import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpeningPageRoutingModule } from './opening-routing.module';

import { OpeningPage } from './opening.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpeningPageRoutingModule
  ],
  declarations: [OpeningPage]
})
export class OpeningPageModule {}
