import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightService } from 'src/app/services/flight/flight.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/services/head.service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { user } from 'src/models/flows-reports/user.model';
import { TreeSelect } from 'primeng/treeselect';

import { ManageDocumentComponent } from './manage-document/manage-document.component';



@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.css'],
  providers: [FlightService, FlowReportsService]
})
export class UserCreateUpdateComponent implements OnInit {

  @ViewChild(ManageDocumentComponent) manageDocumentComponent!: ManageDocumentComponent;

  @Input() isRegister!: boolean;
  @Output() select = new EventEmitter<any>();
  @Input() dataLoad: any;

  @Input() lstMenu: any[] = [];
  @Input() lstCountries: any[] = [];
  @Input() lstRoles: any[] = [];
  @Input() lstCostCenter: any[] = [];
  @Input() lstProfile: any[] = [];
  @Input() lstDocument: any[] = [];

  @ViewChild('myStartTreeSelect') startSelect!: TreeSelect;
  static id = 0;
  form: any;

  selectedUsers: any[] = [];
  filteredOptionsCountries!: Observable<any>;
  filteredOptionsRole!: Observable<any>;
  filteredOptionsCostCenter!: Observable<any>;
  filteredOptionsProfile!: Observable<any>;





  data: any;
  sendMenu: any[] = [];
  sendProfile: any[] = [];
  sendCostCenter: any[] = [];

  adultMinDate: Date;
  adultMaxDate: Date;

  lstCheckCenter: any[] = [];
  lstCheckProfile: any[] = [];

  docsCreados: any[] = [];
  mode: 'create' | 'update' = 'create';
  allComplete: boolean = false;
  dataUpdate: any;


  access = true;
  userActive = true;
  userVip = false;




  selectedNodes: any;
  cookieValue: any;
  files: any[] = [];
  validacces: boolean = true;
  objetoDesencriptado: any = {};
  selectedFiles: any[] = [];
  visible: boolean = false;
  genders: any[] = [];
  lstMenuBlock: any;



  constructor(
    private fb: FormBuilder, private head: HeaderService, private service: FlowReportsService, private router: Router,
    private cookie: CookieService) {
    this.head.ocultarEncabezado();
    const currentYear = new Date().getFullYear();
    this.adultMinDate = new Date(1915, 0, 1);
    this.adultMaxDate = new Date(currentYear - 12, 11, 31);

  }


  ngOnInit(): void {
    this.genders = [
      { name: 'Masculino', id: 'M' },
      { name: 'Femenino', id: 'F' },
    ];
    this.cookieValue = this.cookie.get('cookieLogin');
    this.objetoDesencriptado = this.head.desencriptar(this.cookieValue);
    if (this.objetoDesencriptado.orole.name === "Gerente General") {
      this.validacces = false;
    }
    this.initForm();
    this.dataUpdate = this.dataLoad;
    this.getMenu();
    this.getDocument();
  }


  retroceder() {
    this.router.navigate(["flows/user-management"]);
  }


