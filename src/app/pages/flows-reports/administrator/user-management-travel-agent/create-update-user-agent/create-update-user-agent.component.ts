import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import {  dniValidator, emailValidator, foreignCardValidator, nameValidator, passportValidator } from 'src/app/validators/custom-validators';


@Component({
  selector: 'app-create-update-user-agent',
  templateUrl: './create-update-user-agent.component.html',
  styleUrl: './create-update-user-agent.component.css'
})
export class CreateUpdateUserAgentComponent implements OnInit {

  @Input() isRegister?: boolean;
  @Input() dataLoad: any;
  @Input() lstCountries: any[] = [];
  @Input() airlines: any[] = [];
  @Input() lstDocument: any[] = [];
  @Input() selectType: string = "";
  @Input() selectCompany: string = "";
  @Output() select = new EventEmitter<any>();
  form: any;
  adultMinDate: Date;
  adultMaxDate: Date;
  defaultDate: Date;
  genders:any[] = [];
  /**
   *
   */
  constructor(private fb: FormBuilder,private head: HeaderService,private service: FlowReportsService) {
    const currentYear = new Date().getFullYear();
    this.adultMinDate = new Date(1915, 0, 1);
    this.adultMaxDate = new Date(currentYear - 12, 11, 31);
    this.defaultDate = new Date(currentYear - 40, 0, 1);
  }

  ngOnInit(): void {
    this.genders = [
      { name: 'Masculino', id: 'M' },
      { name: 'Femenino', id: 'F' },
    ];
    this.initForm();
    this.form.get('documentType')?.valueChanges.subscribe((value: any) => {
      this.setDocumentNumberValidators(value);
    });

    // Inicializar validadores para el número de documento según el valor actual
    this.setDocumentNumberValidators(this.form.get('documentType')?.value);
  }



  initForm() {
    this.form = this.fb.group({
      name: [this.isRegister ? '' : this.dataLoad.name, [Validators.required, nameValidator()]],
      lastName: [this.isRegister ? '' : this.dataLoad.lastName, [Validators.required, nameValidator()]],
      phone: [this.isRegister ? '' : this.dataLoad.phone],
      frequentFlyer: [this.isRegister ? '' : this.dataLoad.frequentFlyer],
      gender: [this.isRegister ? '' : this.dataLoad.gender, Validators.required],
      airline: [this.isRegister ? '' : this.dataLoad.airline],
      isActive: [this.isRegister ? true : this.dataLoad.isActive],
      email: [this.isRegister ? '' : this.dataLoad.email, [Validators.required, emailValidator()]],
      documentType: [this.isRegister ? '' : this.dataLoad.lpersonDocument.length > 0 ? this.dataLoad.lpersonDocument[0].documentID : "", Validators.required],
      numberDocument: [this.isRegister ? '' : this.dataLoad.lpersonDocument.length > 0 ? this.dataLoad.lpersonDocument[0].documentNumber : "", Validators.required],
      birthDate: [this.isRegister ? '' : new Date(this.dataLoad.birthDate), [Validators.required]], // Añadir validador personalizado
      countryOrigin: [this.isRegister ? '' : this.dataLoad.countryOrigin, Validators.required]
    });
  }



  createUser() {
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    const data: any = {
      IsRegister: this.isRegister,
      ID: this.isRegister ? "" : this.dataLoad.personID,
      Name: this.form.controls.name.value,
      LastName: this.form.controls.lastName.value,
      CorporatePhone: this.selectType === "C" ? this.form.controls.phone.value : "",
      CorporateEmail: this.selectType === "C" ? this.form.controls.email.value : "",
      PersonalPhone: this.selectType === "V" ? this.form.controls.phone.value : "",
      PersonalEmail: this.selectType === "V" ? this.form.controls.email.value : "",
      BirthDate: this.form.controls.birthDate.value,
      Gender: this.form.controls.gender.value,
      IsVacational: this.selectType === "C" ? false : true,
      CountryOrigin: this.form.controls.countryOrigin.value,
      IsVIP: false,
      LpersonDocuments: [{
        Number: this.form.controls.numberDocument.value,
        DocumentID: this.form.controls.documentType.value,
        isActive: true
      }],
      Ouser: {
        ID: this.isRegister ? "" : this.dataLoad.userID,
        AccessGranted: true,
        RoleID: this.isRegister ? 2 : this.dataLoad.orole.roleID,
        AllCostCenters: false,
        OfrequentFlyer:{
          AirlineCode: this.form.controls.airline.value,
          FrequentFlyer: this.form.controls.frequentFlyer.value,
        },
        TravelerCode:  "" ,
        Signature: "",
        IsActive: this.form.controls.isActive.value,
        OenterpriseUser: {
          IsAgency: this.selectType === "V" ? true : false,
          Code: this.selectType === "V" ? valor.id : this.selectCompany,
          AccessCode: ""
        },
        LprofileGds: null,
        Lmenu: [{
          menuID: 1,
          IsActive: true
        }],
        LcostCenter: []
      }
    };


    this.service.managePerson(data).subscribe(
      x => {
        if (x === null) {
          this.head.error500();
        }
        if (x.status === 200) {
          this.head.ocultarSpinner();
          this.head.setSuccessToastr(x.message);
          this.select.emit(x);
        } else {
          this.head.setErrorToastr(x.message);
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  setDocumentNumberValidators(documentType: string) {
    const numberDocumentControl = this.form.get('numberDocument');
    if (numberDocumentControl) {
      numberDocumentControl.clearValidators();
      if (documentType === 'F3F05B20-412E-4A1A-BA31-B69B1E6D0392') {
        numberDocumentControl.setValidators([Validators.required, dniValidator()]);
      } else if (documentType === 'DD8D0D83-5E9B-4377-AC1A-A4A806EB0C3A') {
        numberDocumentControl.setValidators([Validators.required, passportValidator()]);
      } else if (documentType === '7F0B8721-FC7F-4735-A1AD-7DD8EC485A3C') {
        numberDocumentControl.setValidators([Validators.required, foreignCardValidator()]);
      }
      numberDocumentControl.updateValueAndValidity();
    }
  }

}
