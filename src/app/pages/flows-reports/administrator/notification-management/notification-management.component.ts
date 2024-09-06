import { Component, OnInit } from '@angular/core';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrl: './notification-management.component.css'
})
export class NotificationManagementComponent implements OnInit{
  isSidenavExpanded = true;
  blockNav = true;
  cols: any[] = [];
  _selectedColumns: any[] = [];

  constructor(private service: FlowReportsService, public head: HeaderService) {
    this.head.ocultarEncabezado();
  }
  ngOnInit(): void{
    this.cols = [
      { field: 'title', header: 'Título' },
      { field: 'description', header: 'Descripción' },
      { field: 'creationDate', header: 'Fecha de Creación' },
      { field: 'isActive', header: 'Estado' }
    ];
    this._selectedColumns = this.cols;
  }
  get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
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
}

