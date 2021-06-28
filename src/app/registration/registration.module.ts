import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import { RegistrationPageRoutingModule, } from './registration-routing.module';
import { RegistrationPage } from './registration.page';
import { AgmCoreModule } from '@agm/core'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationPage
      }
    ]),
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule { }
