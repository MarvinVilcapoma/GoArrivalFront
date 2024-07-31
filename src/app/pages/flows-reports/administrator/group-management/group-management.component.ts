import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlowsReportsComponent } from '../../flows-reports.component';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  columns: any[] = [
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
  lstGroup: any[] = [];
  loading: boolean = false;
  blockNav = true;
  isSidenavExpanded = true;

  isRegister: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  pageSize = 10;
  visible = false;
  textHeader: string = "";
  data: any;
  constructor(private service: FlowReportsService,public head: HeaderService) {
    
    this.head.ocultarEncabezado();
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getGroup();
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

  validManage(valor_ : any){
    this.lstGroup = valor_;
    this.lstGroup.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.lstGroup;
    this.visible = false;
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-group");
    this.head.exportAsExcelFile(data, "Reportes-Agencias.xlsx");
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

  createGroup(){
    this.isRegister = true;
    this.textHeader = "Crear Grupo";
    this.visible = true;
  }

  updateGroup(valor_ : any){
    this.isRegister = false;
    this.textHeader = "Actualizar Grupo";
    this.data = valor_;
    this.visible = true;
  }

  getGroup(){
    this.loading = true;
    let valor = this.head.getCompany();
    this.service.getGroupByAgencyID(valor.id).subscribe(
      result => {
        if (result.status === 200) {
          this.lstGroup = result.ldata;
          this.lstGroup.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstGroup;
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
