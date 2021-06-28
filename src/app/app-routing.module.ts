import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'geomap',
    loadChildren: () => import('./geomap/geomap.module').then( m => m.GeomapPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./menus/appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./menus/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'marketing',
    loadChildren: () => import('./menus/marketing/marketing.module').then( m => m.MarketingPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./menus/inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'business',
    loadChildren: () => import('./menus/business/business.module').then( m => m.BusinessPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./menus/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./menus/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./menus/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./menus/public/public.module').then( m => m.PublicPageModule)
  },
  {
    path: 'staff',
    loadChildren: () => import('./menus/staff/staff.module').then( m => m.StaffPageModule)
  },
  // {
  //   path: 'info',
  //   loadChildren: () => import('./business/info/info.module').then( m => m.InfoPageModule)
  // },
  {
    path: 'opening',
    loadChildren: () => import('./business/opening/opening.module').then( m => m.OpeningPageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./business/service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./business/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./menus/client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'photos',
    loadChildren: () => import('./business/photos/photos.module').then( m => m.PhotosPageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./business/members/members.module').then( m => m.MembersPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./menus/services/services.module').then( m => m.ServicesPageModule)
  },  {
    path: 'faq',
    loadChildren: () => import('./settings/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./settings/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
