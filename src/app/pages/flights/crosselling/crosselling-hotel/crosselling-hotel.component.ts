import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';

import { HeaderService } from 'src/app/services/head.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageGaleryComponent } from 'src/app/components/shared/image-galery/image-galery.component';
import { GalleryImageComponent } from 'src/app/pages/shared/components/gallery-image/gallery-image.component';
import { DialogMapComponent } from 'src/app/pages/shared/components/dialog-map/dialog-map.component';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-crosselling-hotel',
  templateUrl: './crosselling-hotel.component.html',
  styleUrls: ['./crosselling-hotel.component.css']
})
export class CrossellingHotelComponent implements OnInit, OnDestroy, AfterViewInit {

  public slides = [
    {
      src: 'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/ignite-ui-angular-indigo-design.png'
    },
    {
      src: 'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/slider-image-chart.png'
    },
    {
      src: 'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/ignite-ui-angular-charts.png'
    }
  ];
  private subscription!: Subscription;
  itemsPerSlide = 2;
  singleSlideOffset = false;
  noWrap = false;
  valor: any;
  hotel = false;
  slidesChangeMessage = '';
  loginDataUser: any;
  idHotel: any;
  imagenList = [];
  modalRefSessionExpired!: BsModalRef;
  addHotel = false;
  telo: any;
  mapHotel = false;
  modalRef!: BsModalRef;
  hoteles: any[] = [];
  loadingHotel = true;
  hotelquitado = true;
  showIndicator = true;
  longitudHotel: any;
  changeRoom = false;
  latitudHotel: any;
  urlimg = './assets/images/hotel-icon.png';
  onlyOne = false;
  data: any;
  b1: any;
  b2: any;
  b3: any;
  imagesHotel: any[] = [
    { value: 'https://domiruthgeneral.blob.core.windows.net/domiruth/Images/Hoteles%20Default/DefaultHotel_1.png' },
    { value: 'https://domiruthgeneral.blob.core.windows.net/domiruth/Images/Hoteles%20Default/DefaultHotel_2.png' },
    { value: 'https://domiruthgeneral.blob.core.windows.net/domiruth/Images/Hoteles%20Default/DefaultHotel_3.png' },
    { value: 'https://domiruthgeneral.blob.core.windows.net/domiruth/Images/Hoteles%20Default/DefaultHotel_4.png' },
  ];
  hotelCross: any;
  activeSlideIndex = 0;
  showHabitacion = false;
  dataHotel: any;
  session: any;
  rpta: any;
  constructor(private dialog: MatDialog, private router: Router, private modalService: BsModalService, private service: HotelService,
    private cookieServices: CookieService, private head: HeaderService) { }

  ngOnInit() {
    this.rpta = history.state.data;

  


      if (this.rpta.typeFlight === 'MC' || this.rpta.typeFlight === 'OW') {
        this.router.navigate(["flights/passenger-data"], { state: { data: this.rpta } });
        return;
      }

      let cookie = this.cookieServices.get('cookieLogin');
      this.loginDataUser = this.head.desencriptar(cookie);




      if (this.hoteles.length === 0) {
        this.searchHotel();
      } else {
    
        this.anadirBloqueado();
        this.anadirAgregado();
     
        if (this.hotelCross != null && this.hotelCross != undefined) {

          this.bloquearAlgunos(this.hotelCross);
          this.addHotel = true;
          this.onlyOne = true;
        } else {
          this.onlyOne = false;
          this.addHotel = false;
        }
        this.loadingHotel = false;
      }

  




  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    if (this.hotelCross != null && this.hotelCross != undefined) {
      var xe = document.getElementById("hotelSlide");
      xe!.style.display = "none";
      var z = document.getElementById("escogido");
      z!.style.display = "block";
    }
  }


  setSegmentCheck(valor: any) {
    this.deleteHotel();
  }



  bloquearAlgunos(valor: any) {
    this.hoteles.forEach((element: any) => {
      if (element.id === valor.id) {
        element.disabled = false;
      } else {
        element.disabled = true;
      }
    });
  }

