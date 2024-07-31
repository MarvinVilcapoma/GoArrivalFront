import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-create-update-profile-gds',
  templateUrl: './create-update-profile-gds.component.html',
  styleUrls: ['./create-update-profile-gds.component.css']
})
export class CreateUpdateProfileGdsComponent implements OnInit {

  @Input() isRegister!: boolean;
  @Input() data: any;
  @Input() companyId!: string;
  @Input() lstGds: any[] = [];
  @Input() textbtn!: string;
  @Output() select = new EventEmitter<any>();
  form: any;
  static id = 0;
  constructor(private fb: FormBuilder,private head: HeaderService,private service: FlowReportsService) {
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      id: [CreateUpdateProfileGdsComponent.id],
      gdsID: [this.isRegister === true ? '' : this.data.gdsID, Validators.required],
      code: [this.isRegister === true ? '' : this.data.code, Validators.required],
      name: [this.isRegister === true ? '' : this.data.name, Validators.required],
      isDefault: [this.isRegister === true ? true : this.data.isDefault, Validators.required],
      isActive: [this.isRegister === true ? true : this.data.isActive, Validators.required]
    });

  }

  manageCompanyProfile(){
    if(this.form.invalid){
      return;
    }
    this.head.mostrarSpinner();
  
    let data = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? 0 : this.data.id,
      CompanyID: this.isRegister === true ? this.companyId : this.data.companyID,
      GdsID: this.form.controls.gdsID.value,
      Code: this.form.controls.code.value,
      Name: this.form.controls.name.value,
      IsDefault: this.form.controls.isDefault.value,
      IsActive: this.form.controls.isActive.value,
    };
    this.service.manageCompanyProfile(data).subscribe(
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
