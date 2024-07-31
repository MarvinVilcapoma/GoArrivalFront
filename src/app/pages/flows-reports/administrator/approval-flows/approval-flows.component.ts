import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Observable, ReplaySubject, map, startWith } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-approval-flows',
  templateUrl: './approval-flows.component.html',
  styleUrls: ['./approval-flows.component.css']
})
export class ApprovalFlowsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;



  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  form: any;
  title: string = "";
  subtitle: string = "";
  lstPerson: any[] = [];
  idType: number = 0;
  columns: any[] = [];
  isSidenavExpanded = true;
  blockNav = true;
  filteredOptionsUser!: Observable<any>;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  lstServices: any;
  isExpanded = true;
  isShowing = false;
  switch_expression = "Flujos Aprobación";
  cookieValue: any;
  lstMenu: any;
  visible : boolean = false;
  maxsisze = 1000000;
  
  dataSource!: MatTableDataSource<any>;
  uploadedFiles: any[] = [];
  data$: Observable<any[]> = this.subject$.asObservable();
  constructor(private service: FlowReportsService, public head: HeaderService, private fb: FormBuilder, private router: Router, private cookie: CookieService) {

    this.head.ocultarEncabezado();
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }



  profileRout() {
    this.router.navigate(["flows/profile"]);
  }


  showDialog() {
    this.visible = true;
  }

  onUpload(event: any) {
    let fileSend: any;
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      fileSend = file;
    }
    let valor = this.head.getCompany();


    const data = new FormData();
    data.append('ApprovalSettingFile', fileSend);
    data.append('companyID', valor.id);

    this.service.manageApprovalSettingByExcel(data).subscribe(
      x => {
        if (x.status === 200) {
          this.uploadedFiles = [];
          this.visible = false;
          this.head.setSuccessToastr(x.message);
          this.head.mostrarSpinner();
          this.companyApproval();
        } else {
          this.uploadedFiles = [];
          this.head.setErrorToastr(x.message);
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }




  flight() {
    this.head.mostrarSpinner();
    this.router.navigate(["flights"]);
  }

  closed() {
    this.head.clearAllCookies();
    this.cookie.deleteAll();
    this.cookie.delete("cookieLogin");
    this.cookie.delete("dk_company");
    this.cookie.delete("cookieLogin", "/flights");
    this.cookie.delete("dk_company", "/flights");
    this.router.navigate([""]);
  }

  mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  companyApproval(){
    let valor = this.head.getCompany();
    this.service.getCompanyApproval(valor.id).subscribe(
      x => {
        if (x.status === 200) {
          this.title = x.odata.name;
          this.idType = x.odata.approvalTypeID;
          this.subtitle = x.odata.description;
          switch (x.odata.approvalTypeID) {
            case 1:
              x.odata.lapprovals.forEach((element: any) => {
                element.userName = element.ouser.fullName;
                element.isActive ? element.isActiveShow = "Activado" : element.isActiveShow = "Desactivado";
                element.canIssue ? element.canIssueShow = "Si" : element.canIssueShow = "No";
              });
              this.getHeadColumns(x.odata.lapprovals);
              break;
            case 2:
              x.odata.lapprovals.forEach((element: any) => {
                element.costName = element.ocostCenter.name;
                element.isActive ? element.isActiveShow = "Activado" : element.isActiveShow = "Desactivado";
                element.canIssue ? element.canIssueShow = "Si" : element.canIssueShow = "No";
              });
              this.getHeadColumns(x.odata.lapprovals);
              break;
            case 3:
              x.odata.lapprovals.forEach((element: any) => {

                element.isActive ? element.isActiveShow = "Activado" : element.isActiveShow = "Desactivado";
                element.canIssue ? element.canIssueShow = "Si" : element.canIssueShow = "No";



              });
              this.getHeadColumns(x.odata.lapprovals);
              break;
            default:
              let id = document.getElementById("valid-table");
              id?.style.setProperty("display","none","important")
              this.head.ocultarSpinner();
              break;
          }


        } else {
          this.head.ocultarSpinner();
          this.head.error500();
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  ngOnInit(): void {
  

    this.dataSource = new MatTableDataSource();
    let qwe = this.head.getDataLogin();
    this.head.mostrarSpinner();
    this.initForm();
    this.companyApproval();
  }

  toggleColumnVisibility(column: any, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  updateAproval(valor_: any) {
    let qwe: any = {
      id: this.idType,
      user: valor_.approvalSettingID
    };
    qwe = this.head.encriptar(qwe);
    this.router.navigate(["/flows/administrator-flows", qwe]);
  }

  createFlow() {
    let qwe: any = {
      id: this.idType,
      user: ""
    };
    qwe = this.head.encriptar(qwe);
    this.router.navigate(["/flows/administrator-flows", qwe]);
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-flows");
    this.head.exportAsExcelFile(data, "Reportes-flujo.xlsx");
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



  private _filterUser(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.lstPerson.filter((option: any) => option.fullName.toLowerCase().includes(filterValue));
  }

  initForm() {
    this.form = this.fb.group({

      user: [""],

    });
  }

  getHeadColumns(lst: any[]) {
    switch (this.idType) {
      case 1:

        this.dataSource.data = lst;

        this.columns = [
          {
            label: 'Nombre Jefe',
            visible: true,
            property: 'fullName',
          },
          {
            label: 'Nombre Usuario',
            visible: true,
            property: 'userName',
          },
          {
            label: 'Correo',
            visible: true,
            property: 'email',
          },
          {
            label: 'Servicio',
            visible: true,
            property: 'serviceName',
          },
          {
            label: 'Emitir',
            visible: true,
            property: 'canIssueShow',

          },
          {
            label: 'Estado',
            visible: true,
            property: 'isActiveShow',
          },
          {
            label: 'Acciones',
            visible: true,
            property: 'acciones',
          }

        ];

        this.head.ocultarSpinner();
        break;
      case 2:
        this.dataSource.data = lst;

        this.columns = [
          {
            label: 'Nombre Jefe',
            visible: true,
            property: 'fullName',
          },
          {
            label: 'Centro de Costo',
            visible: true,
            property: 'costName',
          },
          {
            label: 'Correo',
            visible: true,
            property: 'email',
          },
          {
            label: 'Servicio',
            visible: true,
            property: 'serviceName',
          },
          {
            label: 'Emitir',
            visible: true,
            property: 'canIssueShow',

          },
          {
            label: 'Estado',
            visible: true,
            property: 'isActiveShow',
          },
          {
            label: 'Acciones',
            visible: true,
            property: 'acciones',
          }

        ];

        this.head.ocultarSpinner();
        break;
      case 3:
        this.dataSource.data = lst;

        this.columns = [
          {
            label: 'Nombre Jefe',
            visible: true,
            property: 'fullName',
          },
          {
            label: 'Correo',
            visible: true,
            property: 'email',
          },
          {
            label: 'Servicio',
            visible: true,
            property: 'serviceName',
          },
          {
            label: 'Emitir',
            visible: true,
            property: 'canIssueShow',

          },
          {
            label: 'Estado',
            visible: true,
            property: 'isActiveShow',
          },
          {
            label: 'Acciones',
            visible: true,
            property: 'acciones',
          }

        ];

        this.head.ocultarSpinner();
        break;
      default:
        this.columns = [];
        this.head.ocultarSpinner();
        break;
    }

  }

  getApprovalSettingFun(valor_: any) {
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    const objSetting = {
      ApprovalTypeID: this.idType,
      CompanyID: valor.id,
      UserID: valor_.userID
    }
    this.service.getApprovalSetting(objSetting).subscribe(
      x => {
        if (x.status === 200 && x.ldata?.length > 0) {
          x.ldata.forEach((element: any) => {
            if (element.isActive) {
              element.isActiveShow = "Activado";
            } else {
              element.isActiveShow = "Desactivado";
            }
            if (element.canIssue) {
              element.canIssueShow = "Activado";
            } else {
              element.canIssueShow = "Desactivado";
            }
          });
          this.dataSource.data = x.ldata;

        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  routeMenu(valor: any) {
    this.switch_expression = valor.name;
    if (this.switch_expression === 'Gestión de Empresas') {
      this.head.mostrarSpinner();
      let valor = "init";
      this.router.navigate(["/flows/administrator", valor]);
    }
  }

  bloquear() {
    if (this.blockNav) {
      this.blockNav = false;
    } else {
      this.blockNav = true;
    }

  }



  getEnterprisePerson() {
    let valor = this.head.getCompany();
    const objewe = {
      EnterpriseCode: valor.id,
      IsAgency: this.head.getIsAgency(),
      Administrator: true,
    }
    this.service.getEnterprisePerson(objewe).subscribe(
      x => {
        if (x.status === 200) {
          this.lstPerson = x.ldata;

          this.lstPerson.forEach(element => {
            element.fullName = element.name + " " + element.lastName;
          });
          this.filteredOptionsUser = this.form.controls.user.valueChanges.pipe(
            startWith(''),
            map(value => this._filterUser(value || '')),
          );
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getCostCenter() {

  }

}
