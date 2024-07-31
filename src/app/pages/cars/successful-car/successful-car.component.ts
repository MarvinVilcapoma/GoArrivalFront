import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-successful-car',
  templateUrl: './successful-car.component.html',
  styleUrls: ['./successful-car.component.css']
})


export class SuccessfulCarComponent implements OnInit {
  carsSearch: any;
  carsSearchRequest: any;
  carRecomendacion: any;
  categoriaDescription: any;
  carSelect: any;
  ratePriceSel: any;
  extraRatesSel: any;
  confirma_reserva_alq: any;
  priceBase: any;
  listAditionals: any;
  cargos: any;
  totalAmount: any;
  loginData: any;
  idinterval: any;
  valTax: any;
  taxAmount: any;
  constructor(private head: HeaderService,
  ) {


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

    this.extraRatesSel = sessionStorage.getItem("ss_extraRates");
    this.extraRatesSel = JSON.parse(this.extraRatesSel);

    this.ratePriceSel = sessionStorage.getItem("ss_ratePrice");
    this.ratePriceSel = JSON.parse(this.ratePriceSel);

    let basepr: any = sessionStorage.getItem("ss_priceBase");
    basepr = JSON.parse(basepr);

    if (this.ratePriceSel.lpriceByPayments != null && this.ratePriceSel.lpriceByPayments.length > 0) {
      this.priceBase = basepr;
      this.totalAmount = this.ratePriceSel.lpriceByPayments[0].finalAmount;
      this.cargos = this.ratePriceSel.lpriceByPayments[0].chargesAmount;
  } else {
    this.totalAmount = this.ratePriceSel.baseAmount;
  }
    this.confirma_reserva_alq = sessionStorage.getItem("ss_confirma_reserva_alq");
    this.confirma_reserva_alq = JSON.parse(this.confirma_reserva_alq);
    this.listAditionals = this.confirma_reserva_alq.ladditionals;
  }

  ngOnInit() {
    this.head.ocultarSpinner();
    this.valTax = sessionStorage.getItem("ss_valTax");
    this.valTax = JSON.parse(this.valTax);

    this.taxAmount = sessionStorage.getItem("ss_valTaxAmount");
    this.taxAmount = JSON.parse(this.taxAmount);
   /*  this.loginData = sessionStorage.getItem("ss_login_data"); */
 /*    this.idinterval = sessionStorage.getItem("ss_interval");
    this.idinterval = JSON.parse(this.idinterval); */

  }

  open(valor: any){
    window.open(valor,'_blank')
  }


}
