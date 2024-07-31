import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleCentralizerComponent } from './seekers/role-centralizer/role-centralizer.component';
import { SearchFlightComponent } from './seekers/search-flight/search-flight.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PassengerCounterComponent } from './seekers/search-flight/passenger-counter/passenger-counter.component';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { CalendarFlightsComponent } from './flights-list/calendar-flights/calendar-flights.component';
import { RecommendationComponent } from './flights-list/recommendation/recommendation.component';
import { SectionComponent } from './flights-list/recommendation/section/section.component';
import { SegmentComponent } from './flights-list/recommendation/segment/segment.component';
import { SegmentGroupComponent } from './flights-list/recommendation/segment-group/segment-group.component';
import { FinalPriceComponent } from './flights-list/recommendation/final-price/final-price.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { FormattimeairportPipe } from 'src/app/pipes/formattimeairport.pipe';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'primeng/tooltip';
import { FamilyRateComponent } from './family-rate/family-rate.component';
import { FilterTimeComponent } from './filters/filter-time/filter-time.component';
import { FilterHourComponent } from './filters/filter-hour/filter-hour.component';
import { FilterAirlineComponent } from './filters/filter-airline/filter-airline.component';
import { OrderPriceComponent } from './filters/order-price/order-price.component';
import { AlertModule } from "ngx-bootstrap/alert";
import { ReservationComponent } from './reservation/reservation.component';
import { PassengersComponent } from './reservation/passengers/passengers.component';
import { PassengerDataComponent } from './reservation/passengers/passenger-data/passenger-data.component';
import { GenerateReservationComponent } from './reservation/generate-reservation/generate-reservation.component';
import { FechaformatPipe } from 'src/app/pipes/fechaformat.pipe';
import { FormatStringDatePipe } from 'src/app/pipes/format-string-date.pipe';
import { DetailPriceComponent } from './reservation/detail-price/detail-price.component';
import { DetailFlightComponent } from './reservation/detail-flight/detail-flight.component';
import { DetailSectionComponent } from './reservation/detail-flight/detail-section/detail-section.component';
import { DetailSegmentComponent } from './reservation/detail-flight/detail-segment/detail-segment.component';
import { ModalDetailFlightComponent } from './reservation/detail-flight/modal-detail-flight/modal-detail-flight.component';
import { ModalSectionComponent } from './reservation/detail-flight/modal-section/modal-section.component';
import { ModalSegmentComponent } from './reservation/detail-flight/modal-segment/modal-segment.component';
import { ModalSegmentGroupComponent } from './reservation/detail-flight/modal-segment-group/modal-segment-group.component';
import { PassengerContactComponent } from './reservation/passengers/passenger-contact/passenger-contact.component';
import { ReasonTripComponent } from './reservation/passengers/reason-trip/reason-trip.component';
import { ExtraProfileComponent } from './reservation/passengers/extra-profile/extra-profile.component';
import { DetailPassengersComponent } from './reservation/generate-reservation/detail-passengers/detail-passengers.component';
import { ApproversPoliciesComponent } from './reservation/generate-reservation/approvers-policies/approvers-policies.component';
import { PseudosComponent } from './flights-list/pseudos/pseudos.component';
import { SuccessfulReservationComponent } from './reservation/successful-reservation/successful-reservation.component';
import { MultiDestinationComponent } from './seekers/multi-destination/multi-destination.component';
import { FamilySectionComponent } from './family-rate/family-section/family-section.component';
import { FamilySegmentComponent } from './family-rate/family-segment/family-segment.component';
import { FamilyFareComponent } from './family-rate/family-fare/family-fare.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BagsComponent } from './ancillaries/bags/bags.component';
import { SeatsComponent } from './ancillaries/seats/seats.component';
import { CrossellingHotelComponent } from './crosselling/crosselling-hotel/crosselling-hotel.component';
import { PopoverModule } from "ngx-bootstrap/popover";

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { 
	IgxCarouselModule,
	IgxSliderModule,
  IgxInputGroupModule,
  IgxListModule,
  IgxIconModule,
	IgxButtonModule
 } from "igniteui-angular";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { CrossellingRoomComponent } from './crosselling/crosselling-room/crosselling-room.component';
