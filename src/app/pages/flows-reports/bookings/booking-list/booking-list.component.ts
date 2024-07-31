import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  @Input() listBooking: any;
  textTitle: string = "Mis reservas vuelos";
  @Output() select = new EventEmitter<any>();
  dataPnr: any;
  currentPage = 1; // Página actual inicial
  itemsPerPage = 10; // Número de elementos por página
  displayedList: any[] = [];
  validBooking = false;
  reserva: string;
  filteredList: any[] = [];
  datos: any = null;
  lstTitleFlight: any[] = [];
  constructor(private service: HeaderService, private head: HeaderService, private servicef: FlowReportsService, private router: Router) {
    this.reserva = "";
  }


  ngOnInit(): void {
    !this.head.validPhone() ? this.lstTitleFlight = ["PNR", "# Orden", "Fecha Creacion", "Fecha Expiración", "Ruta", "Solicitante", "Pasajeros", "Estado", ""] :
    this.lstTitleFlight = ["PNR", "# Orden", "Pasajeros", "Estado", ""];
    this.datos = history.state.data;
    this.datos === 1 ? this.ObtenerReservas() : this.ObtenerReservasAuthorizher();
  }

  ObtenerReservas() {
    this.head.mostrarSpinner();
    let data = this.head.getDataLogin();
    this.servicef.getReservasFlight(data.userID).subscribe(
      (results) => {
        results.status === 200 ?  this.saveData(results.ldata) : this.head.setErrorToastr(results.message);
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    );
  }

  ObtenerReservasAuthorizher() {
    this.head.mostrarSpinner();
    let data = this.head.getDataLogin();
    this.servicef.getReservationAuthorizer(data.userID).subscribe(
      (results) => {
        results.status === 200 ? this.saveData(results.ldata) : this.head.setErrorToastr(results.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    );
  }

  saveData(data: any){
    this.displayedList = data;
    this.filteredList = data;
    this.head.ocultarSpinner();
  }

  goBack(): void {
    this.head.goback();
  }
  
  manageBooking(valor_: any) {
    this.head.mostrarSpinner();
    const data = {
      TransactionCode: valor_.transactionCode,
      UserID: this.head.getDataLogin().userID
    }
    this.servicef.managementBooking(data).subscribe(
      x => {

        x.status === 200 ? this.router.navigate(["flows/manage-reservation"], { state: { data: x.odata } }) : this.head.setErrorToastr(x.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-data-report");
    this.service.exportAsExcelFile(data, "Reportes.xlsx");
  }

  getPaginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.displayedList.slice(startIndex, endIndex);
  }

  filterCodReser(): void {
    this.displayedList = this.filteredList.filter(item => {
      const fullName = `${item.pnr}`;
      return fullName.toLowerCase().includes(this.reserva.toLowerCase());
    });
    // Volver a la primera página cuando se cambia el filtro
    this.currentPage = 1;
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const visiblePages = 5; // Número de páginas visibles (ajusta según tus necesidades)
    const pageArray: number[] = [];
    let startPage: number;
    let endPage: number;

    if (totalPages <= visiblePages) {
      // Mostrar todas las páginas si el número total de páginas es menor o igual al número de páginas visibles
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calcular el rango de páginas para mostrar según la página actual y el número de páginas visibles
      const halfVisiblePages = Math.floor(visiblePages / 2);
      if (this.currentPage <= halfVisiblePages) {
        startPage = 1;
        endPage = visiblePages;
      } else if (this.currentPage + halfVisiblePages >= totalPages) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = this.currentPage - halfVisiblePages;
        endPage = this.currentPage + halfVisiblePages;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageArray.push(i);
    }

    return pageArray;
  }

  getTotalPages(): number {
    return Math.ceil(this.displayedList.length / this.itemsPerPage);
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  hideComponent() {

    this.validBooking = false;
  }




}
