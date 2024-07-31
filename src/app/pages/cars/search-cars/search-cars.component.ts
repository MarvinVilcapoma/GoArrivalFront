import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Calendar } from 'primeng/calendar';
import { aiportData } from 'src/app/services/airport.const';
import { CarsService } from 'src/app/services/cars/cars.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-search-cars',
  templateUrl: './search-cars.component.html',
  styleUrls: ['./search-cars.component.css']
})
export class SearchCarsComponent implements OnInit {
  @Input() style!: boolean;
  @Output() select = new EventEmitter();
  @ViewChild('myStartCalendar') startCalendar!: Calendar;
  @ViewChild('myStartCalendarReturn') startCalendarReturn!: Calendar;
  selectedItem: any = "";
  selectedItemDevo: any = "";
  selectedHour: any = "12:00";
  selectedHourDevo: any = "12:00";
  filteredItems: any[] | any;
  cities: any[] = [];
  bsValue: Date | any;
  classAutocomplete: string = "";
  classAutocompleteDevo: string = "";
  classFechaIda: string = "";
  classFechaVuelta: string = "";
  selectChk: any = false;
  bsValueDevo: Date | any;
  minDateSalida: Date;
  validChk: boolean = false;

  lstHours: string[] = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

  /**
   *
   */
  constructor(private head: HeaderService, private service: CarsService,private router: Router) {
    let airport = aiportData;
    this.cities = this.prob(airport);
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate());
  }

  ngOnInit(): void {
    if (this.style) this.setData();
  }

  setData(){
    let request: any = sessionStorage.getItem("ss_requestCars");
    request = JSON.parse(request);
    this.selectedItem = request.selectIda;
    this.bsValue = new Date(request.fechaIda);
    this.bsValueDevo = new Date(request.fechaVuelta);
    this.selectedHour = request.horaIda;
    this.selectedHourDevo = request.horaVuelta;
    this.selectedItemDevo = request.chkDevolver ? request.selectVuelta : null;
    this.validChk = request.chkDevolver;
  }

  selectDate(valor: number){
    valor === 1 ? this.classFechaIda = "" : this.startCalendar.overlayVisible = false;
  }

  selectDateReturn(valor: number){
    valor === 1 ? this.classFechaVuelta = "" : this.startCalendarReturn.overlayVisible = false;

  }

  routeList(result: any, request: any){
    sessionStorage.setItem("ss_carsSearch", JSON.stringify(result));
    sessionStorage.setItem("ss_requestCars", JSON.stringify(request));
    this.style ? this.select.emit() :  this.router.navigate(["cars/cars-list"]);
  }

  validCampos() {
    let valid: boolean = false;
    if (this.selectedItem === "" || this.selectedItem === null) {
      this.classAutocomplete = "ng-invalid ng-dirty"
      valid = true;
    }
    if ( this.bsValue === undefined || this.bsValue === null) {
      this.classFechaIda = "ng-invalid ng-dirty"
      valid = true;
    }
    if ( this.bsValueDevo === undefined || this.bsValueDevo === null) {
      this.classFechaVuelta = "ng-invalid ng-dirty"
      valid = true;
    }

    if(this.validChk){
      if (this.selectedItemDevo === "" || this.selectedItemDevo === null) {
        this.classAutocompleteDevo = "ng-invalid ng-dirty"
        valid = true;
      }
    }

    return valid;
  }

  validSearch() {
    !this.validCampos() ? this.getCars() : null;
  }



  getCars() {
    this.head.mostrarSpinner();
    let datos = this.head.getDataLogin();
    const data = {
      CountryIataCode: this.selectedItem.countryCode,
      DropOffDate: this.onValueChangeRetorno(this.bsValueDevo),
      DropOffIataCode: this.validChk ? this.selectedItemDevo?.iataCode : "",
      Language: "es",
      Ocompany: {
        companyDK: datos.oenterprise.codeDK,
        companyId: datos.oenterprise.id
      },
      PaymentType: "",
      PickUpDate: this.onValueChangeSalida(this.bsValue),
      PickUpIataCode: this.selectedItem.iataCode,
      PromotionalCode: "",
      SearchType: "C"
    };
    const sendData = {
      selectIda: this.selectedItem,
      selectVuelta: this.selectedItemDevo,
      fechaIda: this.bsValue,
      horaIda: this.selectedHour,
      fechaVuelta: this.bsValueDevo,
      horaVuelta: this.selectedHourDevo,
      chkDevolver: this.validChk,
      countryIataCode: this.selectedItem.countryCode,
    }
    this.service.getCars(data).subscribe(
      result => {
        result.status === 200 ? this.routeList(result,sendData) : this.head.setErrorToastr(result.message);
      }
    )
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
      let date: any = value.getFullYear() + "-" + mes + "-" + dia + "T" + this.selectedHour;
      return date;
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
      let date: any = value.getFullYear() + "-" + mes + "-" + dia + "T" + this.selectedHourDevo;
      return date;
    }
  }

  prob(group: any) {
    let lstAutocomplete: any[] = [];
    group.lairports.forEach(function (aeropuerto: any) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        countryCode: aeropuerto.countryCode,
        name: aeropuerto.name,
        label: aeropuerto.label,
        priority: aeropuerto.priority,
        categoryId: 1,
        categoryName: "A",
      };
      lstAutocomplete.push(obj1);
    });
    group.lcities.forEach(function (ciudad: any) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        countryCode: ciudad.countryCode,
        label: ciudad.label,
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: "C",
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    return lstAutocomplete;
  }

  filterItems(event: AutoCompleteCompleteEvent) {

    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.cities as any[]).length; i++) {
      let item = (this.cities as any[])[i];
      if (item.label.toLowerCase().search(query.toLowerCase()) >= 0) {
        filtered.push(item);
      }
    }
    this.filteredItems = filtered;
  }

  probarEvento(event: any) {
    this.classAutocomplete = "";
  }

  selectDevo(){
    this.classAutocompleteDevo = "";
  }

}