  recorrerImagenes() {
    this.hoteles.forEach((element: any) => {
      for (let index = 0; index < element.limagens.length; index++) {
        const imagen = {
          small: element.limagens[index].url,
          medium: element.limagens[index].url,
          big: element.limagens[index].url,
        };
        element.limagens.push(imagen);
      }
    });
  }

  buscarHabi() {
    let telo: any;
    let habi: any;

    this.hoteles.forEach((element: any) => {
      if (element === telo) {
        element.disabled = true;
        element.oroomHotel.name = habi.name;
        element.oroomHotel.includeBreakfast = habi.breakFast;
      }
    });

  }

  anadirBloqueado() {
    this.hoteles.forEach((element: any) => {
      element.disabled = false;
    });
  }

  anadirAgregado() {
    this.hoteles.forEach((element: any) => {
      element.add = false;
    });
  }

  searchHotel() {


    let start = this.rpta.stateFlighList.request.Dates[0].replaceAll("/", "-");
    let end = this.rpta.stateFlighList.request.Dates[1].replaceAll("/", "-");

    let data = {
      "Lusers": [{
        "RoleId": this.loginDataUser.orole.id,
        "LcostCenter": this.loginDataUser.lcostCenter,
        "UserId": this.loginDataUser.userID
      }],
      "Lhotel":
        [
          {
            "HotelCityCode": this.rpta.stateFlighList.request.Origin[1],
            "StartDate": start,
            "EndDate": end,
            "LguestPerRoom":
              [
                {
                  "RoomQuantity": '1',
                  "NumberPassengers": '1',
                  "TypePassenger": "ADT"
                }
              ]
          }
        ],
      "Oenterprise": this.head.getCompany(),
      "TypeSearch": this.head.getTypeSearch(),
      "Quantity": 10
    }
    this.subscription = this.service.SearchHotel(data).subscribe(
      x => {
        if (x === null) {
          this.router.navigate(["flights/passenger-data"], { state: { data: this.rpta } });
          return;
        }
        if (x.length === 0) {
          this.router.navigate(["flights/passenger-data"], { state: { data: this.rpta } });
          return;
        }

        if (x[0].oerror != null) {
          this.router.navigate(["flights/passenger-data"], { state: { data: this.rpta } });
          return;
        }
     
        this.hoteles = x;

        this.anadirBloqueado();
        this.anadirAgregado();

        let valor;
        if (valor != null && valor != undefined) {

          this.bloquearAlgunos(valor);
        }

        this.loadingHotel = false;
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  continu() {
    this.head.mostrarSpinner();


    let booking: any;
    let plancode: any;
    let roomtype: any;
    if (this.changeRoom === false) {
      booking = this.telo.oroomHotel.bookingCode;
      plancode = this.telo.oroomHotel.planCode;
      roomtype = this.telo.oroomHotel.roomType;
    } else {
      booking = this.b1;
      plancode = this.b2;
      roomtype = this.b3;
    }
    let objeto = {
      BookingCode: booking,
      ChainCode: this.telo.chainCode,
      CityCode: this.telo.cityCode,
      EndDate: this.telo.endDate,
      GDS: this.telo.gds,
      HotelCode: this.telo.code,
      LguestPerRoom: this.telo.lguestPerRoom,
      Oenterprise: this.head.getCompany(),
      PlanCode: plancode,
      Pseudo: this.telo.pseudo,
      RoomType: roomtype,
      StartDate: this.telo.startDate,
      Starts: this.telo.stars,
      TypeSearch: this.head.getTypeSearch(),
      osession: this.session
    }
    this.service.GetConfirmacion(objeto).subscribe(
      x => {
        
        if (x.oerror === null) {


       /*    let crip = this.head.encriptar(this.telo);
          this.cookieServices.set("infohotel_cross", crip); */

          let habi = this.head.encriptar(x);
          this.cookieServices.set("inforoom", habi);

          this.rpta.hotel = this.telo;
          this.router.navigate(["flights/passenger-data"], { state: { data: this.rpta } });
        } else {
          this.head.setErrorToastr(x.oerror.message);

        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )

  }

  confirmRoom(valor: any) {
    this.head.mostrarSpinner();
    this.b1 = valor.bookingCode;
    this.b2 = valor.ratePlanCode;
    this.b3 = valor.roomType;
    let objeto = {
      BookingCode: valor.bookingCode,
      ChainCode: this.telo.chainCode,
      CityCode: this.telo.cityCode,
      EndDate: this.telo.endDate,
      GDS: this.telo.gds,
      HotelCode: this.telo.code,
      LguestPerRoom: this.telo.lguestPerRoom,
      Oenterprise: this.head.getCompany(),
      PlanCode: valor.ratePlanCode,
      Pseudo: this.telo.pseudo,
      RoomType: valor.roomType,
      StartDate: this.telo.startDate,
      Starts: this.telo.stars,
      TypeSearch: this.head.getTypeSearch(),
      osession: this.session
    }
    this.service.GetConfirmacion(objeto).subscribe(
      x => {
      
        if (x.oerror === null) {
          this.head.setSuccessToastr("Habitación actualizada.")
          this.showHabitacion = false;
          this.changeRoom = true;
        } else {
          this.head.setErrorToastr(x.oerror.message);

        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  changeImage(lstHotel: any[]) {
    lstHotel.forEach(element => {
      if (element.gds === 'Amadeus' && element.limagens.length > 0) {

        const newImg = this.imagesHotel[Math.floor(Math.random() * this.imagesHotel.length)];
        element.limagens[0].url = newImg.value;
      }
    });


    return lstHotel;
  }

  anadirHotel(valor: any, hotel: any) {
    this.head.mostrarSpinner();
    let lstuser = [];
    let lsthotel = [];
    let user = {
      RoleId: this.loginDataUser.orole.id,
      LcostCenter: null,
      UserId: this.loginDataUser.userID
    }
    lstuser.push(user);
    let obj = {
      EndDate: hotel.endDate,
      HotelCode: hotel.code,
      LguestPerRoom: hotel.lguestPerRoom,
      StartDate: hotel.startDate,
    }
 
    lsthotel.push(obj);
    let objHabi = {
      Lhotel: lsthotel,
      Lusers: lstuser,
      Oenterprise: this.head.getCompany(),
      Pseudo: hotel.pseudo,
      TypeSearch: this.head.getTypeSearch(),
      oprice: hotel.oprice
    }
    this.service.GetHabitacion(objHabi).subscribe(
      x => {
        if (x === null) {
          this.head.setErrorToastr("Ocurrió un error con el servicio. Por favor intentar nuevamente.");
          this.head.ocultarSpinner();
          return;
        }
        if (x.oerror === null) {

          this.session = x.osession;
          this.telo = hotel;

          this.hotelCross = hotel;

          this.hoteles.forEach(element => {
            if (element.id === valor) {
              element.disabled = false;
            } else {
              element.disabled = true;
            }
          });
          this.hoteles.forEach(element => {
            if (element.id === valor) {
              element.add = true;
            } else {
              element.add = false;
            }
          });
       
          this.addHotel = true;
          this.idHotel = valor;
          this.hotelquitado = false;
          var xe = document.getElementById("hotelSlide");
          xe!.style.display = "none";
          var z = document.getElementById("escogido");
          z!.style.display = "block";
          this.onlyOne = true;
        } else {
          this.head.setErrorToastr(x.oerror.message);
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )

  }

  onSlideChanged(valore: any) {
    let index = valore.slide.index + 1;
    let qwe: any; 
    if (qwe != null && qwe != undefined) {
      if (index === qwe.id) {
        this.addHotel = true;
      } else {
        this.addHotel = false;
      }
    } else {

    }

   
  }

  other() {
    this.addHotel = false;
    this.hotelquitado = true;
    this.hoteles?.forEach(element => {
      element.disabled = false;
      element.add = false;
    });

    this.router.navigate(["flights/passenger-data"], { state: { data: this.rpta } });
  }

  deleteHotel() {
    this.addHotel = false;
    this.hotelquitado = true;
    this.hoteles.forEach(element => {
      element.disabled = false;
      element.add = false;
    });

    var xe = document.getElementById("escogido");
    xe!.style.display = "none";
    var z = document.getElementById("hotelSlide");
    z!.style.display = "block";
    this.onlyOne = false;
  }

  getImagenes(valor: any, template: any) {
    let validar = false;
    let newList = [];
    let list: any[] = [];
    if (list != null && list != undefined) {
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element === valor.id) {
          validar = true;
        }
      }
      if (validar === true) {
        this.openModal(template);
        return;
      } else {
        list.push(valor.id);

        this.getImages(valor);
      }
    } else {
      newList.push(valor.id);
 
      this.getImages(valor);
    }


  }

  Mostrarmapa(valor: any) {
    this.mapHotel = true;
    this.latitudHotel = valor.oposition.latitude;
    this.longitudHotel = valor.oposition.longitude;

    const dialogRef = this.dialog.open(DialogMapComponent, {
      data: {
        latitude: this.latitudHotel,
        longitude: this.longitudHotel
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });


  }

  OcultarMapa() {
    /*  $('#mapaHotel').hide(); */
    var z = document.getElementById("filtro");
    if (z != null) {
      z.style.position = "fixed";
      z.style.display = "block"
    }
    /* $('body').css('overflow', 'visible'); */
    this.mapHotel = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg m-galeria' })
    )
  }

  getImages(valor: any) {
    if (valor.limagens.length > 1) {
      this.recorrerImagenesF(valor.limagens, valor);
      return
    }
 
    let obb = {
      HotelCode: valor.code,
      Oenterprise: this.head.getCompany(),
      Pseudo: "LIMPE2235",
      TypeSearch: this.head.getTypeSearch()
    }
    this.head.mostrarSpinner();
    this.service.searchHotelListHabitacionImage(obb).subscribe(
      x => {
        this.recorrerImagenesF(x, valor);
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  selectPhotos(imagenList: any[]) {
    const dialogRef = this.dialog.open(GalleryImageComponent, {
      data: imagenList
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  recorrerImagenesF(list: any, hotel: any) {
    let lstHotel: any[] = []
    if (list != null && list.length > 1) {

      for (let index = 0; index < list.length; index++) {
        const imagen = {
          url: list[index].url,
        };
        lstHotel.push(imagen);
      }
    }
    hotel.limagens = lstHotel;
    this.selectPhotos(hotel.limagens);
  }

  onSlideRangeChange(indexes: number[] | void): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

  getHotel(telo: any) {
    this.head.mostrarSpinner();
    let data = {
      "Lusers": [{
        "RoleId": this.loginDataUser.orole.id,
        "LcostCenter": this.loginDataUser.lcostCenter,
        "UserId": this.loginDataUser.userID
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
      "Oenterprise": this.head.getCompany()
    }

    this.service.GetHabitacion(data).subscribe(
      data => {
        if (data === null) {
          this.head.setErrorToastr("Ocurrió un error con el servicio. Por favor intentar nuevamente.");
          this.head.ocultarSpinner();
          return;
        }
        if (data.oerror != null) {
          this.head.setErrorToastr(data.oerror.message);
          this.head.ocultarSpinner();
        } else {
          this.dataHotel = data;
          this.showHabitacion = true;
          this.session = data.osession;
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      },
      () => {
        this.head.ocultarSpinner();
      }
    );
  }

  getHabitacioens() {
    this.head.mostrarSpinner();
    let data = {
      "Lusers": [{
        "RoleId": this.loginDataUser.orole.id,
        "LcostCenter": this.loginDataUser.lcostCenter,
        "UserId": this.loginDataUser.userID
      }],
      "Pseudo": "LIMPE2235",
      "Lhotel":
        [
          {
            "HotelCode": this.telo.code,
            "StartDate": this.telo.startDate,
            "EndDate": this.telo.endDate,
            "LguestPerRoom": this.telo.lguestPerRoom
          }
        ],
      "Oenterprise": this.head.getCompany()
    }

    this.service.GetHabitacion(data).subscribe(
      data => {
        if (data === null) {

          this.head.ocultarSpinner();
        }


        if (data.oerror != null) {
   
          this.head.ocultarSpinner();
        } else {
     
          window.location.replace(window.location.origin + "/crosselling-habitacion");
        }

   
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      },
      () => {
        this.head.ocultarSpinner();

      }
    );
  }

}
