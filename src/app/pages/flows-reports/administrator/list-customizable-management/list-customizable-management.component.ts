import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { ManageListCompanyAccessUid } from 'src/models/flows-reports/company-access-uid';


@Component({
  selector: 'app-list-customizable-management',
  templateUrl: './list-customizable-management.component.html',
  styleUrls: ['./list-customizable-management.component.css']
})
export class ListCustomizableManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  dataSource!: MatTableDataSource<any>;
  loading: boolean = false;
  columns: any[] = [
    {
      label: 'Código',
      property: 'code',
      visible: true
    },
    {
      label: 'Descripción',
      visible: true,
      property: 'description',
    },
    {
      label: 'Lista padre',
      property: 'parentName',
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
  isRegister: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  textHeader = "";
  pageSize = 10;
  data: any;
  companyAccessUidID!: string;
  visible: boolean = false;
  lstCompanyAcess: ManageListCompanyAccessUid[] = [];
  lstCompanyAcessTemp: ManageListCompanyAccessUid[] = [];


  index : number = 0;
  constructor(public head: HeaderService, private service: FlowReportsService,private _route: ActivatedRoute) {
    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    let accessId: any;
    accessId = this._route.snapshot.paramMap.get('id');
    this.companyAccessUidID = accessId;
    this.getListCompanyAccessUid(accessId);
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

  createListCompanyAccess() {
    this.lstCompanyAcessTemp = this.lstCompanyAcess;
    this.isRegister = true;
    this.textHeader = "Crear Lista";
    this.visible = true;
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-list-cutomizable");
    this.head.exportAsExcelFile(data, "Reportes-Lista-Personalizadas.xlsx");
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

  validManage(valor_: any) {
    this.lstCompanyAcess = valor_;
    this.lstCompanyAcess.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstCompanyAcess;
    this.visible = false;
  }

  getListCompanyAccessUid(id: string) {
    this.loading = true;
    this.service.getListCompanyAccessUid(id).subscribe(
      result => {
        if (result.status === 200) {
        
          this.lstCompanyAcess = result.ldata;
          this.lstCompanyAcess.forEach((element: any) => {
            element['visible'] = true;
          });
          
          this.dataSource.data = this.lstCompanyAcess;
         
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  updateLstAccess(data: any){

    this.index = this.lstCompanyAcess.findIndex(rank => rank.id === data.id);
    this.lstCompanyAcessTemp = [...this.lstCompanyAcess];
    this.lstCompanyAcessTemp.splice(this.index,1);
   /*  this.lstCompanyAcess.splice(index,1); */
    this.isRegister = false;
    this.data = data;
    this.textHeader = "Actualizar Lista";
    this.visible = true;
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
