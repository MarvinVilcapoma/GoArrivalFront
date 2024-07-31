import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight/flight.service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-pseudo-management',
  templateUrl: './pseudo-management.component.html',
  styleUrls: ['./pseudo-management.component.css']
})
export class PseudoManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  columns: any[] = [
    {
      label: 'Pseudo',
      visible: true,
      property: 'booking',
    },
    {
      label: 'GDS',
      property: 'gdsName',
      visible: true
    },
    {
      label: 'Nombre Servicio',
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

  lstCountries: any[] = [];
  lstGds: any[] = [];
  lstServices: any[] = [];

  loading: boolean = false;
  data: any;
  textHeader = "";
  visible: boolean = false;
  lstPseudos: any[] = [];
  dataSource!: MatTableDataSource<any>;
  blockNav = true;
  isSidenavExpanded = true;
  isRegister: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  pageSize = 10;
 
  /**
   *
   */
  constructor(public head: HeaderService, private service: FlowReportsService,private serviceF: FlightService,private router: Router) {

    this.head.ocultarEncabezado();
  }

  createPseudo() {
    this.textHeader = "Registrar Pseudo";
    this.isRegister = true;
    this.visible = true;
  }

  updatePseudo(id_: any) {
    this.head.mostrarSpinner();
    this.service.getPseudoDetail(id_.id).subscribe(
      x => {
        this.data = x.odata;
        this.isRegister = false;
        this.textHeader  = "Actualizar Pseudo";
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  validManage(valor_ : any){
    this.lstPseudos = valor_;
    this.lstPseudos.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstPseudos;
    this.visible = false;
  }

  getService() {
    this.service.getService(true).subscribe(
      x => {
        this.lstServices = x.ldata;
 
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getGDS() {
    this.service.getGDS().subscribe(
      x => {
        this.lstGds = x.ldata;
 
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getCountri();
    this.getPseudos();
    this.getService();
    this.getGDS();
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
    let data = document.getElementById("table-pseudos");
    this.head.exportAsExcelFile(data, "Reportes-Pseudos.xlsx");
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

  addPseudo(id_: any){
    let valor = "credentialID/" + id_.id;
    this.router.navigate(['flows/assign-pseudos', valor]);
  }



  getPseudos() {
    this.loading = true;
    let data = this.head.getCompany();
    this.service.getPseudos(data.id).subscribe(
      x => {
        if (x.status === 200) {
          this.lstPseudos = x.ldata;
          this.lstPseudos.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstPseudos;
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
