import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { FlightService } from 'src/app/services/flight/flight.service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-agency-management',
  templateUrl: './agency-management.component.html',
  styleUrls: ['./agency-management.component.css']
})
export class AgencyManagementComponent implements OnInit {
  lstCountries: any[] = [];
  filteredOptions!: Observable<any>;
  isSidenavExpanded = true;
  pais = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  ruc = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  isActive = new FormControl('', [Validators.required]);
  blockNav = true;
  data: any;
 /*  isActive: boolean = false; */
  loading!: boolean;

  constructor(private service: FlowReportsService, public head: HeaderService, private serviceF: FlightService) {
    this.head.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getCountri();
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


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Correo no valido' : '';
  }

  getAgencyDetail() {
    let valor = this.head.getCompany()
    this.service.getAgencyDetail(valor.id).subscribe(
      x => {
        if (x.status === 200) {
          this.data = x.odata;
          this.llenarDatos();
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

 /*  changeChip(){
    this.isActive = !this.isActive;
  } */

  llenarDatos() {
    this.email.setValue(this.data.email);
    this.name.setValue(this.data.name);
    this.phone.setValue(this.data.phone);
    this.ruc.setValue(this.data.ruc);
    this.pais.setValue(this.data.countryOrigin);
    this.address.setValue(this.data.address);
    this.isActive.setValue(this.data.isActive);
    this.head.ocultarSpinner();
  }

  updateComp() {}

  getCountri() {
    this.serviceF.getCountries().subscribe(
      x => {
        this.lstCountries = x;
        this.getAgencyDetail();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }



  updateAgency(){
    this.head.mostrarSpinner();

    let valor = this.head.getCompany();
    let qwe = {
      ID: valor.id,
      Name: this.name.value,
      Ruc: this.ruc.value,
      CountryOrigin: this.pais.value,
      Address: this.address.value,
      OcontactInfo: {
        Phone: this.phone.value,
        Email: this.email.value
      },
      IsActive: this.isActive.value,
    }
    this.service.updateAgency(qwe).subscribe(
      x=> {
          if(x.status === 200){
            this.data = x.odata;
            this.llenarDatos();
            this.head.setSuccessToastr(x.message);
          }
          this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