  changeFormat() {
    let lstMenu: any[] = [];
    this.selectedFiles.forEach(element => {
      const data = { menuID: element.id, IsActive: true }
      lstMenu.push(data);
      if (element.parent != undefined) {
        const datos = { menuID: element.parent.id, IsActive: true }
        lstMenu.push(datos);
        if (element.parent.parent != undefined) {
          const datosParent = { menuID: element.parent.parent.id, IsActive: true }
          lstMenu.push(datosParent);
        }
      }
    });
    
    let uniqueMenus = lstMenu.reduce((acc, current) => {
      const x = acc.find((item: any) => item.menuID === current.menuID);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueMenus;
  }

  createUser() {

    if (this.form.status === "INVALID") {
      return;
    } else if (this.docsCreados?.length === 0) {
      this.head.setErrorToastr("Gestiona al menos un documento.")
      return;
    } else if (this.selectedFiles?.length === 0) {
      this.head.setErrorToastr("Gestiona al menos un menú.")
      return;
    }
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    let reason = this.lstCountries.find(x => x.iataCode == this.form.controls.countryOrigin.value);
    let prefix: string = reason.phonePrefix.substring(1);

    let data: user = {
      IsRegister: this.isRegister ? true : false,
      ID: this.isRegister ? "" : this.dataUpdate.personID,
      Name: this.form.controls.name.value,
      LastName: this.form.controls.lastName.value,
      CorporatePhone: !this.head.getIsAgency() ? prefix + this.form.controls.phone.value : "",
      CorporateEmail: !this.head.getIsAgency() ? this.form.controls.email.value : "",
      PersonalPhone: this.head.getIsAgency() ? prefix + this.form.controls.phone.value : "",
      PersonalEmail: this.head.getIsAgency() ? this.form.controls.email.value : "",
      BirthDate: this.form.controls.birthDate.value,
      Gender: this.form.controls.gender.value,
      CountryOrigin: this.form.controls.countryOrigin.value,
      IsVacational: this.head.getIsAgency(),
      IsVIP: this.userVip,
      LpersonDocuments: this.docsCreados,
      Ouser: {
        ID: this.isRegister ? "" : this.dataUpdate.userID,
        AccessGranted: this.access,
        RoleID: this.form.controls.orole.value,
        AllCostCenters: false,
        OfrequentFlyer: {
          AirlineCode: "",
          FrequentFlyer: this.form.controls.frequentFlyer.value || "",
        },
        TravelerCode: this.form.controls.travelerCode.value === null ? "" : this.form.controls.travelerCode.value,
        Signature: "",
        IsActive: this.userActive,
        OenterpriseUser: {
          IsAgency: this.head.getIsAgency(),
          Code: valor.id,
          AccessCode: ""
        },
        LprofileGds: this.form.controls.lpersonProfile.value,
        Lmenu: this.changeFormat(),
        LcostCenter: this.form.controls.lcostCenter.value
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


  initForm() {
    this.form = this.fb.group({
      id: [UserCreateUpdateComponent.id],
      name: [this.isRegister ? '' : this.dataLoad.name, Validators.required],
      lastName: [this.isRegister ? '' : this.dataLoad.lastName, Validators.required],
      phone: [this.isRegister ? '' : this.dataLoad.phone, Validators.required],
      email: [this.isRegister ? '' : this.dataLoad.email, [Validators.required, Validators.email]],
      gender: [this.isRegister ? '' : this.dataLoad.gender, Validators.required],
      frequentFlyer: [this.isRegister ? '' : this.dataLoad.frequentFlyer],
      orole: [this.isRegister ? '' : this.dataLoad.orole.roleID, Validators.required],
      birthDate: [this.isRegister ? '' : new Date(this.dataLoad.birthDate), Validators.required],
      countryOrigin: [this.isRegister ? '' : this.dataLoad.countryOrigin, Validators.required],
      travelerCode: [this.isRegister ? '' : this.dataLoad.travelerCode],
      lcostCenter: [this.isRegister ? [] : this.dataLoad.lcostCenter],
      lpersonProfile: [this.isRegister ? [] : this.dataLoad.lpersonProfile],
    })
    if (!this.isRegister) {
      this.userActive = this.dataLoad.isActive;
      this.access = this.dataLoad.accessGranted;
      this.userVip = this.dataLoad.userVip;
    }

  }



  getDocument() {

    if (!this.isRegister && this.dataUpdate.lpersonDocument?.length > 0) {
      this.writeDocuments();
    }

  }

  writeDocuments() {
    /* docsCreados */
    this.dataUpdate.lpersonDocument.forEach((element: any) => {
      let obj: any = {};
      obj.DocumentID = element.documentID;
      obj.Number = element.documentNumber;
      obj.isActive = true;
      obj.expirationDate = element.expirationDate;
      this.docsCreados.push(obj);
    });
  }



  transformToTreeNode(data: any[]): any[] {
    return data.map(item => ({
      label: item.name,
      id: item.id,
      data: item,
      expandedIcon: item.lsubMenu ? 'pi pi-folder-open' : 'pi pi-file',
      collapsedIcon: item.lsubMenu ? 'pi pi-folder' : 'pi pi-file',
      children: item.lsubMenu ? this.transformToTreeNode(item.lsubMenu) : null
    }));
  }

  getSelectedNodes(nodes: any[], selectedData: any[]): any[] {
    let selectedNodes: any[] = [];

    for (let node of nodes) {
      if (selectedData.find(item => item.menuID === node.data.id)) {
        selectedNodes.push(node);
      }
      if (node.children) {
        selectedNodes.push(...this.getSelectedNodes(node.children, selectedData));
      }
    }

    return selectedNodes;
  }

  getMenu() {
    [...this.lstMenuBlock] = this.lstMenu;
    this.files = this.transformToTreeNode(this.lstMenu);
    if (!this.isRegister && this.dataUpdate.lpersonMenu?.length > 0) {
      this.selectedFiles = this.getSelectedNodes(this.files, this.dataUpdate.lpersonMenu);
    }
  }

  validDocument(valor: any) {
    if (valor.length != undefined) {
      this.docsCreados = valor;
      this.visible = false;
    }

  }

  manageDocument() {

    const obj = {
      user: this.isRegister ? [] : this.dataUpdate?.lpersonDocument,
      document: this.lstDocument,
      lstCreateDoc: this.docsCreados
    }
    this.data = obj;
    this.visible = true;
  }
}