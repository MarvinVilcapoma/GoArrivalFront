import { Component, ViewChild, OnInit } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { FlightService } from 'src/app/services/flight/flight.service';

import { Table } from 'primeng/table';
import { EnterprisePersonRQ } from 'src/models/flows-reports/administrator';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;




  lstMenu: any[] = [];
  lstCountries: any[] = [];
  lstCostCenter: any[] = [];
  lstRoles: any[] = [];
  lstDocument: any[] = [];
  lstProfile: any[] = [];

  validUser = false;
  isSorted: any = null;

  lstPerson: any;

  user: any;
  uploadedFiles: any[] = [];
  textHeader: string = "";
  visible: boolean = false;
  isRegister: boolean = true;
  data: any;
  initialValue: any[] = [];

  isSidenavExpanded = true;
  blockNav = true;
  _selectedColumns: any[] = [];
  cols: any[] = [];
  visibleExcel: boolean = false;
  constructor(private service: FlowReportsService, public head: HeaderService, private serviceF: FlightService) {
    this.head.ocultarEncabezado();
  }



  mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  onUpload(event: any) {
    let fileSend: any;
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      fileSend = file;
    }
    let valor = this.head.getCompany();


    const data = new FormData();
    data.append('PersonFile', fileSend);
    data.append('CompanyID', valor.id);
    this.head.mostrarSpinner();
    this.service.managePersonByExcel(data).subscribe(
      x => {
        if (x.status === 200) {
          this.uploadedFiles = [];
          this.visibleExcel = false;
          this.head.setSuccessToastr(x.message);

          this.getEnterprisePerson();
        } else {
          this.uploadedFiles = [];
          this.head.setErrorToastr(x.message);
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  showDialog() {
    this.visibleExcel = true;
  }

  get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  getFieldValue(product: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj && obj[key], product);
  }

  exportToExcel(): void {
    // this.head.exportAsXLSX(this.dt1.value, this.selectedColumns, 'Usuarios');
  }

  validManage(valor_: any) {
    if (valor_ === null || valor_.length != undefined) {
      if (this.head.getIsAgency()) {
        this.getEnterprisePerson();
      } else {
        this.lstPerson = valor_;
        this.lstPerson = this.lstPerson.map((element: any) => ({
          ...element,
          documentNumber: element.lpersonDocument.length > 0 ? element.lpersonDocument[0].documentNumber : ""
        }));
      }
      this.visible = false;
    }
  }

  updateCreateCost(valor_: boolean, cost: any) {
    this.head.mostrarSpinner();
    if (cost.isActive === "") {
      cost.isActive = false;
    }
    let valor = this.head.getCompany();
    const objeto = {
      IsRegister: valor_,
      ID: cost.id,
      Code: cost.code,
      CompanyID: valor.id,
      Description: cost.description,
      Budget: cost.budget,
      IsActive: cost.isActive,
    }
    this.service.manageCostCenter(objeto).subscribe(
      x => {
        if (x.status === 200) {
          this.setDocumentShow(x);
          this.head.setSuccessToastr(x.message);
        } else {
          this.head.setErrorToastr(x.message);
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }





  createUser() {
    this.user = null;
    this.validUser = true;
    this.isRegister = true;
    this.visible = true;
  }



  updateRol(id: any) {
    this.head.mostrarSpinner();
    this.service.getPersonDetail(id.userID).subscribe(
      x => {
        this.data = x.odata;
        this.isRegister = false;
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'lastName', header: 'Apellido' },
      { field: 'phone', header: 'Teléfono' },
      { field: 'email', header: 'Correo' },
      { field: 'orole.roleName', header: 'Rol' },
      { field: 'documentNumber', header: 'Número Documento' },
      { field: 'isActive', header: 'Estado' }
    ];
    this._selectedColumns = this.cols;
    this.getCostCenter();
    this.getCountri();
    this.getDocument();
    this.getMenu();
    this.getProfile();
    this.getRole();

    this.getEnterprisePerson();
  }




  setDocumentShow(valor_: any) {
    this.lstPerson = valor_.ldata;
    this.lstPerson = this.lstPerson.map((element: any) => ({
      ...element,
      documentNumber: element.lpersonDocument.length > 0 ? element.lpersonDocument[0].documentNumber : ""
    }));
    this.initialValue = [...this.lstPerson];
  }


  getEnterprisePerson() {
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();

    const data: EnterprisePersonRQ = {
      EnterpriseCode: valor.id,
      IsAgency: this.head.getIsAgency(),
      IsAdministrator: true,
    }
    this.service.getEnterprisePerson(data).subscribe(
      x => {
        if (x.status === 200) {
          this.setDocumentShow(x);
          this.head.ocultarSpinner();

        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }


  getMenu() {
    let valor = this.head.getCompany();
    let agencyval = this.head.getIsAgency();
    this.service.getMenuByEnterpriseCode(valor.id, agencyval).subscribe(
      x => {
        x.status === 200 ? this.lstMenu = x.ldata : this.head.setErrorToastr(x.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getCostCenter() {
    let valor = this.head.getCompany();
    this.service.getCostCenter(valor.id, false).subscribe(
      x => {
        x.status === 200 ? this.lstCostCenter = x.ldata : this.head.setErrorToastr(x.message);

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.lstPerson = [...this.initialValue];
      this.dt1.reset();
    }
  }

  sortTableData(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  concatCountrie(data : any){
    this.lstCountries = data
    this.lstCountries = this.lstCountries.map((element: any) => ({
      ...element,
      fullName: element.name + " " + element.phonePrefix
    }));
  }

  getCountri() {

    this.serviceF.getCountries().subscribe(
      result => {
        result.status === 200 ? this.concatCountrie(result.ldata)  : this.head.setErrorToastr(result.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getRole() {
    let valor = this.head.getCompany();
    this.service.getRole(valor.id, valor.isAgency, false).subscribe(
      x => {
        x.status === 200 ? this.lstRoles = x.ldata : this.head.setErrorToastr(x.message);

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getDocument() {
    this.serviceF.getDocument(true).subscribe(
      x => {
        x.status === 200 ? this.lstDocument = x.ldata : this.head.setErrorToastr(x.message);

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getProfile() {
    let valor = this.head.getCompany();
    this.service.getCompanyProfile(valor.id).subscribe(
      x => {
        x.status === 200 ? this.lstProfile = x.ldata : this.head.setErrorToastr(x.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }


}
