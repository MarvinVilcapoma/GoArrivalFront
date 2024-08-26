import { AfterContentInit, AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { PassengerDataComponent } from './passenger-data/passenger-data.component';
import { ExtraProfileComponent } from './extra-profile/extra-profile.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GenerateReservationRQ, ValidateReservationRQ } from 'src/models/flight/Flight.model';
import { ReasonTripComponent } from './reason-trip/reason-trip.component';
import { PassengerContactComponent } from './passenger-contact/passenger-contact.component';
import { Location } from '@angular/common';


declare var $: any;

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  @ViewChildren(PassengerDataComponent) hijos!: QueryList<PassengerDataComponent>;
  @ViewChildren(ExtraProfileComponent) hijos2!: QueryList<ExtraProfileComponent>;

  @ViewChild(PassengerDataComponent) passengerDataComponent!: PassengerDataComponent;
  @ViewChild(ExtraProfileComponent) extraProfileComponent!: ExtraProfileComponent;
  @ViewChild(ReasonTripComponent) reasonTripComponent!: ReasonTripComponent;
  @ViewChild(PassengerContactComponent) contactComponent!: PassengerContactComponent;

  datosuser: any;
  lstpaises: any[] = [];
  lstDocument: any[] = [];
  lstDocumentAdmin: any[] = [];
  gds: any;
  validPassenger = false;
  flight: any;
  typevuelo: any;
  reasonFlight!: any;
  profileFlight!: string;
  lapprovers: any[] = [];
  visibleModal: boolean = false;
  id: any;
  uids: any;
  pseudo: any;
  extraReason!: any;
  mensajeDuplicate: any[] = [];
  lextraProfiles: any;
  lstCostCenter: any[] = [];
  lstGeneral: any[] = [];
  lpolicias: any[] = [];
  loginData: any;
  profile = "";
  modalRef!: BsModalRef;
  recomendacion: any;
  validSeat = false;
  validBag = false;
  ifExtraReason = false;
  validHotel = false;
  dataSeats: any;
  priceSeat: any;
  maletas: any;
  dataHotel: any;
  contacoVal: any = "";
  stateFlighList: any;
  bolet: any = {
    IsRucAgency: true,
    TypeDocument: "",
    NumberDocument: "",
  }
  showPassengers : boolean = true;
  dataEnd: any;
  public myObject!: { id: number, myObject: { myString: string } };
  public usuarios!: { id: number, myObject: { myString: string } };
  constructor(private location: Location, private router: Router, private headService: HeaderService, private cookie: CookieService, private flightService: FlightService) { }

  ngOnInit(): void {
    /*  this.datosuser = this.cookie.get("PSG987"); */

    this.headService.mostrarContador();

    this.dataSeats = this.cookie.get("ss_passengerAsientos");
    this.dataSeats = this.headService.desencriptar(this.dataSeats);
    if (this.dataSeats != null && this.dataSeats != undefined) {
      this.validSeat = true;
    }

    this.maletas = this.cookie.get("ss_dataMaletaInfo");
    this.maletas = this.headService.desencriptar(this.maletas);
    if (this.maletas != null && this.maletas != undefined) {
      this.validBag = true;
    }

    let token: any = sessionStorage.getItem('passengers');
    this.datosuser = this.headService.desencriptar(token);
    this.traerData();
    this.getPaises();

  }



  recibirPrice(valor: any) {
    this.priceSeat = valor;
  }

  traerData() {
    let datos = history.state.data;
    this.dataEnd = datos;
    if (this.dataEnd.hotel != null) {
      this.dataHotel = this.dataEnd.hotel;
      this.validHotel = true;
    }
    this.gds = datos.recomen.gds;
    this.uids = datos.rpta.lcompanyUid;
    this.stateFlighList = datos.stateFlighList;
    this.loginData = this.cookie.get('cookieLogin');
    this.loginData = this.headService.desencriptar(this.loginData);
    this.ifExtraReason = datos.rpta.oconfiguration?.extraReason;
    this.lstCostCenter = datos.rpta.lcostCenter;
    this.recomendacion = datos.recomen;
    this.lpolicias = datos.rpta.lpolicy;
    this.pseudo = datos.recomen.pseudo;
    this.lextraProfiles = datos.rpta.lextraProfile;
    this.typevuelo = datos.typeFlight;
    this.flight = datos.rpta;
    this.validPassenger = true;

    console.log(datos);
    console.log(this.loginData);
  }

  obtenerValoresInputHijos() {

    let valor = true;
    this.lstGeneral = [];
    let lstPassengers: any[] = [];
    this.hijos2.forEach((hijo2: ExtraProfileComponent) => {
      this.profile = hijo2.valor;
    });
    this.hijos.forEach((hijo: PassengerDataComponent) => {
      this.concatList(hijo.lstUidsRq);
      lstPassengers.push(hijo.user);

      valor = this.validarCampos(hijo, valor);
      valor = this.validarUids(hijo.lstSelects, hijo.index, valor);
      valor = this.validarUidsInputs(hijo.lstInputs, hijo.index, valor);
      valor = this.validMotivo(valor);
      valor = this.validRuc(valor);
      valor = this.validarContacto(valor);
    });
    if (valor) {
      this.getApprovers(lstPassengers);
    }

  }

  validarUidsInputs(lst: any, index: any, valid: any) {

    lst.forEach((element: any) => {
      if (element.isMandatory) {
        let idset = "#input_" + element.code + "_" + index;
        let id = "input_" + element.code + "_" + index;
        let valor = $(idset).val();
        if (valor === '') {
          valid = false;
          this.setBorder(id);
        }
      }
    });

    return valid;
    
  }

  validRuc(valor: any){

    if(this.headService.isConsolidator()){
      if(this.contactComponent.valueCheck === "D"){
        if(this.contactComponent.selectDoc === ""){
          valor = false;
          this.setBorder('documentoContacto')
        }
        if(this.contactComponent.numberDoc === ""){
          valor = false;
          this.setBorder('nroDocumentBoleta')
        }
      }
    }

    if(this.headService.isConsolidator()){
      
    }

    return valor;
  }

  validMotivo(valor: any){

    if(this.flight.lreason?.length > 0){
      if(this.reasonTripComponent?.selectedReason === ""){
        valor = false;
        this.setBorder('cbomotivo')
      }
    }

    if(this.headService.isConsolidator()){
      
    }

    return valor;
  }

  validarContacto(valor: any) {
    const campos = ['nombrecontacto', 'contactocorreo', 'contactotelefono'];
    const camposRequeridos = ['documentoContacto', 'nroDocumentBoleta', 'reason'];
    const extras: any = { reason: this.ifExtraReason };
    const isRucAgency = this.headService.isConsolidator() && !this.bolet.IsRucAgency;

    for (const campo of campos) {
      const valorCampo = $("#" + campo).val();
      if (valorCampo === '') {
        valor = false;
        this.setBorder(campo);
      }
    }

    for (const campo of camposRequeridos) {
      if ((extras[campo] && $("#" + campo).val() === '') || (isRucAgency && campo !== 'reason')) {
        valor = false;
        this.setBorder(campo);
      }
    }

    return valor;
  }

  validarUids(lst: any, index: any, valid: any) {
    lst.forEach((element: any) => {
      if (element.isMandatory) {
        let idset = "#select_value_" + element.code + "_" + index;
        let id = "select_value_" + element.code + "_" + index;
        let otro = "otros_" + element.code + "_" + index;
        let valor: any = document.getElementById(id);
        if (element.code === 'U5'){
          if (valor.textContent === 'Seleccionar') {
            valid = false;
            this.setBorder(id);
          } else if (element.value === 'OTROS') {
            let otros: any = document.getElementById(otro)
            if (otros.value === ""){
              valid = false;
              this.setBorder(otro);
            }
          } 
          
        } else {
          if (element.value === '' || element.value === null || element.value === undefined) {
            valid = false;
            this.setBorder(id);
          } else if (element.value === 'OTROS') {
            let otros: any = document.getElementById(otro)
            if (otros.value === ""){
              valid = false;
              this.setBorder(otro);
            }
            
          }
        }
        
      }
    });
    return valid;
  }

  setBorder(id: any) {
    this.id = document.getElementById(id);
    this.id.style.border = "1px solid #ED1C24";
    this.id.style.borderRadius = "7px";
  }

  validarCampos(hijo: any, valor: any) {
    let index = hijo.index;
    const campos = ['txttelefono', 'txtcorreo', 'txtnrodocumento', 'txtnombre', 'txtapellidos', 'txtfecha'];
    const camposRequeridos = ['cbo_nacionalidad', 'cbo_tipodocumento'];

    if(hijo.user.lpersonDocuments[0].docNumber === ""){
      valor = false;
      this.setBorder('cbo_nacionalidad' + '_' + index);    
    }

    if(hijo.user.lpersonDocuments[0].docTypeId === ""){
      valor = false;
      this.setBorder('cbo_tipodocumento' + '_' + index);    
    }

    for (const campo of campos) {
      const valorCampo = $('#' + campo + '_' + index).val();
      if (valorCampo === '') {
        valor = false;
        this.setBorder(campo + '_' + index);
      }
    }


    return valor;
  }

  concatList(lst: any) {
    this.lstGeneral = this.lstGeneral.concat(lst);
  }

  armPassengers(lst: any) {
    let passengers: any[] = [];
    lst.forEach((element: any) => {
      let passenger = {
        Email: element.email,
        LastName: element.lastName,
        Name: element.firstName,
        PersonId: element.personId,
        Phone: element.phone,
        UserId: element.userId,
        costCenterCode: element.ocostCenter?.ValueUid,
        costCenterDescription: element.ocostCenter?.ValueUid
      }
      passengers.push(passenger);
    });
    return passengers;
  }

  valiDuplicatePNR(lstPassengers: any) {
    this.showPassengers = false;
    let datos = this.headService.getDataLogin();
    let data: ValidateReservationRQ = {
      Ouser : {
        UserID: datos.userID,
        PersonID: datos.personID,
        Name: datos.name,
        LastName: datos.lastName,
        Email: datos.email
      },
      Gds: this.gds,
      Pseudo: this.pseudo,
      TypeSearch: "C",
      TypeFlight: this.typevuelo,
      IsFlightNational: this.recomendacion.isFlightNational,
      Lsection: this.recomendacion.lsection,
      Oprice: {
        Currency: this.flight.oprice.currency,
        TotalAmount: this.flight.oprice.totalAmountWithCharges
      },
      Lpassenger: this.armarPassengers(lstPassengers),
      Oconfiguration: this.flight.oconfiguration,
      Oenterprise: this.headService.getCompany()

    };
    this.flightService.validateReservation(data).subscribe(
      x => {
    
        if (x?.length === 0) {
          this.armarReserva(lstPassengers);
        } else {
          this.mensajeDuplicate = x;
          this.visibleModal = true;
          this.headService.ocultarSpinner();
          this.showPassengers = true;
        }
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
        this.showPassengers = true;
      }
    )
  }

  convertDate(value: any) {
    let fechaRetorno = "";
    let mes = "";
    if ((value.getMonth() + 1) < 10) {
      mes = "0" + (value.getMonth() + 1);
    } else {
      mes = "" + (value.getMonth() + 1);
    }

    let dia = "";
    if (value.getDate() < 10) {
      dia = "0" + value.getDate();
    } else {
      dia = "" + value.getDate();
    }
    $("#salida").removeClass("campo-invalido");

    fechaRetorno = value.getFullYear() + "-" + mes + "-" + dia;
    return fechaRetorno;
  }

  transform(value: any): any {
    let fechatotal;
    if (value instanceof Date) {

    } else {
      let fecha = value;
      let fechaformat = fecha.split('/');
      let año = fechaformat[2];
      let mes = fechaformat[1];
      let dia = fechaformat[0];
      fechatotal = año + '-' + mes + '-' + dia;
      return fechatotal;
    }


  }

  armarPassengers(lst: any) {
    let i = 0;
    let pasajeros: any[] = [];
    lst.forEach((element: any) => {
      i++;
      let dfecha = $("#txtfecha_" + i).val();;
      let typeDoc: string = "";
      switch (element.lpersonDocuments[0].docTypeId) {
        case 'F3F05B20-412E-4A1A-BA31-B69B1E6D0392':
          typeDoc = "NI"
          break;
          case 'DD8D0D83-5E9B-4377-AC1A-A4A806EB0C3A':
          typeDoc = "PP"
          break;
          case '7F0B8721-FC7F-4735-A1AD-7DD8EC485A3C':
          typeDoc = "CE"
          break;
          
      }
      element.tratamiento === "MRS" ? element.gender = "F" : element.gender = "M";

      let obj = {
        birthDate: element.birthDate,
        email: element.email,
        frequentFlyer: element.frequentFlyer,
        gender: element.gender,
        isVIP: element.isVIP === "" ? false : element.isVIP,
        lastName: element.lastName,
        name: element.firstName,
        documentType: typeDoc,
        documentNumber: element.lpersonDocuments[0].docNumber,
        roleID: element.orole?.id,
        passengerId: i,
        personID: element.personId,
        phone: element.phone,
        countryOrigin: element.countryIataCode,
        prefix: element.tratamiento,
        type: element.type === undefined || element.type === null ? 'ADT' : element.type,
        userID: element.userId,
        luids: []
      }
      pasajeros.push(obj);
    });

    if (this.lstGeneral?.length > 0)
      this.lstGeneral.forEach(element => {
        let i: any = parseFloat(element.PassengerId);
        let item: any = { Code: element.CodeUid, Value: element.ValueUid }
        pasajeros[i - 1].luids.push(item);
      });

    return pasajeros;
  }



  userApprovers(datosuser: User[]): { UserID: string, CostCenterID: any }[] {
    
    return datosuser.map(({ userId, ocostCenter }) => ({
      UserID: userId,
      CostCenterID: ocostCenter != null && ocostCenter.CodeUid === 'U5' ? ocostCenter.id : 0
    }));
  }

  getApprovers(lstPassengers: any) {
    this.headService.mostrarSpinner();
    const data = {
      IsFlightNational: this.recomendacion.isFlightNational,
      HasInfractionPolicy: this.flight.lpolicy != null ? (this.flight.lpolicy.length > 0 ? true : false) : false,
      PolicyImpact: 0,
      Oprice: {
        Currency: this.flight.oprice.currency,
        TotalAmount: this.flight.oprice.totalAmount
      },
      Oenterprise: this.headService.getCompany(),
      Lpassenger: this.userApprovers(this.datosuser)
    }
    this.flightService.getApprovers(data).subscribe(
      result => {
        result.status === 200 ? this.lapprovers = result.ldata : this.lapprovers = [];
        this.valiDuplicatePNR(lstPassengers);
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    )
  }



  armarReserva(lstPassengers: any) {
 /*    if (!this.headService.isConsolidator()) {
      this.bolet = null;
    } else {
      let typeDocboleta = $('#cboTypeDocBol').val();
      if (typeDocboleta === null) {
        typeDocboleta = 'RUC';
      }
      let numerodocboleta = $('#nroDocumentBoleta').val();
      this.bolet.TypeDocument = typeDocboleta;
      this.bolet.NumberDocument = numerodocboleta;
    } */


    let datos = this.headService.getDataLogin();
 

    const data : GenerateReservationRQ = {
      IsConsolidatedPayment: false,
      CanEmission: false,
      ExtraProfile: this.lextraProfiles?.length > 0 ? this.extraProfileComponent.valor : "",
      ExtraReason: this.reasonTripComponent != undefined ?  this.reasonTripComponent.valorExtra : "",
      IsFlightNational: this.recomendacion.isFlightNational,
      Gds: this.gds,
      Lapprover: this.lapprovers,
      Oconfiguration: this.flight.oconfiguration,
      Lpassenger: this.armarPassengers(lstPassengers),
      Lpolicy: this.lpolicias,
      Lsection: this.flight.lsection,
      FormOfPayment: "",
      Ocontact: {
        Email: $("#contactocorreo").val(),
        Name: $("#nombrecontacto").val(),
        Phone: $("#contactotelefono").val()
      },
      Ouser : {
        UserID: datos.userID,
        PersonID: datos.personID,
        Name: datos.name,
        LastName: datos.lastName,
        Email: datos.email
      },
      Oancillaries: null,
      CarrierCode: this.recomendacion.ocarrier.code,
      AlternativeFareBasis: this.flight.alternativeFareBasis,
      Oenterprise: this.headService.getCompany(),
      Odocumentation: {
        IsRucAgency: this.contactComponent.valueCheck === "R" ? true : false,
        TypeDocumentation: this.contactComponent.valueCheck === "D" ? 'DNI' : "",
        Name: this.contactComponent.valueCheck === "D" ? this.contactComponent.nombre : "",
        LastName: "",
        Email: this.contactComponent.valueCheck === "D" ? this.contactComponent.correo : "",
        DocumentType: this.contactComponent.valueCheck === "D" ? this.contactComponent.selectDoc : "",
        DocumentNumber: this.contactComponent.valueCheck === "D" ? this.contactComponent.numberDoc : "",
      },
      ooffer: this.flight.ooffer,
      OfferID: this.recomendacion.offerID,
      Oprice: this.flight.oprice,
      Pseudo: this.pseudo,
      ReasonFlightID: this.reasonTripComponent != undefined ? this.reasonTripComponent.selectedReason : 0,
      TypeFlight: this.typevuelo,
      TypeSearch: this.headService.getTypeSearch(),
      UserID: this.loginData.userID,
      osession: this.flight.osession
    }

    const dataReservation = {
      datosVariados: this.dataEnd,
      generateRQ: data,
      statePassengerData: this.dataEnd,
      hotel: this.dataEnd.hotel
    }

    this.router.navigate(["flights/generate-reservation"], { state: { data: dataReservation } });

  
  }

  volver() {
    this.headService.mostrarSpinner();
    let lista : any[] = [];
    lista = this.stateFlighList.result.odata.lrecommendation;
    lista = lista.map(item => ({ ...item, isVisible: true }));
    this.stateFlighList.result.odata.lrecommendation = lista;
    /* this.location.back(); */
    this.router.navigate(["flights/flight-list"], { state: { data: this.stateFlighList } });
  }

  getPaises() {
    this.flightService.getCountries().subscribe(
      x => {
        x.forEach((element: any) => {
          element["fullName"] = element.name + element.phonePrefix;
        });
        this.lstpaises = x;
        this.getDocument();
        this.getDocumentAdmin();
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    )
  }

  updateReasonFlight($event: any) {
    this.reasonFlight = $event
  }



  updateExtraReason($event: any) {
    this.extraReason = $event
  }

  getDocument() {
    this.flightService.getDocument(false).subscribe(
      x => {
        this.lstDocument = x.ldata;
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    );
  }

  getDocumentAdmin() {
    this.flightService.getDocument(true).subscribe(
      x => {
        this.lstDocumentAdmin = x.ldata;
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    );
  }

}


interface User {
  userId: string;
  ocostCenter: any;
}