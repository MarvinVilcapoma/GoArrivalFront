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
export class InsuranceService {

  private urlGetInsurance: string = environment.url_insurance + 'Insurance/QuoteInsurance';
  private urlGetBenefits: string = environment.url_insurance + 'Insurance/GetBenefits';
  private urlGetReservation: string = environment.url_insurance + 'Reservation/InsuranceReservation';

  constructor(private http: HttpClient) {

  }

  getListInsurance(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlGetInsurance}`, data, httpOptions);
  }

  getBenefits(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlGetBenefits}`, data, httpOptions);
  }

  getReservation(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlGetReservation}`, data, httpOptions);
  }

}
