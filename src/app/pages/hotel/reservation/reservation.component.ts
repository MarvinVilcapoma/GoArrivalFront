import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { PassengerDataComponent } from './passenger-data/passenger-data.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { PayComponent } from './pay/pay.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @ViewChild(PassengerDataComponent) passengerData!: PassengerDataComponent;
  @ViewChild(ContactInformationComponent) contactData!: ContactInformationComponent;
  @ViewChild(PayComponent) payData!: PayComponent;

  lstPerson: any;
  validPassenger = false;

  lstCountries: any[] = [];
  /**
   *
   */
  data: any;
  dataRoom: any;
  lstDocument: any[] = [];
  dataHotel: any;
  lstGender: any[] = [];
  nombreTarjeta: string = "";
  constructor(private headService: HeaderService, private serviceF: FlightService,private service_ : HotelService,private router: Router) {


  }

  ngOnInit(): void {
    this.lstGender = [
      { name: 'Masculino', code: 'M' },
      { name: 'Femenino', code: 'F' }
    ];
    this.data = history.state.data;
    this.dataRoom = this.data.odata.oroom;
    this.dataHotel = this.data.odata.ohotel;
    this.lstPerson = this.data.lstPerson;
    /*  this.lstPerson = this.headService.desencriptar(this.lstPerson); */
    /*     this.data = this.cookie.get("infoReser");
        this.data = this.headService.desencriptar(this.data); */
    this.asembleRooms();
    this.getDocument();

  }

  getDocument() {
    this.serviceF.getDocument(false).subscribe(
      x => {
        this.lstDocument = x.ldata;
        this.getCountri();
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    );
  }

  getCountri() {

    this.serviceF.getCountries().subscribe(
      x => {
        this.lstCountries = x;
        this.lstCountries.forEach(element => {
          element.name = element.name + " " + element.phonePrefix;
        });
        this.validPassenger = true;
        this.headService.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    )
  }

  asembleRooms() {
    this.lstPerson.forEach((element: any) => {
      element.passenger = [];
      for (let index = 0; index < element.person; index++) {
        let obj: any = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          typeDocument: "",
          number: "",
          gender: "",
          birthDate: ""
        }
        element.passenger.push(obj)
      }
    });
  }

  convertDateExpired(value: any) {
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
    let year = value.getFullYear();
    year = year.toString();
    year = year.substring(2,4)
    
    fechaRetorno = mes +   year ;
    return fechaRetorno;
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
  

    fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
    return fechaRetorno;
  }

  getPhones() {
    return this.passengerData.lstPerson
      .flatMap((element: any) => element.passenger.map((pass: any) => pass.phone));
  }

  getEmails() {
    return this.passengerData.lstPerson
      .flatMap((element: any) => element.passenger.map((pass: any) => pass.email));
  }

  getPassengers() {
    return this.passengerData.lstPerson.flatMap((element: any) =>
      element.passenger.map((pass: any, index: number) => ({
        UserId: "",
        PassengerId: index+1,
        PersonId: "",
        Prefix: pass.gender === "F" ? 'MRS' : 'MR',
        Type: "ADT",
        Name: pass.firstName,
        LastName: pass.lastName,
        Gender: pass.gender,
        BirthDate: this.convertDate(pass.birthDate),
        IsVIP: false,
        Odocument: {
          Type: pass.typeDocument,
          Number: pass.number
        }
      }))
    );
  }

  determineCardType(numTarjeta: string) {
    const cardMap = [
      { prefix: /^4/, tipoTarjeta: 4, nombreTarjeta: "VI" },
      { prefix: /^5[1-5]/, tipoTarjeta: 1, nombreTarjeta: "MC" },
      { prefix: /^6[045]/, tipoTarjeta: 2, nombreTarjeta: "DS" },
      { prefix: /^3[47]/, tipoTarjeta: 3, nombreTarjeta: "AX" },
      { prefix: /^3(?:6|8|00[0-5])/, tipoTarjeta: 6, nombreTarjeta: "DC" },
      { prefix: /^(2131|1800|35)/, tipoTarjeta: 5, nombreTarjeta: "JC" },
    ];
  
    for (const card of cardMap) {
      if (card.prefix.test(numTarjeta)) {

        this.nombreTarjeta = card.nombreTarjeta;
        return this.nombreTarjeta;
      }
    }
  
    return "";
  }



  reservation() {
    this.headService.mostrarSpinner();
    let login = this.headService.getDataLogin();
    const data: any = {
      UserId: login.userID,
      Pseudo: this.data.pseudo,
      GDS: this.data.gds,
      Ocompany: {
        companyId: login.oenterprise.id
      },
      osession: this.data.odata.osession,
      Phones: this.getPhones(),
      Emails: this.getEmails(),
      LPassenger:this.getPassengers(),
      StartDate: this.dataRoom.startDate,
      EndDate: this.dataRoom.endDate,
      NumberPassengers: this.dataHotel.numberPassenger,
      OHotel: {
        CityCode: this.dataHotel.cityCode,
        Hotelcode: this.dataHotel.hotelCode,
        HotelName: this.dataHotel.hotelName,
        Latitude: this.dataHotel.oposition?.latitude,
        Longitude: this.dataHotel.oposition?.longitude,
        Starts: this.dataHotel.stars,
        Lamenities: this.dataHotel.lamenities,
        TypeDistance: this.dataHotel.oairportDistance?.type,
        Distance: this.dataHotel.oairportDistance?.distance,
        Address: this.dataHotel.address,
        Limagens: this.dataHotel.limagens
      },
      ORoom: {
        Name: this.dataRoom.name,
        Description: this.dataRoom.description,
        GuaranteeText: this.dataRoom.guarantee,
        NumberNights: this.dataHotel.numberNights,
        CheckIn: this.dataHotel.checkIn,
        CheckOut: this.dataHotel.checkOut,
        BookingCode: this.dataRoom.bookingCode,
        CorporateCode: this.dataRoom.ratePlanCode,
        Lamenities: this.dataHotel.lamenities,
      },
      LcancelPenalties: this.dataRoom.lcancelPenalties,
      OcreditCard: {
        CardType: this.determineCardType(this.payData.number),
        CardNumber: this.payData.number,
        SecurityId: this.payData.cvv,
        ExpiryDate: this.convertDateExpired(this.payData.dateExpired),
        Name: this.payData.name,
        LastName: this.payData.lastName
      },
      OInformationContact:
      {
        Name: this.contactData.nameContact,
        EmailAddress: this.contactData.correo,
        Numberphone: this.contactData.phone
      },
      opriceNewPrice: this.dataRoom.oprice
    }
    this.service_.generateReservation(data).subscribe(
      result => {
        const datos = { dataHotel: this.dataHotel, data: result}
        result.pnr != "" && result.pnr != null && result.pnr != undefined ?  this.router.navigate(["hotel/successful-reservation"], { state: { data: datos } }) : this.headService.setErrorToastr("Ocurrió un problema al realizar su reserva.")
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      }
    )
  }

}
