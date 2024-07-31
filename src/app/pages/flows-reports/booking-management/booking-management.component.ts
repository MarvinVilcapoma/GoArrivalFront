import { Component, OnInit } from '@angular/core';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {
  currentPage = 1; // Página actual inicial
  itemsPerPage = 10; // Número de elementos por página
  displayedList: any[] = [];
  blockList: any[] = [];
  ingredient: string = "T";
  pnr: string;
  filteredList: any[] = []; // Lista filtrada
  dataPnr: any;
  validBooking: boolean = false;
  /**
   *
   */
  constructor(private service_: FlowReportsService, private head: HeaderService) {
    this.pnr = "";
    this.head.mostrarSpinner();
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  ngOnInit(): void {
    this.getBooking();
  }

  filterItems(): void {


    this.displayedList = this.filteredList.filter(item => {
      const fullName = `${item.pnr}`;
      return fullName.toLowerCase().includes(this.pnr.toLowerCase());
    });
    // Volver a la primera página cuando se cambia el filtro
    this.currentPage = 1;
  }

  filterAproval(): void {

    if (this.ingredient === 'T') {
      this.displayedList = this.blockList;
    } else {
      this.displayedList = this.filteredList.filter(item => {
        const fullName = `${item.ostate.stateDescription}`;
        return fullName.toLowerCase().includes(this.ingredient.toLowerCase());
      });
    }




    this.currentPage = 1;
  }

  back(){
    this.validBooking = false;
  }


  manageBooking(valor_: any) {
    this.head.mostrarSpinner();
    let objeto = {
      oenterprice: this.head.getCompany(),
      Pnr: valor_.pnr,
      Pseudo: valor_.pseudo,
      UserId: this.head.getDataLogin().userID
    }
    this.service_.managementBooking(objeto).subscribe(
      x => {

        if (x === null) {
          this.head.setErrorToastr("Ocurrió un error con el servicio. Por favor intentar nuevamente.");
          this.head.ocultarSpinner();
          return;
        }

        this.dataPnr = x;
        this.validBooking = true;

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getBooking() {
    let valor = this.head.getDataLogin();
    this.service_.getReservationAuthorizer(valor.userID).subscribe(
      x => {
        this.blockList = x;
        this.filteredList = x;
        this.displayedList = this.filteredList;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getPaginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.displayedList.slice(startIndex, endIndex);
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

  hideComponent() {
    this.getBooking();
    this.validBooking = false;
  }

}
