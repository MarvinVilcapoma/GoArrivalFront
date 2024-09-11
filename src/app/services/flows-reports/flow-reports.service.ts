
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseManageListCompanyAccessUid } from 'src/models/flows-reports/company-access-uid';

let httpOptions = {
  headers: new HttpHeaders()
};

let httpOptionsF = {
  headers: new HttpHeaders()
};



@Injectable({
  providedIn: 'root'
})
export class FlowReportsService {



  /* Company */

  private urlGetListCompanyAccessUid: string = environment.url + 'CompanyAccessUid/GetListCompanyAccessUid';
  private urlManageListCompanyAccessUid: string = environment.url + 'CompanyAccessUid/ManageListCompanyAccessUid';
  private urlGetCompanyAccessUid: string = environment.url + 'CompanyAccessUid/GetCompanyAccessUid';
  private urlGetCompanyAccessUidDetail: string = environment.url + 'CompanyAccessUid/GetCompanyAccessUidDetail';
  private urlManageCompanyAccessUid: string = environment.url + 'CompanyAccessUid/ManageCompanyAccessUid';
  private urlGetCompanyDetail: string = environment.url + 'Company/GetCompanyDetail';
  private urlCompanyReport: string = environment.url_customer + 'CompanyReport/ListCompanyReport';
  private urlInsertUpdate: string = environment.url_customer + 'CompanyReport/InsertUpdateCompanyReport';
  private urlGetTypeCompany: string = environment.url + 'Company/GetTypeCompany';
  private urlUpdateCompany: string = environment.url + 'Company/UpdateCompany';
  private urlGetCompany: string = environment.url + 'CompanyProfileGds/GetCompanyProfile';
  private urlGetCompanyProfileDetail: string = environment.url + 'CompanyProfileGds/GetCompanyProfileDetail';
  private urlManageCompanyProfile: string = environment.url + 'CompanyProfileGds/ManageCompanyProfile';
  private urlGetCompanyApproval: string = environment.url + 'Company/GetCompanyApproval';
  private urlGetCompanyPolicies: string = environment.url_policy + 'CompanyPolicy/GetCompanyPolicies';
  private urlGetCompanyConfiguration: string = environment.url_policy + 'CompanyPolicy/GetCompanyConfiguration';
  private urlManageCompany: string = environment.url + 'Company/ManageCompany';
  private urlGetCompanyAgency: string = environment.url + 'Company/GetCompany';
  private urlGetCompanyAccessByCredential: string = environment.url + 'CompanyAccess/GetCompanyAccessByCredential';
  private urlGetCompanyAccessByCompany: string = environment.url + 'CompanyAccess/GetCompanyAccessByCompany';
  private urlGetCompanyAccessDetail: string = environment.url + 'CompanyAccess/GetCompanyAccessDetail';
  private urlManageCompanyAccess: string = environment.url + 'CompanyAccess/ManageCompanyAccess';
  private urlManageCompanyPolicy: string = environment.url_policy + 'CompanyPolicy/ManageCompanyPolicy';


  /* Reports */

  private urlGeneralReport: string = environment.url_reportGeneral + 'Report/GetGeneralReport';
  private urlReportHotel: string = environment.url_reportGeneral + 'Report/GetHotelReport';
  private urlField: string = environment.url_customer + 'ReportField/GetReportFields';

  /* Agency */

  private urlGetAgency: string = environment.url + 'Agency/GetAgency';
  private urlManageAgency: string = environment.url + 'Agency/ManageAgency';
  private urlGetAgencyDetail: string = environment.url + 'Agency/GetAgencyDetail';
  private urlUpdateAgency: string = environment.url + 'Agency/UpdateAgency';
  private urlGetAgencyCodeCoupon: string = environment.url + 'AgencyCodeCoupon/GetAgencyCodeCoupon';
  private urlGetAgencyCodeCouponDetail: string = environment.url + 'AgencyCodeCoupon/GetAgencyCodeCouponDetail';
  private urlManageAgencyCodeCoupon: string = environment.url + 'AgencyCodeCoupon/ManageAgencyCodeCoupon';
  private urlGetAgencySMTP: string = environment.url + 'AgencySmtp/GetAgencySMTP';
  private urlUpdateAgencySMTP: string = environment.url + 'AgencySmtp/ManageAgencySmtp';

