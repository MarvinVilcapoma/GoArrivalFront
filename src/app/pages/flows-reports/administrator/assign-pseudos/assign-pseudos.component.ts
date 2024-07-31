import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-assign-pseudos',
  templateUrl: './assign-pseudos.component.html',
  styleUrls: ['./assign-pseudos.component.css']
})
export class AssignPseudosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  columns: any[] = [
    {
      label: 'Empresa',
      visible: true,
      property: 'companyName',
    },
    {
      label: 'Pseudo Booking',
      property: 'booking',
      visible: true
    },
    {
      label: 'Pseudo Ticket',
      property: 'ticket',
      visible: true
    },
    {
      label: 'GDS',
      property: 'gdsName',
      visible: true
    },
    {
      label: 'Servicio',
      property: 'serviceName',
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

  loading: boolean = false;
  blockNav = true;
  isSidenavExpanded = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;
  lstEmpresas: any[] = [];
  nameId: string = "";
  visible: boolean = false;
  textHeader: string = "";
  isRegister: boolean = true;
  lstPayments: any[] = [];
  lstCredentials: any[] = [];
  lstCurrency: any[] = [];

  lstCompany: any[] = [];
  nameSource: string = "";
  data!: any;
  idCompany!: any;
  constructor(public head: HeaderService, private _route: ActivatedRoute, private service: FlowReportsService,private router: Router) {
    this.head.ocultarEncabezado();

  }

  ngOnInit(): void {
    this.getServices();
    let userId: any;
    userId = this._route.snapshot.paramMap.get('id');
    
    this.dataSource = new MatTableDataSource();
    this.validService(userId);
  }


  getServices(){
    let valor  = this.head.getCompany();
    this.service.multiFetchAssignPseudo(valor.id).subscribe(
      result => {

        this.lstCredentials = result.firstResponse.ldata;
        this.lstPayments = result.secondResponse.ldata;
        this.lstCurrency = result.threeResponse.ldata;
        this.lstCompany = result.fourResponse.ldata;
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  validService(id: any) {
    let validId = id.split("/");
    this.nameId = validId[0];
    if (validId[0] === "credentialID") {
      this.nameSource = "Pseudo";
      this.getCompanyAccessByCredential(validId[1]);
    } else {
      this.columns.shift();
      this.nameSource = "Company";
      this.idCompany = validId[1];
      this.getCompanyAccessByCompany(validId[1]);
    }
  }

  validManage(valor_ : any){
    this.lstEmpresas = valor_;
    this.lstEmpresas.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstEmpresas;
    this.visible = false;
  }

  addUID(valor_: any){
    this.router.navigate(['flows/uid-management',valor_]);
  }

  getCompanyAccessByCredential(id: any) {
    this.loading = true;
    this.service.getCompanyAccessByCredential(id).subscribe(
      result => {
        if(result.status === 200){
          this.lstEmpresas = result.ldata;
          this.lstEmpresas.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstEmpresas;
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getCompanyAccessByCompany(id: any) {
    this.loading = true;
    this.service.getCompanyAccessByCompany(id).subscribe(
      result => {
        if(result.status === 200){
          this.lstEmpresas = result.ldata;
          this.lstEmpresas.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstEmpresas;
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
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

  updateAssign(id: any) {
    this.head.mostrarSpinner();
    this.service.getCompanyAccessDetail(id).subscribe(
      result => {
        this.data = result.odata;
        this.isRegister = false;
        this.textHeader  = "Actualizar Acceso";
        this.visible = true;
        this.head.ocultarSpinner();
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

  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  createAssign() {
    this.textHeader = "Registrar Acceso";
    this.isRegister = true;
    this.visible = true;
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-assign-pseudos");
    this.head.exportAsExcelFile(data, "Reportes-AsignarPseudos.xlsx");
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
