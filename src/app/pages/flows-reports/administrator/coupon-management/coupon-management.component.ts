import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.css']
})
export class CouponManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  columns: any[] = [
    {
      label: 'Código',
      visible: true,
      property: 'code',
    },
    {
      label: 'Moneda',
      visible: true,
      property: 'currencyCode',
    },
    {
      label: 'Monto',
      visible: true,
      property: 'amount',
    },
   
    {
      label: 'Fecha Expiración',
      property: 'expirationDateFormat',
      visible: true
    },
    {
      label: 'Es porcentaje',
      visible: true,
      property: 'isPercentage',
    },
    {
      label: 'Es global',
      property: 'isGlobal',
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

  visible:boolean = false;
  visibleAssign:boolean = false;

  pageSizeOptions: number[] = [5, 10, 20, 50];
  data: any;
  pageSize = 10;
  lstCoupones: any[] = [];
  lstCurrency: any[] = [];
  lstServices: any[] = [];
  lstCompany: any[] = [];
  couponId: any;
  constructor(public head: HeaderService,private service: FlowReportsService) {
    this.head.ocultarEncabezado();
    
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getCoupon();
    this.getCurrency();
    this.getService();
    this.getCompany();
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

  assignCoupon(id: any){
    this.visibleAssign = true;
    this.couponId = id;
  }


  getCoupon(){
    let valor = this.head.getCompany();
    this.service.getCoupon(valor.id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstCoupones = result.ldata;
          this.lstCoupones.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstCoupones;
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getService() {
    this.service.getServiceChargue().subscribe(
      x => {
   
        if (x.status === 200) {
          this.lstServices = x.ldata;

        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getCurrency(){
 
    this.service.getCurrency().subscribe(
      result => {
        if (result.status === 200) {
          this.lstCurrency = result.ldata;

        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }


  validManage(valor_ : any){
    this.lstCoupones = valor_;
    this.lstCoupones.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstCoupones;
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
    this.textHeader = "Registrar Cupón";
    this.isRegister = true;
    this.visible = true;
  }

  updateCoupon(valor_ : any){
    this.head.mostrarSpinner();
    this.service.getCouponDetail(valor_).subscribe(
      result => {
        this.data = result.odata;
        this.isRegister = false;
        this.textHeader  = "Actualizar Cupón";
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-Coupon");
    this.head.exportAsExcelFile(data, "Reportes-Coupon.xlsx");
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
