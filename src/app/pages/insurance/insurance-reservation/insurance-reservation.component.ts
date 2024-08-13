import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';

interface Documento {
  name: string;
  code: string;
}

@Component({
  selector: 'app-insurance-reservation',
  templateUrl: './insurance-reservation.component.html',
  styleUrls: ['./insurance-reservation.component.css']
})
export class InsuranceReservationComponent implements OnInit {
  messages1: Message[] | any;
  messages2: Message[] | any;
  messages3: Message[] | any;
  documents: Documento[] | any;
  lstpaises: any[] = [];
  lstDocument: any[] = [];
  selectedType: Documento | any;
  card: any;
  lstPassenger: any[] = [];
  classChk: string = "";
  transaction: string = "B";
  request: any;
  nameContact: string = "";
  lastNameContact: string = "";
  typeContact: string = "";
  numberContact: string = "";
  countryContact: string = "";
  phoneContact: string = "";
  emailContact: string = "";
  checked: boolean = false;
  nameBoleta: string = "";
  emailBoleta: string = "";
  typeDocBoleta: string = "";
  numeroDocBoleta: string = "";
  disabledBtn: boolean | any = true;
  idRuc: string = "50FC2C8B-9304-4CEC-AE6A-D88739071B7A";
  validInput: boolean = true;
  
  phonePrefix: string = "";
  phoneNumberWithoutPrefix : string = "";
  constructor(private flightService: FlightService, private service: InsuranceService, private router: Router, private head: HeaderService) { }

  ngOnInit(): void {
    const data = history.state.data;
    data != undefined ? this.setData(data) : this.router.navigate(["insurance"]);
  }

  setData(data: any) {
    this.card = data.card;
    this.request = data.request;
    this.assemblePassenger(data.request.Lpassenger);
    this.getPaises();
    this.getDocument();
    this.documents = [
      { name: 'Masculino', code: 'M' },
      { name: 'Femenino', code: 'F' },
    ];
    this.messages1 = [
      { severity: 'info', summary: '', detail: 'Ingrese correctamente sus datos, recuerde que serán enviados a la aerolínea tal y como lo ingrese.' },
    ];
    this.messages2 = [
      { severity: 'info', summary: '', detail: 'A partir de 70 años, el monto aumenta 50%.' },
    ];
    this.messages3 = [
      { severity: 'info', summary: '', detail: 'A partir de 75 años, el monto aumenta 100%.' },
    ];
  }

  setBorder(id: any, color: string) {
    let idHtml: any = "";
    idHtml = document.getElementById(id);
    idHtml.style.border = "1px solid " + color;
    idHtml.style.borderRadius = "7px";
    this.validInput = false;
  }

  validInputs() {
    this.lstPassenger.forEach((element: any, index: number) => {
      if (element.name === "") this.setBorder('name_' + index, "#ED1C24");
      if (element.lastName === "") this.setBorder('lastname_' + index, "#ED1C24");
      if (element.odocument.documentType === "") this.setBorder('type_' + index, "#ED1C24");
      if (element.odocument.documentNumber === "") this.setBorder('numberdocument_' + index, "#ED1C24");
      if (element.country === "") this.setBorder('country_' + index, "#ED1C24");
      if (element.phone === "") this.setBorder('phone_' + index, "#ED1C24");
      if (element.email === "") this.setBorder('email_' + index, "#ED1C24");
      if (element.birthDate === "") this.setBorder('birthdate_' + index, "#ED1C24");
      if (element.gender === "") this.setBorder('gender_' + index, "#ED1C24");
    });

    if (this.nameContact === "") this.setBorder('nameContact', "#ED1C24");
    if (this.lastNameContact === "") this.setBorder('lastNameContact', "#ED1C24");
  }

  chkRequired() {
    this.classChk = "ng-invalid ng-dirty";
    this.validInput = false;
  }

  getPaises() {
    this.flightService.getCountries().subscribe(
      x => {
        this.lstpaises = x;
        console.log(this.lstpaises);
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  // onCountryChange(event: any) {
  //   const selectedCountryCode = event.value;
  //   const selectedCountry = this.lstpaises.find((country) => country.iataCode === selectedCountryCode);
  //   if (selectedCountry) {
  //     this.phonePrefix = selectedCountry.phonePrefix;
  //   }
  // }


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

      return value;
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

      return value;
    }
  }

  getDocument() {
    this.flightService.getDocument(true).subscribe(
      x => {
        this.lstDocument = x.ldata;
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    );
  }

  serviceReservation() {
    this.head.mostrarSpinner();
    const data = {
      UserCode: "",
      ProductCode: this.card.code,
      QuoteCode: this.card.quoteCode,
      Days: this.card.days,
      SearchType: "C",
      System: "GoArrival",
      Source: "web",
      FlightNational: this.request.flightNational,
      TransactionCode: "100",
      InitialDate: this.onValueChangeSalida(this.request.InitialDate),
      FinalDate: this.onValueChangeRetorno(this.request.FinalDate),
      FormOfPayment: '',
      Lpassenger: this.lstPassenger.map(passenger => ({
        ...passenger,
        birthDate: this.onValueChangeSalida(passenger.birthDate)
      })),
      Ocontact: {
        ContactName: this.nameContact,
        ContactPhone: this.lastNameContact
      },
      Oprice: {
        ChargesAmount: 0,
        CommissionAmount: 0,
        Currency: this.card.currency,
        ServiceAmount: 0,
        TotalAmount: this.card.totalAmount
      },
      Ocompany: null,
    };

    this.service.getReservation(data).subscribe(
      result => {
        const datos = {
          card: this.card,
          result: result
        }
        result.lpassengers?.length > 0 ? this.router.navigate(["insurance/insurance-successful"], { state: { data: datos } }) : this.head.error500();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    )
  }

  reservation() {
    this.validInput = true;
    this.validInputs();
    !this.validInput ? null : this.serviceReservation();
  }

  assemblePassenger(lst: any[]) {
    lst.forEach(element => {
      let item = { name: "", lastName: "", odocument: { documentType: "", documentNumber: "" }, country: "", phone: "", email: "", birthDate: "", gender: "", type: "ADT" };
      this.lstPassenger.push(item);
    });
  }
}
