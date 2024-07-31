import { Component, OnInit, AfterViewInit, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-bags',
  templateUrl: './bags.component.html',
  styleUrls: ['./bags.component.css']
})
export class BagsComponent implements OnInit, AfterViewInit {

  rpta: any;
  users: any;
  listaAsientos: any[] = [];
  lstPass: any;
  usuarios: any;
  numPasajero = 0;
  destinos: any;
  numSegment = 0;
  contMal = 0;
  lista: any;
  segments: any;
  mostrar = false;
  maletasAngular: any[] = [];
  buscar: any;
  asdasd: any;
  amount = 0;
  contador: any[] = [];
  iterableDiffer: any;
  currency: any;
  baggageSegmets: any[] = [];
  listaGeneral: any;
  baggageSegmetsBlock: any;
  total = 0;
  sendPasajeros = [];
  objetoPush: any;
  objeto: any[] = [];

  objSegmento = {
    id: null,
    pasajeros: []
  }

  objMaletas = {
    maletas: []
  }

  Oancillaries: any = {
    Lpassenger: []
  }

  OancillariesInfo: any = {
    LpassengerInfo: []
  }

  constructor(private iterableDiffers: IterableDiffers, private router: Router, private head: HeaderService, private cookieServices: CookieService) {


  }



  ngOnInit() {

    
    let seat: any = sessionStorage.getItem('seatBags');
    this.rpta = this.head.desencriptar(seat);
    
    this.destinos = this.rpta.lseatMaps;
    this.maletasAngular = this.countmaleta(this.rpta.lbags);

    let token: any = sessionStorage.getItem('passengers');
    this.users = this.head.desencriptar(token);
    this.llenarSegmentos();
    this.sendPasajeros = this.addMaletas();

    this.ordenarPasajeros(this.rpta);
    this.armarCount();

    this.maletasAngular = this.objeto[this.numSegment].pasajeros[this.numPasajero].maletas;


 







  }

