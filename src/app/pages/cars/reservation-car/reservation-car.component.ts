import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars/cars.service';
import { HeaderService } from 'src/app/services/head.service';
import { environment } from 'src/environments/environment.prod';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reservation-car',
  templateUrl: './reservation-car.component.html',
  styleUrls: ['./reservation-car.component.css']
})
export class ReservationCarComponent implements OnInit, AfterViewInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  carsSearch: any;
  carsSearchRequest: any;
  carRecomendacion: any;
  categoriaDescription: any;
  carSelect: any;
  ratePriceSel: any;
  extraRatesSel: any;
  listAditionalCheck: any;
  chbxAceptar!: boolean;
  flagCentralizador: any;
  model: any = {};
  loginData: any;
  campoDisable: boolean = false;
  ipAddress: any;
  Document: any;
  taxAmount: any;
  validisabled = false;
  cargos: any;
  valTax: any;
  priceBase: any = null;
  totalAmount: any;
  purcharse: any;
  counter: any;

  constructor(
    private router: Router,
    private carsService: CarsService,
    private head: HeaderService
  ) {

    this.carSelect = sessionStorage.getItem("ss_sel_car_result");
    this.carSelect = JSON.parse(this.carSelect);
    this.carsSearch = sessionStorage.getItem("ss_carsSearch");
    this.carsSearch = JSON.parse(this.carsSearch);
    this.counter = sessionStorage.getItem("ss_countersessionAu");
    this.counter = JSON.parse(this.counter);
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
    this.listAditionalCheck = sessionStorage.getItem("ss_listAditionalCheck");
    this.listAditionalCheck = JSON.parse(this.listAditionalCheck);
    this.flagCentralizador = sessionStorage.getItem("ss_flagCentralizador");
    this.flagCentralizador = JSON.parse(this.flagCentralizador);
    /* this.loginData = sessionStorage.getItem("ss_login_data");
    this.loginData = JSON.parse(this.loginData); */
  }

  ngOnInit() {
    this.valTax = sessionStorage.getItem("ss_valTax");
    this.valTax = JSON.parse(this.valTax);
    this.taxAmount = sessionStorage.getItem("ss_valTaxAmount");
    this.taxAmount = JSON.parse(this.taxAmount);
    this.document(); 
   /*  this.getIpAddress();
    this.document(); */

  /*   if (this.counter === false) {
      this.modalRefSessionExpired = this.modalService.show(ModalSessionAutoComponent, this.config);
    } */
  }

  document() {
    this.carsService.getDocument(false).subscribe(
      (result) => {
        this.Document = result.ldocumentTypeLists;
      },
      (err) => {},
      () => {}
    );
  }

  ngAfterViewInit() {
  /*   if (this.flagCentralizador === false) {
      this.campoDisable = true;
      this.model.nombre = this.loginData.userName;
      this.model.apellido = this.loginData.userLastName;
      this.model.email1 = this.loginData.email;
      this.model.email2 = this.loginData.email;
      this.model.celular = this.loginData.phoneNumber;
      this.model.numDocument = this.loginData.odocument.documentNumber;
      this.model.typeDocument = this.loginData.odocument.docTypeId;
    } */
  }

