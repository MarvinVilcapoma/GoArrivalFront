import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from 'src/app/services/head.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-detail-car',
  templateUrl: './detail-car.component.html',
  styleUrls: ['./detail-car.component.css']
})

export class DetailCarComponent implements OnInit, AfterViewInit {
  locale = "es";
  carsSearch: any;
  selectedCategories: any[] = [];

  carsSearchRequest: any;
  carRecomendacion: any;
  categoriaDescription: any;
  model: any = {};
  origenLugar: string = "";
  origenFecha: string = "";
  origenHora: string = "";
  destinoLugar: string = "";
  destinoFecha: string = "";
  destinoHora: string = "";
  cantDiasAlquiler!: number;
  valTaxAmout: any = false;
  taxAmount: any;
  currency: string = "";
  amount!: number;
  flagTabDatos: boolean = false;
  flagTabInfo: boolean = false;
  carSelect: any;
  lstInclusions: any[] = [];
  lstExtraRates: any[] = [];
  lstDivParaCompletar = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  idRadioBtn: string = "idRadioBtn";
  idDivCabecera = "idDivCabecera";
  idDivRatePrice1 = "idDivRatePrice1";
  idDivRatePrice2 = "idDivRatePrice2";
  idSpanRatePrice1 = "idSpanRatePrice1";
  idSpanRatePrice2 = "idSpanRatePrice2";
  selCarRateIdDeschecar: any;
  indexDeschecar : any;
  infoAuto1 : any;
  infoAuto2 : any;
  ratePriceSel : any;
  extraRatesSel : any;
  listAditionals: any[] = [];
  listAditionalCheck: any[] = [];
  lpayment: any;
  priceBase = null;
  counter: any;

  localfinish : any;

  idinterval: any;
  sessionFinish!: boolean;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  @ViewChild("modalexpired", { static: false }) modalexpired: any;
  constructor(
    private head: HeaderService,
    private router: Router
  ) {

  

  
  }

  ngOnInit() {
    this.carSelect = sessionStorage.getItem("ss_sel_car_result");
    this.carSelect = JSON.parse(this.carSelect);
    this.carsSearch = sessionStorage.getItem("ss_carsSearch");
    this.carsSearch = JSON.parse(this.carsSearch);
    this.carsSearchRequest = sessionStorage.getItem("ss_requestCars");
    this.carsSearchRequest = JSON.parse(this.carsSearchRequest);
    this.carRecomendacion = sessionStorage.getItem("ss_recomendacion_alq");
    this.carRecomendacion = JSON.parse(this.carRecomendacion);
    this.categoriaDescription = sessionStorage.getItem("ss_categoriaDescription_alq");
    this.categoriaDescription = JSON.parse(this.categoriaDescription);
    this.localfinish = sessionStorage.getItem("ss_countersessionAu");
    this.localfinish = JSON.parse(this.localfinish);

    this.lstExtraRates = this.carSelect.oselectCar.lextraRates;
    if(this.lstExtraRates != null){
      const cantLextraRates = this.lstExtraRates.length;
      const extraRatesMax = this.lstExtraRates[cantLextraRates - 1];
      if(extraRatesMax.linclusions != null){
        if(extraRatesMax.linclusions.length > 0){
          this.lstInclusions = extraRatesMax.linclusions;
        }
      }
      
    }
    

    const laditionals = this.carSelect.oselectCar.laditionals;
    if (laditionals != null) {
      this.listAditionals = laditionals;
    }

    
    this.bloquearBotonAtras();

    this.sessionFinish = true;
    this.setData();
  }

  ngAfterViewInit(): void {
    this.setData();
  }

