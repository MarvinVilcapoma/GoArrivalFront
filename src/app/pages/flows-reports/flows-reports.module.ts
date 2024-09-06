import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlowsReportsComponent } from './flows-reports.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsListComponent } from './reports/reports-list/reports-list.component';
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BusinessRolesComponent } from './administrator/business-roles/business-roles.component';
import { CompanyMenusComponent } from './administrator/company-menus/company-menus.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { RoleCreateUpdateComponent } from './administrator/business-roles/role-create-update/role-create-update.component';
import { CostCenterComponent } from './administrator/cost-center/cost-center.component';
import { CostCreateUpdateComponent } from './administrator/cost-center/cost-create-update/cost-create-update.component';
import { UserManagementComponent } from './administrator/user-management/user-management.component';
import { UserCreateUpdateComponent } from './administrator/user-management/user-create-update/user-create-update.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTreeModule} from '@angular/material/tree';
import {MatChipsModule} from '@angular/material/chips';
import { ManageDocumentComponent } from './administrator/user-management/user-create-update/manage-document/manage-document.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MatDividerModule } from '@angular/material/divider';
import { ApprovalFlowsComponent } from './administrator/approval-flows/approval-flows.component';
import { ManageApprovalComponent } from './administrator/approval-flows/manage-approval/manage-approval.component';
import { ProfileComponent } from './administrator/profile/profile.component';
import { SidenavComponent } from './administrator/sidenav/sidenav.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AgencyManagementComponent } from './administrator/agency-management/agency-management.component';
import { AdministratorAgencyComponent } from './administrator/administrator-agency/administrator-agency.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { AgencyCreateUpdateComponent } from './administrator/administrator-agency/agency-create-update/agency-create-update.component';
import { PolicyManagementComponent } from './administrator/policy-management/policy-management.component';
import { PolicyConfigurationComponent } from './administrator/policy-management/policy-configuration/policy-configuration.component';
import { TooltipModule } from 'primeng/tooltip';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PolicyCreateUpdateComponent } from './administrator/policy-management/policy-configuration/policy-create-update/policy-create-update.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { AddSectionComponent } from './administrator/policy-management/policy-configuration/policy-create-update/add-section/add-section.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';
import { BookingListComponent } from './bookings/booking-list/booking-list.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DateFormatBookingPipe } from 'src/app/pipes/date-format-booking.pipe';
import { ApproveDetailBookingComponent } from './booking-management/approve-detail-booking/approve-detail-booking.component';
import { DetailBookingFlightComponent } from './booking-management/approve-detail-booking/detail-booking-flight/detail-booking-flight.component';
import { ToolbarModule } from 'primeng/toolbar';

import { DividerModule } from 'primeng/divider';
import { ListAuthorizersComponent } from './booking-management/approve-detail-booking/list-authorizers/list-authorizers.component';
import { ListPassengersComponent } from './booking-management/approve-detail-booking/list-passengers/list-passengers.component';
import { DetailBookingPriceComponent } from './booking-management/approve-detail-booking/detail-booking-price/detail-booking-price.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DetailPoliciesBookingComponent } from './booking-management/approve-detail-booking/detail-booking-price/detail-policies-booking/detail-policies-booking.component';
import { ReasonApprovalBookingComponent } from './booking-management/approve-detail-booking/reason-approval-booking/reason-approval-booking.component';

import { ButtonModule } from 'primeng/button';

import { CalendarModule } from 'primeng/calendar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ModalModule } from "ngx-bootstrap/modal";
import { InputTextModule } from 'primeng/inputtext';


