import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'primeng/api';
import { HeaderService } from 'src/app/services/head.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  lstHotel: any[] = [];
  validHotel = false;
  lstStars: any[] = [];
  lstHotelB: any[] = [];
  messages: Message[] | any;
  objetoDesencriptado: any = {};
  minPrice!: number;
  maxPrice!: number;
  lstPerson: any;
  request: any;
  showFilters = true;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(private headService: HeaderService, private cookie: CookieService, private service: HotelService, private router: Router) { }

  ngOnInit(): void {
    this.messages = [{ severity: 'warn', summary: 'Aviso', detail: 'No se encontraron hospedajes con este filtro' }];
    this.objetoDesencriptado = this.cookie.get('cookieLogin');
    this.objetoDesencriptado = this.headService.desencriptar(this.objetoDesencriptado);
    const data = history.state.data;
    this.showData(data);

   
  }

  replaceStateData(newData: any) {
    if (newData.lstHotel != undefined) {
      // Obtiene el estado actual del historial
      const currentState = history.state;

      // Modifica los datos del estado
      currentState.data = newData;

      // Reemplaza el estado actual en el historial
      history.replaceState(currentState, '');
      this.showData(newData);
    }

  }

  showData(data: any) {

    this.lstPerson = data.lstPerson;
    this.lstHotel = data.lstHotel;
    this.request = data.request;
    this.llenarStarsYNoStars(this.lstHotel);
    this.getMinMaxPrice();
    this.lstHotelB = this.lstHotel;
    this.validHotel = true;
    this.headService.ocultarSpinner();
  }

  setLstHotel(valor_: any) {
    if (valor_?.length >= 1) {
      this.lstHotel = valor_;
      this.llenarStarsYNoStars(this.lstHotel);
      this.getMinMaxPrice();
      this.lstHotelB = this.lstHotel;
      this.showFilters = true;
      this.headService.ocultarSpinner();
    }
  }

  ocultar(valor_: any) {
    this.showFilters = false;
  }

  filterStar(valor_: any) {
    this.lstHotel = valor_;
  }


  getHotel(telo: any) {
    this.headService.mostrarSpinner();
    let data = {
      "Lusers": [{
        "RoleId": this.objetoDesencriptado.orole.id,
        "LcostCenter": this.objetoDesencriptado.lcostCenter,
        "UserId": this.objetoDesencriptado.userID
      }],
      "Pseudo": "LIMPE2235",
      "Lhotel":
        [
          {
            "HotelCode": telo.code,
            "StartDate": telo.startDate,
            "EndDate": telo.endDate,
            "LguestPerRoom": telo.lguestPerRoom
          }
        ],
      "Oenterprise": this.headService.getCompany()
    }

    this.service.GetHabitacion(data).subscribe(
      data => {
        if (data === null) {this.headService.error500();return;}
        const datos = {data: data,lstPerson: this.lstPerson}
        data.oerror != null ? this.headService.setErrorToastr(data.oerror.message) : this.router.navigate(["hotel/room-list"], { state: { data: datos } });


      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      },
      () => {
        this.headService.ocultarSpinner();
      }
    );
  }

  getMinMaxPrice() {
    let menorValor = 1000000;
    let mayorValor = 0;
    this.lstHotel.forEach(element => {
      if (element.oprice.pricePerAllNights < menorValor) {
        menorValor = element.oprice.pricePerAllNights;
      }
      if (element.oprice.pricePerAllNights > mayorValor) {
        mayorValor = element.oprice.pricePerAllNights;
      }
    });

    this.minPrice = menorValor;
    this.maxPrice = mayorValor;
  }


 

  llenarStarsYNoStars(lst_: any[]) {
    for (let index = 0; index < lst_.length; index++) {
      const element = lst_[index];
      const stars = parseFloat(element.stars);
  
      // Crear una lista temporal para las estrellas
      const lstStars = [];
  
      // Añadir las estrellas llenas
      for (let i = 0; i < stars; i++) {
        lstStars.push(true);
      }
  
      // Añadir las estrellas vacías hasta tener 5 en total
      for (let i = stars; i < 5; i++) {
        lstStars.push(false);
      }
  
      // Asignar la lista de estrellas al elemento del hotel
      this.lstHotel[index].lstStar = lstStars;
    }
  }

}
