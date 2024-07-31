import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCarsComponent } from './search-cars/search-cars.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { DetailCarComponent } from './detail-car/detail-car.component';
import { CreateDivPipe } from 'src/app/pipes/create-div.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReservationCarComponent } from './reservation-car/reservation-car.component';
import { SuccessfulCarComponent } from './successful-car/successful-car.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent
  },
  {
    path: 'cars-list',
    component: ListCarsComponent
  },
  {
    path: 'car-detail',
    component: DetailCarComponent
  },
  {
    path: 'car-reservation',
    component: ReservationCarComponent
  },
  {
    path: 'car-successful',
    component: SuccessfulCarComponent
  }
];



@NgModule({
  declarations: [
    SearchCarsComponent,
    CarsComponent,
    ListCarsComponent,
    DetailCarComponent,
    CreateDivPipe,
    ReservationCarComponent,
    SuccessfulCarComponent
  ],
  imports: [
    CardModule,
    ButtonModule,
    InputSwitchModule,
    TooltipModule,
    MatCheckboxModule,
    CheckboxModule,
    RadioButtonModule,
    SharedModule,
    DividerModule,
    OverlayPanelModule,
    DropdownModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class CarsModule { }
