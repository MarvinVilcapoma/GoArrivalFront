import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { SeekersComponent } from './seekers/seekers.component';
import { SearchHotelComponent } from './seekers/search-hotel/search-hotel.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelComponent } from './hotel.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HotelItemComponent } from './hotel-list/hotel-item/hotel-item.component';
import { TooltipModule } from 'primeng/tooltip';
import { RoomListComponent } from './room-list/room-list.component';
import { FilterStarComponent } from './filters/filter-star/filter-star.component';
import { FilterPriceComponent } from './filters/filter-price/filter-price.component';
import { FilterNameComponent } from './filters/filter-name/filter-name.component';
import { FilterDistanceComponent } from './filters/filter-distance/filter-distance.component';
import { FilterServicesComponent } from './filters/filter-services/filter-services.component';
import { MessagesModule } from 'primeng/messages';
import { SliderModule } from 'primeng/slider';
import { SharedModule } from '../shared/shared.module';
import { ReservationComponent } from './reservation/reservation.component';
import { PassengerDataComponent } from './reservation/passenger-data/passenger-data.component';
import { PayComponent } from './reservation/pay/pay.component';
import { DetailReservationComponent } from './reservation/detail-reservation/detail-reservation.component';
import { ContactInformationComponent } from './reservation/contact-information/contact-information.component';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { StarsComponent } from './seekers/search-hotel/stars/stars.component';
import { CardModule } from 'primeng/card';
import { SuccessfulReservationComponent } from './successful-reservation/successful-reservation.component';
import { CarouselModule } from 'primeng/carousel';



const routes: Routes = [
  {
    path: '',
    component: HotelComponent
  },
  {path: 'hotel-list',component: HotelListComponent},
  {path: 'room-list',component: RoomListComponent},
  {path: 'reservation',component: ReservationComponent},
  {path: 'successful-reservation',component: SuccessfulReservationComponent},
];

@NgModule({
  declarations: [
    HotelListComponent,
    HotelComponent,

    SeekersComponent,
    StarsComponent,
    SearchHotelComponent,
    HotelItemComponent,
    RoomListComponent,
    FilterStarComponent,
    FilterPriceComponent,
    FilterNameComponent,
    FilterDistanceComponent,
    FilterServicesComponent,
    ReservationComponent,
    PassengerDataComponent,
    PayComponent,
    DetailReservationComponent,
    ContactInformationComponent,
    SuccessfulReservationComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    DividerModule,
    RatingModule,
    CardModule,
    CarouselModule,
    DropdownModule,
    SliderModule,
    TooltipModule,
    MessagesModule,
    InputTextModule,
    ButtonModule,
    OverlayPanelModule,
    CalendarModule,
    BsDatepickerModule.forRoot(),
    AutocompleteLibModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BsDropdownDirective
  ],
})
export class HotelModule { }
