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
export class CarsService {

  private urlGetCars: string = environment.url_cars + 'Search/SearchCars';
  private _url_cars2: string = environment.url_cars + "Booking/SelectCar";
  private _url_cars3: string = environment.url_cars + "Booking/ConfirmationCar";
  private url_document: string = environment.url_5 + 'DocumentType/';

  constructor(private http: HttpClient) {

  }

  getCars(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlGetCars}`, data, httpOptions);
  }

  selectCar(data: any): Observable<any> {
    return this.http.post<any>(`${this._url_cars2}`, data, httpOptions);
  }

  confirmationCar(data: any): Observable<any> {
    return this.http.post<any>(`${this._url_cars3}`, data, httpOptions);
  }

  getDocument(data: any): Observable<any> {

    const url = `${this.url_document + 'GetDocumentTypeList'}?${'isAdministrator=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

}