  setData() {



    this.origenLugar =
      this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpAddress +
      " (" +
      this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpLocation +
      ")";


    //this.origenFecha = fecha1.format("dddd, DD MMM YYYY");
    this.origenFecha = this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpDateShow;

    //this.origenHora = this.carsSearchRequest.timeIni;
    this.origenHora = this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpHourShow;

    ///////////////////////////////////////////////////////////////////////////DESTINO
    this.destinoLugar =
      this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffAddress +
      " (" +
      this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffLocation +
      ")";

 
    //this.destinoFecha = fecha2.format("dddd, DD MMM YYYY");
    this.destinoFecha = this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffDateShow;

    //this.destinoHora = this.carsSearchRequest.timeFin;
    this.destinoHora = this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffHourShow;


    this.currency = this.carRecomendacion.oprice.currency;
    if (this.carRecomendacion.oprice.lpriceByPayments != null && this.carRecomendacion.oprice.lpriceByPayments.length > 0) {
      this.amount = this.carRecomendacion.oprice.lpriceByPayments[0].finalAmount;
      this.priceBase = this.carRecomendacion.oprice.base;
    } else {
      this.amount = this.carRecomendacion.oprice.amount;
    }


    this.lpayment = this.carRecomendacion.oprice.lpriceByPayments;

    const selCarRateId = this.carSelect.oselectCar.oinformation.ocarInfo.rateId;

    const lstExtraRates = this.lstExtraRates;
    const idRadioBtn = this.idRadioBtn;
    const idDivCabecera = this.idDivCabecera;
    const idDivRatePrice1 = this.idDivRatePrice1;
    const idDivRatePrice2 = this.idDivRatePrice2;
    const idSpanRatePrice1 = this.idSpanRatePrice1;
    const idSpanRatePrice2 = this.idSpanRatePrice2;

    let selCarRateIdDeschecar = 0;
    let indexDeschecar = 0;
    let infoAuto1 = "";
    let infoAuto2 = "";
    let extraRates;
    let ratePrice;

    lstExtraRates.forEach(function (item, index) {
      if (selCarRateId == item.rateId) {
        if (index === 0) {
          const idRadioSelPrice =
            "#" + idRadioBtn + "_" + selCarRateId + "_" + index;


          $("#" + idRadioBtn + "_" + selCarRateId + "_" + index).prop(
            "checked",
            true
          );

          $("#" + idDivCabecera + "_" + selCarRateId).addClass(
            "div-sel-radio-1"
          );

          $("#" + idDivRatePrice1 + "_" + selCarRateId + "_" + index).addClass(
            "div-sel-radio-1"
          );

          $("#" + idDivRatePrice2 + "_" + selCarRateId + "_" + index).addClass(
            "div-sel-radio-1"
          );

          $("#" + idSpanRatePrice1 + "_" + selCarRateId + "_" + index).addClass(
            "div-sel-radio-1"
          );

          $("#" + idSpanRatePrice2 + "_" + selCarRateId + "_" + index).addClass(
            "div-sel-radio-1"
          );

          selCarRateIdDeschecar = parseInt(selCarRateId);
          indexDeschecar = index;
          infoAuto2 = item.name;
          infoAuto1 = item.lratePrice[0].paymentType;
          extraRates = item;
          ratePrice = item.lratePrice[0];
        }
      }
    });
    this.taxAmount = lstExtraRates[0].lratePrice[0].taxAmount;
    if (lstExtraRates[0].lratePrice[0].taxAmount >= 1) {
      this.valTaxAmout = true;
    } else {
      this.valTaxAmout = false;
    }
    sessionStorage.setItem('ss_valTax', JSON.stringify(this.valTaxAmout));
    sessionStorage.setItem('ss_valTaxAmount', JSON.stringify(this.taxAmount));


    this.selCarRateIdDeschecar = selCarRateIdDeschecar;
    this.indexDeschecar = indexDeschecar;
    this.infoAuto1 = infoAuto1;
    this.infoAuto2 = infoAuto2;
    this.extraRatesSel = extraRates;
    this.ratePriceSel = ratePrice;
    /*  this.amount = ratePrice.totalAmount; */
    sessionStorage.setItem("ss_extraRates", JSON.stringify(this.extraRatesSel));
    sessionStorage.setItem("ss_ratePrice", JSON.stringify(this.ratePriceSel));

  }

  open(valor: any) {
    window.open(valor, '_blank')
  }

