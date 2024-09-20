import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-profile-gds-management',
  templateUrl: './profile-gds-management.component.html',
  styleUrls: ['./profile-gds-management.component.css']
})
export class ProfileGdsManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  columns: any[] = [
    {
      label: 'GDS',
      visible: true,
      property: 'gdsDescription',
    },
    {
      label: 'Codigo',
      property: 'code',
      visible: true
    },
    {
      label: 'Nombre',
      property: 'name',
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
  blockNav = true;
  isSidenavExpanded = true;
  isRegister: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  loading: boolean = false;
  pageSize = 10;
  data: any;
  validtable = false;
  textHeader = "";
  visible: boolean = false;
  lstProfilesGDS: any[] = [];
  lstGds: any[] = [];
  lstCompany: any[] = [];
  companyId!: string;
  selectedCompany: any | undefined;
  constructor(private service: FlowReportsService, public head: HeaderService) {
    this.head.ocultarEncabezado();
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getCompany();
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

  showTable() {
    this.companyId = this.selectedCompany;
    this.getProfileGDS(this.selectedCompany);
  }

  createProfileGDS() {
    this.textHeader = "Registrar Perfil";
    this.isRegister = true;
    this.visible = true;
  }

  updateProfileGDS(valor_: any) {
    this.head.mostrarSpinner();
    this.service.getCompanyProfileDetail(valor_.id).subscribe(
      result => {
        this.data = result.odata;
        this.isRegister = false;
        this.textHeader  = "Actualizar Perfil";
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-profile-gds");
    this.head.exportAsExcelFile(data, "Reportes-Perfiles.xlsx");
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

  getProfileGDS(id: any) {
    this.validtable = false;
    this.loading = true;

    this.service.getCompanyProfile(id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstProfilesGDS = result.ldata;
          this.lstProfilesGDS.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstProfilesGDS;
          this.loading = false;
          this.validtable = true;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getCompany() {
    this.loading = true;
    let valor = this.head.getCompany();
    this.service.getCompanyAgency(valor.id,true).subscribe(
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

  validManage(valor_ : any){
    this.lstProfilesGDS = valor_;
    this.lstProfilesGDS.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstProfilesGDS;
    this.visible = false;
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
