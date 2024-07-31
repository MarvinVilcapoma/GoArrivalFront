import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';



@Component({
  selector: 'app-policy-management',
  templateUrl: './policy-management.component.html',
  styleUrls: ['./policy-management.component.css']
})
export class PolicyManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  columns: any[] = [
    {
      label: 'Nombre',
      visible: true,
      property: 'name',
    },
    {
      label: 'Servicio',
      property: 'serviceName',
      visible: true
    },
    {
      label: 'Configurable',
      property: 'isConfigured',
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

  isSidenavExpanded = true;
  blockNav = true;
  lstPolicies: any[] = [];
  dataSource!: MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageSize = 10;

  constructor(public head: HeaderService, private service: FlowReportsService, private router: Router) {
    this.head.ocultarEncabezado();
  }



  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  updateRol(valor_: any) {

    this.router.navigate(["flows/policy-configuration", valor_])
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-policy");
    this.head.exportAsExcelFile(data, "Reportes-Políticas.xlsx");
  }

  createPolicy() {

  }

  toggleColumnVisibility(column: any, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getPolicies();
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

  getPolicies() {
    this.head.mostrarSpinner();
    let data = this.head.getCompany();
    this.service.getCompanyPolicies(data.id).subscribe(
      x => {
        if (x.status === 200) {
          this.lstPolicies = x.ldata;
          this.lstPolicies.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstPolicies;
          this.head.ocultarSpinner();
        } else {
          this.head.ocultarSpinner();
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