/*   getIpAddress() {
    this.service.getIpAddress().subscribe(
      (x: any) => {
        this.ipAddress = x.ip;
      },
      (err) => {}
    );
  } */

  armarDataToken() {
 
    const pasajero = {
      Name: this.model.nombre,
      LastName: this.model.apellido,
      DocumentType: this.model.typeDocument,
      DocumentNumber: this.model.numDocument,
      Email: this.model.email1,
    };
    let price;
    if (this.loginData.ocompany.ocompanyConfiguration.paymentServiceId === 3) {
      price = this.priceBase;
    } else {
      price = this.totalAmount;
    }

    const datos = {
      CompanyId: this.loginData.ocompany.companyId,
      Currency: this.ratePriceSel.currency,
      Amount: price.toString(),
      MaxAmount: price.toString(),
      System: "GoArrival",
      Channel: "web",
      ClientIP: this.ipAddress,
      Opassenger: pasajero,
    };

    return datos;
  }

  getToken(): any {

    let flagVal = 0;

    if ($.trim(this.model.nombre) === "") {
      flagVal++;
      $("#txtNombre").addClass("campo-invalido-vacio");
    } else {
      $("#txtNombre").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.apellido) === "") {
      flagVal++;
      $("#txtApellido").addClass("campo-invalido-vacio");
    } else {
      $("#txtApellido").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.numDocument) === "") {
      flagVal++;
      $("#txtNumDocument").addClass("campo-invalido-vacio");
    } else {
      $("#txtNumDocument").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.typeDocument) === "") {
      flagVal++;
      $("#txtTypeDocument").addClass("campo-invalido-vacio");
    } else {
      $("#txtTypeDocument").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.email1) === "") {
      flagVal++;
      $("#txtEmail1").addClass("campo-invalido-vacio");
      $("#txtEmail2").addClass("campo-invalido-vacio");
    } else {
      $("#txtEmail1").removeClass("campo-invalido-vacio");
      $("#txtEmail2").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.email1) !== $.trim(this.model.email2)) {
      flagVal++;
      $("#txtEmail1").addClass("campo-invalido-vacio");
      $("#txtEmail2").addClass("campo-invalido-vacio");
    } else {
      $("#txtEmail1").removeClass("campo-invalido-vacio");
      $("#txtEmail2").removeClass("campo-invalido-vacio");
    }

   /*  if ($.trim(this.model.telPais) === "") {
      flagVal++;
      $("#xxxxxxxxxx").addClass("campo-invalido-vacio");
    } else {
      $("#xxxxxxxxxx").removeClass("campo-invalido-vacio");
    } */

    if ($.trim(this.model.celular) === "") {
      flagVal++;
      $("#txtCelular").addClass("campo-invalido-vacio");
    } else {
      $("#txtCelular").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.edad) === "") {
      flagVal++;
      $("#txtEdad").addClass("campo-invalido-vacio");
    } else {
      $("#txtEdad").removeClass("campo-invalido-vacio");
    }

    if (flagVal > 0) {
      return false;
    }

    this.chbxAceptar = true;
   /*  if (this.loginData?.ocompany.ocompanyConfiguration.paymentServiceId === 1) {
        this.chbxAceptar = true;
        return;
    } else {
      if (this.validisabled === true) {
        return;
      } else {
        this.head.mostrarSpinner();
        const data = this.armarDataToken();
        this.service.getSessionToken(data).subscribe((result) => {
          if (result.status === 200) {
            this.validisabled = true;
            this.purcharse = result.purchaseNumber;
            this.localStorageService.store("ss_visahotel", result.purchaseNumber);
            this.generarBoton(result);
          } else {
            this.spinner.hide();
            return;
          }
        });
      }
    } */

   
  }

  generarBoton(result: any) {
    let origin = location.origin;
    let succes = origin + "/success-payment";
    let error = origin + "/error-payment";
    let price;
    if (this.loginData.ocompany.ocompanyConfiguration.paymentServiceId === 3) {
      price = this.priceBase;
    } else {
      price = this.totalAmount;
    }
    const form = document.createElement("form");
 /*    form.setAttribute("method", "post");
    form.setAttribute(
      "action",
      environment.urlVisa +
        config.NEW_VISA_AUTHENTICATION +
        succes +
        "&errorURL=" +
        error +
        "&purchaseNumber=" +
        result.purchaseNumber + '&aditionalText=0'
    );
    form.setAttribute("id", "boton_pago"); */
  /*   document.getElementById("btn_pago").appendChild(form); */

    const scriptEl = document.createElement("script");
    scriptEl.setAttribute("src", environment.urlVisaSource);
    scriptEl.setAttribute("data-sessiontoken", result.sessionKey);
    scriptEl.setAttribute("data-merchantid", result.merchantID);
    // scriptEl.setAttribute('data-merchantid', '115015006');
    scriptEl.setAttribute(
      "data-merchantlogo",
      "https://domiruth.com/wp-content/uploads/2020/03/logotipo-domiruth-.png"
    );
    scriptEl.setAttribute("data-formbuttoncolor", "#E82D56");
    scriptEl.setAttribute("data-purchasenumber", result.purchaseNumber);
/*     scriptEl.setAttribute("data-channel", config.VISA_SESSION_CHANNEL); */
    scriptEl.setAttribute(
      "data-amount",
      price.toString()
    );
    scriptEl.setAttribute("data-cardholdername", this.model.nombre);
    scriptEl.setAttribute("data-cardholderlastname", this.model.apellido);
    scriptEl.setAttribute("data-cardholderemail", this.model.email1);
  /*   scriptEl.setAttribute(
      "data-expirationminutes",
      config.VISA_SESSION_TIMEOUT
    ); */
    scriptEl.setAttribute("data-timeouturl", "timeout.html");
  /*   document.getElementById("boton_pago").appendChild(scriptEl); */
    /*  this.check = true; */
    this.head.ocultarSpinner();
  }

  setValor(valor: any) {
    this.model.typeDocument = valor;
  }

  setDataCar(){
    let datos = this.head.getDataLogin();
    const pricePay = {
      TypeOfPayment: this.ratePriceSel.lpriceByPayments[0].typeOfPayment,
      ChargesAmount: this.ratePriceSel.lpriceByPayments[0].chargesAmount,
      FinalAmount: this.ratePriceSel.lpriceByPayments[0].finalAmount
    }

    const data = {
      Token: this.carSelect.oselectCar.token,
      Language: "es",
      OInformation: {
        TermsAndConditions: this.carSelect.oselectCar.termsAndConditions,
        PaymentCode: this.ratePriceSel.paymentCode,
        RateId: this.extraRatesSel.rateId,
        CompanyCode:
          this.carSelect.oselectCar.oinformation.ocarInfo.companyCode,
        SippCode: this.ratePriceSel.sippCode,
        Ccrc: this.carSelect.oselectCar.oinformation.ocarInfo.ccrc,
        PromotionalCode: "",
        PickUpLocation:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpLocation,
        DropOffLocation:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffLocation,
        PickUpDate:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpDate,
        DropOffDate:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffDate,
        PickUpHour:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpHour,
        DropOffHour:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffHour,
        PickUpAddress:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpAddress,
        DropOffAddress:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffAddress,
        Laditionals: this.listAditionalCheck,
        OnHold: false,
        
      },
      Opassenger: {
        FirstName: this.model.nombre,
        LastName: this.model.apellido,
        Age: this.model.edad,
        Email: this.model.email1,
        Phone: this.model.celular,
        DocumentType: this.model.typeDocument,
        DocumentNumber: this.model.numDocument
      },
      Oprice: {
        RealBase: this.ratePriceSel.baseAmount,
        RealTax: this.ratePriceSel.realTaxAmount,
        Total: this.ratePriceSel.totalAmount,
        Currency: this.ratePriceSel.currency,
        OpriceByPayment: pricePay
      },
      OextraInfoFlight: {
        FlightNumber: this.model.numeroVuelo,
        FrequentFlyer: "",
        Carrier: "",
      },
      OcancelationPolicy: this.carSelect.oselectCar.ocancelationPolicy,
      SearchType: "C",
      Ocompany: {
        companyDK: datos.oenterprise.codeDK,
        companyId: datos.oenterprise.id
      },
      UserID: datos?.userID,
      PurchaseNumber: this.purcharse
    };

    sessionStorage.setItem("ss_priceBase", JSON.stringify(this.priceBase));
    sessionStorage.setItem("rqCars", JSON.stringify(data));
  }

  comppletarReserva(): any {
    //VALIDAR CAMPOS
    let flagVal = 0;

    if ($.trim(this.model.nombre) === "") {
      flagVal++;
      $("#txtNombre").addClass("campo-invalido-vacio");
    } else {
      $("#txtNombre").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.apellido) === "") {
      flagVal++;
      $("#txtApellido").addClass("campo-invalido-vacio");
    } else {
      $("#txtApellido").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.email1) === "") {
      flagVal++;
      $("#txtEmail1").addClass("campo-invalido-vacio");
      $("#txtEmail2").addClass("campo-invalido-vacio");
    } else {
      $("#txtEmail1").removeClass("campo-invalido-vacio");
      $("#txtEmail2").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.email1) !== $.trim(this.model.email2)) {
      flagVal++;
      $("#txtEmail1").addClass("campo-invalido-vacio");
      $("#txtEmail2").addClass("campo-invalido-vacio");
    } else {
      $("#txtEmail1").removeClass("campo-invalido-vacio");
      $("#txtEmail2").removeClass("campo-invalido-vacio");
    }

   /*  if ($.trim(this.model.telPais) === "") {
      flagVal++;
      $("#xxxxxxxxxx").addClass("campo-invalido-vacio");
    } else {
      $("#xxxxxxxxxx").removeClass("campo-invalido-vacio");
    } */

    if ($.trim(this.model.celular) === "") {
      flagVal++;
      $("#txtCelular").addClass("campo-invalido-vacio");
    } else {
      $("#txtCelular").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.edad) === "") {
      flagVal++;
      $("#txtEdad").addClass("campo-invalido-vacio");
    } else {
      $("#txtEdad").removeClass("campo-invalido-vacio");
    }

    if (flagVal > 0) {
      return false;
    }
    let datos = this.head.getDataLogin();
    const pricePay = {
      TypeOfPayment: this.ratePriceSel.lpriceByPayments[0].typeOfPayment,
      ChargesAmount: this.ratePriceSel.lpriceByPayments[0].chargesAmount,
      FinalAmount: this.ratePriceSel.lpriceByPayments[0].finalAmount
    }

    const data = {
      Token: this.carSelect.oselectCar.token,
      Language: "es",
      OInformation: {
        TermsAndConditions: this.carSelect.oselectCar.termsAndConditions,
        PaymentCode: this.ratePriceSel.paymentCode,
        RateId: this.extraRatesSel.rateId,
        CompanyCode:
          this.carSelect.oselectCar.oinformation.ocarInfo.companyCode,
        SippCode: this.ratePriceSel.sippCode,
        Ccrc: this.carSelect.oselectCar.oinformation.ocarInfo.ccrc,
        PromotionalCode: "",
        PickUpLocation:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpLocation,
        DropOffLocation:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffLocation,
        PickUpDate:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpDate,
        DropOffDate:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffDate,
        PickUpHour:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpHour,
        DropOffHour:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffHour,
        PickUpAddress:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.pickUpAddress,
        DropOffAddress:
          this.carSelect.oselectCar.oinformation.oitineraryInfo.dropOffAddress,
        Laditionals: this.listAditionalCheck,
        OnHold: false,
        
      },
      Opassenger: {
        FirstName: this.model.nombre,
        LastName: this.model.apellido,
        Age: this.model.edad,
        Email: this.model.email1,
        MembershipNumber:  this.model.celular,
        Phone: this.model.celular,
        DocumentType: this.model.typeDocument,
        DocumentNumber: this.model.numDocument
      },
      Oprice: {
        RealBase: this.ratePriceSel.baseAmount,
        RealTax: this.ratePriceSel.realTaxAmount,
        Total: this.ratePriceSel.totalAmount,
        Currency: this.ratePriceSel.currency,
        OpriceByPayment: pricePay
      },
      OextraInfoFlight: {
        FlightNumber: this.model.numeroVuelo,
        FrequentFlyer: "",
        Carrier: "",
      },
      OcancelationPolicy: this.carSelect.oselectCar.ocancelationPolicy,
      SearchType: "C",
      Ocompany: {
        companyDK: datos.oenterprise.codeDK,
        companyId: datos.oenterprise.id
      },
      UserID: datos?.userID,
      PurchaseNumber: ""
    };


    this.head.mostrarSpinner();
    let flagResult = 1;
    this.carsService.confirmationCar(data).subscribe(
      (result: any) => {

        
        if (result.status === 500) {
          this.head.setErrorToastr(result.message);
        } else {
          sessionStorage.setItem("ss_confirma_reserva_alq", JSON.stringify(result));
          sessionStorage.setItem("ss_priceBase", JSON.stringify(this.priceBase));
          this.router.navigate(["cars/car-successful"]);
        }
      },
      (error) => {

        this.head.ocultarSpinner();
      },
      () => {
       /*  this.spinner.hide();
        if (flagResult === 1) {
          this.sessionStorageService.store("ss_priceBase", this.priceBase);
          this.router.navigate(["/auto-reserva-fin"]);
        } else {
          alert("Mucho tiempo");
          this.router.navigate(["/auto-search"]);
        } */
      }
    );
  }
}