import { SuperUserAgencyComponent } from './administrator/super-user-agency/super-user-agency.component';
import { ManagementAgencySuperComponent } from './administrator/super-user-agency/management-agency-super/management-agency-super.component';
import { PseudoManagementComponent } from './administrator/pseudo-management/pseudo-management.component';
import { CreateUpdatePseudoComponent } from './administrator/pseudo-management/create-update-pseudo/create-update-pseudo.component';
import { CardManagementComponent } from './administrator/card management/card-management/card-management.component';
import { CardCreateUpdateComponent } from './administrator/card management/card-create-update/card-create-update.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SmtpManagementComponent } from './administrator/smtp-management/smtp-management.component';
import { ChargeManagementComponent } from './administrator/charge-management/charge-management.component';
import { CreateUpdateChargeComponent } from './administrator/charge-management/create-update-charge/create-update-charge.component';
import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import { CheckboxModule } from 'primeng/checkbox';
import { AssignPseudosComponent } from './administrator/assign-pseudos/assign-pseudos.component';
import { DetailAccessComponent } from './administrator/assign-pseudos/detail-access/detail-access.component';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UidManagementComponent } from './administrator/uid-management/uid-management.component';
import { CreateUpdateUidComponent } from './administrator/uid-management/create-update-uid/create-update-uid.component';
import { CouponManagementComponent } from './administrator/coupon-management/coupon-management.component';
import { CreateUpdateCouponComponent } from './administrator/coupon-management/create-update-coupon/create-update-coupon.component';
import { GroupManagementComponent } from './administrator/group-management/group-management.component';
import { CreateUpdateGroupComponent } from './administrator/group-management/create-update-group/create-update-group.component';
import { ProfileGdsManagementComponent } from './administrator/profile-gds-management/profile-gds-management.component';
import { CreateUpdateProfileGdsComponent } from './administrator/profile-gds-management/create-update-profile-gds/create-update-profile-gds.component';
import { ManageMenuComponent } from './administrator/user-management/user-create-update/manage-menu/manage-menu.component';
import { CodeManagementComponent } from './administrator/code-management/code-management.component';
import { CreateUpdateCodeComponent } from './administrator/code-management/create-update-code/create-update-code.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AssignCouponUserComponent } from './administrator/coupon-management/assign-coupon-user/assign-coupon-user.component';
import { TreeTableModule } from 'primeng/treetable';
import { ChargeInternationalManagementComponent } from './administrator/charge-international-management/charge-international-management.component';
import { CreateUpdateInternationalChargueComponent } from './administrator/charge-international-management/create-update-international-chargue/create-update-international-chargue.component';
import { ListCustomizableManagementComponent } from './administrator/list-customizable-management/list-customizable-management.component';
import { CreateUpdateListCustomizableComponent } from './administrator/list-customizable-management/create-update-list-customizable/create-update-list-customizable.component';
import { MenuManagementComponent } from './administrator/menu-management/menu-management.component';
import { CreateUdpateMenuComponent } from './administrator/menu-management/create-udpate-menu/create-udpate-menu.component';
import { AssignEnterpriseMenuComponent } from './administrator/menu-management/assign-enterprise-menu/assign-enterprise-menu.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ViewManagementComponent } from './reports/reports-list/view-management/view-management.component';
import { ReissueComponent } from './booking-management/reissue/reissue.component';
import { ReissueSuccessComponent } from './booking-management/reissue/reissue-success/reissue-success.component';
import { OptionsFlightsComponent } from './booking-management/reissue/options-flights/options-flights.component';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PaymentsCancellationsComponent } from './administrator/payments-cancellations/payments-cancellations.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { UserManagementTravelAgentComponent } from './administrator/user-management-travel-agent/user-management-travel-agent.component';
import { CreateUpdateUserAgentComponent } from './administrator/user-management-travel-agent/create-update-user-agent/create-update-user-agent.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NotificationManagementComponent } from './administrator/notification-management/notification-management.component';





const routes: Routes = [
  {
    path: '',
    component: FlowsReportsComponent
  },
  {path: 'bookings',component: BookingsComponent},
  {path: 'profile',component: ProfileComponent, title: "GoArrival-Mi Perfil"},
  {path: 'approval-flows',component: ApprovalFlowsComponent},
  {path: 'manage-reservation',component: ApproveDetailBookingComponent},
  {path: 'booking-list',component: BookingListComponent},
  {path: 'booking-mangament',component: BookingManagementComponent},
  {path: 'business-roles',component: BusinessRolesComponent},
  {path: 'policy-management',component: PolicyManagementComponent},
  {path: 'policy-configuration/:id',component: PolicyConfigurationComponent},
  {path: 'cost-center',component: CostCenterComponent},
  {path: 'user-management',component: UserManagementComponent},
  {path: 'assign-pseudos/:id',component: AssignPseudosComponent},
  {path: 'uid-management/:id',component: UidManagementComponent},
  {path: 'pseudo-management',component: PseudoManagementComponent},
  {path: 'payments-cancellations',component: PaymentsCancellationsComponent},
  {path: 'charge-management',component: ChargeManagementComponent},
  {path: 'charge-international-management',component: ChargeInternationalManagementComponent},
  {path: 'code-management',component: CodeManagementComponent},
  {path: 'coupon-management',component: CouponManagementComponent},
  {path: 'agency-management',component: AgencyManagementComponent},
  {path: 'menu-management',component: MenuManagementComponent},
  {path: 'profile-gds-management',component: ProfileGdsManagementComponent},
  {path: 'group-management',component: GroupManagementComponent},
  {path: 'assign-list/:id',component: ListCustomizableManagementComponent},
  {path: 'agency-management-user',component: SuperUserAgencyComponent},
  {path: 'administrator',component: AdministratorComponent},
  {path: 'administrator-agency',component: AdministratorAgencyComponent},
  {path: 'administrator-agency-manage/:id',component: AgencyCreateUpdateComponent},
  {path: 'administrator-user/:id',component: UserCreateUpdateComponent},
  {path: 'administrator-flows/:id',component: ManageApprovalComponent},
  {path: 'reports',component: ReportsComponent},
  {path: 'card-management', component: CardManagementComponent},
  {path: 'smtp-management', component: SmtpManagementComponent},
  {path: 'reports-list',component: ReportsListComponent},
  {path: 'user-management-agent', component: UserManagementTravelAgentComponent},
  {path: 'card-create-update/:id', component: CardCreateUpdateComponent},
  {path: 'notification-management', component: NotificationManagementComponent}
];


