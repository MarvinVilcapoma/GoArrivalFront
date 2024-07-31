import { state } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Calendar } from 'primeng/calendar';
import { aiportData } from 'src/app/services/airport.const';
import { HeaderService } from 'src/app/services/head.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';

declare var $: any;

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.css']
})
export class SearchHotelComponent implements OnInit {

  @ViewChild('myStartCalendarHotel') startCalendar!: Calendar;

  @Output() select = new EventEmitter();
  @Input() style!: boolean;
  @Input() request: any;

  lstPerson = [{ person: 1 }];

  total = 1;
  totalRoom = 1;

  value: number = 1;
  locale_es: any;
  objetoDesencriptado: any = {};
  objetoEncriptado: any;
  model: any = {};
  data: any[] = [];
  keyword = "name";
  destinoValue: string;
  destinoText: string;
  isOpen = false;
  lstAutocomplete: any[] = [];
  flagDinData: boolean;
  fecha1: any;
  minDateIngreso: Date;
  fecha2: any;
  valfechasalida = false;
  fechaSalida: string;
  minDateSalida: Date;
  dateCustomClasses: DatepickerDateCustomClasses[] = [];
  calendarSalidaValue: Date;
  maxDateIngreso: any;
  valfechadestino = false;
  general = "col-lg-12 col-md-12 col-sm-12 col-12 m-0 p-0"
  fechaRetorno: string;
  validAddRoom: boolean = false;
  estrellas: string;
  textoestrellas: string = "Todas";

  rangeDates: Date[] | undefined;
  airportlist: any;
  citylist: any;

  classAutocomplete: string = "";
  classFechas: string = "";

  selectedItem: any = "";
  filteredItems: any[] | any;
  cities: any[] = [];
  agregarClase: boolean = false;
  stars: any[] | undefined;
  bsValue: Date[] | any = [];
  selectedStar: string | undefined = "";

