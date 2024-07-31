import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FlightService } from 'src/app/services/flight/flight.service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-agency-create-update',
  templateUrl: './agency-create-update.component.html',
  styleUrls: ['./agency-create-update.component.css']
})
export class AgencyCreateUpdateComponent implements OnInit {



  static id = 0;
  validShow = false;
  form: any;
  mode: 'create' | 'update' = 'create';
  defaults: any = null;
  userActive = true;

  idUpdate: any;
  typeCompany: any[] = [];
  filteredOptionsCountries!: Observable<any>;
  @Input() id: any;
  @Input() lstCountries: any[] = [];
  @Input() lstApprovar: any[] = [];
  @Input() lstDocument: any[] = [];
  @Input() lstGroup: any[] = []
  @Input() isRegister!: boolean;
  @Input() data: any;
  @Input() textbtn!: string;
  @Output() select = new EventEmitter<any>();
  /**
   *
   */
  constructor(private fb: FormBuilder, private service: FlowReportsService, private _route: ActivatedRoute, private serviceF: FlightService, private head: HeaderService, private router: Router) {
    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.typeCompany = [
      { name: 'Consolidador', code: 'CN' },
      { name: 'Corporativo', code: 'CR' },
    ];
    this.initForm();
  }

 

  save() {

    if (this.mode === 'create') {
      /*   this.createCustomer(); */
    } else if (this.mode === 'update') {
      /*     this.updateCustomer(); */
    }
  }

  changeChip() {
    this.userActive = !this.userActive;
  }

  isCreateMode() {

    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  createUpdateEmpresa() {
    if (this.form.invalid) {
      return;
    }
    this.head.mostrarSpinner();
    let obj: any = {};
    let valor = this.head.getCompany();
  
    if (!this.isRegister) {
      obj = null;
    } else {
      this.idUpdate = "";
      obj = {
        DocumentID: this.form.controls?.documentID?.value,
        Number: this.form.controls?.numberDocument?.value,
        IsActive: true
      }

    }
    let objet = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? "" : this.data.id,
      Name: this.form.controls?.name.value,
      Ruc: this.form.controls?.ruc.value,
      DK: this.form.controls?.codeDK.value,
      CountryOrigin: this.form.controls?.countryOrigin.value,
      Address: this.form.controls?.address.value,
      TypeCompanyID: this.form.controls?.typeCompanyID.value,
      ApprovalTypeID: this.form.controls?.approvalTypeID.value,
      IsActive: this.form.controls?.companyActive.value,
      OcontactInfo: {
        Phone: this.form.controls?.phone.value,
        Email: this.form.controls?.email.value,
        Name: this.form.controls?.nameContact?.value,
        LastName: this.form.controls?.lastNameContact?.value,
        IsActive: true,
        OcontactDocument: obj
      },
      Oagency: {
        AgencyID: valor.id,
        GroupID: 1
      }

    }


    this.service.manageCompany(objet).subscribe(
      x => {
        if(x === null){
          this.head.error500();
        }
        if(x.status === 200){
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
      }
    )
  }

  clearValidator(name: string){
    this.form.controls[name].clearValidators()
    this.form.controls[name].updateValueAndValidity()
  }

  initForm() {
   


    this.form = this.fb.group({
      id: [AgencyCreateUpdateComponent.id],
      name: [this.isRegister === true ? '' : this.data.name,Validators.required],
      ruc: [this.isRegister === true ? '' : this.data.ruc,Validators.required],
      typeCompanyID: [this.isRegister === true ? '' : this.data.typeCompanyID,Validators.required],
      approvalTypeID: [this.isRegister === true ? '' : this.data.approvalTypeID,Validators.required],
      groupID: [this.isRegister === true ? '' : this.data.groupID,Validators.required],
      email: [this.isRegister === true ? '' : this.data.email, Validators.required],
      phone: [this.isRegister === true ? '' : this.data.phone],
      nameContact: [this.isRegister === true ? '' : this.data.name,Validators.required],
      lastNameContact: [this.isRegister === true ? '' : '', Validators.required],
      documentID: [this.isRegister === true ? '' : "",Validators.required],
      numberDocument: [this.isRegister === true ? '' : "",Validators.required],
      codeDK: [this.isRegister === true ? '' : this.data.codeDK],
      countryOrigin: [this.isRegister === true ? '' : this.data.countryOrigin,Validators.required],
      address: [this.isRegister === true ? '' : this.data.address],
      companyActive: [this.isRegister === true ? true : this.data.isActive, Validators.required],
    });

    if(!this.isRegister){
      this.clearValidator('nameContact');
      this.clearValidator('lastNameContact');
      this.clearValidator('documentID');
      this.clearValidator('numberDocument');
    }
    

  }

 


}
