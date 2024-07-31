import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;



  lstMenu: any[] = [];
  lstCountries: any[] = [];
  lstCostCenter: any[] = [];
  lstRoles: any[] = [];
  lstDocument: any[] = [];
  lstProfile: any[] = [];

  validUser = false;
  loading!: boolean;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  lstPerson: any;
  pageSize = 10;
  user: any;
  uploadedFiles: any[] = [];
  textHeader: string = "";
  visible: boolean = false;
  isRegister: boolean = false;
  data: any;
  cookieValue: any;
  lstServices: any;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<any>;
  data$: Observable<any[]> = this.subject$.asObservable();
  isSidenavExpanded = true;
  blockNav = true;
  columns: any[] = [
    {
      label: 'Nombre',
      visible: true,
      property: 'name',
    },
    {
      label: 'Apellido',
      visible: true,
      property: 'lastName',
    },
    {
      label: 'Teléfono',
      property: 'phone',
      visible: true
    },
    {
      label: 'Correo',
      property: 'email',
      visible: true
    },
    {
      label: 'Rol',
      visible: true,
      property: 'roleName',
    },
    {
      label: 'Num. Documento',
      visible: true,
      property: 'documentNumber',
    },
    {
      label: 'Estado',
      visible: true,
      property: 'isActive',
    },
    {
      label: 'Acciones',
      visible: true,
      property: 'acciones',
    }

  ];
  visibleExcel: boolean = false;
  constructor(private service: FlowReportsService, public head: HeaderService, private serviceF: FlightService) {
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

  onUpload(event: any) {
    let fileSend: any;
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      fileSend = file;
    }
    let valor = this.head.getCompany();


    const data = new FormData();
    data.append('PersonFile', fileSend);
    data.append('CompanyID', valor.id);
    this.head.mostrarSpinner();
    this.service.managePersonByExcel(data).subscribe(
      x => {
        if (x.status === 200) {
          this.uploadedFiles = [];
          this.visibleExcel = false;
          this.head.setSuccessToastr(x.message);

          this.getEnterprisePerson();
        } else {
          this.uploadedFiles = [];
          this.head.setErrorToastr(x.message);
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  showDialog() {
    this.visibleExcel = true;
  }

  validManage(valor_: any) {
    this.lstPerson = valor_;
    this.lstPerson.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstPerson;
    this.visible = false;
  }

  updateCreateCost(valor_: boolean, cost: any) {
    this.head.mostrarSpinner();
    if (cost.isActive === "") {
      cost.isActive = false;
    }
    let valor = this.head.getCompany();
    const objeto = {
      IsRegister: valor_,
      ID: cost.id,
      Code: cost.code,
      CompanyID: valor.id,
      Description: cost.description,
      Budget: cost.budget,
      IsActive: cost.isActive,
    }
    this.service.manageCostCenter(objeto).subscribe(
      x => {
        if (x.status === 200) {
          this.lstPerson = x.ldata;
          this.lstPerson.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstPerson;
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

  /*   exportAsXLSX(): void {
      let data = document.getElementById("table-user");
      this.head.exportAsExcelFile(data, "Reportes-usuarios.xlsx");
      
    } */

  exportAsXLSX(): void {
    // Obtener los datos del dataSource
    const data = this.dataSource.data.map(row => ({
      Nombre: row.name,
      Apellido: row.lastName,
      Teléfono: row.phone,
      Correo: row.email,
      Rol: row.orole.roleName,
      Documento: row.lpersonDocument[0]?.documentNumber,
      Estado: row.isActive ? 'Activado' : 'Desactivado'
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Verificar que ws['!ref'] no sea undefined
    if (!ws['!ref']) {
      console.error('¡Error! El rango de la hoja de trabajo es indefinido.');
      return;
    }

    // Aplicar estilos a las celdas de la primera fila (cabecera)
    const headerStyle = {
      font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F81BD" } },
      alignment: { horizontal: "center" }
    };

    // Aplicar estilos a las celdas de datos
    const cellStyle = {
      font: { sz: 12 },
      alignment: { horizontal: "left" }
    };

    // Estilo de borde
    const borderStyle = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" }
    };

    // Obtener el rango de celdas
    const range = XLSX.utils.decode_range(ws['!ref']);

    for (let C = range.s.c; C <= range.e.c; ++C) {
      const headerAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[headerAddress]) continue;
      ws[headerAddress].s = headerStyle;
      ws[headerAddress].s.border = borderStyle;
    }

    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = cellStyle;
        ws[cellAddress].s.border = borderStyle;
      }
    }

    // Ajustar el ancho de las columnas automáticamente
    const cols = range.e.c + 1;
    const wscols = [];
    for (let i = 0; i < cols; i++) {
      wscols.push({ wch: 20 });
    }
    ws['!cols'] = wscols;

    // Crear un libro de trabajo y agregar la hoja de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Exportar el libro de trabajo a un archivo Excel
    XLSX.writeFile(wb, 'usuarios.xlsx');
  }

  mostrar(valor_: any) {

    let pag = document.getElementById("pagmat");
    pag?.style.setProperty("display", "initial", "important");
    this.validUser = false;
  }

  createUser() {

    this.user = null;
    this.validUser = true;
    this.isRegister = true;
    this.visible = true;
    /* this.router.navigate(["/flows/administrator-user", qwe]); */
  }



  updateRol(id: any) {
    this.head.mostrarSpinner();
    this.service.getPersonDetail(id.userID).subscribe(
      x => {
        this.data = x.odata;
        this.isRegister = false;
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  ngOnInit(): void {
    this.getCostCenter();
    this.getCountri();
    this.getDocument();
    this.getMenu();
    this.getProfile();
    this.getRole();
    this.dataSource = new MatTableDataSource();
    this.getEnterprisePerson();
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


  getEnterprisePerson() {
    let valor = this.head.getCompany();
    this.loading = true;
    const objewe = {
      EnterpriseCode: valor.id,
      IsAgency: this.head.getIsAgency(),
      isAdministrator: true,
    }
    this.service.getEnterprisePerson(objewe).subscribe(
      x => {
        if (x.status === 200) {
          this.lstPerson = x.ldata;
          this.lstPerson.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstPerson;
          this.head.ocultarSpinner();
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }


  getMenu() {
    let valor = this.head.getCompany();
    let agencyval = this.head.getIsAgency();
    this.service.getMenuByEnterpriseCode(valor.id, agencyval).subscribe(
      x => {
        x.status === 200 ? this.lstMenu = x.ldata : this.head.setErrorToastr(x.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getCostCenter() {
    let valor = this.head.getCompany();
    this.service.getCostCenter(valor.id, false).subscribe(
      x => {
        x.status === 200 ? this.lstCostCenter = x.ldata : this.head.setErrorToastr(x.message);

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getCountri() {

    this.service.getCountries().subscribe(
      x => {
        this.lstCountries = x;
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getRole() {
    let valor = this.head.getCompany();
    this.service.getRole(valor.id, valor.isAgency, false).subscribe(
      x => {
        x.status === 200 ? this.lstRoles = x.ldata : this.head.setErrorToastr(x.message);

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getDocument() {
    this.serviceF.getDocument(false).subscribe(
      x => {
        x.status === 200 ? this.lstDocument = x.ldata : this.head.setErrorToastr(x.message);

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getProfile() {
    let valor = this.head.getCompany();
    this.service.getCompanyProfile(valor.id).subscribe(
      x => {
        x.status === 200 ? this.lstProfile = x.ldata : this.head.setErrorToastr(x.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }


}
