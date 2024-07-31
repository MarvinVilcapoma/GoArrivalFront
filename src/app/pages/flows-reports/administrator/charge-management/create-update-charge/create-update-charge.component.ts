import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-create-update-charge',
  templateUrl: './create-update-charge.component.html',
  styleUrls: ['./create-update-charge.component.css']
})
export class CreateUpdateChargeComponent implements OnInit {

  @Input() textbtn!: string;
  @Input() isRegister!: boolean;
  @Input() data: any;
  @Input() lstServices: any[] = [];
  @Output() select = new EventEmitter<any>;
  form: any;
  static id = 0;

  stateOptions: any[] = [
    { label: 'Desactivado', value: 'off' },
    { label: 'Activado', value: 'on' }
  ];
  blockedPanel: boolean = false;
  types: any[] = [];
  payment: any[] = [];
  constructor(private fb: FormBuilder, private head: HeaderService, private service: FlowReportsService) {


  }

  ngOnInit(): void {
    this.types = [
      { name: 'Corporativo', code: 'C' },
      { name: 'Vacacional', code: 'V' },
      { name: 'Partner Club', code: 'P' }
    ];
    this.payment = [
      { name: 'Todas', code: 'T' }
    ];
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [CreateUpdateChargeComponent.id],
      TypeSearch: [this.isRegister === true ? '' : this.data.typeSearch, Validators.required],
      Amount: [this.isRegister === true ? '' : this.data.amount, Validators.required],
      IsPercentage: [this.isRegister === true ? false : this.data.isPercentage, Validators.required],
      cargoAdd: [true],
      Igv: [this.isRegister === true ? '' : this.data.igv, Validators.required],
      PerPassenger: [this.isRegister === true ? false : this.data.perPassenger, Validators.required],
      InitialRange: [this.isRegister === true ? '' : this.data.initialRange, Validators.required],
      FinalRange: [this.isRegister === true ? '' : this.data.finalRange, Validators.required],
      ServiceID: [this.isRegister === true ? '' : this.data.oservice.id, Validators.required],
      FormOfPayment: [this.isRegister === true ? '' : this.data.ochargePayment.formOfPayment, Validators.required],
      AmountPayment: [this.isRegister === true ? '' : this.data.ochargePayment.amount, Validators.required],
      IsPercentagePayment: [this.isRegister === true ? false : this.data.ochargePayment.isPercentage, Validators.required],
      IgvPayment: [this.isRegister === true ? '' : this.data.ochargePayment.igv, Validators.required],
      isActivePayment: [this.isRegister === true ? true : this.data.ochargePayment.isActive, Validators.required],
      isActive: [this.isRegister === true ? true : this.data.isActive, Validators.required],
    });
  }

  clearValidator(name: string){
    this.form.controls[name].clearValidators()
    this.form.controls[name].updateValueAndValidity()
  }

  validChargue(valor_: any) {
    if (!valor_.checked) {
      this.clearValidator('FormOfPayment');
      this.clearValidator('IgvPayment');
      this.clearValidator('AmountPayment');
      this.blockedPanel = true;
    } else {
      this.form.controls['FormOfPayment'].setValidators([Validators.required]);
      this.form.controls['FormOfPayment'].updateValueAndValidity()
      this.form.controls['IgvPayment'].setValidators([Validators.required]);
      this.form.controls['IgvPayment'].updateValueAndValidity()
      this.form.controls['AmountPayment'].setValidators([Validators.required]);
      this.form.controls['AmountPayment'].updateValueAndValidity()
      this.blockedPanel = false;
    }
  }


  manageChargue() {
    if(this.form.invalid){
      return;
    }
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    let data = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? 0 : this.data.chargeServiceID,
      AgencyID: valor.id,
      TypeSearch: this.form.controls.TypeSearch.value,
      Amount: this.form.controls.Amount.value,
      IsPercentage: this.form.controls.IsPercentage.value,
      Igv: this.form.controls.Igv.value,
      PerPassenger: this.form.controls.PerPassenger.value,
      InitialRange: this.form.controls.InitialRange.value,
      FinalRange: this.form.controls.FinalRange.value,
      ServiceID: this.form.controls.ServiceID.value,
      OchagePayment: null,
      IsActive: this.form.controls.isActive.value,
    }
    let opay :any = {
      FormOfPayment: this.form.controls.FormOfPayment.value,
      Amount: this.form.controls.AmountPayment.value,
      IsPercentage: this.form.controls.IsPercentagePayment.value,
      Igv: this.form.controls.IgvPayment.value,
      IsActive: this.form.controls.isActivePayment.value,
    }
    if(!this.form.controls.cargoAdd.value){
      data.OchagePayment = null;
    } else {
      data.OchagePayment = opay;
    }
    this.service.manageCharges(data).subscribe(
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
