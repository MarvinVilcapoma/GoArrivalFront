import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceSearchComponent } from './insurance-search/insurance-search.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InsuranceComponent } from './insurance.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { InsuranceReservationComponent } from './insurance-reservation/insurance-reservation.component';
import { InsuranceSuccessfulComponent } from './insurance-successful/insurance-successful.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';


const routes: Routes = [
  {
    path: '',
    component: InsuranceComponent
  },
  {path: 'insurance-list',component: InsuranceListComponent},
  {path: 'insurance-reservation',component: InsuranceReservationComponent},
  {path: 'insurance-successful',component: InsuranceSuccessfulComponent},
];

@NgModule({
  declarations: [
    InsuranceSearchComponent,
    InsuranceComponent,
    InsuranceListComponent,
    InsuranceReservationComponent,
    InsuranceSuccessfulComponent
  ],
  imports: [
    CardModule,
    DividerModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    DialogModule,
    MessagesModule, 
    PanelModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class InsuranceModule { }