  validateMenu(list: any) {
    let obj: any;
    obj = {
      Maletas: null,
      Sillas: null,
      Crosseling: null
    }
    list.forEach((element: any) => {
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

  llenarSegmentos() {
    let obj: any;
    for (let index = 0; index < this.destinos.length; index++) {
      const element = this.destinos[index];
      obj = {
        id: null,
        marketingCode: element.ocarrier.marketingCode,
        pasajeros: []
      }
      obj.id = index + 1;

      this.objeto.push(obj);
    }

    this.llenarPasajeros();
  }

  llenarPasajeros() {
    let data: any;
    let obj: any;
    for (let j = 0; j < this.objeto.length; j++) {
      for (let index = 0; index < this.users.length; index++) {
        const element = this.users[index];
        let numero = index + 1;
        obj = {
          id: numero,
          marketingCode: this.objeto[j].marketingCode,
          name: "Adulto" + " " + numero.toString(),
          maletas: []
        }
        this.rpta.lbags.forEach((element: any) => {
          data = {
            actionCode: element.actionCode,
            amount: element.amount,
            currency: element.currency,
            count: element.count,
            description: element.description,
            otherSpecialCondition: element.otherSpecialCondition,
            serviceFreeText: element.serviceFreeText,
            serviceType: element.serviceType,
            specialCondition: element.specialCondition,
            ssrCode: element.ssrCode,
            disabled: element.disabled,
          }
          obj.maletas.push(data);
        });
        this.objeto[j].pasajeros.push(obj);
      }

    }

  }

  addMaletas() {
    this.users.forEach((element: any) => {
      element.maletas = this.maletasAngular;
    });

    return this.users;
  }



  ordenSegmentos() {
    var segmentos: any[] = [];
    this.rpta.lseatMaps.forEach((element: any) => {
      var obj = {
        tramo: element.oorigin.cityName + " - " + element.odestination.cityName,
        pasajeros: []
      }
      segmentos.push(obj);
    });
    this.ordenPasajeros(segmentos)
  }

  ordenPasajeros(list: any) {
    var bagg = this.rpta.lbags;
    list.forEach((segment: any) => {
      for (let index = 0; index < this.users.length; index++) {
        const element = this.users[index];
        let numero = index + 1;
        const obj = {
          name: "Adulto" + " " + numero.toString(),
          lbaggage: bagg
        }
        segment.pasajeros.push(obj);
      }
    });

    this.listaGeneral = list;
  }

  armarCount() {

    this.users.forEach((asdasd: any) => {
      const user: any[] = [];
      let i = 0;
      this.rpta.lbags.forEach((element: any) => {
        i++;
        const obj = {
          actionCode: element.actionCode,
          amount: element.amount,
          count: 0,
          currency: element.currency,
          description: element.description,
          disabled: true,
          otherSpecialCondition: element.otherSpecialCondition,
          serviceFreeText: element.serviceFreeText,
          serviceType: element.serviceType,
          specialCondition: element.specialCondition,
          ssrCode: element.ssrCode,
        }
        i === 1 ? obj.disabled = true : obj.disabled = false;
        user.push(obj);
      });
      this.contador.push(user);
    });
    this.armarSegmentos();
  }

  armarSegmentos() {

    const segmets: any[] = [];
    this.rpta.lseatMaps.forEach((asd: any) => {
      var aa: any[] = [];
      this.contador.forEach(element => {

        var obj = {
          basiga: element
        }

        aa.push(obj);
      });
      segmets.push(aa);
    });

    this.baggageSegmets = segmets;
    this.contador = this.baggageSegmets[0];
    this.mostrar = true;
    this.pintarBag();
  }

  pintarBag() {
    let imagen: any;
    imagen = document.getElementById("imgFlight_0");
    imagen.style.setProperty("height", "5px", "important");


    var obj = {
      val: "--",
      stilo: true,
      delete: "",
      count: 0,
      lbaggage: this.rpta.lbags
    }
    for (let index = 0; index < this.lstPass.length; index++) {
      if (index === 0) {
        this.lstPass[index] = obj;
      }
    }
  }

  countmaleta(list: any) {

    list.forEach((element: any) => {
      element.count = 0;
    });
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      element.count = 0;
      index === 0 ? element.disabled = true : element.disabled = false;
    }

    return list;
  }



  armarAsientos(sectionId: any, pasajeroId: any, asientos: any) {
    let obj = null;
    if (asientos != null) {
      if (asientos.length > 0) {
        asientos.forEach((element: any) => {
          if (pasajeroId === element.numberPassenger) {
            if (sectionId === element.tramo) {
              obj = {
                Column: element.columna,
                Row: element.fila,
                Amount: element.amount
              }

            }
          }
        });
      }
    }


    return obj;
  }

  juntarPasajeros(list: any) {
    let lstPass: any[] = [];
    if (list.length > 0) {
      list.forEach((element: any) => {
        element.pasajeros.forEach((pass: any) => {
          pass.numberPassenger = pass.numberPassenger - 1;
          lstPass.push(pass);
        });
      });
    }
    return lstPass;
  }


  armarRQ(segment: any, idPasajero: any, maleta: any, asientos: any, carrier: any) {
    let obj: any;
    let data: any;
    let valor = this.Oancillaries.Lpassenger.findIndex((m: any) => m.PassengerID == idPasajero);
    if (valor != -1) {
      data = this.Oancillaries.Lpassenger[valor].Lsegment.findIndex((m: any) => m.SegmentID == segment);
      if (data != -1) {
        this.Oancillaries.Lpassenger[valor].Lsegment[data].Lbag.push(maleta);
      } else {
        obj = { SegmentID: segment, SectionID: segment, AirlineCode: carrier, Lbag: [] }
        obj.Lbag.push(maleta);
        this.Oancillaries.Lpassenger[valor].Lsegment.push(obj);
      }
    } else {
      let obj: any;
      segment = segment - 1;
      idPasajero = idPasajero - 1;
      let Lsegmet = [];
      obj = {
        SectionID: this.objeto[segment].id,
        SegmentID: this.objeto[segment].id,
        Airlinecode: this.objeto[segment].marketingCode,
        Lbag: []
      }
      obj.Lbag.push(maleta);
      Lsegmet.push(obj);
      let objeto: any;
      objeto = {
        PassengerID: this.objeto[segment].pasajeros[idPasajero].id,
        Lsegment: Lsegmet
      }
      this.Oancillaries.Lpassenger.push(objeto);
    }
  }

  armarinfo(segment: any, idPasajero: any, maleta: any) {
    let obj: any;

    segment = segment - 1;
    idPasajero = idPasajero - 1;
    let Lsegmet = [];
    obj = {
      SectionID: this.objeto[segment].id,
      SegmentID: this.objeto[segment].id,
      Airlinecode: this.objeto[segment].marketingCode,
      Lbag: []
    }
    obj.Lbag.push(maleta);
    Lsegmet.push(obj);
    let pwe: any = {
      PassengerID: this.objeto[segment].pasajeros[idPasajero].id,
      Lsegment: Lsegmet
    }
    this.OancillariesInfo.LpassengerInfo.push(pwe);
  }

  llenarRQ() {
    let maletas = [];
    let pasajero: any;

    let cryp = this.cookieServices.get("ss_passengerAsientos")
    let asientos = this.head.desencriptar(cryp);
    if (asientos != null) {
      pasajero = this.juntarPasajeros(asientos);
    }

    this.objeto.forEach(element => {
      element.pasajeros.forEach((pass: any) => {
        pass.maletas.forEach((mal: any) => {
          if (mal.count === 1) {
            this.armarRQ(element.id, pass.id, mal, pasajero, element.marketingCode);
            this.armarinfo(element.id, pass.id, mal);
          }
        });
      });
    });


  }

  quitarRQ(index: any) {
    let objeto: any;
    let Lsegmet = [];
    let obj: any = {
      SectionID: this.objeto[this.numSegment].id,
      SegmentID: this.objeto[this.numSegment].id,
      Airlinecode: this.objeto[this.numSegment].marketingCode,
      Lbag: []
    }
    obj.Lbag.push(this.objeto[this.numSegment].pasajeros[this.numPasajero].maletas[index]);
    Lsegmet.push(obj);
    objeto = {
      PassengerID: this.objeto[this.numSegment].pasajeros[this.numPasajero].id,
      Lsegment: Lsegmet
    }
    this.Oancillaries.Lpassenger.push(objeto);
  }

  addBaggage(dest: any, index: any) {
    let contador = this.maletasAngular[index].count;
    let male = this.maletasAngular;
    const listaa = [];
    listaa.push(male);
    this.baggageSegmetsBlock = this.baggageSegmets;
    if (this.objeto[this.numSegment].pasajeros[this.numPasajero].maletas[index].count === 1) {
      return;
    }

    let lsita = [];

    this.objeto[this.numSegment].pasajeros[this.numPasajero].maletas[index].count = 1;


    for (let index = 0; index < this.rpta.lbags.length; index++) {
      let element = this.maletasAngular[index];
      if (dest === element) {



        if (this.maletasAngular[index + 1] != null && this.maletasAngular[index + 1] != undefined) {
          this.objeto[this.numSegment].pasajeros[this.numPasajero].maletas[index + 1].disabled = true;
        }


      }

      lsita.push(element);
    }


    this.total = this.total + parseFloat(dest.amount);

    this.currency = dest.currency;
    this.contMal++;
  }

  selectAsiento(valor: any) {
    this.maletasAngular = this.baggageSegmets[this.numSegment][valor].basiga;
    this.numPasajero = valor;
    var obj = {
      val: this.lstPass[valor].val,
      stilo: true,
      delete: this.lstPass[valor].delete,
      count: this.lstPass[valor].count,
      lbaggage: this.lstPass[valor].lbaggage
    }

    for (let index = 0; index < this.lstPass.length; index++) {
      if (index === valor) {
        this.lstPass[index] = obj;
      } else {
        var valor1 = {
          val: this.lstPass[index].val,
          stilo: false,
          delete: this.lstPass[index].delete,
          count: this.lstPass[index].count,
          lbaggage: this.lstPass[valor].lbaggage
        }
        this.lstPass[index] = valor1;
      }

    }

  }

  lessBaggage(dest: any, index: any) {
    let contador = this.maletasAngular[index].count;
    let male = this.maletasAngular;
    const listaa = [];
    listaa.push(male);


    this.baggageSegmetsBlock = this.baggageSegmets;
    if (this.objeto[this.numSegment].pasajeros[this.numPasajero].maletas[index].count === 0) {
      return;
    }

    if (this.maletasAngular[index + 1] != null && this.maletasAngular[index + 1] != undefined) {
      if (this.maletasAngular[index + 1].count === 1) {
        return;
      }
    }

    let lsita = [];

    for (let index = 0; index < this.rpta.lbags.length; index++) {
      let element = this.maletasAngular[index];
      if (dest === element) {

        this.objeto[this.numSegment].pasajeros[this.numPasajero].maletas[index].count = 0;


        if (this.maletasAngular[index + 1] != null && this.maletasAngular[index + 1] != undefined) {

          this.objeto[this.numSegment].pasajeros[this.numPasajero].maletas[index + 1].disabled = false;
        }

      }

      lsita.push(element);
    }


    const obj = {
      basiga: lsita
    }




    this.total = this.total - parseFloat(dest.amount);

    this.currency = dest.currency;
    this.contMal--;

  }

  ordenarPasajeros(val: any) {
    var irde: any[] = [];
    const pass: any[] = [];
    var asientos: any[] = [];

    val.lseatMaps.forEach((element: any) => {
      var valor = {
        val: "--",
        stilo: false,
        delete: "",
        count: 0,
        lbaggage: val.lbags
      }
      var valo = {};
      irde = [];
      asientos = [];
      this.users.forEach((asiento: any) => {
        asientos.push(valo);
        irde.push(valor);
      });
      this.listaAsientos.push([]);
      pass.push(irde);

    });

    this.usuarios = pass;
    this.lstPass = this.usuarios[0];
  }

  moverIzq(id_container: any) {


    const container = document.getElementById(id_container);
    this.sideScroll(container, "left", 5, 320, 10);
  }

  moverDer(id_container: any) {


    const container = document.getElementById(id_container);
    this.sideScroll(container, "right", 5, 320, 10);
  }




  other() {

    let datos = this.llenarPass();


    let cripto = this.head.encriptar(datos)
    this.cookieServices.set("ss_rqAsientos", cripto);


    this.cookieServices.delete("ss_dataMaletaInfo", "/flights");
    this.cookieServices.delete("ss_dataMaleta", "/flights");

    let cookie = this.cookieServices.get('lstServices');
    let datas = this.head.desencriptar(cookie);
    let menus = this.validateMenu(datas);
    if (menus.Crosseling === true) {
      this.router.navigate(["flights/crosselling-hotel"]);
    } else {
      this.router.navigate(["flights/passenger-data"]);
    }

  }

  llenarPass() {
    let lista: any[] = [];
    let cryp = this.cookieServices.get("ss_passengerAsientos")
    let valor = this.head.desencriptar(cryp);
    if (valor != null) {
      valor.forEach((element: any) => {
        if (element.pasajeros.length >= 1) {
          element.pasajeros.forEach((pass: any) => {
            lista.push(pass);
          });
        }
      });
    }
    let data;
    if (lista.length > 0) {
      data = this.llenarAsientos(lista);
    } else {
      data = null;
    }

    return data;
  }

  llenarAsientos(lst: any) {
    let lista: any = [];
    let seg: any;
    let obj: any;
    lst.forEach((element: any) => {
      seg = {
        SegmentID: null,
        Oseat: {
          Column: null,
          Row: null,
          Amount: null,
          Currency: null
        }
      }
      obj = {
        PassengerID: null,
        Lsegment: [],
      }
      if (lista.length > 0) {
        let data = lista.findIndex((m: any) => m.PassengerID == element.numberPassenger);
        if (data != -1) {
          seg.SegmentID = element.tramo;
          seg.Oseat.Column = element.columna;
          seg.Oseat.Row = element.fila;
          seg.Oseat.Amount = element.amount;
          seg.Oseat.Currency = element.currency;
          lista[data].Lsegment.push(seg);
        } else {
          seg.SegmentID = element.tramo;
          seg.Oseat.Column = element.columna;
          seg.Oseat.Row = element.fila;
          seg.Oseat.Currency = element.currency;
          seg.Oseat.Amount = element.amount;
          obj.PassengerID = element.numberPassenger;
          obj.Lsegment.push(seg);
          lista.push(obj);
        }
      } else {
        seg.SegmentID = element.tramo;
        seg.Oseat.Column = element.columna;
        seg.Oseat.Currency = element.currency;
        seg.Oseat.Row = element.fila;
        seg.Oseat.Amount = element.amount;
        obj.PassengerID = element.numberPassenger;
        obj.Lsegment.push(seg);
        lista.push(obj);
      }
    });

    return lista;
  }

  confirmar() {

    this.llenarRQ();
    let datos = this.llenarPass();


    let cripto = this.head.encriptar(datos)
    this.cookieServices.set("ss_rqAsientos", cripto);

    let male = this.head.encriptar(this.OancillariesInfo)
    this.cookieServices.set("ss_dataMaletaInfo", male);

    let onlyum = this.head.encriptar(this.Oancillaries)
    this.cookieServices.set("ss_dataMaleta", onlyum);


    let cookie = this.cookieServices.get('lstServices');
    let datas = this.head.desencriptar(cookie);

    let menus = this.validateMenu(datas);
    if (menus.Crosseling === true) {
      this.router.navigate(["flights/crosselling-hotel"]);
    } else {
      this.router.navigate(["flights/passenger-data"]);
    }
  }

  moverIzqPhone(id_container: any) {

    const container = document.getElementById(id_container);
    this.sideScroll(container, "left", 5, 280, 10);
  }

  moverDerPhone(id_container: any) {

    const container = document.getElementById(id_container);
    this.sideScroll(container, "right", 5, 280, 10);
  }

  sideScroll(element: any, direction: any, speed: any, distance: any, step: any) {
    var scrollAmount = 0;
    var slideTimer = window.setInterval(function () {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  changeFlight(valor: any) {
    if (valor === this.numSegment) {
      return;
    } else {
      this.lstPass = this.usuarios[valor];
      this.maletasAngular = this.baggageSegmets[valor][0].basiga;
      this.contador = this.baggageSegmets[valor];

      this.numSegment = valor;
      let imagen: any;

      for (let index = 0; index < this.destinos.length; index++) {
        if (valor === index) {
          imagen = document.getElementById("imgFlight_" + valor);
          imagen.style.height = "5px";
        } else {
          imagen = document.getElementById("imgFlight_" + index);
          imagen.style.height = "0px";
        }

      }


      this.numPasajero = 0;
      return;
    }


  }

  ngAfterViewInit() {


  }

}
