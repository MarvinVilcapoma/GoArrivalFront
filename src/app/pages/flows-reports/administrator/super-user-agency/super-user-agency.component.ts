import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FlightService } from 'src/app/services/flight/flight.service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-super-user-agency',
  templateUrl: './super-user-agency.component.html',
  styleUrls: ['./super-user-agency.component.css']
})
export class SuperUserAgencyComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  columns: any[] = [
    {
      label: 'Nombre',
      visible: true,
      property: 'name',
    },
    {
      label: 'RUC',
      property: 'ruc',
      visible: true
    },
    {
      label: 'Tipo Aprobador',
      property: 'requireApproval',
      visible: true
    },
    {
      label: 'Estado',
      property: 'isActive',
      visible: true
    },
    {
      label: 'Acciones',
      visible: true,
      property: 'acciones',
    }

  ];

  lstCountries: any[] = [];
  lstDocument: any[] = [];

  textDialog: string = "";
  lstAgencys: any[] = [];
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;
  isRegister: boolean = true;
  blockNav = true;
  isSidenavExpanded = true;
  textHeader = "";
  visible: boolean = false;
  data: any;
  constructor(public head: HeaderService, private service: FlowReportsService, private serviceF: FlightService) {

    this.head.ocultarEncabezado();
  }

  createAgency() {
    this.textDialog = "Crear Agencia";
    this.isRegister = true;
    this.visible = true;
  }

  getDocument() {
    this.serviceF.getDocument(false).subscribe(
      x => {
        if (x.status === 200) {
          this.lstDocument = x.ldata;

        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }



  getCountri() {
    this.serviceF.getCountries().subscribe(
      x => {
        this.lstCountries = x;
        this.lstCountries.forEach((element: any) => {
          element['id'] = element.iataCode;
        });
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }





  updateAgency(id_: any) {

    this.service.getAgencyDetail(id_.id).subscribe(
      x => {
        if (x.status === 200) {
          this.data = x.odata;
          this.textDialog = "Actualizar Agencia";
          this.isRegister = false;
          this.visible = true;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getCountri();
    this.getDocument();
    this.getAgency();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Roles por pagina';
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-agency-super");
    this.head.exportAsExcelFile(data, "Reportes-Agencias.xlsx");
  }

  mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  validManage(valor_ : any){
    this.lstAgencys = valor_;
    this.lstAgencys.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstAgencys;
    this.visible = false;
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }



  getAgency() {
    this.service.getAgency(true).subscribe(
      x => {
        if (x.status === 200) {
          this.lstAgencys = x.ldata;
          this.lstAgencys.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstAgencys;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleColumnVisibility(column: any, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

}
