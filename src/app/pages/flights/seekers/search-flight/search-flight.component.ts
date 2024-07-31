import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

import { FlightService } from 'src/app/services/flight/flight.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';
import { Calendar } from 'primeng/calendar';
import { ScrollerOptions, SelectItemGroup } from 'primeng/api';
import { aiportData } from 'src/app/services/airport.const';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MultiDestinationComponent } from '../multi-destination/multi-destination.component';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  @ViewChild(MultiDestinationComponent) multiDestinationComponent!: MultiDestinationComponent;

  @ViewChild('myStartCalendar') startCalendar!: Calendar;
  @Input() passCentra: any;
  @Input() dataRQ: any;
  @Input() style!: boolean;
  @Output() select = new EventEmitter();
  @Output() noShow = new EventEmitter<any>();
  lstCabin: any[] | undefined;
  lstScale: any[] | undefined;
  public datae: any[];
  general = "col-lg-12 col-md-12 col-sm-12 col-12 m-0 p-0";
  lstMultidestino: any[] = [{
    selectedItem: "",
    agregarClase: false,
    agregarClaseRet: false,
    agregarClaseFecha: false,
    selectedItemRetorno: "",
    bsValue: null,
    defaultDate: new Date(),
    disabled: false,
    minDate: new Date()
  },
  {
    selectedItem: "",
    agregarClase: false,
    agregarClaseRet: false,
    agregarClaseFecha: false,
    disabled: true,
    defaultDate: new Date(),
    selectedItemRetorno: "",
    bsValue: null,
    minDate: new Date(),
  }
  ]


  indexTramo: number = 2;
  lstAutocomplete: any[] = [];
  airportlist: any;
  citylist: any;
  model: any = {};
  keyword = "name";
  validMessage = false;
  data: any[] = [];
  msgError: any;
  isOpen = false;

  data2: any[] = [];
  valdestino = false;
  bsValue: Date[] | any;
  modeCalendar: any;
  public es: any;
  isOpendate = false;
  valfechasalida = false;
  valfechadestino = false;
  cities: any[] = [];
  minDateSalida: Date;
  minDateRetorno: Date;
  dateCustomClasses: DatepickerDateCustomClasses[];
  calendarSalidaValue: any;
  valueShow: any = "";
  textoCabina!: string;
  cabina!: string;
  textoEscala!: string;
  escala!: string;
  showCalendar: boolean = false;
  pasajeros: number;
  show: any;
  maleta: boolean = true;
  bodega: boolean = true;
  objetoDesencriptado: any;
  validarPasajeros = false;
  passengerList!: any;
  validMaleta: any;
  validMutli = false;
  id: any;
  datosEnvira = {
    origenAuto: "",
    escala: this.escala,
    textoEscala: this.textoEscala,
    cabina: this.cabina,
    textoCabina: this.textoCabina,
    origentTexto: "",
    destinoAuto: "",
    destinoTexto: "",
    fechaSalida: "",
    fechaRetorno: "",
    fechaSalidaShow: "",
    fechaRetornoShow: "",
    pasajer: 0,
    maleta: this.maleta,
    bodega: this.bodega,
    tipoVuelo: ""
  }

  selectedItem: any = "";
  selectedItemDevo: any = "";


  filteredItems: any[] | any;

  options: ScrollerOptions = {
    delay: 100,
    showLoader: false,
    lazy: true,
    onLazyLoad: this.onLazyLoad.bind(this)
  };

  loading: boolean = false;
  lServices: any;
  loadLazyTimeout: any = null;

  lstAirpot: any
  groupedCities: SelectItemGroup[] | undefined;
  selectedCabin: string = "T";
  selectedScale: string = "T";
  filteredGroups: any[] | undefined;
  tipoVuelo: string = 'RT';
  agregarClase: boolean = false;
  agregarClaseRet: boolean = false;
  agregarClaseFecha: boolean = false;
  lstHours: any[] = [
    {
      code: ''
    },
    {
      code: '00:00'
    },
    {
      code: '01:00'
    },
    {
      code: '02:00'
    },
    {
      code: '03:00'
    },
    {
      code: '04:00'
    },
    {
      code: '05:00'
    },
    {
      code: '06:00'
    },
    {
      code: '07:00'
    },
    {
      code: '08:00'
    },
    {
      code: '09:00'
    },
    {
      code: '10:00'
    },
    {
      code: '11:00'
    },
    {
      code: '12:00'
    },
    {
      code: '13:00'
    },
    {
      code: '14:00'
    },
    {
      code: '15:00'
    },
    {
      code: '16:00'
    },
    {
      code: '17:00'
    },
    {
      code: '18:00'
    },
    {
      code: '19:00'
    },
    {
      code: '20:00'
    },
    {
      code: '21:00'
    },
    {
      code: '22:00'
    },
    {
      code: '23:00'
    },


  ];



  lstTramosFilter: any[] = [{
    desde: "",
    hasta: "",
    text: "Ida",
  },
  {
    desde: "",
    hasta: "",
    text: "Vuelta",
  }];

  constructor(private service: FlightService, private router: Router,
    private cookie: CookieService, public headerService: HeaderService,
    private cookieServices: CookieService) {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: "Hoy",
      clear: "Borrar"
    }
    this.datae = [];


    this.pasajeros = 1;

    this.cabina = "";

    this.textoCabina = "Todas";
    this.textoEscala = "Todas";
    this.escala = "";
    this.validMaleta = this.headerService.isConsolidator();
    let airport = aiportData;
    this.cities = this.prob(airport);
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate());
    this.minDateRetorno = new Date();
    this.minDateRetorno.setDate(this.minDateRetorno.getDate() + 1);
    const now = new Date();
    /* this.bsValue = new Date(); */
    this.dateCustomClasses = [
      { date: now, classes: ["bg-danger", "text-warning"] },
    ];
  }

  ngOnInit(): void {
    this.lstCabin = [
      { name: 'Todas', code: 'T' },
      { name: 'Económica', code: 'E' },
      { name: 'Business', code: 'B' },
      { name: 'First', code: 'F' }
    ];
    this.lstScale = [
      { name: 'Todas', code: 'T' },
      { name: 'Directo', code: 'D' },
      { name: 'Con escalas', code: 'E' }
    ];
    this.lServices = this.cookieServices.get("lstServices");
    this.lServices = this.headerService.desencriptar(this.lServices);
    this.pasajeros = this.passCentra;

    this.objetoDesencriptado = this.cookie.get('cookieLogin');
    this.objetoDesencriptado = this.headerService.desencriptar(this.objetoDesencriptado);
    /*  this.onValueChangeSalida(this.bsValue); */
    this.setData();
    /*  this.cookie.delete("rtsdt3298dwlou3208"); */
  }

  addTramoFilter(texto: string) {
    this.lstTramosFilter.push({
      desde: "",
      hasta: "",
      text: texto,
    });
  }

  setData() {
    if (this.dataRQ != null) {

      switch (this.dataRQ.dataRQ.tipoVuelo) {
        case 'MC':
          this.lstTramosFilter = [];
          this.lstMultidestino = this.dataRQ.lstMulti;
          this.lstMultidestino.forEach(element => {
            this.addTramoFilter('');
          });
          break;
        case 'OW':
          this.lstTramosFilter = [];
          this.addTramoFilter('Ida');
          break;


      }

      if (this.dataRQ.dataRQ.tipoVuelo === "MC") {
        this.lstMultidestino = this.dataRQ.lstMulti;
      }
      this.selectedItem = this.dataRQ.dataRQ.selectIda;
      this.selectedItemDevo = this.dataRQ.dataRQ.selectVuelta;
      this.bsValue = this.dataRQ.dataRQ.fechas;
      this.tipoVuelo = this.dataRQ.dataRQ.tipoVuelo;
      this.selectedCabin = this.dataRQ.dataRQ.cabina;
      this.selectedScale = this.dataRQ.dataRQ.scale;
      this.passengerList = this.dataRQ.dataRQ.passenger;
      this.maleta = this.dataRQ.dataRQ.chkCabina;
      this.bodega = this.dataRQ.dataRQ.chkBodega;
      this.pasajeros = this.dataRQ.pasajeros;
      const tipoVueloMap: any = {
        'OW': 1,
        'RT': 2,
        'MC': this.lstMultidestino?.length
      };
      this.indexTramo = tipoVueloMap[this.tipoVuelo];

      /*     if (this.tipoVuelo === "RT") {
            this.addTramoFilter();
          } else if (this.tipoVuelo === "MC") {
            this.lstTramosFilter = [];
            this.lstMultidestino.forEach(element => {
              this.addTramoFilter();
            });
          } */
    }
  }

  onLazyLoad(event: any) {
    this.loading = true;

    if (this.loadLazyTimeout) {
      clearTimeout(this.loadLazyTimeout);
    }

    //imitate delay of a backend call
    this.loadLazyTimeout = setTimeout(() => {
      const { first, last } = event;
      const items = [...this.cities];

      for (let i = first; i < last; i++) {
        items[i] = { label: `Item #${i}`, value: i };
      }

      this.cities = items;
      this.loading = false;
    }, Math.random() * 1000 + 250);
  }

  prob(group: any) {
    let lstAutocomplete: any[] = [];
    group.lairports.forEach(function (aeropuerto: any) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
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

  }

  validPass() {
    if (this.headerService.isConsolidator()) {
      if (this.validarPasajeros) {
        this.validarPasajeros = false;
      } else {
        this.validarPasajeros = true;
      }
    }
  }


  setValueShow() {
    switch (this.tipoVuelo) {
      case "RT":
        this.onValueChangeSalida(this.bsValue[0]);
        this.onValueChangeRetorno(this.bsValue[1]);
        /*   this.valueShow = this.datosEnvira.fechaSalidaShow + "-" + this.datosEnvira.fechaRetornoShow */
        break;

      case "OW":
        this.onValueChangeSalida(this.bsValue);
        break;
    }
  }


  setBorder(id: any) {
    this.id = document.getElementById(id);
    this.id.style.setProperty("border", "2px solid #ED1C24", "important");
    this.id.style.setProperty("borderRadius", "7px", "important");
  }

  setBorderGood(id: any) {
    this.id = document.getElementById(id);
    this.id.style.setProperty("border", "none", "important");
  }

  setBorderGoodDate(id: any) {
    this.id = document.getElementById(id);
    this.id.style.setProperty("border", "2px solid #DFD9D8", "important");
  }

  selectPhone() {
    return;
  }

  validCampos() {
    let valor = true;
    switch (this.tipoVuelo) {
      case 'MC':
        for (let index = 0; index < this.multiDestinationComponent.lstMultidestino.length; index++) {
          const element = this.multiDestinationComponent.lstMultidestino[index];
          if (element.selectedItem === null || element.selectedItem === '') {
            element.agregarClase = true;
            /*     this.setBorder("searchOriginInit_" + index); */
            valor = false;
          }
          if (element.selectedItemRetorno === null || element.selectedItemRetorno === '') {
            element.agregarClaseRet = true;
            /*    this.setBorder("searchDestinoInit_" + index); */
            valor = false;
          }
          if (element.bsValue === '' || element.bsValue === null) {
            element.agregarClaseFecha = true;
            /*    this.setBorder("txtFechaSalida_" + index); */
            valor = false;
          }
        }
        break;
      case 'RT':
        if (this.selectedItem === "") {
          this.agregarClase = true;
          /* this.setBorder("searchOriginInit"); */
          valor = false;
        }
        if (this.selectedItemDevo === "") {
          this.agregarClaseRet = true;
          /*  this.setBorder("searchDestinoInit"); */
          valor = false;
        }
        if (this.bsValue === undefined || this.bsValue[0] === null || this.bsValue[1] === null || this.bsValue === null) {
          this.agregarClaseFecha = true;
          /*      this.setBorder("txtFechaDestino"); */
          valor = false;
        }
        break;
      case 'OW':
        if (this.selectedItem === "") {
          this.agregarClase = true;
          /* this.setBorder("searchOriginInit"); */
          valor = false;
        }
        if (this.selectedItemDevo === "") {
          this.agregarClaseRet = true;
          /*  this.setBorder("searchDestinoInit"); */
          valor = false;
        }
        if (this.bsValue === undefined || this.bsValue === null) {
          this.agregarClaseFecha = true;
          /* this.setBorder("txtFechaDestino"); */
          valor = false;
        }
        break;


    }

    return valor;
  }

  getAutocompleteStyles(): any {

  }

  llenarOirgenMulti(lst: any, number: any) {
    this.multiDestinationComponent.lstMultidestino.forEach(element => {
      if (number === 1) {
        lst.push(element.selectedItem.iataCode);
      } else if (number === 2) {
        lst.push(element.selectedItemRetorno.iataCode);
      } else {
        lst.push(element.bsValue);
      }
    });
    return lst;
  }


  validConsolidator() {
    let lstPassenger: any[] = []
    this.passengerList.forEach((element: any) => {
      for (let index = 0; index < element.Quantity; index++) {
        var pasajero: any = {
          age: 0,
          birthDate: "",
          indice: index,
          countryIataCode: "",
          createdDatePerson: "",
          createdDateUser: "",
          email: "",
          firstName: "",
          frequentFlyer: "",
          gender: "",
          isVIP: "",
          lastName: "",
          lcostCenter: [],
          ocostCenter: "",
          loginUser: "",
          lpersonDocuments: [{ docTypeId: "", docNumber: "", code: "" }],
          message: null,
          nationality: "",
          orole: null,
          personId: "",
          phone: "",
          travelerCode: "",
          userId: "",
          type: ""
        }
        pasajero.type = element.Type;
        lstPassenger.push(pasajero);
      }
    });
    let passengers = this.headerService.encriptar(lstPassenger);
    sessionStorage.setItem('passengers', passengers);

  }

  validQuantity(lst_: any[]) {
    let lstPass: any[] = [];
    lst_.forEach(element => {
      if (element.Quantity != "0") {
        lstPass.push(element);
      }
    });

    /* if (this.objetoDesencriptado.orole.isCentralizer) {
      lstPass[0].Quantity = this.passCentra;
    } */

    return lstPass;
  }

  validAddFilterHour(valor: boolean) {
    valor ? this.addTramoFilter('') : this.lstTramosFilter.pop();

    console.log("El valor es:", valor);
  }


  cleanSearchFlight(){
    this.data = [];
    this.selectedCabin = "T";
    this.selectedScale = "T";
    if (this.lstTramosFilter.length > 0) {
      this.lstTramosFilter.forEach(tramo => {
        tramo.desde = '',
        tramo.hasta = ''
      });
    }
  }

  
  searchFlight() {
    if (this.lServices === null) {
      this.headerService.setErrorToastr("Su empresa no tiene acceso al sistema.");
      return;
    }
    let qwe = this.validCampos();
    if (!qwe) {
      return;
    }

    this.headerService.mostrarSpinner();
    /*  this.style = false; */
    let origen: any[] = [];
    let destino: any[] = [];
    let fechas: any[] = [];
    let horasFrom: any[] = [];
    let horasTo: any[] = [];
    let lUsers_: any[] = [];

    switch (this.tipoVuelo) {
      case "RT":
        this.onValueChangeSalida(this.bsValue[0]);
        this.onValueChangeRetorno(this.bsValue[1]);
        origen.push(this.selectedItem.iataCode);
        origen.push(this.selectedItemDevo.iataCode);
        destino.push(this.selectedItemDevo.iataCode);
        destino.push(this.selectedItem.iataCode);
        fechas.push(this.datosEnvira.fechaSalida);
        fechas.push(this.datosEnvira.fechaRetorno);
        break;

      case "OW":
        this.onValueChangeSalida(this.bsValue);

        origen.push(this.selectedItem.iataCode);
        destino.push(this.selectedItemDevo.iataCode);
        fechas.push(this.datosEnvira.fechaSalida);
        break;
      case "MC":
        origen = this.llenarOirgenMulti(origen, 1);
        destino = this.llenarOirgenMulti(destino, 2);
        fechas = this.llenarOirgenMulti(fechas, 3);
        this.indexTramo = this.lstMultidestino.length;
        break;
    }



    /*  fechas.forEach(function (fe) {
       horasFrom.push("");
       horasTo.push("");
     }); */
    lUsers_.push(
      {
        "RoleID": this.objetoDesencriptado.orole.id,
        "CostCenterIDs": null,
        "ID": this.objetoDesencriptado.userID
      }
    );

    if (this.objetoDesencriptado.orole.isConsolidatorAdvisor) {
      this.validConsolidator();
    }

    let setDataRQ = {
      selectIda: this.selectedItem,
      selectVuelta: this.selectedItemDevo,
      fechas: this.bsValue,
      tipoVuelo: this.tipoVuelo,
      cabina: this.selectedCabin,
      scale: this.selectedScale,
      passenger: this.passengerList,
      chkCabina: this.maleta,
      chkBodega: this.bodega
    }

    if (this.tipoVuelo === "MC" && this.style != true) {
      this.lstMultidestino.forEach(element => {
        horasFrom.push("");
        horasTo.push("");
      });
    } else {
      this.lstTramosFilter.forEach(element => {
        horasFrom.push(element.desde.replaceAll(":", ''));
        horasTo.push(element.hasta.replaceAll(":", ''));
      });
    }
    let flagCentralizador: any = this.objetoDesencriptado.orole.isCentralizer;
    if(flagCentralizador){
      this.passengerList[0].Quantity = this.pasajeros
    }

    let data = {
      Lpassenger: this.validQuantity(this.passengerList),
      Origin: origen,
      Destination: destino,
      Dates: fechas,
      TimeFrom: horasFrom,
      TimeTo: horasTo,
      CabinType: this.selectedCabin === 'T' ? '' : this.selectedCabin,
      Scales: this.selectedScale === 'T' ? '' : this.selectedScale,
      NumberOfRecomendations: 250,
      IncludeBaggage: this.bodega,
      IncludeCarryOn: this.maleta,
      TypeSearch: this.headerService.getTypeSearch(),
      Luser: lUsers_,
      Oenterprise: this.objetoDesencriptado.oenterprise,
      Type: this.tipoVuelo,
      RedisToken: this.headerService.getDataLogin().token
    };

    /* const indexTramo = this.indexTramo;
    const departureArrivalTimeFrom_ = data.TimeFrom;
    const departureArrivalTimeTo_ = data.TimeTo;

    const time1 = $('#timepicker1').val();
    const time2 = $('#timepicker2').val();
    const time3 = $('#timepicker3').val();
    const time4 = $('#timepicker4').val();
    const time5 = $('#timepicker5').val();
    const time6 = $('#timepicker6').val();
    const time7 = $('#timepicker7').val();
    const time8 = $('#timepicker8').val();
    const time9 = $('#timepicker9').val();
    const time10 = $('#timepicker10').val();
    const time11 = $('#timepicker11').val();
    const time12 = $('#timepicker12').val();

    switch (indexTramo) {
      case 1:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        break;
      case 2:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        break;
      case 3:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        departureArrivalTimeFrom_[2] = time5;
        departureArrivalTimeTo_[2] = time6;
        break;
      case 4:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        departureArrivalTimeFrom_[2] = time5;
        departureArrivalTimeTo_[2] = time6;
        departureArrivalTimeFrom_[3] = time7;
        departureArrivalTimeTo_[3] = time8;
        break;
      case 5:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        departureArrivalTimeFrom_[2] = time5;
        departureArrivalTimeTo_[2] = time6;
        departureArrivalTimeFrom_[3] = time7;
        departureArrivalTimeTo_[3] = time8;
        departureArrivalTimeFrom_[4] = time9;
        departureArrivalTimeTo_[4] = time10;
        break;
      case 6:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        departureArrivalTimeFrom_[2] = time5;
        departureArrivalTimeTo_[2] = time6;
        departureArrivalTimeFrom_[3] = time7;
        departureArrivalTimeTo_[3] = time8;
        departureArrivalTimeFrom_[4] = time9;
        departureArrivalTimeTo_[4] = time10;
        departureArrivalTimeFrom_[5] = time11;
        departureArrivalTimeTo_[5] = time12;
        break;
    } */
    /* 
        data.TimeFrom = departureArrivalTimeFrom_;
        data.TimeTo = departureArrivalTimeTo_; */




    this.datosEnvira.bodega = this.bodega;
    this.datosEnvira.maleta = this.maleta;
    this.datosEnvira.escala = this.escala;
    this.datosEnvira.textoEscala = this.textoEscala;
    this.datosEnvira.cabina = this.cabina;
    this.datosEnvira.textoCabina = this.textoCabina;
    this.datosEnvira.pasajer = this.pasajeros;
    this.datosEnvira.tipoVuelo = this.tipoVuelo;
    let valor = this.headerService.encriptar(this.datosEnvira);

    this.cookieServices.set('ss_flights', valor);

    this.service.searchFlight(data).subscribe(
      x => {
        x.status === 200 && x.odata.lrecommendation?.length > 0 ? this.setSuccessFlight(x, data, setDataRQ) : this.setErrorFlight(x)
      },
      error => {
        error.status === 404 ? this.headerService.setErrorToastr("Servicio no encontrado") : this.headerService.error500();
      }
    )
  }

  deleteFilter() {

  }

  setErrorFlight(x: any) {
    this.msgError = x.message;
    this.validMessage = true;
    this.noShow.emit(null);
    this.headerService.ocultarSpinner();
  }

  setSuccessFlight(x: any, data: any, setDataRQ: any) {
    this.validMessage = false;
    const obj = {
      result: x,
      request: data,
      pasajeros: this.pasajeros,
      lstMulti: this.multiDestinationComponent?.lstMultidestino,
      dataRQ: setDataRQ
    }
    this.dataRQ != null ? this.viewFilterRecomen(obj) : this.router.navigate(["flights/flight-list"], { state: { data: { ...obj } } });
  }

  viewFilterRecomen(obj: any) {
    this.select.emit(obj)
    this.style = true;
  }

  selection(passengers: any) {
    if (this.objetoDesencriptado.orole.isCentralizer) {
      passengers.totalPassengers = this.pasajeros;
      /*       passengers.filter[0].Quantity = this.passCentra; */
    }
    this.passengerList = passengers.filter;
    this.pasajeros = passengers.totalPassengers;

  }

  seleccionarCabina(valor: any, texto: string) {
    this.cabina = valor;
    this.textoCabina = texto;
  }

  seleccionarEscala(valor: any, texto: any) {
    this.escala = valor;
    this.textoEscala = texto;
  }



  ValidarCiudad() {
    if (this.model.origentTexto.length < 10) {
      this.model.origentTexto = "";
    }

    if (this.model.destinoTexto.length < 10) {
      this.model.destinoTexto = "";
    }
  }



  onFocused(e: any) { }

  selectEventDestino(item: any) {
    this.datosEnvira.destinoAuto = item.iataCode;
    this.datosEnvira.destinoTexto = item.name;
    this.valdestino = false;
    this.setBorderGood("searchDestinoInit");
    $(".x").hide();
    if (this.model.origentTexto.length < 5) {
      this.model.origentTexto = "";
    }
  }

  onFocused2(e: any) { }

  handlerSalida() {
    this.isOpendate = true;
  }



  selectDates(id: string) {
    this.agregarClaseFecha = false;
    if (this.bsValue[1] != null && this.bsValue[1] != undefined && !this.headerService.validPhone()) {
      this.startCalendar.overlayVisible = false;
    }
  }

  onValueChangeSalida(value: Date): void {

    this.valfechasalida = false;
    $("#txtFechaSalida").removeClass("campo-invalido");
    this.minDateRetorno = value;
    this.dateCustomClasses = [
      { date: this.minDateRetorno, classes: ["bg-danger", "text-warning"] },
    ];

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

      if (value >= this.calendarSalidaValue) {
        $("#fechadestino").val("");
        this.datosEnvira.fechaRetorno = "";
      }
      this.datosEnvira.fechaSalida = value.getFullYear() + "/" + mes + "/" + dia;
      this.datosEnvira.fechaSalidaShow = dia + "/" + mes + "/" + value.getFullYear();
      this.valueShow = this.datosEnvira.fechaSalidaShow;
    }
  }

  onValueChangeRetorno(value: Date): void {
    if (value != null) {
      this.valfechadestino = false;
      this.calendarSalidaValue = value;

      this.dateCustomClasses = [
        { date: value, classes: ["bg-danger", "text-warning"] },
      ];
      $("#txtFechaDestino").removeClass("campo-invalido");
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

      this.datosEnvira.fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
      this.datosEnvira.fechaRetornoShow = dia + "/" + mes + "/" + value.getFullYear();
      this.setBorderGoodDate("txtFechaDestino");
    }
  }


  selectEvent(item: any) {
    this.datosEnvira.origenAuto = item.iataCode;
    this.datosEnvira.origentTexto = item.name;
    this.isOpen = false;
    this.setBorderGood("searchOriginInit");
    $(".x").hide();
  }

  seleccionarTipoVuelo() {
    if (this.tipoVuelo === "RT") {
      this.lstTramosFilter = [];
      this.addTramoFilter('Ida');
      this.addTramoFilter('Vuelta');
    }
    if (this.tipoVuelo === "OW") {
      this.lstTramosFilter = [];
      this.addTramoFilter('Ida');
    }
    if (this.tipoVuelo === "MC") {
      this.lstTramosFilter = [];
      this.lstMultidestino.forEach(element => {
        this.addTramoFilter('');
      });
    }
  }

}
