import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-create-update-code',
  templateUrl: './create-update-code.component.html',
  styleUrls: ['./create-update-code.component.css']
})


export class CreateUpdateCodeComponent {

  @Input() data: any;
  @Input() textbtn!: string;
  @Input() isRegister!: boolean;
  @Input() lstCode: any[] = [];
  @Output() select = new EventEmitter<any>();
  form: any;
  
  minDate: Date | any;
  static id = 0;
  constructor(private service: FlowReportsService,private head: HeaderService,private fb: FormBuilder,private datePipe: DatePipe) {
    this.minDate = new Date();
  
   
  }

  ngOnInit(): void {
    
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      id: [CreateUpdateCodeComponent.id],
      Code: [this.isRegister === true ? '' : this.data.code, [Validators.required, ]],
      CouponID: [this.isRegister === true ? '' : this.data.couponID, [Validators.required, ]],
      ExpirationDate: [this.isRegister === true ? '' : new Date(this.data.expirationDate), Validators.required],
      IsActive: [this.isRegister === true ? false : this.data.isActive, Validators.required]
    });

  }

  manageCoupon(){
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    let fechaFormateada: any;
    fechaFormateada = this.datePipe.transform(this.form.controls.ExpirationDate.value, 'yyyy-MM-dd HH:mm:ss');
    fechaFormateada = fechaFormateada.replace(" ","T");
    let data = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? 0 : this.data.id,
      AgencyID: valor.id,
      Code: this.form.controls.Code.value,
      ExpirationDate: fechaFormateada,
      CouponID: this.form.controls.CouponID.value,
      IsActive: this.form.controls.IsActive.value,
    }

    this.service.manageAgencyCodeCoupon(data).subscribe(
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