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
export class HotelService {

  private url_search: string = environment.url_hotel + 'HotelSearch/SearchHotel';
  private url_confirmacion: string = environment.url_hotel + 'Booking/SelectRoom';
  private url_habitacion: string = environment.url_hotel + 'HotelSearch/SearchRoom';
  private url_searchImages: string = environment.url_hotel + 'HotelSearch/SearchImagesByHotel';
  private url_hotelFlight: string = environment.url_hotel + 'Booking/GenerateFlightHotel';
  private url_generateReservation: string = environment.url_hotel + 'Booking/GenerateReservation';

  
  constructor(private http: HttpClient) {  }

  SearchHotel(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url_search}`, data, httpOptions);
  }

  GetConfirmacion(data: any): Observable<any> {
    return this.http.post<any>(this.url_confirmacion, data, httpOptions);
  }

  GetHabitacion(data: any): Observable<any> {
    return this.http.post<any>(`${this.url_habitacion}`, data, httpOptions);
  }

  searchHotelListHabitacionImage(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url_searchImages}`, data, httpOptions);
  }

  GenerateFlightHotel(data: any): Observable<any> {
    return this.http.post<any>(`${this.url_hotelFlight}`, data, httpOptions);
  }

  generateReservation(data: any): Observable<any> {
    return this.http.post<any>(this.url_generateReservation, data, httpOptions);
  }


}
