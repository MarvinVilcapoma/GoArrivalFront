import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GalleryImageComponent } from '../../shared/components/gallery-image/gallery-image.component';
import { DialogMapComponent } from '../../shared/components/dialog-map/dialog-map.component';
import { HotelListComponent } from '../hotel-list/hotel-list.component';
import { HeaderService } from 'src/app/services/head.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})


export class RoomListComponent implements OnInit {
  @ViewChildren(HotelListComponent) hijos!: QueryList<HotelListComponent>;


  lstPerson: any;
  lstStars: any[] = [];
  lsthabitacionBlock: any[] = [];
  validRoom: boolean = false;
  @Input() data: any;
  @Output() select = new EventEmitter<any>();

  public myObject!: { id: number, myObject: { myString: string } };



  constructor(private dialog: MatDialog, private headService: HeaderService, private service: HotelService, private router: Router,private location: Location) {


  }

  goBack(): void {
    this.location.back();
  }


  selectRoom(valor: any) {
    this.headService.mostrarSpinner();

    let objeto = {
      BookingCode: valor.bookingCode,
      ChainCode: this.data.ohotel.chainCode,
      CityCode: this.data.ohotel.cityCode,
      EndDate: this.data.ohotel.endDate,
      GDS: this.data.gds,
      HotelCode: this.data.ohotel.hotelCode,
      LguestPerRoom: this.data.ohotel.lguestPerRoom,
      Oenterprise: this.headService.getCompany(),
      PlanCode: valor.ratePlanCode,
      Pseudo: this.data.pseudo,
      RoomType: valor.roomType,
      StartDate: this.data.ohotel.startDate,
      Starts: this.data.ohotel.stars,
      TypeSearch: this.headService.getTypeSearch(),
      osession: this.data.osession
    }
    this.service.GetConfirmacion(objeto).subscribe(
      x => {
        x.oerror === null ? this.saveData(x) : this.headService.setErrorToastr(x.oerror.message);
        /*     if (x.oerror === null) {
              this.saveData(x);
              this.router.navigate(["hotel/reservation"], {state: { data: x }});
            } else {
              this.headService.setErrorToastr(x.oerror.message);
    
            }
            this.headService.ocultarSpinner(); */
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      }
    )
  }

  saveData(valor_: any) {
    valor_.ohotel = this.data.ohotel;
    let obj = {
      oconfiguration: valor_.oconfiguration,
      odata: valor_,
      gds: this.data.gds,
      pseudo: this.data.pseudo,
      lstPerson: this.lstPerson
    }
    this.router.navigate(["hotel/reservation"], { state: { data: obj } });
    /*     let valor = this.headService.encriptar(obj);
        this.cookie.set("infoReser",valor); */
  }



  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const data = history.state.data;
    this.data = data.data;
    this.lstPerson = data.lstPerson;
    this.lsthabitacionBlock = this.data.lroom;
    this.llenarStars();
    this.llenarNoStars();
    this.validRoom = true;
    this.headService.ocultarSpinner();
  }

 


  llenarNoStars() {
    const missingStars = 5 - this.data.ohotel.lstStar.length;
    this.data.ohotel.lstStar.push(...Array(missingStars).fill(false));
  }
  
  llenarStars() {
    const starCount = parseFloat(this.data.ohotel.stars);
    this.data.ohotel.lstStar = Array(5).fill(true).map((_, index) => index < starCount);
  }

  selectPhotos(imagenList: any[]) {
    const dialogRef = this.dialog.open(GalleryImageComponent, {
      data: imagenList
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ShowGarantia(valor: any, event: any) {
    let lista = [];
    let origen: any;
    let destino: any;
    origen = document.getElementById("origen");
    destino = document.getElementById("destino");
    if (valor === 1 && event.target.checked && !origen.checked) {
      this.lsthabitacionBlock.forEach(function (element) {
        if (element.guaranteeType != null) {
          if (element.guaranteeType.length > 0) {
            element.guaranteeType.forEach((pago: any) => {
              if (pago === "GuaranteeRequired") {
                lista.push(element);
              }
            });
          }

        }
      });
    } else if (valor === 2 && event.target.checked && !destino.checked) {
      this.lsthabitacionBlock.forEach(function (element) {
        if (element.guaranteeType != null) {
          if (element.guaranteeType.length > 0) {
            element.guaranteeType.forEach((pago: any) => {
              if (pago === "Deposit") {
                lista.push(element);
              }
            });
          }

        }
      });
    } else if (valor === 1 && !event.target.checked && origen.checked) {
      this.lsthabitacionBlock.forEach(function (element) {
        if (element.guaranteeType != null) {
          if (element.guaranteeType.length > 0) {
            element.guaranteeType.forEach((pago: any) => {
              if (pago === "Deposit") {
                lista.push(element);
              }
            });
          }

        }
      });
    } else if (valor === 2 && !event.target.checked && destino.checked) {
      this.lsthabitacionBlock.forEach(function (element) {
        if (element.guaranteeType != null) {
          if (element.guaranteeType.length > 0) {
            element.guaranteeType.forEach((pago: any) => {
              if (pago === "GuaranteeRequired") {
                lista.push(element);
              }
            });
          }

        }
      });
    } else {
      lista = this.lsthabitacionBlock;
    }


    this.data.lroom = lista;

  }





  Mostrarmapa() {

    const dialogRef = this.dialog.open(DialogMapComponent, {
      data: {
        latitude: this.data.ohotel.oposition.latitude,
        longitude: this.data.ohotel.oposition.longitude
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });


  }

}