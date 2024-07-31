import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars/cars.service';
import { HeaderService } from 'src/app/services/head.service';


declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})

export class ListCarsComponent implements OnInit {
  carsSearch: any;
  flagCars: boolean = false;
  model: any = {};
  data: any[] = [];
  data2: any[] = [];
  keyword = "name";
  origenAuto: string = "";
  origentTexto: string = "";
  isOpen = false;
  airportlist: any[] = [];
  citylist: any[] = [];
  lstAutocomplete: any[] = [];
  destinoAuto: string = "";
  destinoTexto: string = "";
  valdestino = false;
  isOpendate = false;
  valfechasalida = false;
  valfechadestino = false;
  dateCustomClasses: any[] = [];
  calendarSalidaValue!: Date;
  fechaSalida: string = "";
  fechaRetorno: string = "";
  fechaSalidaShow: string = "";
  fechaRetornoShow: string = "";
  minDateSalida!: Date;
  minDateRetorno!: Date;
  maxDateIngreso!: Date;
  bsValue!: Date;
  origenCountryCode: any;
  destinoCountryCode : any;
  flagOtroDestino!: boolean;
  carsSearchRequest: any;
  cabeceraOrigen: any;
  cabeceraOrigenMes: any;
  cabeceraOrigenFecha: any;
  cabeceraOrigenHora: any;
  cabeceraDestino: any;
  cabeceraDestinoMes: any;
  cabeceraDestinoFecha: any;
  cabeceraDestinoHora: any;
  cantDiasAlquiler: number = 0;

  selCategoriaDescription: string;
  checkedAutomatico: boolean = false;
  checkedPasajeros4: boolean = false;

  flagResult!: boolean;
  logindata: any;
  ingredient: any = "";
  countResultCars!: number;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(

    private head: HeaderService,
    private router: Router,

    private carsService: CarsService
  ) {

    this.selCategoriaDescription = "";

  }

  ngOnInit() {
    this.showAgain();
  }

  showAgain(){
    
    this.carsSearch = sessionStorage.getItem("ss_carsSearch");
    this.carsSearch = JSON.parse(this.carsSearch);
    this.carsSearchRequest = sessionStorage.getItem("ss_requestCars");
    this.carsSearchRequest = JSON.parse(this.carsSearchRequest);
    this.setValores();
    this.head.ocultarSpinner();
  }

  setValores() {
    this.cabeceraOrigenMes = this.obtenerMesTexto(this.carsSearchRequest.fechaIda);
    this.cabeceraOrigenFecha = this.obtenerdiaTexto(this.carsSearchRequest.fechaIda) + " " + this.carsSearchRequest.fechaIda.substring(0,10).split("-")[2];
    this.cabeceraDestinoMes = this.obtenerMesTexto(this.carsSearchRequest.fechaVuelta);
    this.cabeceraDestinoFecha = this.obtenerdiaTexto(this.carsSearchRequest.fechaVuelta) + " " + this.carsSearchRequest.fechaVuelta.substring(0,10).split("-")[2];
    let cantidad = 0;


    this.carsSearch.lcategories.forEach((element: any) => {
      cantidad += element.lrecommendations.length;
    });
    this.countResultCars = cantidad;
  }

  obtenerMesTexto(fecha: any) {
    fecha = fecha.substring(0,10);
    const intMes = fecha.split("-")[1];
    let strMes = "";
    switch (intMes) {
      case "01":
        strMes = "Enero";
        break;
      case "02":
        strMes = "Febrero";
        break;
      case "03":
        strMes = "Marzo";
        break;
      case "04":
        strMes = "Abril";
        break;
      case "05":
        strMes = "Mayo";
        break;
      case "06":
        strMes = "Junio";
        break;
      case "07":
        strMes = "Julio";
        break;
      case "08":
        strMes = "Agosto";
        break;
      case "09":
        strMes = "Septiembre";
        break;
      case "10":
        strMes = "Octubre";
        break;
      case "11":
        strMes = "Noviembre";
        break;
      case "12":
        strMes = "Diciembre";
        break;
    }
    return strMes;
  }

  obtenerdiaTexto(fechaComoCadena: any) {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    const nombreDia = dias[numeroDia];
    return nombreDia;
  }

