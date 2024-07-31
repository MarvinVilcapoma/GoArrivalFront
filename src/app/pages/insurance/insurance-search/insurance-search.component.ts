import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { HeaderService } from 'src/app/services/head.service';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';

@Component({
  selector: 'app-insurance-search',
  templateUrl: './insurance-search.component.html',
  styleUrls: ['./insurance-search.component.css']
})
export class InsuranceSearchComponent implements OnInit, OnDestroy {
  cities: any[] | undefined;
  @ViewChild('myStartCalendarInsurance') startCalendar!: Calendar;
  selectedCity: any | undefined = "";
  value: string = "Perú";
  passenger: string = ""
  valuePassenger: number = 1;
  lstPassengers : any[] = [{Name: "",LastName: "",Type: "",BirthDate:null,Edad:null}];
  minDateSalida: Date;
  bsValue: Date[] | any;
  classDropDown: string = "";
  /**
   *
   */
  constructor(private service: InsuranceService,private router: Router,private headerService: HeaderService) {
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate());
    
  }

  ngOnInit() {
    this.cities = [
      { name: 'Nacional', code: 'N' },
      { name: 'Internacional', code: 'I' },

    ];
  }

  ngOnDestroy(): void {
    this.headerService.clearToast();
  }

  selectDates() {
   
    if (this.bsValue[1] != null && this.bsValue[1] != undefined && !this.headerService.validPhone()) {
      this.startCalendar.overlayVisible = false;
    }
  }

  onValueChangeSalida(value: Date | any) {



    if (value != null) {
      let mes = "";
      let getMonth = value.getMonth() + 1;
      if (getMonth < 10) {
        getMonth = value.getMonth() + 1;
        mes = "0" + getMonth;
      } else {
        mes = "" + getMonth;
      }

      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }

      return value;
    }
  }

  onValueChangeRetorno(value: Date | any) {
    if (value != null) {

     
      let mes = "";
      let getMonth = value.getMonth() + 1;
      if (getMonth < 10) {
        getMonth = value.getMonth() + 1;
        mes = "0" + getMonth;
      } else {
        mes = "" + getMonth;
      }

      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }

      return value;
    }
  }

  delPassenger(){
    if (this.lstPassengers.length > 1) this.lstPassengers.shift();
  }

  addPassenger(){
    let item : any = { edad: ""}
    if (this.lstPassengers.length < 5) this.lstPassengers.push(item);
  }

  setPassengers(){
    let newLst : any[] = [];
    let item: any = {Name: "",LastName: "",Type: "",BirthDate:null,Edad:null};
    this.lstPassengers.forEach(element => {
      item.Edad = element.edad;
      newLst.push({...item});
    });
    return newLst;
  }

  setSuccess(insuranceData: any){
    this.router.navigate(["insurance/insurance-list"], { state: { data: insuranceData } });
  }

  setError(message: string){
    this.headerService.setErrorToastr(message)
    this.headerService.ocultarSpinner();
  } 

  validateFields(){
    let valid : boolean = true;
    if(this.selectedCity === ""){
      this.headerService.setBorder("destination-insurance");
      valid = false;
    }
    return valid;
  }

 

  getInsurance(){
    if(!this.validateFields()){
      return;
    }
    
    this.headerService.mostrarSpinner();
    const datos = {
      InitialDate: this.onValueChangeSalida(this.bsValue[0]),
      FinalDate: this.onValueChangeRetorno(this.bsValue[1]),
      Lpassenger: this.setPassengers(),
      SearchType: "C",
      Sucursal: "7",
      flightNational: this.selectedCity === 'N' ? true : false,
      lsections: null
    }
    this.service.getListInsurance(datos).subscribe(
      result => {
        const obj = { request: datos, response:result.lquoteInsurance };
        result.status === 200 ? this.setSuccess(obj) : this.setError(result.message);
      },
      error => {
        error.status === 404 ? this.headerService.setErrorToastr("Servicio no encontrado") : this.headerService.error500(); 
      }
    )
  }
}
