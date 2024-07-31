import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { CostCreateUpdateComponent } from './cost-create-update/cost-create-update.component';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.css'],
  providers: [MessageService]
})
export class CostCenterComponent implements OnInit, AfterViewInit {
  visible: boolean = false;
  uploadedFiles: any[] = [];
  displayedColumns = [
    'code',
    'description',
    'budget',
    'isActive',
    'actions',

  ];
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  isSidenavExpanded = true;
  cookieValue: any;
  lstServices: any;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  lstCostCenter: any;
  pageSize = 10;
  lstMenu: any[] = [];
  blockNav = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<any>;
  data$: Observable<any[]> = this.subject$.asObservable();
  text = "Centro de Costos";
  columns: any[] = [
    {
      label: 'Código',
      visible: true,
      property: 'code',
    },
    {
      label: 'Descripción',
      property: 'description',
      visible: true
    },
    {
      label: 'Presupuesto',
      property: 'budget',
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

  constructor(private messageService: MessageService, private service: FlowReportsService, public head: HeaderService, private dialog: MatDialog, private cookie: CookieService) {

    this.head.ocultarEncabezado();
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
          this.lstCostCenter = x.ldata;
          this.lstCostCenter.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstCostCenter;
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

  createRol() {
    this.dialog
      .open(CostCreateUpdateComponent)
      .afterClosed()
      .subscribe((customer: any) => {

        if (customer) {

          this.updateCreateCost(true, customer);
        }
      });
  }

  showDialog() {
    this.visible = true;
  }

  onUpload(event: any) {
    let fileSend: any;
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      fileSend = file;
    }
    let valor = this.head.getCompany();


    const data = new FormData();
    data.append('CostCenterFile', fileSend);
    data.append('companyID', valor.id);

    this.service.manageCostCenterByExcel(data).subscribe(
      x => {
        if (x.status === 200) {
          this.uploadedFiles = [];
          this.visible = false;
          this.messageService.add({ key: 'tc', severity: 'success', summary: 'Verificado', detail: x.message, sticky: true });
          this.head.mostrarSpinner();
          this.getCostCenter();
        } else {
          this.uploadedFiles = [];
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: x.message, sticky: true });
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-cost");
    this.head.exportAsExcelFile(data, "Reportes-CentroCosto.xlsx");
  }

  updateRol(cost: any) {
    this.dialog
      .open(CostCreateUpdateComponent, {
        data: cost
      })
      .afterClosed()
      .subscribe((updatedCustomer) => {

        if (updatedCustomer) {

          this.updateCreateCost(false, updatedCustomer);
        }
      });
  }

  ngOnInit(): void {

    if (this.head.validPhone()) {
      this.text = "Cent. Costos";
    }
    this.dataSource = new MatTableDataSource();
    this.getCostCenter();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Roles por pagina';
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
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


  getCostCenter() {
    let valor = this.head.getCompany();
    this.service.getCostCenter(valor.id, true).subscribe(
      x => {
        if (x.status === 200) {
          this.lstCostCenter = x.ldata;
          this.lstCostCenter.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstCostCenter;
          this.head.ocultarSpinner();
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
