import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  dataSource!: MatTableDataSource<any>;

  loading: boolean = false;
  columns: any[] = [
    {
      label: 'Nombre',
      property: 'name',
      visible: true
    },
    {
      label: 'Tipo',
      visible: true,
      property: 'type',
    },
    {
      label: 'Menu superior',
      property: 'mainMenu',
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
  visibleAssign: boolean = false;
  data: any;
  visible: boolean = false;
  lstMenu: any[] = [];
  menuId: number = 0;
  lstMenuTemp: any[] = [];
  lstEnterprise: any[] = [];
  isAgency:boolean = false;

  constructor(public head: HeaderService, private service: FlowReportsService) {

    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getMenu();
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

  createMenu() {
    this.isRegister = true;
    this.textHeader = "Crear Menú";
    this.visible = true;
  }

  getMenu() {
    this.loading = true;
    this.service.getMenu().subscribe(
      result => {
        if (result.status === 200) {
          this.lstMenu = result.ldata;
          this.lstMenu.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstMenu;
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

 

  getMenuDetail(valor_: any) {
    this.head.mostrarSpinner();
    this.service.getMenuDetail(valor_.id).subscribe(
      result => {
        this.data = result.odata;

        let index = this.lstMenu.findIndex(rank => rank.id === this.data.id);
        this.lstMenuTemp = [...this.lstMenu];
        this.lstMenuTemp.splice(index,1);

        this.isRegister = false;
        this.textHeader = "Actualizar Menú";
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getEnterpriseMenu(id: any, isAgency: boolean){
    this.menuId = id;
    this.isAgency = isAgency;
    this.head.mostrarSpinner();
    this.service.getEnterpriseMenu(id,isAgency).subscribe(
      result => {
        if (result.status === 200) {
          this.lstEnterprise = result.ldata;
    
          this.visibleAssign = true;
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-menu");
    this.head.exportAsExcelFile(data, "Reportes-Menu.xlsx");
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
    if(this.lstMenu != null){
      this.lstMenu = valor_;
      this.lstMenu.forEach((element: any) => {
        element['visible'] = true;
      });
      this.dataSource.data = this.lstMenu;
      this.visible = false;
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

}
