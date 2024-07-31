
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { Observable, map, startWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email],);
  nombre = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required]);
  ruc = new FormControl('', [Validators.required]);
  dk = new FormControl('', [Validators.required]);
  direccion = new FormControl('', [Validators.required]);
  tipoCompany = new FormControl('', [Validators.required]);
  pais = new FormControl('', [Validators.required]);
  tipoAprovver = new FormControl('', [Validators.required]);


  lstCompany: any;
  lstApprovar: any;
  isDisabled: boolean = true;
  showFiller = true;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  inputType = 'password';
  visible = false;
  blockNav = true;
  lstServices: any;
  lstMenu: any;
  data: any;
  cookieValue: any;
  switch_expression = "Gestión de Empresas";
  filteredOptions!: Observable<any>;
  lstCountries: any;
  isSidenavExpanded = true;
  states: any[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  loading!: boolean;
  constructor(public head: HeaderService, private cd: ChangeDetectorRef, private router: Router, private cookie: CookieService, private service: FlowReportsService, private serviceF: FlightService, private _route: ActivatedRoute) {
    this.head.ocultarEncabezado();
    this.getTypeApproval();
    this.getTypeCompany();
    this.getCountri();

  }

  ngOnInit(): void {
    this.loading = true;
    this.head.ocultarContador();
  }


  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  updateComp() {
    this.head.mostrarSpinner();
    let data = {
      IsRegister: false,
      ID: this.data.id,
      Name: this.nombre.value,
      Ruc: this.ruc.value,
      DK: this.dk.value,
      CountryOrigin: this.pais.value,
      Address: this.direccion.value,
      TypeCompanyID: this.tipoCompany.value,
      ApprovalTypeID: this.tipoAprovver.value,
      IsActive: true,
      OcontactInfo: { Phone: this.telefono.value, Email: this.email.value },
      Oagency: { AgencyID: this.data.agencyID, GroupID: this.data.groupID }
    }
    this.service.updateCompany(data).subscribe(
      x => {
        if (x.status === 200) {
          this.data = x.odata;
          this.head.setSuccessToastr(x.message)
          this.llenarDatos();
        } else {
          this.head.setErrorToastr(x.message);
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getCountri() {
    this.serviceF.getCountries().subscribe(
      x => {
        this.lstCountries = x;
        this.getCompanyDetail();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  llenarDatos() {
    this.email.setValue(this.data.email);
    this.dk.setValue(this.data.codeDK);
    this.direccion.setValue(this.data.address);
    this.tipoAprovver.setValue(this.data.approvalTypeID);
    this.pais.setValue(this.data.countryOrigin);
    this.nombre.setValue(this.data.name);
    this.telefono.setValue(this.data.phone);
    this.ruc.setValue(this.data.ruc);
    this.tipoCompany.setValue(this.data.typeCompanyID);
    this.tipoCompany.disable();
    this.dk.disable();
    this.head.ocultarSpinner();
  }

  getCompanyDetail() {
    let valor = this.head.getCompany();
    this.service.getCompanyDetail(valor.id).subscribe(
      x => {
        if (x.status === 200) {
          this.data = x.odata;
          this.loading = false;
          this.llenarDatos();
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getTypeCompany() {
    this.service.getTypeCompany().subscribe(
      x => {
        if (x.status === 200) {
          this.lstCompany = x.ldata;
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getTypeApproval() {
    this.service.getApprovalType().subscribe(
      x => {
        if (x.status === 200) {
          this.lstApprovar = x.ldata;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Correo no valido' : '';
  }

 



}
