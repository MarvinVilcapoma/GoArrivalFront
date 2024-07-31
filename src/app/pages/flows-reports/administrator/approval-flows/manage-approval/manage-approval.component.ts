import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-manage-approval',
  templateUrl: './manage-approval.component.html',
  styleUrls: ['./manage-approval.component.css']
})
export class ManageApprovalComponent {
  lstPerson: any[] = [];
  lstUser: any[] = [];
  filteredOptionsUser!: Observable<any>;
  filteredOptionsService!: Observable<any>;
  filteredOptionsUsuario!: Observable<any>;
  filteredOptionsCostCenter!: Observable<any>;
  lstService: any[] = [];
  lstCostCenter: any[] = [];
  form: any;
  defaults: any = null;
  mode: 'create' | 'update' = 'create';
  national = true;
  international = true;
  hasException = true;
  isReservation = true;
  canIssue = true;
  hasApprovalRange = false;
  hasInfractionRange = false;
  isActive = true;
  boss: number = 0;
  idType: any;
  serviceSend: number = 0;
  costSend: number = 0;
  userSend : any = "";
  idUpdate: any;
  aprrovalId: any;
  validCostCenter = false;
  validUser = false;
  dataUpdate: any;
  user: any;
  constructor(private fb: FormBuilder, private router: Router, private _route: ActivatedRoute, private head: HeaderService, private service: FlowReportsService) {


  }

  private _filterFlows(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.lstPerson.filter((option: any) => option.fullName.toLowerCase().includes(filterValue));
  }

  private _filterService(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.lstService.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  private _filterCostCenter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.lstCostCenter.filter((option: any) => option.description.toLowerCase().includes(filterValue));
  }

