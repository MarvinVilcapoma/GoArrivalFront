import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { FlightService } from 'src/app/services/flight/flight.service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-user-management-travel-agent',
  templateUrl: './user-management-travel-agent.component.html',
  styleUrl: './user-management-travel-agent.component.css'
})
export class UserManagementTravelAgentComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  lstAgencys: any[] = [];
  lstPassengers: any[] = [];



  blockNav: boolean = true;
  isSidenavExpanded: boolean = true;
  selectType: string = "";
  selectCompany: string = "";


  isSorted: any = null;
  lstCountries: any[] = [];
  initialValue: any[] = [];
  lstDocument: any[] = [];
  lstAirline: any[] = [];
  types: any[] = [];
  showCorporativo: boolean = false;
  showPassengers: boolean = false;
  isRegister: boolean = true;
  visible: boolean = false;
  dataUpdate: any = null;
  uploadedFiles: any[] = [];
  visibleExcel: boolean = false;
  constructor(public head: HeaderService, private service: FlowReportsService, private serviceF: FlightService) {
    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {

    this.getCountri();
    this.getDocument();
    this.getAirline();
    this.types = [
      { name: 'Vacacional', id: 'V' },
      { name: 'Corporativo', id: 'C' },
    ];
  

  }

  onUpload(event: any) {
    this.head.mostrarSpinner();
    let fileSend: any;
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      fileSend = file;
    }
 


    const data = new FormData();
    data.append('PersonFile', fileSend);
    data.append('CompanyID', this.selectCompany);

    this.service.managePersonByExcel(data).subscribe(
      x => {
        if (x.status === 200) {
          this.uploadedFiles = [];
          this.visibleExcel = false;
          this.head.setSuccessToastr(x.message);
          this.selectCompany != "" ? this.getEnterprisePerson(this.selectCompany) : this.getEnterprisePerson("");

        } else {
          this.uploadedFiles = [];
          this.head.setErrorToastr(x.message);
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }



  mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  validTypeCompany() {
    this.selectCompany = "";
    this.selectType === "C" ? this.getAgency() : this.setVacation();
  }

  setVacation() {
    this.showCorporativo = false;
    this.getEnterprisePerson("");
  }

  validShowPassengers() {
    this.getEnterprisePerson(this.selectCompany);
  }

  getCountri() {

    this.service.getCountries().subscribe(
      x => {
        this.lstCountries = x;
        this.lstCountries = this.lstCountries.map((element: any) => ({
          ...element,
          fullName: element.name + " " + element.phonePrefix
        }));

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getAirline() {
    this.serviceF.getAirline(false).subscribe(
      x => {
        x.status === 200 ? this.lstAirline = x.ldata : this.head.setErrorToastr(x.message);

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getDocument() {
    this.serviceF.getDocument(false).subscribe(
      x => {
        x.status === 200 ? this.lstDocument = x.ldata : this.head.setErrorToastr(x.message);

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getDetail(id: string) {
    this.head.mostrarSpinner();
    this.service.getPersonDetail(id).subscribe(
      x => {
        if (x.status === 200) {

          this.isRegister = false;
          this.dataUpdate = x.odata;
          this.visible = true;
          /*  this.setData(x.odata); */
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

  validManage(valor_: any) {
    if (valor_.status === 200) {
      this.visible = false;
      this.selectType === 'V' ? this.getEnterprisePerson("") : this.setDocumentShow(valor_);
    }

  }

  setDocumentShow(valor_: any){
    this.lstPassengers = valor_.ldata;
    this.lstPassengers = this.lstPassengers.map((element: any) => ({
      ...element,
      documentNumber: element.lpersonDocument.length > 0 ? element.lpersonDocument[0].documentNumber : ""
    }));
  }

  getEnterprisePerson(id: string) {
    this.head.mostrarSpinner();
    const data = {
      EnterpriseCode: this.selectType === 'C' ? id : this.head.getCompany().id,
      IsAgency: this.selectType === 'C' ? false : true,
      IsAdministrator: true
    }
    this.service.getEnterprisePerson(data).subscribe(
      x => {
        if (x.status === 200) {
          this.setDocumentShow(x);
          this.showPassengers = true;
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

  mouseenter(): void {
    this.isSidenavExpanded = true;
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
      this.lstAgencys = [...this.initialValue];
      this.dt.reset();
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

  getAgency() {
    this.showPassengers = false;
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    this.service.getCompanyAgency(valor.id).subscribe(
      x => {
        if (x.status === 200) {
          this.lstAgencys = x.ldata;
          this.initialValue = [...x.ldata];
          this.showCorporativo = true;
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



}
