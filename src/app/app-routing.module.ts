import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/logins/login/login.component';
import { CompaniesComponent } from './pages/logins/companies/companies.component';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'GoArrival'
  },
  { 
    path: 'companies/:userID',
     component: CompaniesComponent
  },
  {
    path: 'flights',
    loadChildren: () => import('../app/pages/flights/flights.module').then(m => m.FlightsModule),
    title: 'GoArrival-Vuelos'
  },
  {
    path: 'hotel',
    loadChildren: () => import('../app/pages/hotel/hotel.module').then(m => m.HotelModule),
    title: 'GoArrival-Hoteles'
  },
  {
    path: 'cars',
    loadChildren: () => import('../app/pages/cars/cars.module').then(m => m.CarsModule),
    title: 'GoArrival-Autos'
  },
  {
    path: 'insurance',
    loadChildren: () => import('../app/pages/insurance/insurance.module').then(m => m.InsuranceModule),
    title: 'GoArrival-Seguros'
  },
  {
    path: 'flows',
    loadChildren: () => import('../app/pages/flows-reports/flows-reports.module').then(m => m.FlowsReportsModule),
    title: 'GoArrival-Administrador'
  },
/*   { path: '**',pathMatch: 'full', component: NoutFoundComponent }, */
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
