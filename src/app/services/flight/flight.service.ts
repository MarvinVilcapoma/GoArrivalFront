import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': environment.key
  })
};

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  header: any;
  private _url5: string = environment.url_5 + "User/";
  private urlSearchFlight: string = environment.url_2 + "Search/";
  private url_bookingTemp: string = environment.url_2 + "Booking/";
  private url_validation: string = environment.url_2 + "Validation/";
  private url_countries: string = environment.url_2 + "Country/";
  private url_document: string = environment.url + 'DocumentType/';
  private url_airline: string = environment.url_2 + 'Airline/';
  private urlApproverCompany: string = environment.url_customer + 'Approver/GetApproversByCompany';
  private url_asientos: string = environment.url_2 + "Ancillaries/";
  private urlGetApprovers: string = environment.url + 'ApprovalSetting/GetApprovers';
  private urlGetBrandedFares: string = environment.url_2 + "BrandedFare/GetBrandedFares";

  constructor(private http: HttpClient) {

  }

  getUserByCompany(data: any): Observable<any> {
    return this.http.post<any[]>(this._url5 + "GetUserByFreeText", data, httpOptions);
  }

  getListApproverCompany(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApproverCompany}`, data, httpOptions);
  }

  getApprovers(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlGetApprovers}`, data, httpOptions);
  }

  GenerateFeeAncilliares(data: any): Observable<any> {
    return this.http.post<any>(this.url_asientos + "SetFeeAncillaries", data, httpOptions);
  }

  generateReservation(data: any): Observable<any> {
    return this.http.post<any>(this.url_bookingTemp + "GenerateReservation", data, httpOptions);
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.url_countries + 'GetCountry', httpOptions);
  }

  validateReservation(data: any): Observable<any> {
    return this.http.post<any>(this.url_validation + "ValidateReservation", data, httpOptions);
  }

  getDocument(data: boolean): Observable<any> {
    const url = `${this.url_document + 'GetDocumentType'}?${'isAdministrator=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getAirline(data: boolean): Observable<any> {
    const url = `${this.url_airline + 'GetAirline'}?${'isAdministrator=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

  getBrandedFares(dataPost: any): Observable<any> {
    return this.http.post<any>(this.urlGetBrandedFares, dataPost, httpOptions);
  }

  searchFlightTemp(data:any,pageIndex: any,pageSize: any){
    return this.http.post<any>(`${this.urlSearchFlight}Search/${pageIndex}/${pageSize}`, data, httpOptions);
  }

  searchFlight(data: any): Observable<any> {
    return this.http.post<any>(this.urlSearchFlight + "Search", data, httpOptions);
  }

  searchCalendar(data: any): Observable<any> {
    return this.http.post<any>(this.urlSearchFlight + "SearchCalendar", data, httpOptions);
  }

  fligthAvailibility(data: any): Observable<any> {
    return this.http.post<any>(this.url_bookingTemp + "GetAvailability", data, httpOptions);
  }

  getAncillaries(data: any): Observable<any> {
    return this.http.post<any>(this.url_asientos + "GetAvailableAncillaries", data, httpOptions);
  }




}
