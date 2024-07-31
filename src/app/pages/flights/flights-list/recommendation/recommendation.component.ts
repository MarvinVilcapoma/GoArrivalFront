import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { environment } from 'src/environments/environment';
import { GetBrandedFaresRQ, Section } from 'src/models/flight/Flight.model';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  visibleFamily: boolean = false;
  flagResultFamilias: number;
  flagMsgErrorSelFam: boolean;
  lst_rol_autogestion;
  lst_rol_autorizador;
  lst_rol_centralizador;
  rptaFamily: any[] = [];
  defaultValue = null;
  modalRef!: any;
  modalRefPoliticas!: BsModalRef;
  outSegmentCheck: any;
  lstRadioCheck: any[] = [];
  loginDataUser: any;
  validSegment = false;
  visible: boolean = false;
  messageError: string = "";
  @Input() index: any;
  @Input() recomen: any;
  @Input() stateFlighList: any;
  @Input() currency: any;
  @Input() totalFareAmount: any;
  @Input() totalTaxAmount: any;
  @Input() fareAmountByPassenger: any;
  @Input() fareTaxAmountByPassenger: any;
  @Input() marketingCode: any;
  @Input() numberPassengers: any;
  @Input() pseudo: any;
  @Input() gds: any;
  @Input() request: any;
  @Input() lsections: Section[] = [];
  @Input() lsectionLength: any;
  @Input() lpolicies: any;
  @Input() recommendationId: any;
  @Input() tipoVuelo: any;
  @Input() pseudoRepeat: any;
  @Input() flightNational: any;
  @Input() isVisible: any;
  @Input() internationalPrice: any;
  lstFareBasis: any = null;

  constructor(private headService: HeaderService, private cookieServices: CookieService, private service: FlightService, private modalService: BsModalService, private router: Router) {
    this.flagResultFamilias = 0;
    this.flagMsgErrorSelFam = false;
    this.lst_rol_autogestion = environment.cod_rol_autogestion;
    this.lst_rol_autorizador = environment.cod_rol_autorizador;
    this.lst_rol_centralizador = environment.cod_rol_centralizador;
  }

  ngOnInit(): void {
    this.loginDataUser = this.cookieServices.get('cookieLogin');
    this.loginDataUser = this.headService.desencriptar(this.loginDataUser);
  }

  setDataFamily(valor: any) {
    this.lstFareBasis = valor.section;
    this.getFlightAvailability(valor.family)
  }


  setearRadioId($event: any) {
    this.outSegmentCheck = $event;
    const recommendationId = this.recommendationId;
    const indexSegment = this.outSegmentCheck.indexSegment_;
    const radioId = this.outSegmentCheck.radioId_;
    const segment = this.outSegmentCheck.segment_;
    const section = this.outSegmentCheck.section_;
    const dataRadioSel = {
      recommendationId_: recommendationId,
      sectionId_: section.sectionId,
      segmentId_: segment.segmentId,
      segmentIndex_: indexSegment,
      section_: section,
      segment_: segment,
      flag: 1,
    };

    if (this.lstRadioCheck.length === 0) {
      this.lstRadioCheck.push(dataRadioSel);
    } else {
      this.lstRadioCheck.forEach(function (item) {
        if (
          item.recommendationId_ === recommendationId &&
          item.sectionId_ === section.sectionId
        ) {
          item.flag = 0;
        }
      });

      this.lstRadioCheck.push(dataRadioSel);
      this.lstRadioCheck = this.lstRadioCheck.filter((x) => x.flag === 1);
    }
  }

  getFlightAvailability(valid: boolean) {
    this.lsections.forEach(section => {
      section.lschedule.forEach(schedule => {
        if (schedule.selected) section["oschedule"] = schedule;
      });
    });
    this.headService.mostrarSpinner();
    const price = {
      Currency: this.recomen.oprice.currency,
      TotalAmount: this.recomen.oprice.totalAmount
    }
    let dataFamilias = {
      Gds: this.gds,
      OfamilySelected: this.lstFareBasis,
      Pseudo: this.recomen.pseudo,
      TypeSearch: this.headService.getTypeSearch(),
      IsFlightNational: this.recomen.isFlightNational,
      UserID: this.loginDataUser.userID,
      Luser: this.request.Luser,
      Lpassenger: this.request.Lpassenger,
      LpseudoRepeats: this.recomen.lpseudo,
      Oprice: price,
      CarrierCode: this.recomen.ocarrier.code,
      Lsection: this.lsections,
      Lpolicy: this.recomen.lpolicy,
      Ooffer: this.recomen.ooffer,
      Oenterprise: this.loginDataUser.oenterprise,
      token: "",
      OfferID: this.recomen.offerID
    };

    this.cookieServices.delete("ss_passengerAsientos", "/flights");
    this.cookieServices.delete("ss_rqAsientos", "/flights");
    this.cookieServices.delete("infohotel_cross", "/flights");
    this.cookieServices.delete("inforoom", "/flights");

    this.service.fligthAvailibility(dataFamilias).subscribe(
      x => {
        x.status === 200 ? this.dataShared(x.odata, dataFamilias) : this.errorAvailability(x);
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    )
  }

  errorAvailability(x: any) {
    this.messageError = x.message;
    this.visibleFamily = false;
    this.visible = true;
    this.headService.ocultarSpinner();
  }

  getBrandedFares() {
    this.lsections.forEach(section => {
      section.lschedule.forEach(schedule => {
        if (schedule.selected) section["oschedule"] = schedule;
      });
    });
    let dataFamilias1: GetBrandedFaresRQ = {
      GDS: this.gds,
      Pseudo: this.recomen.pseudo,
      RedisID: this.recomen.redisID,
      RedisToken: this.headService.getDataLogin().token,
      TypeSearch: this.headService.getTypeSearch(),
      IsFlightNational: this.recomen.isFlightNational,
      Lpassenger: this.request.Lpassenger,
      Lsection: this.lsections,
      Oenterprise: this.loginDataUser.oenterprise,
    };




    this.cookieServices.delete("ss_passengerAsientos", "/flights");
    this.cookieServices.delete("ss_rqAsientos", "/flights");
    this.cookieServices.delete("infohotel_cross", "/flights");
    this.cookieServices.delete("ss_dataMaletaInfo", "/flights");
    this.cookieServices.delete("ss_dataMaleta", "/flights");

    this.headService.mostrarSpinner();
    this.service.getBrandedFares(dataFamilias1).subscribe(
      x => {
        this.messageError = x.message;
        x.status === 200 ? this.saveDataFamily(x.ldata) : this.visible = true;
        this.headService.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    )
  }

  saveDataFamily(result: any) {
    this.rptaFamily = result;
    this.visibleFamily = true;
  }


  setAvailability($event: any) {
    !$event ? this.getBrandedFares() : this.getFlightAvailability(true);
  }

  getAsientos(data: any, menu: any, rpta: any) {
    this.service.getAncillaries(data).subscribe(
      x => {
        this.headService.ocultarSpinner();
        if (x === null) {
          menu.Crosseling === true ? this.routeHotel(rpta) : this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
          return;
        }

        let valor = this.headService.encriptar(x);
        sessionStorage.setItem('seatBags', valor);


        if (x.status === 200 && x.lseatMaps?.length > 0) {
          if (x.lseatMaps.length >= 1) {
            if (x.lseatMaps[0].lseats != null) {
              this.router.navigate(["flights/select-seat"], { state: { data: rpta } });
            } else if (x.status === 200 && x.lbags != null) {
              if (x.lbags.length > 1 && menu.Maletas === true) {
                this.router.navigate(["flights/select-bag"], { state: { data: rpta } });
              } else {
                menu.Crosseling === true ? this.routeHotel(rpta) : this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
              }
            } else {
              menu.Crosseling === true ? this.routeHotel(rpta) : this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
            }

          } else if (x.status === 200 && x.lbags != null) {
            if (x.lbags.length > 1 && menu.Maletas === true) {
              this.router.navigate(["flights/select-bag"], { state: { data: rpta } });
            } else {
              menu.Crosseling === true ? this.routeHotel(rpta) : this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
            }
          } else {
            menu.Crosseling === true ? this.routeHotel(rpta) : this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
          }
        } else if (x.status === 200 && x.lbags?.length > 1 && menu.Sillas === true) {
          if (x.lbags.length > 1) {
            this.router.navigate(["flights/select-bag"], { state: { data: rpta } });
          } else {
            menu.Crosseling === true ? this.routeHotel(rpta) : this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
          }

        } else {
          menu.Crosseling === true ? this.routeHotel(rpta) : this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
        }

      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    )
  }

  routeHotel(rpta: any) {
    this.headService.ocultarSpinner();
    this.router.navigate(["flights/crosselling-hotel"], { state: { data: rpta } });
  }

  validRoute(datos: any, rpta: any) {
    !this.loginDataUser.orole.isCentralizer ? this.validSeats(datos, rpta) : this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
  }

  validSeats(data: any, rpta: any) {
    let serv: any = this.cookieServices.get("lstServices");
    serv = this.headService.desencriptar(serv);
    let menus = this.validateMenu(serv);
    switch (true) {
      case menus.Sillas:
        this.getAsientos(data, menus, rpta);
        break;
      case menus.Maletas:
        this.router.navigate(["flights/crosselling-hotel"], { state: { data: rpta } });
        break;
      case menus.Crosseling:
        this.router.navigate(["flights/crosselling-hotel"], { state: { data: rpta } });
        break;
      default:
        this.router.navigate(["flights/passenger-data"], { state: { data: rpta } });
        break;
    }
  }

  validateMenu(list: any[]) {
    return list.reduce((acc, element) => {
      acc[element.name] = true;
      return acc;
    }, {
      Maletas: false,
      Sillas: false,
      Crosseling: false
    });
  }



  dataShared(availa: any, data: any) {
    let obj = { rpta: availa, recomen: this.recomen, typeFlight: this.tipoVuelo, stateFlighList: this.stateFlighList, hotel: null }
    this.validRoute(data, obj);
  }


}