  /* Reservation */


  private _url3: string = environment.url_2 + "Reservation/";
  private url_getreservation: string = environment.url_hotel + 'Booking/GetReservation';
  private url_carslist: string = environment.url_cars + 'Reservation/';
  private urlGetReservationAuthorizer: string = environment.url_2 + 'Reservation/GetReservationByApproverID';
  private urlManageBooking: string = environment.url_2 + 'Reservation/GetReservationDetail';

  /* Pseudos - Coupon */

  private urlGetPseudoCredential: string = environment.url + 'Pseudo/GetPseudoCredential';
  private urlGetPseudo: string = environment.url + 'Pseudo/GetPseudo';
  private urlgetPseudoDetail: string = environment.url + 'Pseudo/GetPseudoDetail';
  private urlManageAgencyPseudo: string = environment.url + 'Pseudo/ManageAgencyPseudo';
  private urlGetCoupon: string = environment.url + 'Coupon/GetCoupon';
  private urlGetCouponDetail: string = environment.url + 'Coupon/GetCouponDetail';
  private urlManageCoupon: string = environment.url + 'Coupon/ManageCoupon';
  private urlSendCouponByMail: string = environment.url + 'Coupon/SendCouponByMail';

  /* Charges */

  private urlGetCharges: string = environment.url + 'Charge/GetCharges';
  private urlGetChargeDetail: string = environment.url + 'Charge/GetChargeDetail';
  private urlManageCharges: string = environment.url + 'Charge/ManageCharges';
  private urlGetInternationalCharge: string = environment.url + 'InternationalCharge/GetInternationalCharge';
  private urlGetInternationalChargeDetail: string = environment.url + 'InternationalCharge/GetInternationalChargeDetail';
  private urlManageInternationalCharge: string = environment.url + 'InternationalCharge/ManageInternationalCharge';

  /* Role - Cost-Center */

  private urlGetRole: string = environment.url + 'Role/GetRole';
  private urlManageEnterpriseRole: string = environment.url + 'Role/ManageEnterpriseRole';
  private urlManageCostCenterByExcel: string = environment.url + 'CostCenter/ManageCostCenterByExcel';
  private urlManageCostCenter: string = environment.url + 'CostCenter/ManageCostCenter';
  private urlGetCostCenter: string = environment.url + 'CostCenter/GetCostCenter';
  private urlManagePersonByExcel: string = environment.url + 'Person/ManagePersonByExcel';
  /* Menú */

  private urlGetMenuByEnterpriseCode: string = environment.url + 'Menu/GetMenuByEnterpriseCode';
  private urlGetMenu: string = environment.url + 'Menu/GetMenu';
  private urlGetMenuDetail: string = environment.url + 'Menu/GetMenuDetail';
  private urlManageMenu: string = environment.url + 'Menu/ManageMenu';
  private urlGetEnterpriseMenu: string = environment.url + 'Menu/GetEnterpriseMenu';
  private urlAssignEnterpriseMenu: string = environment.url + 'Menu/AssignEnterpriseMenu';

  /* Others */

