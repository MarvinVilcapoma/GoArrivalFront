import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { EnterprisePersonRQ } from 'src/models/flows-reports/administrator';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-notification-create-update',
  templateUrl: './notification-create-update.component.html',
  styleUrls: ['./notification-create-update.component.css']
})
export class NotificationCreateUpdateComponent implements OnInit {
  @Input() isRegister!: boolean;
  @Output() select = new EventEmitter<any>();
  @Input() lstCompany: any;
  @Input() dataLoad: any;

  form: any;
  static id = 0;
  notificationActive: boolean  = true;
  notificationGeneral: boolean  = true;
  dataUpdate: any;

  selectedCompany: any;

  isGeneral = false;
  lstUser: any[] = [];

  constructor(
    private service: FlowReportsService,
    private fb: FormBuilder,
    private head: HeaderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isGeneral = this.isRegister ? true : false;
    this.initForm();

    const descriptionField = this.form.get('description');
    if (descriptionField && descriptionField.value) {
      setTimeout(() => {
        const textarea = document.getElementById('description') as HTMLTextAreaElement;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`; 
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [NotificationCreateUpdateComponent.id],
      title: [this.isRegister ? '' : this.dataLoad?.title, Validators.required],
      description: [this.isRegister ? '' : this.dataLoad?.description],
      isGeneral: [this.isRegister ? '' : this.dataLoad?.isGeneral],
      isActive: [this.isRegister === true ? true : this.dataLoad?.isActive],
      userID: [this.isRegister ? '' : this.dataLoad?.ouser?.id],
      companyID: [this.isRegister ? '' : this.dataLoad?.ocompany?.id]
    });
    this.cd.detectChanges();

    if (!this.isRegister) {
      this.notificationActive = this.dataLoad.isActive;
      this.notificationGeneral = this.dataLoad.isGeneral;
      const companyID = this.form.get('companyID')?.value;
      if (companyID) {
        this.head.mostrarSpinner();
        this.loadUsersforCompany(companyID);
      }
    }

    this.form.get('companyID')?.valueChanges.subscribe((selectedCompanyID: any) => {
      if (selectedCompanyID) {
        this.head.mostrarSpinner();
        this.loadUsersforCompany(selectedCompanyID);
      } else {
        this.lstUser = [];
        this.form.get('userID')?.setValue(null);
      }
    });
  }

  loadUsersforCompany(companyID: any) {
    const dataPerson: EnterprisePersonRQ = {
      EnterpriseCode: companyID || '',
      IsAgency: false,
      IsAdministrator: true,
    };
    this.service.getEnterprisePerson(dataPerson).subscribe(
      x => {
        this.lstUser = (x.ldata || []).map((user: any) => ({
          userID: user.userID,
          fullName: `${user.name} ${user.lastName}`
        }));
        if (!this.isRegister && this.dataLoad?.ouser?.id) {
          this.form.get('userID')?.setValue(this.dataLoad.ouser.id);
        } else {
          this.form.get('userID')?.setValue(null);
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 400 ? this.head.setErrorToastr("Error al cargar los usuarios") : this.head.error500();
        this.head.ocultarSpinner();
      }
    );
  }

  createUpdateNotification() {
    if (this.form.invalid) {
      return;
    }
    this.head.mostrarSpinner();
    let obj: any = {
      isRegister: this.isRegister,
      Title: this.form.controls.title.value,
      Description: this.form.controls.description.value,
      IsGeneral: this.form.controls.isGeneral.value,
      IsActive: this.form.controls.isActive.value,
      UserID: this.form.controls.userID.value,
    };
    if (!this.isRegister) {
      obj.ID = this.dataLoad.id;
      obj.isRegister = false;
    }
    if (this.notificationGeneral) obj.UserID = "";
    this.service.manageNotification(obj).subscribe(
      x => {
        if (x === null) {
          this.head.error500();
        }
        if (x.status === 200) {
          this.head.ocultarSpinner();
          this.head.setSuccessToastr(x.message);
          this.select.emit(x.ldata);
        } else {
          this.head.ocultarSpinner();
          this.head.setErrorToastr(x.message);
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
        this.head.ocultarSpinner();
      }
    );
  }

  changeIsGeneral() {
    if (this.notificationGeneral) {
      this.form.controls.companyID.setValue(null);
      this.form.controls.userID.setValue(null);
    }
  }
}
