import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { UpdatePersonRQ } from 'src/models/flows-reports/administrator';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form = this.fb.group({
    name: [""],
    lastName: [""],
    phone: [""],
    email: [""],
    birthDate: [],
    genero: [""]
  });
  adultMinDate: Date;
  adultMaxDate: Date;
  textError: string = ""
  dataUpdate: any;
  classError: string = "";
  validErrorPassword: boolean = false;
  isExpanded = true;
  isShowing = false;
  isSidenavExpanded = true;
  switch_expression ="";
  blockNav = true;
  cookieValue: any;
  lstServices: any;
  visible : boolean = false;
  password: string = "";
  confirmPassword: string = "";
  lstMenu: any;
  genders: any[] = [];
  constructor(private fb: FormBuilder,private service: FlowReportsService,public head: HeaderService,private router: Router,private cookie: CookieService) {
    const currentYear = new Date().getFullYear();
    this.adultMinDate = new Date(1915, 0, 1);
    this.adultMaxDate = new Date(currentYear - 12, 11, 31);
    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.genders = [
      { name: 'Masculino', id: 'M' },
      { name: 'Femenino', id: 'F' },
    ];
    this.getDetail();
  }

  onInputChange1(){
    this.classError = "";
    this.validErrorPassword= false;
  }

  mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  updatePassword(){
    let valor = this.head.getDataLogin();
    if(this.password === "" || this.confirmPassword === ""){
      this.textError = "Por favor rellenar los campos."
      this.classError = "ng-invalid ng-dirty";
      this.validErrorPassword = true;
      return;
    }
    if(this.password != this.confirmPassword){
      this.textError = "Las contraseñas deben ser iguales."
      this.classError = "ng-invalid ng-dirty";
      this.validErrorPassword = true;
      return;
    }
    this.head.mostrarSpinner();
    const data: any = {
      UserID: valor.userID,
      Password: crypto.SHA256(this.password).toString(),
      AppID: 1
    }

    this.service.updatePassword(data).subscribe(
      result => {
        result.status === 200 ? this.successChange(result.message) : this.head.setErrorToastr(result.message);
      }
    )
  }

  successChange(message: string){
    let token: any = localStorage.getItem('authToken');
    const data = this.head.desencriptar(token);
    data.password = this.password;
    const datosLogin: any = this.head.encriptar(data);
    localStorage.setItem('authToken', datosLogin);
    this.head.setSuccessToastr(message);
    this.head.ocultarSpinner();
  }

  bloquear() {
    if (this.blockNav) {
      this.blockNav = false;
    } else {
      this.blockNav = true;
    }

  }

  profileRout() {
    this.head.mostrarSpinner();
    this.switch_expression = "Profile";
  }

  flight() {
    this.head.mostrarSpinner();
    this.router.navigate(["flights"]);
  }

  fillDocuments(lst : any[]) {
    let lstDocument: any[] = [];
    lst.forEach(element => {
      let obj: any = {};
      obj.Number = element.documentNumber;
      obj.DocumentID = element.documentID;
      obj.isActive = true;
      lstDocument.push(obj);
    });
    return lstDocument;
  }

  closed() {
    this.head.clearAllCookies();
    this.cookie.deleteAll();
    this.cookie.delete("cookieLogin");
    this.cookie.delete("dk_company");
    this.cookie.delete("cookieLogin", "/flights");
    this.cookie.delete("dk_company", "/flights");
    this.router.navigate([""]);
  }

  routeMenu(valor: any) {
    this.switch_expression = valor.name;
    if (this.switch_expression === 'Gestión de Empresas') {
      this.head.mostrarSpinner();
      let valor = "init";
      this.router.navigate(["/flows/administrator", valor]);
    } else {
      this.router.navigate(["flows/approval-flows"]);
    }
  }

  fillProfile(lst: any[]){
    let lstProfile: any[] = [];
    lst.forEach(element => {
      let obj: any = {};
      obj.ProfileID = element.id;
      obj.isActive = true;
      lstProfile.push(obj);
    });
    return lstProfile;
  }

  fillCost(lst: any[]){
    let lstCost: any[] = [];
    lst.forEach(element => {
      let obj: any = {};
      obj.CostCenterID = element.id;
      obj.isActive = true;
      lstCost.push(obj);
    });
    return lstCost;
  }


  updateUser() {
    if(this.form.status === "INVALID"){
      return;
    } 
    let data: UpdatePersonRQ = {
      ID : this.dataUpdate.personID,
      UserID: this.dataUpdate.userID,
      Name: this.form.controls.name.value,
      LastName: this.form.controls.lastName.value,
      CorporatePhone: this.form.controls.phone.value || "",
      PersonalPhone: null,
      CorporateEmail: this.form.controls.email.value,
      PersonalEmail: null,
      BirthDate: this.form.controls.birthDate.value,
      Gender: this.form.controls.genero.value,
      IsVacational: false
    };
    this.head.mostrarSpinner();

    this.service.updatePerson(data).subscribe(
      x => {
        if (x.status === 200) {
          this.head.setSuccessToastr(x.message)
          this.setData(x.odata);
        } else {
          this.head.setErrorToastr(x.message)
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  setData(data: any){
    let birthDate: any = new Date(data.birthDate);
    this.form.controls.name.setValue(data.name);
    this.form.controls.lastName.setValue(data.lastName);
    this.form.controls.phone.setValue(data.phone);
    this.form.controls.email.setValue(data.email);
    this.form.controls.birthDate.setValue(birthDate);
    this.form.controls.genero.setValue(data.gender);
    this.head.ocultarSpinner();
  }

  getDetail() {
    let valor = this.head.getDataLogin();
    this.service.getPersonDetail(valor.userID).subscribe(
      x => {
        if(x.status === 200){
          this.dataUpdate = x.odata;
          this.setData(x.odata);
        } else {
          this.head.setErrorToastr(x.message);
          this.head.ocultarSpinner();
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
