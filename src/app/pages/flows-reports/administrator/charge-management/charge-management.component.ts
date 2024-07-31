import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-charge-management',
  templateUrl: './charge-management.component.html',
  styleUrls: ['./charge-management.component.css']
})
export class ChargeManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  columns: any[] = [
  
    {
      label: 'Tipo Busqueda',
      property: 'typeSearch',
      visible: true
    },
    {
      label: 'Servicio',
      visible: true,
      property: 'serviceName',
    },
    {
      label: 'Monto',
      property: 'amount',
      visible: true
    },
    {
      label: 'Por Porcentaje',
      property: 'isPercentage',
      visible: true
    },
    {
      label: 'Por Pasajero',
      property: 'perPassenger',
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
  lstCharges: any[] = [];
  visible: boolean = false;
  dataSource!: MatTableDataSource<any>;
  blockNav = true;
  isSidenavExpanded = true;
  isRegister: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  textHeader = "";
  pageSize = 10;
  data: any;
  loading: boolean = false;
  lstServices: any[] = [];

  constructor(public head: HeaderService,private service : FlowReportsService) {
    
    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getService();
    this.getCharges();
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

  validManage(valor_ : any){
    this.lstCharges = valor_;
    this.lstCharges.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstCharges;
    this.visible = false;
  }

  getService() {
    this.service.getServiceChargue().subscribe(
      x => {
        this.lstServices = x.ldata;

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  createChargue(){
    this.isRegister = true;
    this.textHeader = "Crear Cargo";
    this.visible = true;
  }

  updateChargue(valor_ : any){
    this.head.mostrarSpinner();
    this.service.getChargeDetail(valor_.chargeServiceID).subscribe(
      result => {
        this.data = result.odata;
        this.isRegister = false;
        this.textHeader  = "Actualizar Cargo";
        this.visible = true;
        this.head.ocultarSpinner();
      } ,
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-chargues");
    this.head.exportAsExcelFile(data, "Reportes-Cargos.xlsx");
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


  getCharges(){
    this.loading = true;
    let valor = this.head.getCompany();
    this.service.getCharges(valor.id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstCharges = result.ldata;
          this.lstCharges.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstCharges;
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