  selectEvent(item: any) {


    this.origenAuto = item.iataCode;
    this.origentTexto = item.name;
    this.origenCountryCode = item.countryCode;
    this.isOpen = false;
  }


  seleccionarCategoria(description: any, index: any) {

    this.selCategoriaDescription = description;
    let carsSearch = this.carsSearch;
    carsSearch.lcategories.forEach(function (item: any) {
      if (item.description === description) {
        item.visible = true;
      } else {
        item.visible = false;
      }
    });

    $(".base-general").removeClass("div-base-2");
    $("#diBase_" + index).addClass("div-base-2");

    this.carsSearch = carsSearch;

    let cantidad = 0;
    this.carsSearch.lcategories.forEach(function (element: any) {
      if (element.visible === true) {
        element.lrecommendations.forEach(function (recommendation: any) {
          if (recommendation.visible === true) {
            cantidad++;
          }
        });
      }
      if (cantidad === 0) {
        element.visible = false;
      }
    });
    this.countResultCars = cantidad;
  }

  mostrarTodasCategorias() {
    $(".radioCat").prop("checked", false);
    this.ingredient = "";
    this.selCategoriaDescription = "";
    let carsSearch = this.carsSearch;
    carsSearch.lcategories.forEach(function (item: any) {
      item.visible = true;
    });

    this.carsSearch = carsSearch;
    $(".base-general").removeClass("div-base-2");

    let cantidad = 0;
    this.carsSearch.lcategories.forEach(function (element: any) {
      if (element.visible === true) {
        element.lrecommendations.forEach(function (recommendation: any) {
          if (recommendation.visible === true) {
            cantidad++;
          }
        });
      }
    });
    this.countResultCars = cantidad;
  }

  seleccionarTipoCaja(valor: any) {
    const checkedAutomatico = !this.checkedAutomatico;
    const checkedPasajeros4 = this.checkedPasajeros4;
    const selCategoriaDescription = this.selCategoriaDescription;
    let carsSearch = this.carsSearch;

    carsSearch.lcategories.forEach(function (item: any) {
      item.lrecommendations.forEach(function (recomendacion: any) {
        recomendacion.visible = false;
      });
      item.visible = false;
    });

    //Busqueda de categorias
    carsSearch.lcategories.forEach(function (item: any) {
      if (selCategoriaDescription === "") {
        item.visible = true;
      } else {
        if (item.description === selCategoriaDescription) {
          item.visible = true;
        }
      }
    });
    //this.carsSearch = carsSearch;

    //Busqueda de automaticos y >4 pasajeros
    carsSearch.lcategories.forEach(function (item: any) {
      item.lrecommendations.forEach(function (recomendacion: any) {
        //checkedAutomatico es como si fuera TRUE
        if (checkedAutomatico === false && checkedPasajeros4 == false) {
          if (recomendacion.type === "Automático") {
            recomendacion.visible = true;
          } else {
            item.visible = false;
          }
        }

        //checkedAutomatico es como si fuera TRUE
        if (checkedAutomatico === false && checkedPasajeros4 == true) {
          if (
            recomendacion.type === "Automático" &&
            recomendacion.numberPassengers > 4
          ) {
            recomendacion.visible = true;
          } else {
            item.visible = false;
          }
        }

        //checkedAutomatico es como si fuera FALSE, se muestra todo
        if (checkedAutomatico === true && checkedPasajeros4 == false) {
          recomendacion.visible = true;
        }

        //checkedAutomatico es como si fuera FALSE
        if (checkedAutomatico === true && checkedPasajeros4 == true) {
          if (recomendacion.numberPassengers > 4) {
            recomendacion.visible = true;
          }
        }
      });
      //item.visible = true;
    });

    this.carsSearch = carsSearch;

    let cantidad = 0;
    this.carsSearch.lcategories.forEach(function (element: any) {
      if (element.visible === true) {
        element.lrecommendations.forEach(function (recommendation: any) {
          if (recommendation.visible === true) {
            cantidad++;
          }
        });
      }
    });
    this.countResultCars = cantidad;
  }

