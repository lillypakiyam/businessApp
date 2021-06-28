import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path: '',
        redirectTo : 'appointment',
        pathMatch: 'full'
      },
      { 
        path: 'appointment',
        loadChildren: ()=> import("../menus/appointment/appointment.module").then(m=>m.AppointmentPageModule)
      },
      {
        path: 'service',
        loadChildren: () => import('../business/service/service.module').then( m => m.ServicePageModule)
      },
      // {
      //   path : 'sales',
      //   loadChildren : ()=>import("../menus/sales/sales.module").then(m=>m.SalesPageModule)
      // },
      {
        path : 'staff',
        loadChildren: ()=>import("../menus/staff/staff.module").then(m=>m.StaffPageModule)
    
      }

    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
