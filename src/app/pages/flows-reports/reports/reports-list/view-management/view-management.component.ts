import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-view-management',
  templateUrl: './view-management.component.html',
  styleUrls: ['./view-management.component.css']
})
export class ViewManagementComponent   {
  @Input() todo: any[] = [];
  @Input() done: any[] = [];
  @Input() isRegister!: boolean;
  @Input() companyReportId!: number;
  @Input() nameView! : string;
  @Output() select = new EventEmitter<any>();
  query: string = "";
  constructor(private service: FlowReportsService,private head: HeaderService) {


  }

  successView(result : any){
    this.head.setSuccessToastr(result.message);

    const data = {
      result : result.oreportData.dynamics,
      query: this.nameView
    }
    this.select.emit(data);
  }

  hideError(message: string){
    this.head.setErrorToastr(message);
    this.head.ocultarSpinner();
  }

  insertUpdateCompanyReport() {
    this.head.mostrarSpinner();
    let login = this.head.getDataLogin();
    let lstSendList: any[] = [];
    this.done.forEach( x => lstSendList.push(x.code))
    let data = {
      IsInsert: this.isRegister,
      CompanyReportId: this.isRegister ? this.companyReportId = 0 : this.companyReportId,
      NameView: this.nameView,
      Codes: lstSendList,
      CompanyId: login.oenterprise.id,
      ReportId: 1,
      CreatedUserId: login.userID,
      IsActive: true
    };
    this.service.insertUpdateCompany(data).subscribe(
      result => {
        result.status === 200 ? this.successView(result) : this.hideError(result.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
