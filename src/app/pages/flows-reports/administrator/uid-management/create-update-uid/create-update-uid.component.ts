import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-create-update-uid',
  templateUrl: './create-update-uid.component.html',
  styleUrls: ['./create-update-uid.component.css']
})
export class CreateUpdateUidComponent implements OnInit {

  @Input() lstUIDNotUsed: any[] = [];
  @Input() isRegister!: boolean;
  @Input() data: any;
  @Input() textbtn: any;
  @Input() accessId: any;
  @Output() select = new EventEmitter<any>();
  form: any;
  

  static id = 0;
  constructor(private service: FlowReportsService,private head: HeaderService,private fb: FormBuilder) {
    
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      id: [CreateUpdateUidComponent.id],
      code: [this.isRegister === true ? '' : this.data.codeUID, [Validators.required, ]],
      EntryCode: [this.isRegister === true ? '' : this.data.entryCode, Validators.required],
      Title: [this.isRegister === true ? '' : this.data.title,Validators.required],
      Regex: [this.isRegister === true ? '' : this.data.regex,Validators.required],
      IsList: [this.isRegister === true ? false : this.data.isList, Validators.required],
      IsEditable: [this.isRegister === true ? false : this.data.isEditable, Validators.required],
      IsMandatory: [this.isRegister === true ? false : this.data.isMandatory, Validators.required],
      IsActive: [this.isRegister === true ? false : this.data.isActive, Validators.required],
   
    });

  }

  manageCompanyAccessUid(){
    this.head.mostrarSpinner();
    let data = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? "" : this.data.id,
      CompanyAccessID: this.isRegister === true ? this.accessId : this.data.companyAccessID,
      code: this.form.controls.code.value,
      EntryCode: this.form.controls.EntryCode.value,
      Title: this.form.controls.Title.value,
      Regex: this.form.controls.Regex.value,
      IsList: this.form.controls.IsList.value,
      IsEditable: this.form.controls.IsEditable.value,
      IsMandatory: this.form.controls.IsMandatory.value,
      IsActive: this.form.controls.IsActive.value
    }
    this.service.manageCompanyAccessUid(data).subscribe(
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
