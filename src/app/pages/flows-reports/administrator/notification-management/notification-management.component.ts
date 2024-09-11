import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { EnterpriseNotificationRQ, EnterprisePersonRQ } from 'src/models/flows-reports/administrator';

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrl: './notification-management.component.css'
})
export class NotificationManagementComponent implements OnInit{
  @ViewChild('dt1') dt1!: Table;

  isSidenavExpanded = true;
  blockNav = true;
  cols: any[] = [];
  _selectedColumns: any[] = [];
  lstNotification: any;
  lstPerson: any;
  isSorted: any = null;
  initialValue: any[] = [];
  notification: any;
  visible: boolean = false;
  isRegister: boolean = true;
  data: any;

  constructor(private service: FlowReportsService, public head: HeaderService) {
    this.head.ocultarEncabezado();
  }
  ngOnInit(): void{
    this.cols = [
      { field: 'title', header: 'Título' },
      { field: 'description', header: 'Descripción' },
      { field: 'creationDateShow', header: 'Fecha de Creación' },
      { field: 'isActive', header: 'Estado' }
    ];
    this._selectedColumns = this.cols;
    this.getEnterpriseNotification();
  }
  get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
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

  getFieldValue(product: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj && obj[key], product);
  }

  getEnterpriseNotification(){
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    const isAgency = this.head.getIsAgency();

    const data: EnterpriseNotificationRQ = {
      EnterpriseCode: valor.id,
      IsAgency: isAgency,
      IsAdministrator : true,
    }

    const dataPerson: EnterprisePersonRQ = {
      EnterpriseCode: valor.id,
      IsAgency: isAgency,
      IsAdministrator : true,
    }

    console.log(dataPerson);
    this.service.geturlGetNotification(null, data.IsAdministrator).subscribe(
      x => {
        if (x.status === 200) {
          this.chargeNotifications(x);  
          this.service.getEnterprisePerson(dataPerson).subscribe(x => {
            if (x.status === 200) {
              this.lstPerson = x.ldata;
            }
          });           
          this.head.ocultarSpinner();
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  updateNotfication(notification: any){
    console.log("Esta es la notificación: ",notification);
    this.head.mostrarSpinner();
    if(notification.id != null && notification.id != undefined){
      this.data = notification;
      this.isRegister = false;
      this.visible = true;
      this.head.ocultarSpinner();
    }else{
      this.head.setErrorToastr("No existe ID de la notificación")
    }
  }

  chargeNotifications(valor_ : any ){
    this.lstNotification = valor_.ldata;
    this.lstNotification = this.lstNotification.map((element: any) => ({
      ...element,
      title: element.title
    }));
    this.initialValue = [...this.lstNotification];
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.lstNotification = [...this.initialValue];
      this.dt1.reset();
    }
  }

  sortTableData(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  createNotification() {
    this.notification = null;
    this.isRegister = true;
    this.visible = true;
  }

}

