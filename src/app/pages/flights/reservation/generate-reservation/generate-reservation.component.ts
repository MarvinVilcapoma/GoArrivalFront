import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-generate-reservation',
  templateUrl: './generate-reservation.component.html',
  styleUrls: ['./generate-reservation.component.css']
})
export class GenerateReservationComponent implements OnInit {

  @Output() isReservation = new EventEmitter<any>();
  flight: any;
  validPassenger = false;
  datosuser: any;
  lapprovers: any;
  lpolicies: any;
  updateAproval: any;
  company: any;
  currency: any;
  priceSeat: any;
  request: any;
  nombreTarjeta: any;

  numberCreditCard: string = "";
  expirationDate: any = "";
  cvv: string = "";
  nameCreditCard: string = "";
  lastNameCreditCard: string = "";
  maxDate!: Date;
  dataSeats: any;
  maletas: any;
  validSeat = false;
  validBag = false;
  dataHotel: any;
  ingredient: string = "CIP";
  validHotel = false;
  statePassengerData: any;
  updateAprobarl = true;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(private router: Router, public headService: HeaderService, private cookieServices: CookieService, private service: FlightService, private hotelser: HotelService) { }


  ngOnInit(): void {
    this.maxDate = new Date()
    this.traerPassenger();
    this.dataSeats = this.cookieServices.get("ss_passengerAsientos");
    this.dataSeats = this.headService.desencriptar(this.dataSeats);
    if (this.dataSeats != null && this.dataSeats != undefined) {
      this.validSeat = true;
    }


    this.maletas = this.cookieServices.get("ss_dataMaletaInfo");
    this.maletas = this.headService.desencriptar(this.maletas);
    if (this.maletas != null && this.maletas != undefined) {
      this.validBag = true;
    }

    /* this.dataHotel = this.cookieServices.get("infohotel_cross");
    this.dataHotel = this.headService.desencriptar(this.dataHotel);
    if (this.dataHotel != null && this.dataHotel != undefined) {
      this.validHotel = true;
    } */
  }

  ocultarHotel(valor_: any) {
    this.validHotel = valor_;
  }

  recibirPrice(valor: any) {
    this.priceSeat = valor;
  }

  actualizarApprovers(valor_ : any){
    this.request.Lapprovers = valor_;
  }



  traerPassenger() {

    let token: any = sessionStorage.getItem('passengers');
    this.datosuser = this.headService.desencriptar(token);
    let datos = history.state.data;
      if (datos.hotel != null) {
        this.dataHotel = datos.hotel;
        this.validHotel = true;
      }
      this.statePassengerData = datos.statePassengerData;
      this.flight = datos.datosVariados.rpta;
      this.currency = this.flight.oprice.currency;
      this.lpolicies = this.flight.lpolicy;
      this.updateAprobarl = this.flight.oconfiguration?.updateApprovers;
      this.company = this.cookieServices.get('cookieLogin');
      this.company = this.headService.desencriptar(this.company);
      this.request = datos.generateRQ;
      this.lapprovers = datos.generateRQ.Lapprover;
      this.validPassenger = true;
      this.headService.ocultarSpinner();


   
  }