  constructor(private headerService: HeaderService, private cookie: CookieService, private service: HotelService, private router: Router) {
    this.destinoValue = "";
    this.destinoText = "";
    this.estrellas = "";
    this.fechaRetorno = "";
    this.flagDinData = false;
    this.fechaSalida = "";
    let airport = aiportData;
    this.cities = this.prob(airport);
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate() + 1);
    this.calendarSalidaValue = new Date();
    this.minDateIngreso = new Date();
    this.minDateIngreso.setDate(this.minDateIngreso.getDate());
    this.calendarSalidaValue.setDate(this.calendarSalidaValue.getDate() + 1);
  }

  ngOnInit(): void {
    this.stars = [
      { name: '5 estrellas', code: "5" },
      { name: '4 estrellas', code: "4" },
      { name: '3 estrellas', code: "3" },
      { name: '2 estrellas', code: "2" },
      { name: '1 estrella', code: "1" },
    ];
    this.objetoDesencriptado = this.cookie.get('cookieLogin');
    this.objetoDesencriptado = this.headerService.desencriptar(this.objetoDesencriptado);
    if (this.style) {
      this.setDataRQ();
    }
    this.agregarClase = true;
    /* this.objetoDesencriptado = this.headerService.desencriptar(this.objetoEncriptado); */
  }

  setDataRQ() {

    this.selectedItem = this.request.selectIda;
    let ida = new Date(this.request.fechaIda);
    let vuelta = new Date(this.request.fechaVuelta);
    this.bsValue.push(ida, vuelta);
    this.total = this.request.totalPass;
    this.totalRoom = this.request.totalRoom;
    this.selectedStar = this.request.star;
    this.lstPerson = this.request.lstPerson;
  }

  selectDates() {

    if (this.bsValue[1] != null && this.bsValue[1] != undefined && !this.headerService.validPhone()) {
      this.startCalendar.overlayVisible = false;
    }
    this.classFechas = "";
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
    this.classAutocomplete = "";
    this.filteredItems = filtered;
  }

  formatDateService(value: Date | any) {



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
      let date: any = value.getFullYear() + "-" + mes + "-" + dia;
      return date;
    }
  }

  validCampos() {
    let valid: boolean = false;
    if (this.selectedItem === "" || this.selectedItem === null) {
      this.classAutocomplete = "ng-invalid ng-dirty"
      valid = true;
    }
    if (this.bsValue.length === 0 || this.bsValue[1] === undefined || this.bsValue[1] === null) {
      this.classFechas = "ng-invalid ng-dirty"
      valid = true;
    }
    return valid;
  }


  validSearch() {
    !this.validCampos() ? this.searchHotel() : null;
  }



  searchHotel() {
    this.headerService.mostrarSpinner();
    let obj = {
      Lhotel: [{
        EndDate: this.formatDateService(this.bsValue[1]),
        HotelCityCode: this.selectedItem.iataCode,
        LguestPerRoom: [{
          NumberPassengers: this.total,
          RoomQuantity: this.totalRoom,
          TypePassenger: "ADT"
        }],
        Stars: this.selectedStar,
        StartDate: this.formatDateService(this.bsValue[0])
      }],
      Lusers: [{
        LcostCenter: this.objetoDesencriptado.lcostCenter,
        RoleId: this.objetoDesencriptado.orole.id,
        UserId: this.objetoDesencriptado.userID
      }],
      Oenterprise: this.headerService.getCompany(),
      TypeSearch: "C"
    }
    const request = {
      selectIda: this.selectedItem,
      fechaIda: this.bsValue[0],
      fechaVuelta: this.bsValue[1],
      totalRoom: this.totalRoom,
      totalPass: this.total,
      star: this.selectedStar,
      lstPerson: this.lstPerson
    }
    this.service.SearchHotel(obj).subscribe(
      x => {
        x?.length >= 1 ? this.setData(x, request) : this.select.emit();

      },
      error => {
        error.status === 404 ? this.headerService.setErrorToastr("Servicio no encontrado") : this.headerService.error500();
      }
    )
  }

  setData(x: any, request: any) {
    x[0].oerror === null ? this.succesShow(x, request) : this.select.emit();
  }

  succesShow(x: any, request: any) {
    const data = { lstPerson: this.lstPerson, lstHotel: x, request: request };
    !this.style ? this.router.navigate(["hotel/hotel-list"], { state: { data: data } }) : this.select.emit(data);
  }

  delPassenger(valor_: any) {
    if (this.lstPerson[valor_].person > 1) {
      this.lstPerson[valor_].person = this.lstPerson[valor_].person - 1;
      this.total = this.total - 1;
    }

  }

  addPassenger(valor_: any) {
    if (this.lstPerson[valor_].person < 6) {
      this.lstPerson[valor_].person = this.lstPerson[valor_].person + 1;
      this.total = this.total + 1;
    }

  }

  deleteRoom() {
    this.lstPerson.shift();
    this.totalRoom = this.totalRoom - 1;
    this.total = this.total - 1;
    if (this.lstPerson.length < 4) {
      this.validAddRoom = false;
    }
  }

  addRoom() {

    let obj: any = {};
    obj.person = 1;
    this.lstPerson.push(obj);
    this.totalRoom = this.totalRoom + 1;
    this.total = this.total + 1;
    if (this.lstPerson.length === 4) {
      this.validAddRoom = true;
    }
  }


  onFocused(e: any) {
    this.flagDinData = false;
  }

  onValueChangeIngreso(value: any): void {
    if (value[0] != null) {
      this.fecha1 = value[0];
      this.fecha2 = value[1];
      this.valfechasalida = false;
      let mes = "";
      if ((value[0].getMonth() + 1) < 10) {
        mes = "0" + (value[0].getMonth() + 1);
      } else {
        mes = "" + (value[0].getMonth() + 1);
      }

      let dia = "";
      if (value[0].getDate() < 10) {
        dia = "0" + value[0].getDate();
      } else {
        dia = "" + value[0].getDate();
      }

      $("#ingreso").removeClass("campo-invalido");
      this.fechaSalida = value[0].getFullYear() + "-" + mes + "-" + dia;

      this.minDateSalida = value[0];
      this.dateCustomClasses = [
        { date: this.minDateSalida, classes: ['bg-danger', 'text-warning'] }
      ];

      if (value[0] >= this.calendarSalidaValue) {
        $("#datesalida").val("");
      }

      this.formatDateService(value[1]);
    }
  }

  SeleccionarEstrella(codeestrella: string, texto: string) {
    this.estrellas = codeestrella;
    this.textoestrellas = texto;
  }

  validarNumeros(e: any) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    var patron = /^([0-9])*$/;
    var teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  }

  validarNumerosN(e: any) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    var patron = /^([])*$/;
    var teclaFinal = String.fromCharCode(tecla);
    if (tecla == 505) return false;
    return patron.test(teclaFinal);
  }




  selectEvent(item: any) {
    this.isOpen = false;
    this.destinoValue = item.iataCode;
    this.destinoText = item.name;
    $("#txtOrigen").removeClass("campo-invalido");
    setTimeout(function () {
      $(".x").hide();
    }, 1000);
  }

}
