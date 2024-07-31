import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-code-management',
  templateUrl: './code-management.component.html',
  styleUrls: ['./code-management.component.css']
})


export class CodeManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  columns: any[] = [
    {
      label: 'Código',
      visible: true,
      property: 'code',
    },
    {
      label: 'Fecha Expiración',
      property: 'expirationDate',
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

  dataSource!: MatTableDataSource<any>;
  loading: boolean = false;
  textHeader: string = "";
  blockNav = true;
  isRegister: boolean = false;
  isSidenavExpanded = true;
  lstCoupon: any[] = [];
  visible:boolean = false;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  data: any;
  pageSize = 10;
  lstCode: any[] = [];

  constructor(public head: HeaderService,private service: FlowReportsService) {
    this.head.ocultarEncabezado();
    
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getCoupon();
    this.getAgencyCodeCoupon();
  }

  getAgencyCodeCoupon(){
    this.loading = true;
    let valor = this.head.getCompany();
    this.service.getAgencyCodeCoupon(valor.id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstCoupon = result.ldata;
          this.lstCoupon.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstCoupon;
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getCoupon(){
    let valor = this.head.getCompany();
    this.service.getCoupon(valor.id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstCode = result.ldata;

        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }


  validManage(valor_ : any){
    this.lstCoupon = valor_;
    this.lstCoupon.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstCoupon;
    this.visible = false;
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

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  createCoupon(){
    this.textHeader = "Registrar Código";
    this.isRegister = true;
    this.visible = true;
  }

  updateCoupon(valor_ : any){
    this.head.mostrarSpinner();
    this.service.getAgencyCodeCouponDetail(valor_).subscribe(
      result => {
        this.data = result.odata;
        this.isRegister = false;
        this.textHeader  = "Actualizar Código";
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-Código");
    this.head.exportAsExcelFile(data, "Reportes-Código.xlsx");
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

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Roles por pagina';
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

}