  seleccionarMasPasajeros(valor: any) {
    const checkedAutomatico = this.checkedAutomatico;
    const checkedPasajeros4 = !this.checkedPasajeros4;
    const selCategoriaDescription = this.selCategoriaDescription;
    let carsSearch = this.carsSearch;

    carsSearch.lcategories.forEach(function (item: any) {
      item.lrecommendations.forEach(function (recomendacion: any) {
        recomendacion.visible = false;
      });
      item.visible = false;
    });

    //Busqueda de categorias
    carsSearch.lcategories.forEach(function (item: any) {
      if (selCategoriaDescription === "") {
        item.visible = true;
      } else {
        if (item.description === selCategoriaDescription) {
          item.visible = true;
        }
      }
    });

    //Busqueda de automaticos y >4 pasajeros
    carsSearch.lcategories.forEach(function (item: any) {
      item.lrecommendations.forEach(function (recomendacion: any) {
        //checkedPasajeros4 es como si fuera TRUE
        if (checkedAutomatico === false && checkedPasajeros4 == false) {
          if (recomendacion.numberPassengers > 4) {
            recomendacion.visible = true;
          } else {
            item.visible = false;
          }
        }

        //checkedPasajeros4 es como si fuera FALSE, se muestra todo
        if (checkedAutomatico === false && checkedPasajeros4 == true) {
          recomendacion.visible = true;
        }

        //checkedPasajeros4 es como si fuera TRUE
        if (checkedAutomatico === true && checkedPasajeros4 == false) {
          if (
            recomendacion.type === "Automático" &&
            recomendacion.numberPassengers > 4
          ) {
            recomendacion.visible = true;
          } else {
            item.visible = false;
          }
        }

        //checkedPasajeros4 es como si fuera FALSE
        if (checkedAutomatico === true && checkedPasajeros4 == true) {
          if (recomendacion.type === "Automático") {
            recomendacion.visible = true;

          } else {
            item.visible = false;
          }
        }
      });
      //item.visible = true;
    });

    this.carsSearch = carsSearch;

    let cantidad = 0;
    this.carsSearch.lcategories.forEach(function (element: any) {
      if (element.visible === true) {
        element.lrecommendations.forEach(function (recommendation: any) {
          if (recommendation.visible === true) {
            cantidad++;
          }
        });
      }
    });
    this.countResultCars = cantidad;
  }

  sideScroll(element: any, direction: any, speed: any, distance: any, step: any) {
    var scrollAmount = 0;
    var slideTimer = window.setInterval(function () {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  moverIzq(id_container: any) {
    const container = document.getElementById(id_container);
    this.sideScroll(container, "left", 5, 200, 10);
  }

  moverDer(id_container: any) {
    const container = document.getElementById(id_container);
    this.sideScroll(container, "right", 5, 200, 10);
  }

  verDetalle(recomendacion: any, categoriaDescription: any) {
    this.head.mostrarSpinner();
    let datos = this.head.getDataLogin();
    const fechaIni = this.carsSearchRequest.fechaIda.substring(0,10) + "T" + this.carsSearchRequest.horaIda + ":00.000";
    const fechaFin = this.carsSearchRequest.fechaVuelta.substring(0,10) + "T" + this.carsSearchRequest.horaVuelta + ":00.000";
    const data = {
      CompanyCode: recomendacion.ocompany?.code,
      SippCode: recomendacion.sippCode,
      CountryIataCode: this.carsSearchRequest.countryIataCode,
      PickUpIataCode: recomendacion.olocation.pickUpLocation,
      DropOffIataCode: recomendacion.olocation.dropOffLocation,
      PickUpDate: fechaIni,
      DropOffDate: fechaFin,
      Ccrc: recomendacion.ccrc,
      RateId: recomendacion.orate.rateId,
      oprice: recomendacion.oprice,
      PromotionalCode: "",
      PaymentType: "",
      Language: "es",
      SearchType: "C",
      Ocompany: {
        companyDK: datos.oenterprise.codeDK,
        companyId: datos.oenterprise.id
      },
    };


    this.carsService.selectCar(data).subscribe(
      (result) => {
        sessionStorage.setItem("ss_sel_car_result", JSON.stringify(result));
      },
      (error) => {
        this.head.ocultarSpinner();
      },
      () => {
        this.head.ocultarSpinner();
        sessionStorage.setItem("ss_recomendacion_alq", JSON.stringify(recomendacion));
        sessionStorage.setItem("ss_categoriaDescription_alq", JSON.stringify(categoriaDescription));
        this.router.navigate(["cars/car-detail"]);
      }
    );
  }
}