  private urlgetApprovalType: string = environment.url + 'Approval/GetApprovalType';
  private urlGetEnterprisePerson: string = environment.url + 'Person/GetEnterprisePerson';
  private urlGetNotification: string = environment.url + 'Notification/GetNotification';
  private urlGetPersonDetail: string = environment.url + 'Person/GetPersonDetail';
  private urlManagePerson: string = environment.url + 'Person/ManagePerson';
  private urlUpdatePerson: string = environment.url + 'Person/UpdatePerson';
  private url_countries: string = environment.url_2 + "Country/";
  private urlGetApprovalSetting: string = environment.url + 'ApprovalSetting/GetApprovalSetting';
  private urlGetService: string = environment.url + 'Service/GetService';
  private urlManageApprovalSetting: string = environment.url + 'ApprovalSetting/ManageApprovalSetting';
  private urlGetApprovalSettingDetail: string = environment.url + 'ApprovalSetting/GetApprovalSettingDetail';
  private urlApprove: string = environment.url_2 + 'Reservation/Approve';
  private urlRefuse: string = environment.url_2 + 'Reservation/Refuse';
  private urlGetGds: string = environment.url + 'Gds/GetGds';
  private urlManageApprovalSettingByExcel: string = environment.url + 'ApprovalSetting/ManageApprovalSettingByExcel';
  private urlGetUidNotUsed: string = environment.url + 'Uid/GetUidNotUsed';
  private urlManageGroup: string = environment.url + 'Group/ManageGroup';
  private urlGetGroupByAgencyID: string = environment.url + 'Group/GetGroupByAgencyID';
  private urlManageAdditionalRoute: string = environment.url_policy + 'AverageCost/ManageAdditionalRoute';
  private urlApprovalBooking: string = environment.url_2 + "Authorization/ApproveReservation";
  private urlGetCard: string = environment.url + 'CompanyCreditCard/GetCompanyCreditCard';
  private urlGetMethodOfPayment: string = environment.url + "MethodOfPayment/GetMethodOfPayment";
  private urlGetCurrency: string = environment.url + 'Currency/GetCurrency';
  private urlUpdatePassword: string = environment.url + 'User/UpdatePassword';