@NgModule({
  declarations: [
    FlowsReportsComponent,
    ReportsComponent,
    BookingsComponent,
    ReportsListComponent,
    AdministratorComponent,
    BusinessRolesComponent,
    CompanyMenusComponent,
    RoleCreateUpdateComponent,
    CostCenterComponent,
    CostCreateUpdateComponent,
    UserManagementComponent,
    NotificationManagementComponent,
    UserCreateUpdateComponent,
    ManageDocumentComponent,
    ApprovalFlowsComponent,
    ManageApprovalComponent,
    ProfileComponent,
    SidenavComponent,
    AgencyManagementComponent,
    AdministratorAgencyComponent,
    AgencyCreateUpdateComponent,
    PolicyManagementComponent,
    PolicyConfigurationComponent,
    PolicyCreateUpdateComponent,
    AddSectionComponent,
    BookingListComponent,
    BookingManagementComponent,
    DateFormatBookingPipe,
    ApproveDetailBookingComponent,
    DetailBookingFlightComponent,
    ListAuthorizersComponent,
    ListPassengersComponent,
    DetailBookingPriceComponent,
    DetailPoliciesBookingComponent,
    ReasonApprovalBookingComponent,
    SuperUserAgencyComponent,
    ManagementAgencySuperComponent,
    PseudoManagementComponent,
    CreateUpdatePseudoComponent,
    CardManagementComponent,
    CardCreateUpdateComponent,
    SmtpManagementComponent,
    ChargeManagementComponent,
    CreateUpdateChargeComponent,
    AssignPseudosComponent,
    DetailAccessComponent,
    UidManagementComponent,
    CreateUpdateUidComponent,
    CouponManagementComponent,
    CreateUpdateCouponComponent,
    GroupManagementComponent,
    CreateUpdateGroupComponent,
    ProfileGdsManagementComponent,
    CreateUpdateProfileGdsComponent,
    CreateUpdateCodeComponent,
    ManageMenuComponent,
    CodeManagementComponent,
    AssignCouponUserComponent,
    ChargeInternationalManagementComponent,
    CreateUpdateInternationalChargueComponent,
    ListCustomizableManagementComponent,
    CreateUpdateListCustomizableComponent,
    MenuManagementComponent,
    CreateUdpateMenuComponent,
    AssignEnterpriseMenuComponent,
    ViewManagementComponent,
    ReissueComponent,
    ReissueSuccessComponent,
    OptionsFlightsComponent,
    PaymentsCancellationsComponent,
    UserManagementTravelAgentComponent,
    CreateUpdateUserAgentComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSnackBarModule,
    ProgressSpinnerModule,
    MatProgressBarModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    InputIconModule,
    IconFieldModule,
    FloatLabelModule,
    MatTableModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MessageModule,
    ChipsModule,
    PasswordModule,
    SplitButtonModule,
    BlockUIModule,
    DividerModule,
    SidebarModule,
    RadioButtonModule,
    MultiSelectModule,
    ToggleButtonModule,
    CheckboxModule,
    ConfirmPopupModule,
    DropdownModule,
    PanelMenuModule,
    ButtonModule,
    PanelModule,
    TableModule,
    CalendarModule,
    MessagesModule,
    TooltipModule,
    TreeTableModule,
    CardModule,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    AutocompleteLibModule,
    SelectButtonModule,
    InputNumberModule,
    DynamicDialogModule,
    MatPaginatorModule,
    ToastModule,
    FileUploadModule,
    TreeSelectModule,
    MatCheckboxModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    DragDropModule,
    InputTextModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    MatTreeModule,
    MatMenuModule,
    MatDividerModule,
    DialogModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSortModule,
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,
    ToolbarModule,
    MatSidenavModule, NgIf, MatButtonModule, MatToolbarModule,MatIconModule,MatListModule,FormsModule,NgClass,MatFormFieldModule,MatSelectModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MessageService,
    BsModalService,
    DatePipe
  ],
})
export class FlowsReportsModule { }
