import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-create-udpate-menu',
  templateUrl: './create-udpate-menu.component.html',
  styleUrls: ['./create-udpate-menu.component.css']
})
export class CreateUdpateMenuComponent implements OnInit {

  @Input() textbtn!: string;
  @Input() isRegister!: boolean;
  @Input() data: any;
  @Input() lstMenu: any[] = []
  @Output() select = new EventEmitter<any>;
  typeMenu: any[] = [];
  form: any;
  static id = 0;

  constructor(private fb: FormBuilder, private head: HeaderService, private service: FlowReportsService) {


  }

  ngOnInit(): void {
    this.typeMenu = [
      { name: 'Vertical', id: 1 },
      { name: 'Horizontal', id: 2 },
    ];
    this.initForm();

  }

  initForm() {
    this.form = this.fb.group({
      id: [CreateUdpateMenuComponent.id],
      name: [this.isRegister === true ? '' : this.data.name, Validators.required],
      url: [this.isRegister === true ? '' : this.data.url, Validators.required],
      type: [this.isRegister === true ? '' : this.data.type, Validators.required],
      mainMenu: [this.isRegister === true ? '' : this.data.mainMenu],
      isForAllAgencies: [this.isRegister === true ? '' : this.data.isForAllAgencies],
      isForAllCompanies: [this.isRegister === true ? '' : this.data.isForAllCompanies],
      isActive: [this.isRegister === true ? true : this.data.isActive],
    });
  }

  manageMenu() {
    if (this.form.invalid) {
      return;
    }
    this.head.mostrarSpinner();

    let data = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? 0 : this.data.id,
      Name: this.form.controls.name.value,
      Url: this.form.controls.url.value,
      Type: this.form.controls.type.value,
      MainMenu: this.form.controls.mainMenu.value,
      IsForAllAgencies: this.form.controls.isForAllAgencies.value,
      IsForAllCompanies: this.form.controls.isForAllCompanies.value,
      IsActive: this.form.controls.isActive.value,
    }

    this.service.manageMenu(data).subscribe(
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
