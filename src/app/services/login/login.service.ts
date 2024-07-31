import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map, Observable } from 'rxjs';
import { Login } from 'src/models/login/login.model';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': environment.key
  })
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _url: string = environment.url + "User/";
  private _urlRecovery: string = environment.url + "User/validateRecoveryPassword";
  private url_airports: string = environment.url_2 + "CityAirport/";
  private url_companies: string = environment.url + "Company/";

  private url_updatePassword: string = environment.url + "User/";

  constructor(private http: HttpClient) { }

  login(datos: any): Observable<Login> {
    return this.http.post<Login>(this._url + "LoginAccess", datos, httpOptions);
  }

  recoveryPassword(datos: any): Observable<any> {
    return this.http.post<any>(this._url + "RecoveryPassword", datos, httpOptions);
  }
  
  validateRecoveryPassword(token: string,data1: string): Observable<any> {
    const url = `${this._urlRecovery}?${'token=' + token + '&userID=' + data1}`;
    return this.http.get<any>(url, httpOptions);
  }

  updatePassword(datos: any): Observable<any> {
    return this.http.post<any>(this.url_updatePassword + "UpdatePassword", datos, httpOptions);
  }

  getAirportList(data: any): Observable<any[]> {
    const url = `${this.url_airports + 'GetCityAirport'}?${'priority=' + data}`;
    return this.http.get<any[]>(url, httpOptions);
  }

  getCompanies(data: any): Observable<any> {
    const url = `${this.url_companies + 'GetConsolidatorCompanies'}?${'userID=' + data}`;
    return this.http.get<any[]>(url, httpOptions);
  }

}
