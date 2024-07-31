import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of, ReplaySubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RoleCreateUpdateComponent } from './role-create-update/role-create-update.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-business-roles',
  templateUrl: './business-roles.component.html',
  styleUrls: ['./business-roles.component.css'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(1000, [animate('0.5s', style({ opacity: 1 }))])
        ], { optional: true }
        )
      ])
    ])
  ]
})
export class BusinessRolesComponent implements OnInit, AfterViewInit {

  displayedColumns = [
    'name',
    'isActive',
    'actions',

  ];

  /**
   *
   */
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  loading: boolean = false;
  lstRoles: any;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  validfi = false;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  columns: any[] = [
    {
      label: 'Nombre',
      visible: true,
      property: 'name',
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
  lstMenu: any[] = [];
  lstServices: any;
  cookieValue: any;
  blockNav = true;
  isSidenavExpanded = true;
  dataSource!: MatTableDataSource<any>;
  data$: Observable<any[]> = this.subject$.asObservable();
  constructor(private service: FlowReportsService, public head: HeaderService, private dialog: MatDialog,private cookie: CookieService) {
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

  createRol() {
    this.dialog
      .open(RoleCreateUpdateComponent)
      .afterClosed()
      .subscribe((customer: any) => {

        if (customer) {

          this.updateCreateRol(true, customer);
        }
      });
  }

  updateCreateRol(valor_: boolean, role: any) {
    this.head.mostrarSpinner();
    if(role.isActive === ""){
      role.isActive = false;
    }
    let valor = this.head.getCompany();
    const objeto = {
      IsRegister: valor_,
      ID: role.id,
      Name: role.name,
      EnterpriseCode: valor.id,
      IsRoleSystem: false,
      IsAgency: this.head.getIsAgency(),
      IsActive: role.isActive,
    }
    this.service.manageEnterpriseRole(objeto).subscribe(
      x => {
        if (x.status === 200) {
          this.lstRoles = x.ldata;
          this.lstRoles.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstRoles;
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

  updateRol(rol: any) {
    this.dialog
      .open(RoleCreateUpdateComponent, {
        data: rol,
        height: '400px',
        width: '600px',
      })
      .afterClosed()
      .subscribe((updatedCustomer) => {

        if (updatedCustomer) {

          this.updateCreateRol(false, updatedCustomer);

          /* const index = this.lstRoles.findIndex(
            (existingCustomer: any) => existingCustomer.id === updatedCustomer.id
          );
          this.lstRoles[index] = updatedCustomer;
          this.subject$.next(this.lstRoles); */
        }
      });
  }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.getRole();

  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  toggleColumnVisibility(column: any, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-rol");
    this.head.exportAsExcelFile(data, "Reportes-rol.xlsx");
  }


  getRole() {
    this.loading = true;
    let valor = this.head.getCompany();

    this.service.getRole(valor.id, valor.isAgency, true).subscribe(
      x => {
        if (x.status === 200) {
          this.lstRoles = x.ldata;
          this.lstRoles.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstRoles;
          this.head.ocultarSpinner();
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
