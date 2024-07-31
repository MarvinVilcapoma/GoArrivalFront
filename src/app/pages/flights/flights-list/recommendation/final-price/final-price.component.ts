import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { GetBrandedFaresRQ } from 'src/models/flight/Flight.model';

@Component({
  selector: 'app-final-price',
  templateUrl: './final-price.component.html',
  styleUrls: ['./final-price.component.css']
})
export class FinalPriceComponent implements OnInit {
  modalRef!: BsModalRef;
  modalRefPoliticas!: BsModalRef;
  modalRefDsctCorp!: BsModalRef;
  modalRefSinFares!: BsModalRef;
  modalAlertPoli!: BsModalRef;
  flagResultFamilias: number;
  loginDataUser: any;
  lstFareBasis: any[] = [];
  visiblePoliticas: boolean = false;
  visibleDescuento: boolean = false;
  @Input() lpolicies: any;
  @Input() lsections: any[] = [];
  @Input() index: any;
  @Input() recomendacion: any;
  @Input() gds: any;
  @Input() tipoVuelo: any;
  @Input() currency: any;
  @Input() totalFareAmount: any;
  @Input() finalAmount: any;
  @Input() fareTaxAmountByPassenger: any;
  @Input() chargesAmount: any;
  @Input() internationalPrice: any;
  @Input() recomen: any;
  @Input() request: any;
  @Input() lstRadioCheck: any;
  @Output() mapAvailability = new EventEmitter();

  dataFlight: any;
  type: any;
  objSeccion: any;
  rptaFamily: any;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(private modalService: BsModalService, private headService: HeaderService,
    private cookieServices: CookieService, private service: FlightService, private router: Router) {

    this.flagResultFamilias = 0;
  }

  ngOnInit(): void {
    this.loginDataUser = this.cookieServices.get('cookieLogin');
    this.loginDataUser = this.headService.desencriptar(this.loginDataUser);
    this.type = this.headService.getTypeSearch();
  }





  openModal() {
    this.mapAvailability.emit(false);
  }


  next() {
    this.mapAvailability.emit(true);
  }




  validateMenu(list: any[]) {
    let obj = {
      Maletas: false,
      Sillas: false,
      Crosseling: false
    }
    list.forEach(element => {
      switch (element.name) {
        case "Maletas":
          obj.Maletas = true;
          break;
        case "Sillas":
          obj.Sillas = true;
          break;
        case "Crosseling":
          obj.Crosseling = true;
          break;
      }
    });

    return obj;
  }

  getAsientos(data: any, menu: any) {
    this.service.getAncillaries(data).subscribe(
      x => {
        /*   this.vuelosComponent.spinner.hide(); */
        this.headService.ocultarSpinner();
        if (x === null) {
          if (menu.Crosseling === true) {
            this.headService.ocultarSpinner();
            this.router.navigate(["flights/crosselling-hotel"]);
          } else {
            this.router.navigate(["flights/passenger-data"]);
          }
        }

        let valor = this.headService.encriptar(x);
        sessionStorage.setItem('seatBags', valor);


        if (x.status === 200 && x.lseatMaps?.length > 0) {
          if (x.lseatMaps.length >= 1) {
            if (x.lseatMaps[0].lseats != null) {
              this.router.navigate(["flights/select-seat"]);
            } else if (x.status === 200 && x.lbags != null) {
              if (x.lbags.length > 1 && menu.Maletas === true) {
                this.router.navigate(["flights/select-bag"]);
              } else {
                if (menu.Crosseling === true) {
                  this.headService.ocultarSpinner();
                  this.router.navigate(["flights/crosselling-hotel"]);
                } else {
                  this.router.navigate(["flights/passenger-data"]);
                }
              }
            } else {
              if (menu.Crosseling === true) {
                this.headService.ocultarSpinner();
                this.router.navigate(["flights/crosselling-hotel"]);
              } else {
                this.router.navigate(["flights/passenger-data"]);
              }
            }

          } else if (x.status === 200 && x.lbags != null) {
            if (x.lbags.length > 1 && menu.Maletas === true) {
              this.router.navigate(["flights/select-bag"]);
            } else {
              if (menu.Crosseling === true) {
                this.headService.ocultarSpinner();
                this.router.navigate(["flights/crosselling-hotel"]);
              } else {
                this.router.navigate(["flights/passenger-data"]);
              }
            }
          } else {
            if (menu.Crosseling === true) {
              this.headService.ocultarSpinner();
              this.router.navigate(["flights/crosselling-hotel"]);
            } else {
              this.router.navigate(["flights/passenger-data"]);
            }
          }
        } else if (x.status === 200 && x.lbags?.length > 1 && menu.Sillas === true) {
          if (x.lbags.length > 1) {
            this.router.navigate(["flights/select-bag"]);
          } else {
            if (menu.Crosseling === true) {
              this.headService.ocultarSpinner();
              this.router.navigate(["flights/crosselling-hotel"]);
            } else {
              this.router.navigate(["flights/passenger-data"]);
            }
          }

        } else {
          if (menu.Crosseling === true) {
            this.headService.ocultarSpinner();
            this.router.navigate(["flights/crosselling-hotel"]);
          } else {
            this.router.navigate(["flights/passenger-data"]);
          }
        }



      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    )
  }

  validRoute(data: any) {
    let serv: any = this.cookieServices.get("lstServices");
    serv = this.headService.desencriptar(serv);
    if (!this.loginDataUser.orole.isCentralizer) {

      let menus = this.validateMenu(serv);

      switch (true) {
        case menus.Sillas:
          this.getAsientos(data, menus);
          break;
        case menus.Maletas:
          /*  this.getMaletas(data, menus); */
          this.router.navigate(["flights/crosselling-hotel"]);
          break;
        case menus.Crosseling:
          this.router.navigate(["flights/crosselling-hotel"]);
          break;
        default:
          this.router.navigate(["flights/passenger-data"]);
          break;
      }


    } else {
      this.router.navigate(["flights/passenger-data"])
    }
  }




}
