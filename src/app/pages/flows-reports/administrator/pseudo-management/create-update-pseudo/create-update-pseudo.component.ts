import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import * as util from 'src/app/pages/flows-reports/administrator/util'
@Component({
  selector: 'app-create-update-pseudo',
  templateUrl: './create-update-pseudo.component.html',
  styleUrls: ['./create-update-pseudo.component.css']
})
export class CreateUpdatePseudoComponent implements OnInit {

  @Input() data: any;
  @Input() isRegister!: boolean;
  @Input() textbtn!: string;
  @Input() lstCountries: any[] = [];
  @Input() lstGds: any[] = [];
  @Input() lstServices: any[] = [];
  @Output() select = new EventEmitter<any>; 

  form: any;
  hide = true;
  hideUser= true;

  validRequired: boolean | any = true;

  static id = 0;
  /**
   *
   */
  constructor(private fb: FormBuilder,private head: HeaderService,private service: FlowReportsService) {
    
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      id: [CreateUpdatePseudoComponent.id],
      code: [this.isRegister === true ? '' : this.data.ocredential.code],
      password: [this.isRegister === true ? '' : this.data.ocredential.password],
      url: [this.isRegister === true ? '' : this.data.ocredential.url],
      user: [this.isRegister === true ? '' : this.data.ocredential.user],
      booking: [this.isRegister === true ? '' : this.data.opseudo.booking, Validators.required],
      country: [this.isRegister === true ? null : this.data.opseudo.country, Validators.required],
      physical: [this.isRegister === true ? '' : this.data.opseudo.physical,Validators.required],
      ticket: [this.isRegister === true ? '' : this.data.opseudo.ticket, Validators.required],
      category: [this.isRegister === true ? '' : this.data.oqueue.category],
      gds: [this.isRegister === true ? '' : this.data.ogds.id,Validators.required],
      services: [this.isRegister === true ? '' : this.data.oservice.id,Validators.required],
      number: [this.isRegister === true ? '' : this.data.oqueue.number],
      isActive: [this.isRegister === true ? 'on' : this.data.isActive === true ? 'on' : 'off', Validators.required],
    });

  }

  managePseudo(){
    if(this.form.invalid){
      return;
    }
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    let data = {
      IsRegister: this.isRegister,
      AgencyPseudoID: this.isRegister === true ? 0 : this.data.id,
      AgencyID: valor.id,
      Physical: this.form.controls.physical.value,
      Booking: this.form.controls.booking.value,
      Ticket: this.form.controls.ticket.value,
      CountryOrigin: this.form.controls.country.value,
      GdsID: this.form.controls.gds.value,
      ServiceID: this.form.controls.services.value,
      OpseudoCredential: {
        User: util.encryptUsingTripleDES(this.form.controls.user.value),
        Password: util.encryptUsingTripleDES(this.form.controls.password.value),
        Code: util.encryptUsingTripleDES(this.form.controls.code.value),
        Url: util.encryptUsingTripleDES(this.form.controls.url.value)
      },
      OpseudoQueue: {
        Number: this.form.controls.number.value,
        Category: this.form.controls.category.value,
      },
      IsActive: this.form.controls.isActive.value === 'on' ? true : false,
    };
    this.service.manageAgencyPseudo(data).subscribe(
      result => {
        if(result === null){
          this.head.error500();
        }
        if(result.status === 200){
          this.head.ocultarSpinner();
          this.head.setSuccessToastr(result.message);
          this.select.emit(result.ldata);
        } else {
          this.head.ocultarSpinner();
          this.head.setErrorToastr(result.message);
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