  bloquearBotonAtras() {
    let vale: any = null;
    history.pushState(null, vale, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  back() {
    var interval = setInterval(() => {
      clearInterval(this.idinterval);
    })
  }

  MostrarMapa(template : any) {

    /*  this.modalRefPoliticas = this.modalService.show(
       template,
       this.config); */

/*     this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'adasdasd' })
    ); */
  }

 

  selectRadioBtnRatePrice(valor: any, ratePrice: any, extraRates: any) {
    this.taxAmount = ratePrice.taxAmount;
    if (ratePrice.taxAmount >= 1) {
      this.valTaxAmout = true;
    } else {
      this.valTaxAmout = false;
    }
    sessionStorage.setItem('ss_valTax', JSON.stringify(this.valTaxAmout));
    sessionStorage.setItem('ss_valTaxAmount', JSON.stringify(this.taxAmount));
    const idRadioBtn = this.idRadioBtn;
    const idDivCabecera = this.idDivCabecera;
    const idDivRatePrice1 = this.idDivRatePrice1;
    const idDivRatePrice2 = this.idDivRatePrice2;
    const idSpanRatePrice1 = this.idSpanRatePrice1;
    const idSpanRatePrice2 = this.idSpanRatePrice2;

    //DESPINTAR ANTERIOR RADIO
    const selCarRateIdDeschecar = this.selCarRateIdDeschecar;
    const indexDeschecar = this.indexDeschecar;
    $(
      "#" + idRadioBtn + "_" + selCarRateIdDeschecar + "_" + indexDeschecar
    ).prop("checked", false);

    $("#" + idDivCabecera + "_" + selCarRateIdDeschecar).removeClass(
      "div-sel-radio-1"
    );

    $(
      "#" + idDivRatePrice1 + "_" + selCarRateIdDeschecar + "_" + indexDeschecar
    ).removeClass("div-sel-radio-1");

    $(
      "#" + idDivRatePrice2 + "_" + selCarRateIdDeschecar + "_" + indexDeschecar
    ).removeClass("div-sel-radio-1");

    $(
      "#" +
      idSpanRatePrice1 +
      "_" +
      selCarRateIdDeschecar +
      "_" +
      indexDeschecar
    ).removeClass("div-sel-radio-1");

    $(
      "#" +
      idSpanRatePrice2 +
      "_" +
      selCarRateIdDeschecar +
      "_" +
      indexDeschecar
    ).removeClass("div-sel-radio-1");

    //PINTAR NUEVO RADIO
    const selCarRateId = valor.split("_")[1];
    const index = valor.split("_")[2];

    $("#" + idRadioBtn + "_" + selCarRateId + "_" + index).prop(
      "checked",
      true
    );

    $("#" + idDivCabecera + "_" + selCarRateId).addClass("div-sel-radio-1");

    $("#" + idDivRatePrice1 + "_" + selCarRateId + "_" + index).addClass(
      "div-sel-radio-1"
    );

    $("#" + idDivRatePrice2 + "_" + selCarRateId + "_" + index).addClass(
      "div-sel-radio-1"
    );

    $("#" + idSpanRatePrice1 + "_" + selCarRateId + "_" + index).addClass(
      "div-sel-radio-1"
    );

    $("#" + idSpanRatePrice2 + "_" + selCarRateId + "_" + index).addClass(
      "div-sel-radio-1"
    );

    //NUEVOS VALORES A DESPINTAR
    this.selCarRateIdDeschecar = parseInt(selCarRateId);
    this.indexDeschecar = parseInt(index);
    this.infoAuto2 = extraRates.name;
    this.infoAuto1 = ratePrice.paymentType;
    if (ratePrice.lpriceByPayments != null && ratePrice.lpriceByPayments.length > 0) {
      this.amount = ratePrice.lpriceByPayments[0].finalAmount;
      this.lpayment = ratePrice.lpriceByPayments;
      this.priceBase = ratePrice.baseAmount;
    } else {
      this.amount = ratePrice.totalAmount;
    }
    this.extraRatesSel = extraRates;
    this.ratePriceSel = ratePrice;
    sessionStorage.setItem("ss_extraRates", JSON.stringify(this.extraRatesSel));
    sessionStorage.setItem("ss_ratePrice", JSON.stringify(this.ratePriceSel));
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

  checkAditional(checked: any, code: any) {
    const objeto = {
      Code: code.code,
      Description: code.description,
      Amount: code.amount
    }
    if (checked === true) {
      this.listAditionalCheck.push(objeto);
    } else {
      this.listAditionalCheck = this.listAditionalCheck.filter(function (item) {
        return item.Code !== code.code;
      });
    }

    sessionStorage.setItem("ss_listAditionalCheck", JSON.stringify(this.listAditionalCheck));
  }

  reservarAuto() {
    sessionStorage.setItem("ss_priceBase", JSON.stringify(this.priceBase));
    this.router.navigate(["cars/car-reservation"]);
  }
}