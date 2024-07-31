import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-create-update-coupon',
  templateUrl: './create-update-coupon.component.html',
  styleUrls: ['./create-update-coupon.component.css']
})
export class CreateUpdateCouponComponent {

  @Input() data: any;
  @Input() textbtn!: string;
  @Input() isRegister!: boolean;
  @Input() lstCurrency: any[] = [];
  @Input() lstServices: any[] = [];
  @Output() select = new EventEmitter<any>();

  form: any;
  
  minDate: Date | any;
  static id = 0;
  constructor(private service: FlowReportsService,private head: HeaderService,private fb: FormBuilder,private datePipe: DatePipe) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    
  }

  ngOnInit(): void {
    
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      id: [CreateUpdateCouponComponent.id],
      Code: [this.isRegister === true ? '' : this.data.code, [Validators.required, ]],
      Description: [this.isRegister === true ? '' : this.data.description],
      CurrencyCode: [this.isRegister === true ? '' : this.data.currencyCode, [Validators.required, ]],
      Amount: [this.isRegister === true ? '' : this.data.amount, [Validators.required, ]],
      IsPercentage: [this.isRegister === true ? true : this.data.isPercentage, [Validators.required, ]],
      MinimunAmount: [this.isRegister === true ? '' : this.data.minimunAmount, [Validators.required, ]],
      IsGlobal: [this.isRegister === true ? true : this.data.isGlobal, [Validators.required, ]],
      ServiceID: [this.isRegister === true ? '' : this.data.lcouponService, [Validators.required, ]],
      ExpirationDate: [this.isRegister === true ? '' : new Date(this.data.expirationDate), Validators.required],
      IsActive: [this.isRegister === true ? true : this.data.isActive, Validators.required]
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
      Description: this.form.controls.Description.value,
      CurrencyCode: this.form.controls.CurrencyCode.value,
      Amount: this.form.controls.Amount.value,
      MinimunAmount: this.form.controls.MinimunAmount.value,
      IsPercentage: this.form.controls.IsPercentage.value,
      IsGlobal: this.form.controls.IsGlobal.value,
      ExpirationDate: fechaFormateada,
      LcouponService: this.form.controls.ServiceID.value,
      IsActive: this.form.controls.IsActive.value,
    }

    this.service.manageCoupon(data).subscribe(
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
