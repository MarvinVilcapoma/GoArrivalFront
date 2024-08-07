import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FlightService } from 'src/app/services/flight/flight.service';
import * as crypto from 'crypto-js';
import { HeaderService } from 'src/app/services/head.service';
import { CookieService } from 'ngx-cookie-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-role-centralizer',
  templateUrl: './role-centralizer.component.html',
  styleUrls: ['./role-centralizer.component.css'],
  providers: [FlightService]
})
export class RoleCentralizerComponent implements OnInit {
  tipoBusqueda: string;
  name: string;
  document: string;
  Math: Math = Math;
  passwordCrypto = 'serviceLogin#$';
  objetoDesencriptado: any = {};
  objetoEncriptado: any;
  data: any;
  lstPerson: any[] = [];
  lstPersonShow: any[] = [];
  p: any;
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Número de elementos por página
    currentPage: 1 // Página actual inicial
  };
  modalRef!: BsModalRef;
  maxPax = 8;
  lstPasajeros: any[] = [];
  filteredList: any[] = []; // Lista filtrada

  displayedList: any[] = [];
  itemsPerPage = 10; // Número de elementos por página
  currentPage = 1; // Página actual inicial

  listPerfil: any[] = [];
  selectedPerfil: string  = "";

  @Output() flagCentralizado = new EventEmitter<any>();
  searchTerm = '';
  constructor(private service: FlightService,private head: HeaderService,private cookie: CookieService,private modalService: BsModalService) { 
    this.tipoBusqueda = 'N';
    this.name = "";
    this.document = "";
  }
  ngOnInit(): void {
    this.objetoDesencriptado = this.cookie.get('cookieLogin');
    this.objetoDesencriptado = this.head.desencriptar(this.objetoDesencriptado);
    this.search();
  }

  eliminarPasajero(pasajero: any) {
    let flagIndex = 0;
    let lstPasajeros = this.lstPasajeros;
    lstPasajeros.forEach(function(item, index) {
      if (item.userId === pasajero.userId) {
        flagIndex = index;
      }
    });

    lstPasajeros.splice(flagIndex, 1);

    this.lstPasajeros = lstPasajeros;
  }

 

  filterItemsDoc(): void {

    this.displayedList = this.filteredList.filter(item => {
      const fullName = `${item.lpersonDocuments[0].docNumber}`;
      return fullName.toLowerCase().includes(this.document.toLowerCase());
    });
    // Volver a la primera página cuando se cambia el filtro
    this.currentPage = 1;
  }

  continuar(template: any) {
    if (this.lstPasajeros.length === 0) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
    } else {
      let passengers = this.head.encriptar(this.lstPasajeros);
      sessionStorage.setItem('passengers', passengers);
     
      const obj = {
        valid : false,
        pass: this.lstPasajeros.length
      }
      this.flagCentralizado.emit(obj);
    }
  }

  extractUniqueRoles(personList: any[]): void {
    const roles = new Set<string>();
    personList.forEach(person => {
      if (person.orole && person.orole.name) {
        roles.add(person.orole.name);
      }
    });

    this.listPerfil = [{ id: 0, perfil: 'Todos los perfiles', code: '' }, ...Array.from(roles).map((role, index) => ({
      id: index + 1,
      perfil: role,
      code: role
    }))];
  }


  filterPerfil(): void {
    if (!this.selectedPerfil || this.selectedPerfil === 'Todos los perfiles') {
      // Si no se ha seleccionado un perfil o se selecciona 'Todos los perfiles', mostrar toda la lista
      this.displayedList = this.filteredList;
    } else {
      this.displayedList = this.filteredList.filter(item => {
        return item.orole && item.orole.name.toLowerCase() === this.selectedPerfil.toLowerCase();
      });
    }
    this.currentPage = 1;
  }

  filterItems(): void {


    this.displayedList = this.filteredList.filter(item => {
      const fullName = `${item.firstName} ${item.lastName}`;
      return fullName.toLowerCase().includes(this.name.toLowerCase());
    });
   
    this.currentPage = 1;
  }

  agregarPasajero(person: any) {
  
    let flagVal = 0;
    let lstPasajeros = this.lstPasajeros;
    if (lstPasajeros.length === this.maxPax) {
      return;
    }
    lstPasajeros.forEach(function(item) {
      if (item.userId === person.userId) {
        flagVal = 1;
      }
    });

    if (flagVal === 0) {
      this.lstPasajeros.push(person);
    }

    this.lstPasajeros = lstPasajeros;
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
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

  // search(){
  //   if(this.filteredList.length != 0){
  //     return;
  //   }
  //   this.head.mostrarSpinner();
  //   let freeText = '';
  //   const datos = {
  //     Oenterprise: this.objetoDesencriptado.oenterprise,
  //     FreeText: freeText,
  //     UserId: this.objetoDesencriptado.userID
  //   };
  //   this.service.getUserByCompany(datos).subscribe(
  //     result => {
  //       this.lstPerson = result;
  //       this.filteredList = result;
  //       this.displayedList = this.filteredList;
  //       this.head.ocultarSpinner();
  //       console.log(this.displayedList);
  //     },
  //     error => {
  //       error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
  //     }
  //   );

  // }


  search(){
    if(this.filteredList.length !== 0){
      return;
    }
    this.head.mostrarSpinner();
    let freeText = '';
    const datos = {
      Oenterprise: this.objetoDesencriptado.oenterprise,
      FreeText: freeText,
      UserId: this.objetoDesencriptado.userID
    };
    this.service.getUserByCompany(datos).subscribe(
      result => {
        this.lstPerson = result;
        this.filteredList = result; 
        this.displayedList = this.filteredList;

        this.extractUniqueRoles(result);

        this.head.ocultarSpinner();
        console.log(this.displayedList);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    );
  }

  typeSearch(valor: any) {
    this.tipoBusqueda = valor;
  }

}
