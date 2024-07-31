import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-create-update-group',
  templateUrl: './create-update-group.component.html',
  styleUrls: ['./create-update-group.component.css']
})
export class CreateUpdateGroupComponent {

  @Input() isRegister!: boolean;
  @Input() data: any;
  @Input() lstGroup: any[] = [];
  @Input() textbtn!: string;
  @Output() select = new EventEmitter<any>();
  form: any;
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
      id: [CreateUpdateGroupComponent.id],
      groupID: [this.isRegister === true ? '' : this.data.name, Validators.required],
      isActive: [this.isRegister === true ? true : this.data.isActive, Validators.required],
    });

  }

  manageGroup(){
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    let data = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? 0 : this.data.id,
      AgencyID: valor.id,
      Name: this.form.controls.groupID.value,
      IsActive: this.form.controls.isActive.value
    }
    this.service.manageGroup(data).subscribe(
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
