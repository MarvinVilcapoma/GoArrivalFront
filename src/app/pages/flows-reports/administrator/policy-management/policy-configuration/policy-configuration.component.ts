import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { PolicyCreateUpdateComponent } from './policy-create-update/policy-create-update.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-policy-configuration',
  templateUrl: './policy-configuration.component.html',
  styleUrls: ['./policy-configuration.component.css']
})
export class PolicyConfigurationComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  dataUpdate: any;
  isSidenavExpanded = true;
  blockNav = true;
  id: any = "";
  idBlock: any = "";
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  columns: any[] = [];
  dataEdit: any = null;
  data : any = null;
  dataSource!: MatTableDataSource<any>;
  heightPx = "500px"
  textHeader = "";
  visible: boolean = false;
  validData = false;
  codePolicy: string = "";
  constructor(public head: HeaderService, private service: FlowReportsService, private _route: ActivatedRoute,private router: Router) {

    this.head.ocultarEncabezado();
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  updateAdditonal(){
    this.textHeader = "Rutas Adicionales";
    this.id = 'P0';
    this.dataEdit = this.dataUpdate;
    this.head.mostrarSpinner();
    this.data = null;
    this.visible = true;
  }


  back(){
    this.router.navigate(["flows/policy-management"]);
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
  

  createFlow() {
    this.textHeader = "Nueva Política";
    this.id = this.codePolicy;
    this.dataEdit = null;
    this.head.mostrarSpinner();
    this.data = null;
    this.visible = true;
 
  }

  updatePolicy(valor_ : any){
    this.textHeader = "Actualizar Política";
    this.id = this.codePolicy;
    this.dataEdit = valor_;
    this.visible = true;
  }

  changeHeight(valor_ : any){
    if(valor_ === null || valor_ === undefined){
      this.visible = false;
    }
    if(valor_.code != null && valor_.code != undefined){
      this.heightPx = "700px"
      this.visible = false;
      this.id = valor_.code;
      this.compareLst(valor_);
    }
    
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
    this.getCompanyConfiguration();
  }

  addActive(lst: any[]){
    lst.forEach(element => {
      if (element.isActive) {
        element.isActiveShow = "Activado";
      } else {
        element.isActiveShow = "Desactivado";
      }
    });
    return lst;
  }
  

  compareLst(valor_: any) {
    switch (this.id) {
      case "P1":
        valor_.lpolicy1 = this.addActive(valor_.lpolicy1);
        this.dataSource.data = valor_.lpolicy1;
        this.columns = [
          {
            label: 'Días Nacionales',
            visible: true,
            property: 'minNationalDays',
          },
          {
            label: 'Días Interacionales',
            visible: true,
            property: 'minInternationalDays',
          },
          {
            label: 'Aplica a',
            visible: true,
            property: 'applyTo',
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
        break;
      case "P2":
        valor_.lpolicy2 = this.addActive(valor_.lpolicy2);
        this.dataSource.data = valor_.lpolicy2;
        this.columns = [
          {
            label: 'Precio Máximo Nac.',
            visible: true,
            property: 'maxNationalAmount',
          },
          {
            label: 'Precio Máximo Int.',
            visible: true,
            property: 'maxInternationalAmount',
          },
          {
            label: 'Aplica a',
            visible: true,
            property: 'applyTo',
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
        break;
      case "P3":
        valor_.lpolicy3 = this.addActive(valor_.lpolicy3);
        this.dataSource.data = valor_.lpolicy3;
        
        this.columns = [
          {
            label: 'Hora Inicial',
            visible: true,
            property: 'initialHour',
          },
          {
            label: 'Hora Final',
            visible: true,
            property: 'finalHour',
          },
          {
            label: 'Cabina',
            visible: true,
            property: 'cabinType',
          },
          {
            label: 'Aplica a',
            visible: true,
            property: 'applyTo',
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
        break;
      case "P4":
        valor_.lpolicy4 = this.addActive(valor_.lpolicy4);
        this.dataSource.data = valor_.lpolicy4;
        this.columns = [

          {
            label: 'Cabina',
            visible: true,
            property: 'cabinType',
          },
          {
            label: 'Aplica a',
            visible: true,
            property: 'applyTo',
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
        break;
      case "P5":
        if(valor_.opolicy5 != null){
          valor_.opolicy5.laverageCosts = this.addActive(valor_.opolicy5.laverageCosts);
          this.dataSource.data = valor_.opolicy5.laverageCosts;
        } else {
          this.dataSource.data = [];
        }
        
        this.columns = [

          {
            label: 'Ruta',
            visible: true,
            property: 'travelRoute',
          },
          {
            label: 'Precio Máximo',
            visible: true,
            property: 'maxAmount',
          },
          {
            label: '% Adicional',
            visible: true,
            property: 'additionalPercentage',
          },
          {
            label: 'Aplica a',
            visible: true,
            property: 'applyTo',
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
        break;
      case "P6":
        valor_.lpolicy4 = this.addActive(valor_.lpolicy6);
        this.dataSource.data = valor_.lpolicy6;
        this.columns = [

          {
            label: '% Nacional',
            visible: true,
            property: 'nationalPercentage',
          },
          {
            label: '% Internacional',
            visible: true,
            property: 'internationalPercentage',
          },
          {
            label: 'Aplica a',
            visible: true,
            property: 'applyTo',
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
        break;
      case "P7":
        valor_.lpolicy7 = this.addActive(valor_.lpolicy7);
        this.dataSource.data = valor_.lpolicy7;
        this.columns = [

          {
            label: 'Monto Nacional',
            visible: true,
            property: 'nationalAmount',
          },
          {
            label: 'Monto Internacional',
            visible: true,
            property: 'internationalAmount',
          },
          {
            label: 'Aplica a',
            visible: true,
            property: 'applyTo',
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
        break;
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

  exportAsXLSX(): void {
    let data = document.getElementById("table-policy");
    this.head.exportAsExcelFile(data, "Reportes-Políticas.xlsx");
  }

  

  getCompanyConfiguration() {
    this.head.mostrarSpinner();
    let data = this.head.getCompany();
    this.id = this._route.snapshot.paramMap.get('id');
    this.codePolicy = this.id;
    this.service.getCompanyConfiguration(data.id, this.id).subscribe(
      x => {
        if (x.status === 200) {
          this.dataUpdate = x.odata;
          this.validData = true;
          this.compareLst(x.odata);
          this.head.ocultarSpinner();

        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
