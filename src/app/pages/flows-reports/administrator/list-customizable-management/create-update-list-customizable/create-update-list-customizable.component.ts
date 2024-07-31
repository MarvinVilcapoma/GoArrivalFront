import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { ManageListCompanyAccessUid } from 'src/models/flows-reports/company-access-uid';

@Component({
  selector: 'app-create-update-list-customizable',
  templateUrl: './create-update-list-customizable.component.html',
  styleUrls: ['./create-update-list-customizable.component.css']
})
export class CreateUpdateListCustomizableComponent implements OnInit {

  @Input() data: any;
  @Input() isRegister!: boolean;
  @Input() textbtn!: string;
  @Input() index!: number;
  @Input() companyAccessUidID!: string;
  @Input() lstAccess: ManageListCompanyAccessUid[] = []
  @Output() select = new EventEmitter<any>;
  form: any;
  static id = 0;


  constructor(private fb: FormBuilder, private head: HeaderService, private service: FlowReportsService) {

  }


  ngOnInit(): void {
    console.log(this.lstAccess)
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [CreateUpdateListCustomizableComponent.id],
      code: [this.isRegister === true ? '' : this.data.code, Validators.required],
      description: [this.isRegister === true ? '' : this.data.description, Validators.required],
      parent: [this.isRegister === true ? '' : this.data.parent],
      isActive: [this.isRegister === true ? true : this.data.isActive],
    });
  }

  manageChargue() {
    if (this.form.invalid) {
      return;
    }
    this.head.mostrarSpinner();

    let data = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? 0 : this.data.id,
      CompanyAccessUidID: this.companyAccessUidID,
      Parent: this.form.controls.parent.value === "" ? 0 : this.form.controls.parent.value,
      Code: this.form.controls.code.value,
      Description: this.form.controls.description.value,
      IsActive: this.form.controls.isActive.value,
    }

    this.service.manageListCompanyAccessUid(data).subscribe(
      result => {
        if (result === null) {
          this.head.error500();
        }
        if (result.status === 200) {
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
