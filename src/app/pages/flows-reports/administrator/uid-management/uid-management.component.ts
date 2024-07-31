import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-uid-management',
  templateUrl: './uid-management.component.html',
  styleUrls: ['./uid-management.component.css']
})
export class UidManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  columns: any[] = [
    {
      label: 'UID',
      visible: true,
      property: 'codeUID',
    },
    {
      label: 'Titulo',
      property: 'title',
      visible: true
    },
    {
      label: 'Es lista',
      property: 'isList',
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

  blockNav = true;
  isSidenavExpanded = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;
  loading: boolean = false;
  visible: boolean = false;
  textHeader: string = "";
  lstUID: any[] = [];
  lstUIDNotUsed: any[] = [];
  isRegister: boolean = false;
  data: any;
  accessId: any;
  constructor(public head: HeaderService, private service: FlowReportsService, private _route: ActivatedRoute, private router: Router) {

    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    let userId: any;
    userId = this._route.snapshot.paramMap.get('id');
    this.accessId = userId;
    this.dataSource = new MatTableDataSource();
    this.getCompanyAccessUid(userId);
    this.getUidNotUsed(userId);
  }

  validManage(valor_: any) {
    this.lstUID = valor_;
    this.lstUID.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstUID;
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

  getUidNotUsed(id_: any) {
    this.service.getUidNotUsed(id_).subscribe(
      result => {
        if (result.status === 200) {
          this.lstUIDNotUsed = result.ldata;
        } else {
          this.lstUIDNotUsed = [];
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getCompanyAccessUid(id_: any) {
    this.loading = true;
    this.service.getCompanyAccessUid(id_).subscribe(
      result => {
        if (result.status === 200) {
          this.lstUID = result.ldata;
          this.lstUID.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstUID;
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  createUID() {
    this.textHeader = "Registrar UID";
    this.isRegister = true;
    this.visible = true;
  }

  updateUID(id_: any) {
    this.head.mostrarSpinner();
    this.service.getCompanyAccessUidDetail(id_).subscribe(
      result => {
        if (result.status === 200) {
          this.data = result.odata;
          this.isRegister = false;
          this.textHeader = "Actualizar UID";
          this.visible = true;
        } else {
          this.head.setErrorToastr(result.message);
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  assignLst(id: string) {
    this.router.navigate(["flows/assign-list", id])

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
    let data = document.getElementById("table-uid");
    this.head.exportAsExcelFile(data, "Reportes-UIDS.xlsx");
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
