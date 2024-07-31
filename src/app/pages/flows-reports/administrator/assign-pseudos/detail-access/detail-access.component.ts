import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-detail-access',
  templateUrl: './detail-access.component.html',
  styleUrls: ['./detail-access.component.css']
})
export class DetailAccessComponent implements OnInit {

  @Input() lstCurrency: any[] = [];
  @Input() lstPayments: any[] = [];
  @Input() lstCredentials: any[] = [];
  @Input() lstCompany: any[] = [];
  @Input() isRegister!: boolean;
  @Input() textbtn!: string;
  @Input() nameSource!: string;
  @Input() idCompany!: any;
  @Input() data: any;
  @Output() select = new EventEmitter<any>;
  form: any;
  /**
   *
   */

  static id = 0;
  constructor(private fb: FormBuilder,private head: HeaderService,private service: FlowReportsService) {
    
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      id: [DetailAccessComponent.id],
      PseudoCredentialID: [this.isRegister === true ? '' : this.data.pseudoCredentialID, Validators.required],
      MethodOfPaymentID: [this.isRegister === true ? '' : this.data.methodOfPaymentID, Validators.required],
      CurrencyCode: [this.isRegister === true ? '' : this.data.currencyCode,Validators.required],
      Company: [this.isRegister === true ? '' : this.data.companyID],
      CompanyName: [this.isRegister === true ? '' : this.data.companyName],
      DisablePurchase: [this.isRegister === true ? false : this.data.disablePurchase, Validators.required],
      ExtraReason: [this.isRegister === true ? false : this.data.extraReason, Validators.required],
      UseAirplus: [this.isRegister === true ? false : this.data.useAirplus, Validators.required],
      TypePassenger: [this.isRegister === true ? '' : this.data.typePax, Validators.required],
      WarningMessage: [this.isRegister === true ? '' : this.data.warningMessage],
      UseRva: [this.isRegister === true ? false : this.data.useRva, Validators.required],
      CopyApprovers: [this.isRegister === true ? false : this.data.copyApprovers, Validators.required],
      PolicyAlert: [this.isRegister === true ? false : this.data.policyAlert, Validators.required],
      UpdateApprovers: [this.isRegister === true ? false : this.data.updateApprovers, Validators.required],
      BudgetByCostCenter: [this.isRegister === true ? false : this.data.budgetByCostCenter, Validators.required],
      ConsolidatePayment: [this.isRegister === true ? false : this.data.consolidatePayment, Validators.required],
      IncludeBaggage: [this.isRegister === true ? false : this.data.includeBaggage, Validators.required],
      GroupedReport: [this.isRegister === true ? false : this.data.groupedReport, Validators.required],
      CopyTicket: [this.isRegister === true ? '' : this.data.copyTicket],
      IsActive: [this.isRegister === true ? false : this.data.isActive, Validators.required],
    });

  }

  manageAccess(){
    if(this.form.invalid){
      return;
    }
    this.head.mostrarSpinner();
    let data = {
      IsRegister: this.isRegister,
      Source: this.nameSource,
      ID: this.isRegister === true ? "" : this.data.companyAccessID,
      CompanyID: this.nameSource === 'Company' ? this.idCompany : this.form.controls.Company.value,
      PseudoCredentialID: this.form.controls.PseudoCredentialID.value,
      MethodOfPaymentID: this.form.controls.MethodOfPaymentID.value,
      CurrencyCode: this.form.controls.CurrencyCode.value,
      DisablePurchase: this.form.controls.DisablePurchase.value,
      ExtraReason: this.form.controls.ExtraReason.value,
      UseAirplus: this.form.controls.UseAirplus.value,
      UseRva: this.form.controls.UseRva.value,
      CopyApprovers: this.form.controls.CopyApprovers.value,
      PolicyAlert: this.form.controls.PolicyAlert.value,
      UpdateApprovers: this.form.controls.UpdateApprovers.value,
      BudgetByCostCenter: this.form.controls.BudgetByCostCenter.value,
      ConsolidatePayment: this.form.controls.ConsolidatePayment.value,
      IncludeBaggage: this.form.controls.IncludeBaggage.value,
      GroupedReport: this.form.controls.GroupedReport.value,
      TypePassenger: this.form.controls.TypePassenger.value,
      CopyTicket: this.form.controls.CopyTicket.value === "" ? [] : this.form.controls.CopyTicket.value,
      WarningMessage: this.form.controls.WarningMessage.value,
      IsActive: this.form.controls.IsActive.value,
    }
  
    this.service.manageCompanyAccess(data).subscribe(
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
