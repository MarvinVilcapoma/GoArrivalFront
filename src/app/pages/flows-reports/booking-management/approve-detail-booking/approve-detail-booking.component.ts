import { Location } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-approve-detail-booking',
  templateUrl: './approve-detail-booking.component.html',
  styleUrls: ['./approve-detail-booking.component.css']
})
export class ApproveDetailBookingComponent implements OnInit, AfterViewInit {

  messageEmit: string = "¿Estás seguro de emitir el ticket?";
  messageDelete: string = "¿Estás seguro de rechazar el ticket?";
  visible: boolean = false;
  messageShow: string = "";
  @Input() data: any;
  @Output() select = new EventEmitter<any>();
  messages: Message[] | any;
  datos: any = null;
  constructor(private head: HeaderService, private service: FlowReportsService, private messageService: MessageService, private confirmationService: ConfirmationService) {


  }



  confirm1(event: Event,message: string,numero: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: message,
        acceptLabel: "Si",
        rejectLabel: "No",
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          numero === 1 ? this.confirmTicket() : this.cancelTicket();
        },
        reject: () => {
           
        }
    });
}

  confirm2(event: Event,message: string,numero: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        numero === 1 ? this.confirmTicket() : this.cancelTicket();

      },
      reject: () => {
        
      }
    });
  }

  ngOnInit(): void {
    this.datos = history.state.data;
    this.messages = [{ severity: 'warn', summary: 'Aviso', detail: this.datos.ostatus?.description }];
    this.head.ocultarSpinner();
  
  }

  goBack(): void {
    this.head.goback();
  }

  ngAfterViewInit(): void {
    this.head.ocultarSpinner();
  }

  showDialog() {
    this.visible = true;
  }

  reemitir() {
    /* this.router.navigate(["reemision"]); */
  }

  cancelTicket() {
    this.head.mostrarSpinner();
    const data = {
      TransactionCode: this.datos.transactionCode,
      UserID: this.head.getDataLogin().userID
    }
    this.service.refuse(data).subscribe(
      x => {
        x.status === 200 ? this.succesMessage(x.message) : this.head.setErrorToastr(x.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  succesMessage(message: string) {
    this.head.setSuccessToastr(message);
    this.head.ocultarSpinner();
    this.goBack();
  }

  confirmTicket() {
    this.head.mostrarSpinner();
    const data = {
      TransactionCode: this.datos.transactionCode,
      UserID: this.head.getDataLogin().userID
    }
    this.service.approve(data).subscribe(
      x => {
        x.status === 200 ? this.succesMessage(x.message) : this.head.setErrorToastr(x.message);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }



  shorDialogConfirm() {

  }

}
