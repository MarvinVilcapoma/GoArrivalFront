import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {


  listBooking: any[] = [];
 
  lstTitleHotel = ["Reserva", "Código de confirmación", "Código de ciudad", "Nombre del hotel", "Fecha de creación", "", ""];
  lstTitleAuto = ["Fecha de reserva", "Reserva", "Modelo", "Categoría", "Moneda", "Precio total", "Estado", "", ""];
  constructor(private headService: HeaderService, private flowService: FlowReportsService, private router: Router) {

  }

  ngOnInit(): void {
    this.headService.ocultarSpinner();
  }

  ObtenerReservas() {
    this.headService.mostrarSpinner();
  /*   this.router.navigate(["flows/booking-list"]) */
  this.router.navigate(["flows/booking-list"], { state: { data: 1 } })
  }


  routeList(title: string, ldata: any, lstHeaders: string[]){
    const data = { title: title, ldata: ldata, lstHeaders: lstHeaders};
    this.router.navigate(["flows/booking-list"], { state: { data: data } })
  }

  ObtenerReservasHoteles() {
    this.headService.mostrarSpinner();
    let data = this.headService.getDataLogin();
    this.flowService.getReservaHotel(data.userID).subscribe(
      (results) => {

        this.listBooking = results;
        this.headService.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    );
  }

  ObtenerReservasAutos() {
    this.headService.mostrarSpinner();
    let data = this.headService.getDataLogin();
    this.flowService.getReservasAutos(data.userID).subscribe(
      x => {

        this.listBooking = x;
        this.headService.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    )
  }







}
