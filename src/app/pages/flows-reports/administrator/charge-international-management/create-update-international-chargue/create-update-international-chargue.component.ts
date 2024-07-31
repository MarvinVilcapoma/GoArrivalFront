import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-create-update-international-chargue',
  templateUrl: './create-update-international-chargue.component.html',
  styleUrls: ['./create-update-international-chargue.component.css']
})
export class CreateUpdateInternationalChargueComponent implements OnInit {

  @Input() textbtn!: string;
  @Input() isRegister!: boolean;
  @Input() data: any;
  @Input() lstCompany: any[] = []
  @Output() select = new EventEmitter<any>;
  form: any;
  static id = 0;
  



  constructor(private fb: FormBuilder, private head: HeaderService, private service: FlowReportsService) {


  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [CreateUpdateInternationalChargueComponent.id],
      commission: [this.isRegister ? '' : this.data.commission, Validators.required],
      companyID: [this.isRegister ? '' : this.data.companyID, Validators.required],
      companyName: [this.isRegister ? '' : this.data.companyName],
      isCommissionPercentage: [this.isRegister ? false : this.data.isCommissionPercentage],
      interExpenses: [this.isRegister ? '' : this.data.interExpenses, Validators.required],
      isInterExpensesPercentage: [this.isRegister ? false : this.data.isInterExpensesPercentage],
      adminExpenses: [this.isRegister ? '' : this.data.adminExpenses, Validators.required],
      isAdminExpensesPercentage: [this.isRegister ? false : this.data.isAdminExpensesPercentage],
      fee: [this.isRegister ? '' : this.data.fee, Validators.required],
      isFeePercentage: [this.isRegister ? false : this.data.isFeePercentage],
      interPax: [this.isRegister ? '' : this.data.interPax, Validators.required],
      isInterPaxPercentage: [this.isRegister ? false : this.data.isInterPaxPercentage],
      isActive: [this.isRegister ? true : this.data.isActive],
    });
  }

  manageChargue() {
    if(this.form.invalid){
      return;
    }
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    let data = {
      IsRegister: this.isRegister,
      AgencyID: valor.id,
      CompanyID: this.isRegister === true ? this.form.controls.companyID.value : this.data.companyID,
      Commission: this.form.controls.commission.value,
      IsCommissionPercentage: this.form.controls.isCommissionPercentage.value,
      InterExpenses: this.form.controls.interExpenses.value,
      IsInterExpensesPercentage: this.form.controls.isInterExpensesPercentage.value,
      AdminExpenses: this.form.controls.adminExpenses.value,
      IsAdminExpensesPercentage: this.form.controls.isAdminExpensesPercentage.value,
      Fee: this.form.controls.fee.value,
      IsFeePercentage: this.form.controls.isFeePercentage.value,
      InterPax: this.form.controls.interPax.value,
      IsInterPaxPercentage: this.form.controls.isInterPaxPercentage.value,
      IsActive: this.form.controls.isActive.value,
    }

    this.service.manageInternationalCharge(data).subscribe(
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
