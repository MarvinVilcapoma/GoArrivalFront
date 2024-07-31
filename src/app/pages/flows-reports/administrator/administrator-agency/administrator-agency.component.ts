import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight/flight.service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-administrator-agency',
  templateUrl: './administrator-agency.component.html',
  styleUrls: ['./administrator-agency.component.css']
})
export class AdministratorAgencyComponent implements OnInit , AfterViewInit {

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
      label: 'Código',
      property: 'codeDK',
      visible: true
    },
    {
      label: 'Tipo Compañia',
      property: 'typeCompany',
      visible: true
    },
    {
      label: 'Tipo Aprobador',
      property: 'approvalType',
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
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;
  lstAgencys: any;
  blockNav = true;
  isSidenavExpanded = true;
  data: any;
  loading!: boolean;
  id: any = "";
  textHeader: string = "";
  visible : boolean = false;
  lstApprovar: any[] = [];
  lstCountries: any[] = [];
  lstDocument: any[] = [];
  isRegister: boolean = true;
  lstGroup: any[] = [];
  textbtn: string = "";

  constructor(public head: HeaderService,private service: FlowReportsService,private router: Router,private serviceF: FlightService) {
    this.head.ocultarEncabezado();
    
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAgency();
    this.getCountri();
    this.getTypeApproval();
    this.getDocument();
    this.getGroup();
  }

  addPseudo(id_: any){
    let valor = "companyID/" + id_.id;
    this.router.navigate(['flows/assign-pseudos', valor]);
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

  getGroup(){
    let valor = this.head.getCompany();
    this.service.getGroupByAgencyID(valor.id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstGroup = result.ldata;
         
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getAgency(){
    this.loading = true;
    let valor = this.head.getCompany();
    this.service.getCompanyAgency(valor.id).subscribe(
      x=>{
        if(x.status === 200){
          this.lstAgencys = x.ldata;
          this.lstAgencys.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstAgencys;
          this.loading = false;
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
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getTypeApproval() {
    this.service.getApprovalType().subscribe(
      x => {
        if (x.status === 200) {
          this.lstApprovar = x.ldata;
  
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  validManage(valor_ : any){
    this.lstAgencys = valor_;
    this.lstAgencys.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstAgencys;
    this.visible = false;
  }



  createAgency(){
   /*  let id = "";
    this.router.navigate(["/flows/administrator-agency-manage", id]); */
    this.textbtn= "Crear Empresa";
    this.isRegister = true;
    this.visible = true;
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-agency");
    this.head.exportAsExcelFile(data, "Reportes-Agencias.xlsx");
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

  

 

  updateAgency(id_: any) {
    
    this.service.getCompanyDetail(id_.id).subscribe(
      x => {
        if (x.status === 200) {
          this.textbtn= "Actualizar Empresa";
          this.isRegister = false;
          this.data = x.odata;
          this.visible = true;
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
