import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';

import {CalendarModule} from 'ion2-calendar'
import {RouterModule} from '@angular/router';
import { AppPluginWeb } from '@capacitor/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentPageRoutingModule,
    RouterModule.forChild([
      {
        path :'',
        component : AppointmentPage
      }
    ]),
    CalendarModule
    
    
  ],
  declarations: [AppointmentPage]
})
export class AppointmentPageModule {}