import { SeatDataComponent } from './reservation/passengers/seat-data/seat-data.component';
import { BagDataComponent } from './reservation/passengers/bag-data/bag-data.component';
import { CrossellingDataComponent } from './reservation/passengers/crosselling-data/crosselling-data.component';
import { PoliciesComponent } from './policies/policies.component';
import { SharedModule } from '../shared/shared.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { FilterGlobalizerComponent } from './filters/filter-globalizer/filter-globalizer.component';
import { GetDaysDatesPipe } from 'src/app/pipes/get-days-dates.pipe';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DateToSpanishPipe } from 'src/app/pipes/date-to-spanish.pipe';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { FloatLabelModule } from 'primeng/floatlabel';

import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
registerLocaleData(localeEsPe);

const routes: Routes = [
  {
    path: '',
    component: FlightsComponent
  },
  {path: 'flight-list',component: FlightsListComponent},
  {path: 'select-seat', component: SeatsComponent},
  {path: 'select-bag', component: BagsComponent},
  {path: 'crosselling-hotel', component: CrossellingHotelComponent},
  {path: 'crosselling-room', component: CrossellingRoomComponent},
  {path: 'passenger-data',component: PassengersComponent},
  {path: 'generate-reservation',component: ReservationComponent},
  {path: 'successful-reservation',component: SuccessfulReservationComponent}
];

@NgModule({
  declarations: [
    FlightsComponent,
    RoleCentralizerComponent,
    DateToSpanishPipe,
    SearchFlightComponent,
    PassengerCounterComponent,
    GetDaysDatesPipe,
    FormattimeairportPipe,
    FlightsListComponent,
    CalendarFlightsComponent,
    RecommendationComponent,
    SectionComponent,
    SegmentComponent,
    SegmentGroupComponent,
    FinalPriceComponent,
    FamilyRateComponent,
    FechaformatPipe,
    FormatStringDatePipe,
    FilterTimeComponent,
    FilterHourComponent,
    FilterAirlineComponent,
    OrderPriceComponent,
    ReservationComponent,
    PassengersComponent,
    PassengerDataComponent,
    GenerateReservationComponent,
    DetailPriceComponent,
    DetailFlightComponent,
    DetailSectionComponent,
    DetailSegmentComponent,
    ModalDetailFlightComponent,
    ModalSectionComponent,
    ModalSegmentComponent,
    ModalSegmentGroupComponent,
    PassengerContactComponent,
    ReasonTripComponent,
    ExtraProfileComponent,
    DetailPassengersComponent,
    ApproversPoliciesComponent,
    PseudosComponent,
    SuccessfulReservationComponent,
    MultiDestinationComponent,
    FamilySectionComponent,
    FamilySegmentComponent,
    FamilyFareComponent,
    BagsComponent,
    SeatsComponent,
    CrossellingHotelComponent,
    CrossellingRoomComponent,
    SeatDataComponent,
    BagDataComponent,
    CrossellingDataComponent,
    PoliciesComponent,
    FilterGlobalizerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    SkeletonModule,
    DialogModule,
    AccordionModule,
    DividerModule,
    SelectButtonModule,
    AlertModule.forRoot(),
    MessagesModule,
    IgxCarouselModule,
    IgxSliderModule,
    InputTextareaModule,
    OverlayPanelModule,
    RadioButtonModule,
    FloatLabelModule,
    CardModule,
    SharedModule,
    MatDialogModule,
    CalendarModule,
    DropdownModule,
    IgxListModule,
    IgxIconModule,
    IgxButtonModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule,
    IgxInputGroupModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    MatProgressBarModule,
    CollapseModule.forRoot(),
    AutocompleteLibModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' },
    BsModalService
  ],
})
export class FlightsModule { }