  private _filterUser(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.lstUser.filter((option: any) => option.fullName.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.head.ocultarEncabezado();
    this.initForm();
    let userId: any;
    userId = this._route.snapshot.paramMap.get('id');
    userId = this.head.desencriptar(userId);
    this.idType = userId.id;
    if (userId.user != '') {
       this.head.mostrarSpinner();
      this.aprrovalId = userId.user;
      this.mode = "update";
      this.getEnterprisePerson();
     
      this.defaults = {};
    } else {
      this.mode = 'create';
      this.validateTypeID();
      this.getEnterprisePerson();
      this.getService();
      this.defaults = null;
    }
  }

  getCostCenter() {
    let valor = this.head.getCompany();
    this.service.getCostCenter(valor.id, false).subscribe(
      x => {
        if (x.status === 200) {
          x.ldata.forEach((element: any) => {
            element.isChecked = false
          });
          this.lstCostCenter = x.ldata;
          this.agregarNuevaPropiedad();
          this.filteredOptionsCostCenter = this.form.controls?.costCenter.valueChanges.pipe(
            startWith(''),
            map(value => this._filterCostCenter(value || '')),
          );
          if (this.mode === "update") {
            let cost = this.lstCostCenter.filter((m: any) => m.id.toString().toUpperCase().includes(this.dataUpdate.costCenterID.toString().toUpperCase()))
            if (cost?.length > 0) {
              this.form.controls.costCenter.setValue(cost[0].description);
            }
          }
          this.validCostCenter = true;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  validateTypeID() {
    switch (this.idType) {
      case 1:
        this.form.addControl('usuario', this.fb.control('', Validators.required));
        this.filteredOptionsUsuario = this.form.controls.usuario.valueChanges.pipe(
          startWith(''),
          map(value => this._filterUser(value || '')),
        );
        this.form.controls.usuario.setValue(this.user)
        if(this.mode === "update"){
          this.form.controls.usuario.disable();
        }
        this.validUser = true;

        break;
      case 2:
        this.getCostCenter();
        break;
      /*     default:
            break; */
    }
  }

  getApprovalSettingDetail(valor: any) {
    this.service.getApprovalSettingDetail(valor).subscribe(
      x => {
        if (x.status === 200) {
          this.dataUpdate = x.odata;
          this.boss = x.odata.bossID;
          this.serviceSend = x.odata.serviceID;
          this.userSend = x.odata.userID;
          if(this.mode === "update" && this.idType === 2){
            this.costSend = x.odata.costCenterID;
            this.validateTypeID();
          } else if(this.idType === 1) {
            let user: any = this.lstPerson.filter((m: any) => m.userID.toUpperCase().includes(x.odata.userID.toUpperCase()))
            if (user?.length > 0) {
              user = user[0].name + " " + user[0].lastName;
              this.user = user;
              
            }
            this.validateTypeID();
          }
          this.setData(x.odata);
          this.idUpdate = x.odata.id;
          this.head.ocultarSpinner();
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  setData(data: any) {
    let boss: any = this.lstPerson.filter((m: any) => m.userID.toUpperCase().includes(data.bossID.toUpperCase()))
    if (boss?.length > 0) {
      boss = boss[0].name + " " + boss[0].lastName;
      
    }
    let service = this.lstService.filter((m: any) => m.id.toString().toUpperCase().includes(data.serviceID.toString().toUpperCase()))
    if (service?.length > 0) {
      service = service[0].name;
    }

    this.form.controls.boss.setValue(boss);
    this.form.controls.rangeInitial.setValue(data.initialRange);
    this.form.controls.rangeFinal.setValue(data.finalRange);
    this.form.controls.service.setValue(service);
    this.canIssue = data.canIssue;
    this.hasException = data.hasException;
    this.isActive = data.isActive;
    this.hasApprovalRange = data.isApprovalRange;
    this.hasInfractionRange = data.isInfractionRange;
    this.international = data.isInternational;
    this.national = data.isNational;
    this.isReservation = data.isReservation;
    if (this.hasApprovalRange || this.hasInfractionRange) {
      this.form.controls.rangeInitial.enable();
      this.form.controls.rangeFinal.enable();
    }
  }



  isCreateMode() {

    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  save() {

    if (this.mode === 'create') {
      /*  this.createCustomer(); */
    } else if (this.mode === 'update') {
      /* this.updateCustomer(); */
    }
  }

  initForm() {
    this.form = this.fb.group({
      boss: ["", Validators.required],
      rangeInitial: [0, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      rangeFinal: [0, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      service: ["", Validators.required]
    });
    this.form.controls.rangeInitial.disable();
    this.form.controls.rangeFinal.disable();
  }

  agregarNuevaPropiedad() {
    this.form.addControl('costCenter', this.fb.control('', Validators.required));
    if(this.mode === "update"){
      this.form.controls.costCenter.disable();
    }
  }



  getEnterprisePerson() {
    let valor = this.head.getCompany();
    const objewe = {
      EnterpriseCode: valor.id,
      IsAgency: this.head.getIsAgency(),
      Administrator: true,
    }
    this.service.getEnterprisePerson(objewe).subscribe(
      x => {
        if (x.status === 200) {
          this.lstPerson = x.ldata;

          this.lstPerson.forEach(element => {
            element.fullName = element.name + " " + element.lastName;
          });
          this.lstUser = x.ldata;

          this.lstUser.forEach(element => {
            element.fullName = element.name + " " + element.lastName;
          });
          this.filteredOptionsUser = this.form.controls.boss.valueChanges.pipe(
            startWith(''),
            map(value => this._filterFlows(value || '')),
          );
          if (this.mode === "update") {
            this.getService();
          }
          
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  changeChip(id_: number) {
    switch (id_) {
      case 1:
        this.national = !this.national;
        break;
      case 2:
        this.international = !this.international;
        break;
      case 3:
        this.hasException = !this.hasException;
        break;
      case 4:
        this.isReservation = !this.isReservation;
        break;
      case 5:
        this.canIssue = !this.canIssue;
        break;
      case 6:
        this.hasApprovalRange = !this.hasApprovalRange;
        if (this.hasApprovalRange) {
          this.form.controls.rangeInitial.enable();
          this.form.controls.rangeFinal.enable();
        } else if (!this.hasInfractionRange) {
          this.form.controls.rangeInitial.disable();
          this.form.controls.rangeFinal.disable();
        }
        break;
      case 7:
        this.hasInfractionRange = !this.hasInfractionRange;
        if (this.hasInfractionRange) {
          this.form.controls.rangeInitial.enable();
          this.form.controls.rangeFinal.enable();
        } else if (!this.hasApprovalRange) {
          this.form.controls.rangeInitial.disable();
          this.form.controls.rangeFinal.disable();
        }
        break;
      case 8:
        this.isActive = !this.isActive;
        break;
    }
  }

  retroceder() {
    this.router.navigate(["flows/approval-flows"]);
  }

  createApproval() {
    if (this.form.status === "INVALID") {
      return;
    } else if (parseFloat(this.form.controls.rangeInitial.value) > parseFloat(this.form.controls.rangeFinal.value)) {
      this.head.setErrorToastr("El rango inicial no puede ser mayor al rango final")
      return;
    }
    let isRegister;
    if (this.mode === "update") {
      isRegister = false;
    } else {
      this.idUpdate = "";
      isRegister = true;
    }
    this.head.mostrarSpinner();
    let idCom = this.head.getCompany();
    let obj = {
      "IsRegister": isRegister,
      "ID": this.idUpdate,
      "CompanyID": idCom.id,
      "ApprovalTypeID": this.idType,
      "BossID": this.boss,
      "UserID": this.userSend,
      "CostCenterID": this.costSend,
      "ServiceID": this.serviceSend,
      "Priority": 1,
      "IsNational": this.national,
      "IsInternational": this.international,
      "HasException": this.hasException,
      "IsReservation": this.isReservation,
      "CanIssue": this.canIssue,
      "HasApprovalRange": this.hasApprovalRange,
      "HasInfractionRange": this.hasInfractionRange,
      "InitialRange": parseFloat(this.form.controls.rangeInitial.value),
      "FinalRange": parseFloat(this.form.controls.rangeFinal.value),
      "IsActive": this.isActive
    }
    this.service.manageApprovalSetting(obj).subscribe(
      x => {
        if (x.status === 200) {
          this.retroceder();
          this.head.setSuccessToastr(x.message)
        } else {
          this.head.setErrorToastr(x.message)
          this.head.ocultarSpinner();
        }
        
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  saveBoss(valor_: any) {
    this.boss = valor_.userID;
  }

  saveService(valor_: any) {
    this.serviceSend = valor_.id;
  }

  saveCost(valor_: any) {
    this.costSend = valor_.id;
  }

  saveUser(valod_ : any){
    this.userSend = valod_.userID;
  }

  getService() {

    this.service.getService(true).subscribe(
      x => {
        if (x.status === 200) {
          this.lstService = x.ldata;

          this.filteredOptionsService = this.form.controls.service.valueChanges.pipe(
            startWith(''),
            map(value => this._filterService(value || '')),
          );
          if (this.mode === "update") {
            this.getApprovalSettingDetail(this.aprrovalId);
          }
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
