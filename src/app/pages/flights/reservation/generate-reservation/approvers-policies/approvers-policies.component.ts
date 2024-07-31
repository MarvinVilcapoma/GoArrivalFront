import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FlightService } from 'src/app/services/flight/flight.service';
declare var $: any;

@Component({
  selector: 'app-approvers-policies',
  templateUrl: './approvers-policies.component.html',
  styleUrls: ['./approvers-policies.component.css']
})
export class ApproversPoliciesComponent implements OnInit {
  @Input() lpolicies: any;
  @Input() lapprovers: any;
  @Input() currency: any;
  @Input() tipo: any;
  @Input() data: any;
  @Input() aproverValid: any;
  @Input() updateAproval: any;
  @Input() borrar: any;
  @Output() selected = new EventEmitter<string>();
  modalRefPoliticas!: BsModalRef;
  listaApprovers: any;
  listaApproversShow: any;
  p: number = 10;
  listafilter: any;
  filteredList: any[] = []; 
  displayedList: any[] = [];
  itemsPerPage = 10; // Número de elementos por página
  currentPage = 1; // Página actual inicial
  name: string = "";

  constructor(private modalService: BsModalService,private headService: HeaderService, private service: FlightService) { }

  ngOnInit(): void {
  }

  

  addApprover(template: any){
    this.headService.mostrarSpinner();
    const datos = {
      CompanyID: this.data.oenterprise.id,
      LlistApprovers: this.lapprovers
    }
    this.service.getListApproverCompany(datos).subscribe(
      x => {
        this.listaApprovers = x;
        this.listaApprovers.forEach((element: any) => {
            element.addApprover = false;
            element.fullname = element.name + element.lastName; 
        });
        this.listaApproversShow = this.listaApprovers;
        this.listafilter = this.listaApprovers;
        this.filteredList = this.listaApprovers;
        this.displayedList = this.listaApprovers;
        this.headService.ocultarSpinner();
        this.openModalPoliticas(template);
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      }
    )
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

  public change() {
    this.FiltrarNombre();
  }

  filterItems(): void {
    this.displayedList = this.filteredList.filter(item => {
      const fullName = `${item.name}`;
      return fullName.toLowerCase().includes(this.name.toLowerCase());
    });
    // Volver a la primera página cuando se cambia el filtro
    this.currentPage = 1;
  }

  FiltrarNombre() {
    let nombre: any;
    let results;
    let listado;
    listado = this.listafilter;
    nombre = $('#nombrehotel').val();
    results = listado.filter((m: any) => m.fullname.toUpperCase().includes(nombre.toUpperCase()))

    this.listaApproversShow = results;
  }

  openModalPoliticas(template: any) {
    
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  select(valor: any, user: any){
    this.listaApprovers.forEach((element: any) => {
      if(user === element){
        element.approverIssue = valor.target.checked;
      }
    });
  }
  
  add(valor: any, user: any){
    this.listaApprovers.forEach((element: any) => {
      if(user === element){
        element.addApprover = valor.target.checked;
      }
    });
  }

  eliminarPasajero(pasajero: any) {
    let flagIndex = 0;
    let lstPasajeros = this.lapprovers;
    lstPasajeros.forEach(function(item: any, index: any) {
      if (item.approverId === pasajero.approverId) {
        flagIndex = index;
      }
    });

    lstPasajeros.splice(flagIndex, 1);

    this.lapprovers = lstPasajeros;
  }

  actualizar(){
    let list: any[] = [];
    this.listaApprovers.forEach((element: any) => {
      if (element.addApprover === true) {
        list.push(element);
      }
    });
    this.lapprovers.forEach((element: any) => {
      list.push(element);
    });
    
    this.lapprovers = list;

    this.selected.emit(this.lapprovers);
  
    this.modalRefPoliticas.hide();
  }

  limpiar(){
    this.modalRefPoliticas.hide();
  }

}