  ValidarSoloNumero(event: any): any {
    // tslint:disable-next-line: max-line-length
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 8 && event.keyCode !== 9) {
      return false;
    }
  }

  Solotexto(event: any): any {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  volver() {
    this.router.navigate(["flights/passenger-data"],{state:{data:this.statePassengerData}});
  }

  llenarTarjeta() {
    const campos = ['nombreAnci', 'numAnci', 'fecAnci', 'passAnci'];
    let tarj: any = {};
  
    for (const campo of campos) {
      const valor = $('#' + campo).val();
      const style: any = document.getElementById(campo);
  
      if (!valor) {
        style.style.border = "1px solid red";
        return null;
      } else {
        style.style.border = "1px solid #cccccc";
      }
  
      if (campo === 'fecAnci' && valor) {
        const fecha = valor.split("-");
        const mes = fecha[1];
        const anio = fecha[0].substr(2, 2);
        tarj['ExpiryDate'] = mes + anio;
      }
  
      tarj[this.obtenerNombreCampo(campo)] = valor;
    }
  
    this.validarTarjeta();
    tarj['TotalAmount'] = 0;
  
    return tarj;
  }
  
  obtenerNombreCampo(campo: string): string {
    switch (campo) {
      case 'nombreAnci':
        return 'Name';
      case 'numAnci':
        return 'Number';
      case 'fecAnci':
        return 'ExpiryDate';
      case 'passAnci':
        return 'Ccv';
      case 'apeAnci':
        return 'LastName';
      default:
        return '';
    }
  }

  llenarTarjetaHotel() {
    const campos = ['nombreAnci', 'numAnci', 'fecAnci', 'passAnci'];
    let tarj: any = {};
  
    for (const campo of campos) {
      const valor = $('#' + campo).val();
      const style: any = document.getElementById(campo);
  
      if (!valor) {
        style.style.border = "1px solid red";
        return null;
      } else {
        style.style.border = "1px solid #cccccc";
      }
  
      if (campo === 'fecAnci' && valor) {
        const fecha = valor.split("-");
        const mes = fecha[1];
        const anio = fecha[0].substr(2, 2);
        tarj['ExpiryDate'] = mes + anio;
      }
  
      tarj[this.obtenerNombreCampoHotel(campo)] = valor;
    }
  
    if (tarj['CardNumber']) {
      this.validarTarjeta();
    }
  
    return tarj;
  }
  
  obtenerNombreCampoHotel(campo: string): string {
    switch (campo) {
      case 'nombreAnci':
        return 'Name';
      case 'numAnci':
        return 'CardNumber';
      case 'fecAnci':
        return 'ExpiryDate';
      case 'passAnci':
        return 'Ccv';
      case 'apeAnci':
        return 'LastName';
      default:
        return '';
    }
  }

  validarTarjeta() {
    const numTarjeta = $('#numAnci').val()?.toString();
  
    if (!numTarjeta) return;
  
    const firstTwoDigits = numTarjeta.substring(0, 2);
  
    if (numTarjeta.startsWith("4")) {
      this.nombreTarjeta = "VI";
    }
    else if (["51", "52", "53", "54", "55"].includes(firstTwoDigits)) {
      this.nombreTarjeta = "MC";
    }
    else if (["60", "64", "65"].includes(firstTwoDigits)) {
      this.nombreTarjeta = "DS";
    }
    else if (["34", "37"].includes(firstTwoDigits)) {
      this.nombreTarjeta = "AX";
    }
    else if (["36", "38", "300", "301", "302", "303", "304", "305"].includes(firstTwoDigits) ||
      numTarjeta.startsWith("2131") || numTarjeta.startsWith("1800") || firstTwoDigits === "35") {
      this.nombreTarjeta = "DC";
    }
    else {
      this.nombreTarjeta = "JC";
    }
  }



  anciliares() {
    let datas = this.cookieServices.get("ss_rqAsientos");
    datas = this.headService.desencriptar(datas);
    let fee = this.cookieServices.get("feeAncilliares");
    fee = this.headService.desencriptar(fee);
    let obj = {
      Lpassenger: null,
      OformOfPayment: this.llenarTarjeta(),
      Lseat: datas,
      OfeeAncillaries: fee
    }
    return obj;
  }

  generateReservationCrosselling() {
    this.headService.mostrarSpinner();
    let habi: any = this.cookieServices.get("inforoom");
    habi = this.headService.desencriptar(habi);
    let subRoom = {
      BookingCode: habi.oroom.bookingCode,
      CheckIn: habi.oroom.checkIn,
      CheckOut: habi.oroom.checkOut,
      CorporateCode: habi.oroom.ratePlanCode,
      Description: habi.oroom.description,
      GuaranteeText: habi.oroom.guarantee,
      Lamenities: this.dataHotel.lamenities,
      Name: habi.oroom.name,
      NumberNights: this.dataHotel.numberNights,
    }

    let subhotel = {
      Address: this.dataHotel.address,
      CityCode: this.dataHotel.cityCode,
      Distance: null,
      HotelCode: this.dataHotel.code,
      HotelName: this.dataHotel.name,
      Lamenities: this.dataHotel.lamenities,
      Latitude: this.dataHotel.oposition?.latitude,
      Limagens: this.dataHotel.limagens,
      Longitude: this.dataHotel.oposition?.longitude,
      Starts: this.dataHotel.stars,
      Type: this.dataHotel.typeHotel,
      TypeDistance: null,
    }
    let objHotel = {
      EndDate: this.dataHotel.endDate,
      LcancelPenalties: this.dataHotel.oroomHotel?.lcancelPenalties,
      NumberPassengers: this.dataHotel.numberPassenger,
      OHotel: subhotel,
      ORoom: subRoom,
      Osession: habi.osession,
      StartDate: this.dataHotel.startDate
    }


    let total = this.dataHotel.oprice.pricePerAllNights + this.request.Oprice.totalAmount;
    let objPrecio = {
      ChargesAmount: this.dataHotel.oprice.chargesAmount,
      Currency: this.dataHotel.oprice.currency,
      PriceAllNights: this.dataHotel.oprice.pricePerAllNights,
      PriceFlight: this.request.Oprice.totalAmount,
      PricePerNight: this.dataHotel.oprice.pricePerNight,
      TotalAmount: total
    }

    let seccion: any[] = [];
    this.request.Lsection.forEach((element: any) => {
      const obj = {
        Oorigin: element.oorigin,
        Odestination: element.odestination,
        Oschedule: element.oschedule,
        departureDate: element.departureDate,
        departureDateShow: element.departureDateShow,
      }
      seccion.push(obj);
    });

    let objFliht = {
      Lsections: seccion,
      Emission: false,
      Osession: this.request.osession,
      TypeFlight: this.request.TypeFlight,
      Oancillaries: this.validAnciliares()
    }
    let objeto = {
      GDS: this.request.Gds,
      Oenterprise: this.headService.getCompany,
      Lpassenger: this.request.Lpassenger,
      OcontactInfo: this.request.Ocontact,
     /*  OcreditCard: this.llenarTarjetaHotel(), */
     OcreditCard: {
      CardNumber: this.numberCreditCard,
      Ccv: this.cvv,
      ExpiryDate: this.expirationDate,
      Name: this.nameCreditCard + " " + this.lastNameCreditCard
     },
      Odocumentation: null,
      Oflight: objFliht,
      Ohotel: objHotel,
      Oprice: objPrecio,
      Pseudo: this.request.Pseudo,
      TypeSearch: this.headService.getTypeSearch(),
      UserId: this.request.UserID
    }
    this.hotelser.GenerateFlightHotel(objeto).subscribe(
      x => {

        
        const data: any = {
          result: x,
          lpassengers: this.datosuser
        }
        x.ostatus.status === 500 ? this.headService.setErrorToastr(x.ostatus?.message) : this.isReservation.emit(data);
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      }
    )
  }

  validAnciliares() {
    if (this.validSeat && this.priceSeat != 0) {
      return this.anciliares();
    } else {
      return null;
    }
  }

  generateFlightReservation(valor_: any){
    this.headService.isConsolidator() === true ? this.ingredient = this.ingredient : this.ingredient = "";
    this.request.Oancillaries = this.validAnciliares();
    this.request.CanEmission = valor_;
    this.request.IsConsolidatedPayment = this.ingredient === "CIP" || this.ingredient === "" ? false : true,
    this.request.FormOfPayment = this.ingredient === "CIP" ? 'PE' : "";
    this.service.generateReservation(this.request).subscribe(
      x => {
        const data: any = {
          result: x,
          lpassengers: this.datosuser
        }
        this.isReservation.emit(data);
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      }
    )
  }

  generateReservation(valor_: any) {
    this.headService.mostrarSpinner();
    !this.validHotel ? this.generateFlightReservation(valor_) : this.generateReservationCrosselling();
  }



}