  key: string;
  constructor(private http: HttpClient) {
    this.key = environment.key;
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });

    httpOptionsF.headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.key
    });
  }


  /* Bookings - Manage */


  managementBooking(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageBooking}`, data, httpOptions);
  }

  manageCompanyAccessUid(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCompanyAccessUid}`, data, httpOptions);
  }

  manageGroup(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageGroup}`, data, httpOptions);
  }

  assignEnterpriseMenu(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlAssignEnterpriseMenu}`, data, httpOptions);
  }

  manageCostCenter(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCostCenter}`, data, httpOptions);
  }

  manageEnterpriseRole(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageEnterpriseRole}`, data, httpOptions);
  }

  manageCharges(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCharges}`, data, httpOptions);
  }

  manageAgencyPseudo(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageAgencyPseudo}`, data, httpOptions);
  }

  manageCompanyProfile(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCompanyProfile}`, data, httpOptions);
  }

  managePerson(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManagePerson}`, data, httpOptions);
  }

  updatePerson(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlUpdatePerson}`, data, httpOptions);
  }

  manageInternationalCharge(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageInternationalCharge}`, data, httpOptions);
  }

  manageAgencyCodeCoupon(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageAgencyCodeCoupon}`, data, httpOptions);
  }

  manageAgency(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageAgency}`, data, httpOptions);
  }

  manageCompanyAccess(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCompanyAccess}`, data, httpOptions);
  }

  manageCoupon(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCoupon}`, data, httpOptions);
  }

  manageApprovalSetting(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageApprovalSetting}`, data, httpOptions);
  }

  manageCompany(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCompany}`, data, httpOptions);
  }

  manageCostCenterByExcel(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCostCenterByExcel}`, data, httpOptionsF);
  }

  managePersonByExcel(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManagePersonByExcel}`, data, httpOptionsF);
  }

  manageApprovalSettingByExcel(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageApprovalSettingByExcel}`, data, httpOptionsF);
  }

  manageCompanyPolicy(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageCompanyPolicy}`, data, httpOptions);
  }

  manageAdditionalRoute(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageAdditionalRoute}`, data, httpOptions);
  }

  manageListCompanyAccessUid(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageListCompanyAccessUid}`, data, httpOptions);
  }

  manageMenu(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlManageMenu}`, data, httpOptions);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url + 'CompanyCreditCard/ManageCreditCard'}`, data, httpOptions);
  }


  /* Reports - Gets */

  getReservationAuthorizer(data: any): Observable<any> {
    const url = `${this.urlGetReservationAuthorizer}?${'approverID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getListCompanyAccessUid(data: any): Observable<ResponseManageListCompanyAccessUid> {
    const url = `${this.urlGetListCompanyAccessUid}?${'accessUidID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getReservasFlight(data: any): Observable<any> {
    const url = `${this._url3 + 'GetReservationByUserID'}?${'userID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getReservaHotel(data: any): Observable<any[]> {
    const url = `${this.url_getreservation}?${'userId=' + data}`;
    return this.http.get<any[]>(url, httpOptions);
  }

  getReservasAutos(data: any): Observable<any[]> {
    const url = `${this.url_carslist + 'GetReservation'}?${'userId=' + data}`;
    return this.http.get<any[]>(url, httpOptions);
  }

  getReportGeneral(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.urlGeneralReport}`, data, httpOptions);
  }

  getCompanyReport(data: any): Observable<any> {
    return this.http.get<any>(`${this.urlCompanyReport}?${'companyId=' + data}&${'reportId=1'}`, httpOptions);
  }

  getReportHotel(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlReportHotel}`, data, httpOptions);
  }

  getCompanyDetail(data: any): Observable<any> {
    const url = `${this.urlGetCompanyDetail}?${'companyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getTypeCompany(): Observable<any> {
    return this.http.get<any>(`${this.urlGetTypeCompany}`, httpOptions);
  }

  getGDS(): Observable<any> {
    return this.http.get<any>(`${this.urlGetGds}`, httpOptions);
  }

  getUidNotUsed(data: any): Observable<any> {
    const url = `${this.urlGetUidNotUsed}?${'companyAccesID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyAccessUidDetail(data: any): Observable<any> {
    const url = `${this.urlGetCompanyAccessUidDetail}?${'accessUidID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyAccessUid(data: any): Observable<any> {
    const url = `${this.urlGetCompanyAccessUid}?${'companyAccessID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getAgency(data: any): Observable<any> {
    const url = `${this.urlGetAgency}?${'isAdministrator=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getPseudos(data: any): Observable<any> {
    const url = `${this.urlGetPseudo}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCoupon(data: any): Observable<any> {
    const url = `${this.urlGetCoupon}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCouponDetail(data: any): Observable<any> {
    const url = `${this.urlGetCouponDetail}?${'couponID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getGroupByAgencyID(data: any): Observable<any> {
    const url = `${this.urlGetGroupByAgencyID}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getApprovalType(): Observable<any> {
    return this.http.get<any>(`${this.urlgetApprovalType}`, httpOptions);
  }

  getEnterpriseMenu(id: number, data1: boolean): Observable<any> {
    const url = `${this.urlGetEnterpriseMenu}?${'menuID=' + id + '&isAgency=' + data1}`;
    return this.http.get<any>(url, httpOptions);
  }

  getRole(data: string, data1: boolean, data2: boolean): Observable<any> {
    const url = `${this.urlGetRole}?${'enterpriseCode=' + data + '&isAgency=' + data1 + '&administrator=' + data2}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCostCenter(data: any, data1: boolean): Observable<any> {
    const url = `${this.urlGetCostCenter}?${'companyID=' + data + '&administrator=' + data1}`;
    return this.http.get<any>(url, httpOptions);
  }

  getEnterprisePerson(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlGetEnterprisePerson}`, data, httpOptions);
  }

  geturlGetNotification(data:any, data1: boolean) : Observable<any>{
    const url = `${this.urlGetNotification}?${'userID='+data + '&isAdministrator=' + data} `;
    return this.http.get<any>(url, httpOptions);
  }

  getPersonDetail(data: any): Observable<any> {
    const url = `${this.urlGetPersonDetail}?${'userID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getMenuByEnterpriseCode(data: any, data1: boolean): Observable<any> {
    const url = `${this.urlGetMenuByEnterpriseCode}?${'enterpriseCode=' + data + '&isAgency=' + data1}`;
    return this.http.get<any>(url, httpOptions);
  }

  getMenu(): Observable<any> {
    return this.http.get<any>(this.urlGetMenu, httpOptions);
  }

  getMenuDetail(data: any): Observable<any> {
    const url = `${this.urlGetMenuDetail}?${'menuID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCards(companyId: string, isAdministrator: boolean): Observable<any> {
    const url = `${this.urlGetCard}?${'companyID=' + companyId}&${'isAdministrator=' + isAdministrator}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyProfile(data: any): Observable<any> {
    const url = `${this.urlGetCompany}?${'companyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyProfileDetail(data: any): Observable<any> {
    const url = `${this.urlGetCompanyProfileDetail}?${'companyProfileID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.url_countries + 'GetCountry', httpOptions);
  }

  getPseudoDetail(data: any): Observable<any> {
    const url = `${this.urlgetPseudoDetail}?${'agencyPseudoID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCharges(data: any): Observable<any> {
    const url = `${this.urlGetCharges}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getInternationalCharge(data: any): Observable<any> {
    const url = `${this.urlGetInternationalCharge}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getInternationalChargeDetail(data: any): Observable<any> {
    const url = `${this.urlGetInternationalChargeDetail}?${'companyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getChargeDetail(data: any): Observable<any> {
    const url = `${this.urlGetChargeDetail}?${'chargeServiceID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyApproval(data: any): Observable<any> {
    const url = `${this.urlGetCompanyApproval}?${'companyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyAgency(data: any): Observable<any> {
    const url = `${this.urlGetCompanyAgency}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getAgencyCodeCoupon(data: any): Observable<any> {
    const url = `${this.urlGetAgencyCodeCoupon}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getAgencyCodeCouponDetail(data: any): Observable<any> {
    const url = `${this.urlGetAgencyCodeCouponDetail}?${'agencyCouponID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getApprovalSetting(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlGetApprovalSetting}`, data, httpOptions);
  }

  getServiceChargue(): Observable<any> {
    return this.http.get<any>(this.urlGetService, httpOptions);
  }

  getCurrency(): Observable<any> {
    return this.http.get<any>(this.urlGetCurrency, httpOptions);
  }

  getCompanyAccessByCredential(data: any): Observable<any> {
    const url = `${this.urlGetCompanyAccessByCredential}?${'credentialID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyAccessByCompany(data: any): Observable<any> {
    const url = `${this.urlGetCompanyAccessByCompany}?${'companyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyAccessDetail(data: any): Observable<any> {
    const url = `${this.urlGetCompanyAccessDetail}?${'companyAccessID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getService(data: any): Observable<any> {
    const url = `${this.urlGetService}?${'onlyServiceMain=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getApprovalSettingDetail(data: any): Observable<any> {
    const url = `${this.urlGetApprovalSettingDetail}?${'approvalSettingID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getAgencyDetail(data: any): Observable<any> {
    const url = `${this.urlGetAgencyDetail}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyPolicies(data: any): Observable<any> {
    const url = `${this.urlGetCompanyPolicies}?${'companyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCompanyConfiguration(data: any, data1: boolean): Observable<any> {
    const url = `${this.urlGetCompanyConfiguration}?${'companyID=' + data + '&policyCode=' + data1}`;
    return this.http.get<any>(url, httpOptions);
  }

  getAgencySMTP(data: any): Observable<any> {
    const url = `${this.urlGetAgencySMTP}?${'agencyID=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getReportField(data: any): Observable<any> {
    const url = `${this.urlField}?${'companyReportId=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getCreditCardDetail(cardID: string): Observable<any> {
    const url = `${environment.url + 'CompanyCreditCard/GetCreditCardDetail'}?${'creditCardID=' + cardID}`;
    return this.http.get<any>(url, httpOptions);
  }



  /* Others */

  approvalBooking(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.urlApprovalBooking}`, data, httpOptions);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlUpdatePassword}`, data, httpOptions);
  }

  approve(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApprove}`, data, httpOptions);
  }

  refuse(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlRefuse}`, data, httpOptions);
  }

  pay(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url + 'Company/Payment'}`, data, httpOptions);
  }

  get(): Observable<any> {
    return this.http.get<any>(this.urlGetCompanyAgency, httpOptions);
  }

  updateCompany(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlUpdateCompany}`, data, httpOptions);
  }

  insertUpdateCompany(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlInsertUpdate}`, data, httpOptions);
  }

  sendCouponByMail(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlSendCouponByMail}`, data, httpOptions);
  }

  updateAgency(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlUpdateAgency}`, data, httpOptions);
  }

  updateAgencySMTP(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlUpdateAgencySMTP}`, data, httpOptions);
  }

  showCard(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url + 'Company/ShowCard'}`, data, httpOptions);
  }

  extractUsertData(data: any) {
    // Assuming your data might look like: { userActions: { data: {} } }
    // Adjust as needed based on your actual data structure.
    return data || {};
  }

  multiFetchUsersData(val1: any, val2: any, val3: any, secondRequestData: any, cost1: any, cost2: any): Observable<any> {
    // First observable request
    const url_cost = `${this.urlGetCostCenter}?${'companyID=' + cost1 + '&administrator=' + cost2}`;
    const url = `${this.urlGetRole}?${'enterpriseCode=' + val1 + '&isAgency=' + val2 + '&administrator=' + val3}`;
    const firstObservable = this.http
      .get(url, httpOptions)
      .pipe(
        map((data: any) => this.extractUsertData(data))
      );

    // Second observable request
    const secondObservable = this.http
      .post(this.urlGetEnterprisePerson, secondRequestData, httpOptions)
      .pipe(
        map((data: any) => this.extractUsertData(data))
      );

    const threeObservable = this.http
      .get(url_cost, httpOptions)
      .pipe(
        map((data: any) => this.extractUsertData(data))
      );

    // Merging the results of the two observables using forkJoin
    return forkJoin([firstObservable, secondObservable, threeObservable]).pipe(
      map((responses: any[]) => {
        const [firstResponse, secondResponse, threeResponse] = responses;
        return {
          firstResponse,
          secondResponse,
          threeResponse
        };
      })
    );
  }

  multiFetchAssignPseudo(id: any): Observable<any> {
    const urlagency = `${this.urlGetCompanyAgency}?${'agencyID=' + id}`;
    const getpsuedoCrede = `${this.urlGetPseudoCredential}?${'agencyID=' + id}`;
    const firstObservable = this.http
      .get(getpsuedoCrede, httpOptions)
      .pipe(
        map((data: any) => this.extractUsertData(data))
      );

    // Second observable request
    const secondObservable = this.http
      .get(this.urlGetMethodOfPayment, httpOptions)
      .pipe(
        map((data: any) => this.extractUsertData(data))
      );

    // Second observable request
    const fourObservable = this.http
      .get(urlagency, httpOptions)
      .pipe(
        map((data: any) => this.extractUsertData(data))
      );

    const threeObservable = this.http
      .get(this.urlGetCurrency, httpOptions)
      .pipe(
        map((data: any) => this.extractUsertData(data))
      );

    // Merging the results of the two observables using forkJoin
    return forkJoin([firstObservable, secondObservable, threeObservable, fourObservable]).pipe(
      map((responses: any[]) => {
        const [firstResponse, secondResponse, threeResponse, fourResponse] = responses;
        return {
          firstResponse,
          secondResponse,
          threeResponse,
          fourResponse
        };
      })
    );
  }

}
