import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import * as util from 'src/app/pages/flows-reports/administrator/util'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-smtp-management',
  templateUrl: './smtp-management.component.html',
  styleUrls: ['./smtp-management.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SmtpManagementComponent {

  filteredOptions!: Observable<any>;
  isSidenavExpanded = true;
  title = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  user = new FormControl('', [Validators.required, Validators.email]);
  active = new FormControl(true);
  gmail = new FormControl(true);
  decryptedPassword!: string;
  valcontra!: number;
  ver: boolean = false;
  blockNav = true;
  data: any;
  isActive: boolean = true;
  isGmail: boolean = true;
  loading!: boolean;
  hide = true;

  textBtn: string = " "

  constructor(private service: FlowReportsService, public head: HeaderService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getAgencyDetail();

  }

  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  getErrorMessage() {
    if (this.user.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.user.hasError('user') ? 'Correo no valido' : '';
  }


  registerAgency(message: string) {
    this.textBtn = "Registrar";
    this.head.setWarningToastr(message);
  }

  getAgencyDetail() {
    let valor = this.head.getCompany()
    this.service.getAgencySMTP(valor.id).subscribe(
      x => {
        x.status === 200 ? this.llenarDatos(x.ldata,x.message) : this.registerAgency(x.message);
        /*       if (x.status === 200) {
                this.data = x.ldata;
                if(x.ldata?.length > 0){
                  this.llenarDatos(x.ldata);
                }
                
                
              } */
        this.loading = false;
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }


  llenarDatos(data: any,message: string) {
    this.textBtn = "Actualizar";
    this.data = data;
    this.user.setValue(this.data[0].user);
    this.title.setValue(this.data[0].title);
    this.password.setValue(this.data[0].password);
    this.active.setValue(this.data[0].isActive);
    this.gmail.setValue(this.data[0].isGmail);
    this.head.setSuccessToastr(message);
    this.head.ocultarSpinner();
  }

  updateComp() { }

  updateAgency() {
    
    let valor = this.head.getCompany();


    if (this.user.value && this.password.value) {
      this.head.mostrarSpinner();
      const request: any = {
        IsRegister: this.textBtn === "Actualizar" ? false : true,
        ID: this.textBtn === "Actualizar" ? this.data[0].id : 0,
        AgencyID: valor.id,
        User: util.encryptUsingTripleDES(this.user.value),
        Password: util.encryptUsingTripleDES(this.password.value),
        Title: this.title.value,
        IsGmail: this.isGmail,
        IsActive: this.isActive,
      }
      this.service.updateAgencySMTP(request).subscribe(
        x => {
          x.status === 200 ? this.llenarDatos(x.ldata,x.message) : this.head.setErrorToastr(x.message);
        },
        error => {
          error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
        }
      )
    }




  }

}
