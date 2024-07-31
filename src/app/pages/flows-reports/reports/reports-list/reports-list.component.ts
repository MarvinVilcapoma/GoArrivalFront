
import { Calendar } from 'primeng/calendar';
import { Component, OnInit, Input, TemplateRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

import { Table } from 'primeng/table';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { FilterService, MenuItem } from 'primeng/api';
import { ViewManagementComponent } from './view-management/view-management.component';



@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {
  @ViewChild(ViewManagementComponent) manage: any;


  rangeDates: Date[] | any;

  visible: boolean = false;
  listReports: any[] = [];
  intervaloDatas!: any[];
  inicioDate: Date;
  finDate: Date;
  bsValue = new Date();
  maxDate = new Date();
  listViews: any[] = [];


  textButton = 'Seleccione';
  validDisabled = false;
  companyReportId: any;
  inicioShow: string = '';
  finalShow: string = '';
  currentDate = new Date();
  sevenDaysAgo = new Date(this.currentDate);

  bookingForm!: FormGroup;
  setListData: any;
  validView: any;
  headers: any;
  listCodes: any = [];
  showPartner: boolean = true;
  validColumn = false;
  todo: any[] = [];
  done: any[] = [];
  showButton = true;
  showActions = true;
  message!: string;
  modalRef!: BsModalRef;
  val: any[] = [];
  vald: any[] = [];
  login: any;
  @ViewChild('dt1') dt1!: Table;
  selectedColumns!: any[];
  cols!: any[];
  minDate: Date | any;
  nameView: string = "";
  items: MenuItem[] | undefined;
  isRegister: boolean = true;
  selectedView: number = 0;
  validDrop: boolean = false;
  textTitle: string = "";
  dataEvent: any;
  textState: string = "";
  lstTextFilter: string[] = [];
  textPlaceHolder: string = "";
  constructor(private service: HeaderService, private flowService: FlowReportsService,  public spinner: NgxSpinnerService, private head: HeaderService) { this.inicioDate = new Date(); this.finDate = new Date();  this.minDate = new Date();
      this.minDate.setDate(this.minDate.getDate() );
       }

  @ViewChild('dateFilter') private dateFilter!: Calendar;

  ngOnInit(): void {
    this.setSevenDays();
    this.getViews(false);
    this.vald = [];
    this.items = [
      {
          label: 'Nueva vista',
          icon: 'pi pi-fw pi-plus',
          styleClass: 'optionSplit'
      },
      {
          label: 'Modificar vista',
          icon: 'pi pi-fw pi-trash',
          styleClass: 'optionSplit'
      }
  ];
  }





  setSevenDays() {
    this.sevenDaysAgo.setDate(this.sevenDaysAgo.getDate() - 7);
    this.inicioShow = this.sevenDaysAgo.getDate() + '/' + (this.sevenDaysAgo.getMonth() + 1) + '/' + this.sevenDaysAgo.getFullYear();
    this.finalShow = this.currentDate.getDate() + '/' + (this.currentDate.getMonth() + 1) + '/' + this.currentDate.getFullYear();
    this.textState = history.state.data;
    this.textState === "Reporte Vuelos" ? this.getReportFligth() : this.getReportsHotel();
  }

  setFields() {
    let lstTemp: any[] = [];
    let colsTemp: any = {};
    this.headers.forEach((element: any) => {
      colsTemp.field = element;
      colsTemp.header = element.toUpperCase();
      lstTemp.push({ ...colsTemp });
      colsTemp = {};
    });

    return lstTemp;
  }

  successReportEvent(data: any){
    if(data.result === null || data.result === undefined){
      return;
    } else {
      this.dataEvent = data;
      this.getViews(true);
    }
    
  
  }


  successReport(results: any){
    this.textTitle = "Mis reportes vuelos";
    this.listReports = results;
    
    this.headers = Object.keys(this.listReports[0]);
    this.cols = this.setFields();
    this.selectedColumns = this.cols;
    this.visible = false;
  }

  setErrorList(){
    this.head.setErrorToastr("No hay reportes disponibles.")
    this.listReports = [];
    this.cols = [];
    this.selectedColumns = [];
  }

  getQuery(id_ : number){
    let view = this.listViews.find(x => x.companyReportId === id_);
    return view.query;
  }

  getReportFligth() {
    this.head.mostrarSpinner();
    this.lstTextFilter = ['FechaVuelo','Pasajero'];
    this.textPlaceHolder = "Pasajero, Fecha Vuelo";
    let data = this.head.getDataLogin();
    const dataReport = {
      DateFrom: this.inicioShow,
      DateUntil: this.finalShow,
      CompanyDK: data.oenterprise.codeDK,
      Query: this.selectedView === 0 ? "" : this.getQuery(this.selectedView)
    }
    this.flowService.getReportGeneral(dataReport).subscribe(
      (results) => {
        results?.length === 0 ? this.setErrorList() : this.successReport(results);
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    );
  }

  getReportsHotel() {
    this.lstTextFilter = ['numberDocument','passenger'];
    this.textPlaceHolder = "Pasajero, Num. Documento";
    this.head.mostrarSpinner();
    let data = this.head.getDataLogin();
    const dataReport = {
      DateFrom: this.inicioShow,
      DateUntil: this.finalShow,
      CompanyDK: data.oenterprise.codeDK,
    }
    this.flowService.getReportHotel(dataReport).subscribe(
      (results) => {
        results?.lhotelReport.length === 0 ? this.setErrorList() : this.successReport(results?.lhotelReport);
        this.head.ocultarSpinner();

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    );
  }




  public onDatesRangeFilterSelected(selectedValue: Date) {
    if (this.rangeDates[1]) {
      this.dateFilter.hideOverlay()
      this.inicioShow = this.rangeDates[0].getDate() + '/' + (this.rangeDates[0].getMonth() + 1) + '/' + this.rangeDates[0].getFullYear();
      this.finalShow = this.rangeDates[1].getDate() + '/' + (this.rangeDates[1].getMonth() + 1) + '/' + this.rangeDates[1].getFullYear();
      this.textState === "Reporte Vuelos" ? this.getReportFligth() : this.getReportsHotel();
    };
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-data-report");
    this.service.exportAsExcelFile(data, "Reportes.xlsx");
  }

  setDataEvent(){
    this.validDrop = false;
    this.textTitle = "Mis reportes vuelos";
    this.listReports = this.dataEvent.result;
    let view = this.listViews.find(x=> x.nameView === this.dataEvent.query);
    this.selectedView  = view.companyReportId;
    this.headers = Object.keys(this.listReports[0]);
    this.cols = this.setFields();
    this.selectedColumns = this.cols;
    this.visible = false;
    this.head.ocultarSpinner();
  }

  setViewAll(lst: any[],valor_: boolean){
    this.listViews = lst;
    valor_ ? this.setDataEvent() : valor_ = valor_;
    
    let view = {
      companyReportId: 0,
      nameView: "Mostrar todos",
      query: ""
    }
    this.listViews.push(view);
    this.validDrop = true;
    
  }

  getViews(valor_ : boolean) {
    let idcomp;
    idcomp = this.service.getDataLogin().oenterprise.id;
    this.flowService.getCompanyReport(idcomp).subscribe(
      result => {
        result.status === 200 ? this.setViewAll(result.lreports,valor_) : this.head.setErrorToastr(result.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }




  droped(event: CdkDragDrop<string[]>, valor: any) {
    this.setListData = [];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }
    if (valor === 1) {
      this.setListData = event.container.data;
    } else {
      this.setListData = event.previousContainer.data;
    }
  }

 
  setDoneAll(lst: any[]){
    let lstDoneAll: any[] = []
    lst.forEach(element => {
      lstDoneAll.push(element.description);
    });

    return lstDoneAll;
  }


  getField(valid_ : boolean) {
    this.isRegister = valid_;
    this.spinner.show();
    let companyReportID: Number;
    let view = this.listViews.find(x => x.companyReportId === this.selectedView);

    valid_ === true ? this.nameView = '' : this.nameView = view.nameView; 
    valid_ === true ? companyReportID = 0 : companyReportID = view.companyReportId; 
    this.companyReportId = companyReportID;
    this.flowService.getReportField(companyReportID).subscribe(
      x => {
        this.todo = x.lavailableFields;
        this.done = x.lusedFields;
        this.visible = true;
        this.spinner.hide();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getHeadColumns() {
    var myVar = this.listReports[0];
    for (var key in myVar) {
      this.headers.push(key);
    }
  }

 
}


