import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-charge-international-management',
  templateUrl: './charge-international-management.component.html',
  styleUrls: ['./charge-international-management.component.css']
})
export class ChargeInternationalManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  dataSource!: MatTableDataSource<any>;
  lstChargesInternational: any[] = [];
  loading: boolean = false;
  columns: any[] = [
    {
      label: 'Empresa',
      property: 'companyName',
      visible: true
    },
    {
      label: 'Comisión',
      visible: true,
      property: 'commission',
    },
    {
      label: 'Gastos Internacionales',
      property: 'interExpenses',
      visible: true
    },
    {
      label: 'Gastos Admin.',
      property: 'adminExpenses',
      visible: true
    },
    {
      label: 'Fee',
      property: 'fee',
      visible: true
    },
    {
      label: 'Pasajero Inter.',
      property: 'interPax',
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
  blockNav = true;
  isSidenavExpanded = true;
  isRegister: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  textHeader = "";
  pageSize = 10;
  data: any;
  visible: boolean = false;
  lstCompany: any[] = [];

  constructor(public head: HeaderService, private service: FlowReportsService) {

    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getInternationalCharge();
    this.getCompany();
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

  createChargueInternational() {
    this.isRegister = true;
    this.textHeader = "Crear Cargo";
    this.visible = true;
  }

  getCompany() {
    this.loading = true;
    let valor = this.head.getCompany();
    this.service.getCompanyAgency(valor.id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstCompany = result.ldata;
        }
        this.loading = false;
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  updateChargueInternational(valor_: any) {
    this.head.mostrarSpinner();
    this.service.getInternationalChargeDetail(valor_.companyID).subscribe(
      result => {
        this.data = result.odata;
        this.isRegister = false;
        this.textHeader = "Actualizar Cargo";
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-chargues-international");
    this.head.exportAsExcelFile(data, "Reportes-Cargos-Internacionales.xlsx");
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
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

  validManage(valor_: any) {
    this.lstChargesInternational = valor_;
    this.lstChargesInternational.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstChargesInternational;
    this.visible = false;
  }

  getInternationalCharge() {
    this.loading = true;
    let data = this.head.getCompany();
    this.service.getInternationalCharge(data.id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstChargesInternational = result.ldata;
          this.lstChargesInternational.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstChargesInternational;
          this.loading = false;
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
