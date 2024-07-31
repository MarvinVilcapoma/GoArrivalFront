import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit, AfterViewInit {

  rpta: any;
  nombre: any;
  lista: any;
  destinos: any;
  buscar = 0;
  users: any;
  mostrar = false;
  valorAsiento: any;
  deleteAsiento: any;
  listaAsientos: any = [];
  listaShowAsiento: any = [];
  numPasajero = 0;
  blockNumPass = 0;
  textNext = "Siguiente Vuelo";
  segments: any;
  mismoPasajero = false;
  usuarios: any;
  lstPass: any;
  numSegment = 0;
  pass: any = [];
  idPasajero = 0;
  Lpasajeros: any;
  textOrder = "";
  constructor(private router: Router, private head: HeaderService,private cookieServices: CookieService) { }

  ngOnInit() {

    this.validPhone();

    let seat: any = sessionStorage.getItem('seatBags');
    this.rpta = this.head.desencriptar(seat);

    this.destinos = this.rpta.lseatMaps;
      if (this.destinos.length === 1) {
        this.textNext = 'Confirmar';
      } else {
        this.textNext = 'Siguiente Vuelo';
      }
      this.ordenarAsientosv1(this.rpta);

      this.head.ocultarSpinner();



  }

  validPhone() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
      this.textOrder = "order-first";
    }

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

  armarRq() {
    let Lpassenger = [];
    for (let index = 0; index < this.rpta.lseatMaps.length; index++) {
      const element = this.rpta.lseatMaps[index];
      const obj = {
        tramo: element.oorigin.cityName + " - " + element.odestination.cityName,
        pasajeros: this.listaShowAsiento[index]
      }
      Lpassenger.push(obj);
    }

    this.Lpasajeros = Lpassenger;

    let cookie = this.cookieServices.get('lstServices');
    let datas = this.head.desencriptar(cookie);

    let cryp = this.head.encriptar(Lpassenger);
    this.cookieServices.set("ss_passengerAsientos",cryp)

    let datos = this.llenarPass();

    let passenger = this.head.encriptar(Lpassenger);
    this.cookieServices.set("ss_passengerAsientos",passenger);
    let cripto = this.head.encriptar(datos)
    this.cookieServices.set("ss_rqAsientos",cripto);
    let menus = this.validateMenu(datas);
    if (this.rpta.lbags != null && menus.Maletas === true) {
      if (this.rpta.lbags.length === 0) {
        if (menus.Crosseling === true) {
          this.router.navigate(["flights/crosselling-hotel"]);
        } else {
          this.router.navigate(["flights/passenger-data"]);
        }
      } else {
        this.router.navigate(["flights/select-bag"]);
      }
    } else {
      if (menus.Crosseling === true) {
        this.router.navigate(["flights/crosselling-hotel"]);
      } else {
        this.router.navigate(["flights/passenger-data"]);
      }


    }

  }

  llenarPass() {
    let lista: any = [];
    let valor: any = [];
    valor = this.Lpasajeros;
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

  llenarAsientos(lst: any[]) {
    let lista: any = [];
    lst.forEach(element => {
      let seg = {
        SegmentID: null,
        Oseat: {
          Column: null,
          Row: null,
          Amount: null,
          Currency: null
        }
      }

      let obj: any = {
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

  changeFlightConf(valor: any) {

    valor = valor + 1;
    if (this.destinos.length === valor) {
      this.armarRq();
      return;
    }
    this.numSegment = valor;

    let valid = this.destinos.length - 1;
    if (valid === valor) {
      this.textNext = "Confirmar"
    }
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

    if (valor === 0 && this.buscar === 0) {
      return
    } else {
      this.buscar = valor;
      this.lista = this.segments[valor];
      this.lstPass = this.usuarios[valor];
    }
    if (this.lista.lcabins != null) {
      this.lista.lcabins.forEach((element: any) => {
        element.numSillas.forEach((cabin: any) => {
          cabin.lstSillas.forEach((asiento: any) => {
            if (asiento.select) {
              this.nombre = document.getElementById('img_' + asiento.seatRow + asiento.seatColumn);
              if (this.nombre.src === "http://localhost:4200/assets/images/asiento.svg") {
                this.nombre.src = "http://localhost:4200/assets/images/seleccionado.svg";
              } else {
                this.nombre.src = "http://localhost:4200/assets/images/asiento.svg"
              }
            }
          });
        });

      });
    }


    var obj = {
      val: this.lstPass[0].val,
      stilo: true,
      delete: this.lstPass[0].delete,
      amount: this.lstPass[0].amount
    }
    for (let index = 0; index < this.lstPass.length; index++) {
      if (index === 0) {
        this.lstPass[index] = obj;
      } else {
        var obj1 = {
          val: this.lstPass[index].val,
          stilo: false,
          delete: this.lstPass[index].delete,
          amount: this.lstPass[index].amount
        }
        this.lstPass[index] = obj1;
      }

    }
    this.numPasajero = 0;
    return;

  }



  changeFlight(valor: any) {
    if (this.numSegment === valor) {
      return;
    } else {
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
      let valid = this.destinos.length - 1;
      if (valid === valor) {
        this.textNext = "Confirmar";
      } else {
        this.textNext = "Siguiente Vuelo";
      }

      if (valor === 0 && this.buscar === 0) {
        return
      } else {
        this.buscar = valor;
        this.lista = this.segments[valor];
        this.lstPass = this.usuarios[valor];
      }
      if (this.lista.lcabins != null) {
        this.lista.lcabins.forEach((element: any) => {
          element.lstSillas.forEach((asiento: any) => {
            if (asiento.select) {
              this.nombre = document.getElementById('img_' + asiento.seatRow + asiento.seatColumn);
              if (this.nombre != null) {
                if (this.nombre.src === "http://localhost:4200/assets/images/asiento.svg") {
                  this.nombre.src = "http://localhost:4200/assets/images/seleccionado.svg";
                } else {
                  this.nombre.src = "http://localhost:4200/assets/images/asiento.svg"
                }
              }

            }
          });
        });
      }


      var obj = {
        val: this.lstPass[0].val,
        stilo: true,
        delete: this.lstPass[0].delete,
        amount: this.lstPass[0].amount
      }
      for (let index = 0; index < this.lstPass.length; index++) {
        if (index === 0) {
          this.lstPass[index] = obj;
        } else {
          var obj1 = {
            val: this.lstPass[index].val,
            stilo: false,
            delete: this.lstPass[index].delete,
            amount: this.lstPass[index].amount
          }
          this.lstPass[index] = obj1;
        }

      }
      this.numPasajero = 0;
      return;

    }

  }

  changeFlights(valor: any) {
    this.numSegment = valor;
    let imagen: any;

    for (let index = 0; index < this.destinos.length; index++) {
      if (valor === index) {
        imagen = document.getElementById("imgFlights_" + valor);
        imagen.style.height = "5px";
      } else {
        imagen = document.getElementById("imgFlights_" + index);
        imagen.style.height = "0px";
      }

    }

    if (valor === 0 && this.buscar === 0) {
      return
    } else {
      this.buscar = valor;
      this.lista = this.segments[valor];
      this.lstPass = this.usuarios[valor];
    }
    this.lista.forEach((element: any) => {
      element.lstSillas.forEach((asiento: any) => {
        if (asiento.select) {
          this.nombre = document.getElementById('img_' + asiento.seatRow + asiento.seatColumn);
          if (this.nombre.src === "http://localhost:4200/assets/images/asiento.svg") {
            this.nombre.src = "http://localhost:4200/assets/images/seleccionado.svg";
          } else {
            this.nombre.src = "http://localhost:4200/assets/images/asiento.svg"
          }
        }
      });
    });

    var obj = {
      val: this.lstPass[0].val,
      stilo: true,
      delete: this.lstPass[0].delete,
      amount: this.lstPass[0].amount
    }
    for (let index = 0; index < this.lstPass.length; index++) {
      if (index === 0) {
        this.lstPass[index] = obj;
      } else {
        var obj1 = {
          val: this.lstPass[index].val,
          stilo: false,
          delete: this.lstPass[index].delete,
          amount: this.lstPass[index].amount
        }
        this.lstPass[index] = obj1;
      }

    }
    this.numPasajero = 0;
    return;

  }

  ordenarAsientosv1(valor: any) {

    var segments = [];


    for (let index = 0; index < valor.lseatMaps.length; index++) {
      const segment = valor.lseatMaps[index];
      var mySet = [];
      if (segment.lcabins != null) {
        segment.lcabins.forEach((cabin: any) => {
          cabin.lcolumns.forEach((element: any) => {
            element.code = cabin.code;
            let lista: any = [];
            if (segment.lseats != null) {
              segment.lseats.forEach((asiento: any) => {
                if (asiento.characteristics === null || asiento.characteristics.length === 0) {
                  asiento.characteristics = [{}];
                }
                if (asiento.oprice != null) {
                  asiento.precio = asiento.oprice.amount;
                  asiento.moneda = asiento.oprice.currency;
                } else {
                  asiento.precio = '';
                  asiento.moneda = '';
                }
                asiento.select = false;
                if (!asiento.chargable || asiento.precio === '') {
                  asiento.img = 'noasiento';
                } else {
                  asiento.img = 'asiento';
                }

                asiento.segment = index;
                asiento.value = asiento.seatRow.toString() + asiento.seatColumn.toString();
                if (cabin.code === asiento.cabinCode) {
                  lista.push(asiento);
                }
              });
            }

            cabin.numSillas = [];
            cabin.lstSillas = lista;
          });
        });
      }



    }
    this.ordenarAsientos(valor);

  }

  ordenarAsientos(valor: any) {

    var segments: any = [];


    for (let index = 0; index < valor.lseatMaps.length; index++) {
      const segment = valor.lseatMaps[index];
      var mySet: any = [];
      if (segment.lcabins != null) {
        segment.lcabins.forEach((cabin: any) => {
          cabin.lcolumns.forEach((element: any) => {
            element.code = cabin.code;
            let lista: any = [];
            cabin.lstSillas.forEach((asiento: any) => {
              if (asiento.characteristics === null || asiento.characteristics?.length === 0) {
                asiento.characteristics = [{}];
              }
              if (asiento.oprice != null) {
                asiento.precio = asiento.oprice.amount;
                asiento.moneda = asiento.oprice.currency;
              } else {
                asiento.precio = '';
                asiento.moneda = '';
              }
              asiento.select = false;
              if (!asiento.chargable || asiento.precio === '') {
                asiento.img = 'noasiento';
              } else {
                asiento.img = 'asiento';
              }

              asiento.segment = index;
              asiento.value = asiento.seatRow.toString() + asiento.seatColumn.toString();
              if (element.column === asiento.seatColumn) {
                lista.push(asiento);
              }
            });
            const asobj = {
              vuelo: segment.equipmentType,
              letra: element.column,
              lstSillas: lista
            }
            cabin.numSillas.push(asobj);
          });
          segments.push(mySet);
        });
      }



    }
    this.ordenarPasajeros(valor);
    this.segments = valor.lseatMaps;
    this.lista = valor.lseatMaps[0];
  }

  other() {
    this.cookieServices.delete("ss_passengerAsientos","/flights");
    this.cookieServices.delete("ss_rqAsientos","/flights");

    let cookie = this.cookieServices.get('lstServices');
    let datas = this.head.desencriptar(cookie);

    let menus = this.validateMenu(datas);
    if (this.rpta.lbags != null && menus.Maletas === true) {
      if (this.rpta.lbags.length === 0) {
        if (menus.Crosseling === true) {
          this.router.navigate(["flights/crosselling-hotel"]);
        } else {
          this.router.navigate(["flights/passenger-data"]);
        }
      } else {
        this.router.navigate(["flights/select-bag"]);
      }
    } else {
      if (menus.Crosseling === true) {
        this.router.navigate(["flights/crosselling-hotel"]);
      } else {
        this.router.navigate(["flights/passenger-data"]);
      }


    }

  }

  ordenarPasajeros(val: any) {

    let token: any = sessionStorage.getItem('passengers');
    this.users = this.head.desencriptar(token);

    var irde: any = [];
    let pass: any = [];
    var asientos = [];

    val.lseatMaps.forEach((element: any) => {
      let valor = {
        val: "--",
        stilo: false,
        delete: "",
        amount: ""
      }
      let valo = {};
      irde = [];
      asientos = [];
      this.users.forEach((asiento: any) => {
        asientos.push(valo);
        irde.push(valor);
      });
      this.listaAsientos.push([]);
      this.listaShowAsiento.push([]);
      pass.push(irde);

    });

    this.usuarios = pass;
    this.lstPass = pass[0];
    this.mostrar = true;
    this.pintarFlight();

  }

  pintarFlight() {
    let imagen: any;

    imagen = document.getElementById("imgFlight_0");
    imagen.style.setProperty("height", "5px", "important");
    /*  imagen.style.height = "5px"; */
    var obj = {
      val: "--",
      stilo: true,
      delete: "",
      amount: ""
    }
    for (let index = 0; index < this.lstPass.length; index++) {
      if (index === 0) {
        this.lstPass[index] = obj;
      }

    }
  }

  ngAfterViewInit() {

  }

  selectAsiento(valor: any) {

    if (this.listaAsientos[this.numSegment].length === this.users.length) {
      return;
    } else {
      this.numPasajero = valor;
      var obj = {
        val: this.lstPass[valor].val,
        stilo: true,
        delete: this.lstPass[valor].delete,
        amount: this.lstPass[valor].amount
      }

      for (let index = 0; index < this.lstPass.length; index++) {
        if (index === valor) {
          this.lstPass[index] = obj;
        } else {
          var valor1 = {
            val: this.lstPass[index].val,
            stilo: false,
            delete: this.lstPass[index].delete,
            amount: this.lstPass[index].amount
          }
          this.lstPass[index] = valor1;
        }

      }
      this.blockNumPass = valor;
    }
  }


  eliminarAsiento(valor: any, valor1: any, pass: any) {
    this.valorAsiento = document.getElementById("pasajero" + valor);
    this.nombre = document.getElementById('img_' + this.valorAsiento.value);
    let buscarobj;
    if (this.lista.lcabins != null) {
      this.lista.lcabins.forEach((element: any) => {
        element.numSillas.forEach((cabin: any) => {
          cabin.lstSillas.forEach((asiento: any) => {
            if (valor1 === asiento.value) {
              asiento.select = false;
              asiento.img = "asiento";
              let numadul = valor;
              let price;
              if (asiento.oprice != null) {
                price = asiento.oprice.currency + asiento.oprice.amount.toString();
              }
              buscarobj = {
                tramo: this.numSegment + 1,
                numberPassenger: numadul,
                numAdulto: "Adulto" + " " + numadul.toString(),
                columna: asiento.seatColumn,
                fila: asiento.seatRow,
                asiento: asiento.seatRow + asiento.seatColumn,
                precio: price
              }
            }
          });
        });

      });
    }

    let wqwe = {
      val: "--",
      stilo: false,
      delete: "",
      amount: ""
    }
    for (let index = 0; index < this.lstPass.length; index++) {

      if (index === valor) {
        this.lstPass[index] = wqwe;
      }
    }

    const index = this.listaAsientos[this.numSegment].indexOf(valor1);
    this.listaShowAsiento[this.numSegment].splice(index, 1);
    this.listaAsientos[this.numSegment].splice(index, 1);
    this.valorAsiento = document.getElementById("pasajero" + valor);
    this.valorAsiento.innerHTML = " -- ";
    this.valorAsiento.value = null;
    this.mismoPasajero = false;
    this.selectAsiento(valor);
  }

  setSrc(asiento: any, valor: any, valor1: any, valor2: any, valor3: any, segment: any, num: any) {
    if (this.listaAsientos[segment] === this.users.length) {
      return;
    } else {
      let price;
      let dinero;
      let moneda;
      if (asiento.oprice != null) {
        price = asiento.oprice.currency + asiento.oprice.amount.toString();
        dinero = asiento.oprice.amount;
        moneda = asiento.oprice.currency;
      }
      let numadul = this.numPasajero + 1;
      let objAsiento = {
        tramo: this.numSegment + 1,
        numberPassenger: numadul,
        numAdulto: "Adulto" + " " + numadul.toString(),
        columna: asiento.seatColumn,
        fila: asiento.seatRow,
        asiento: asiento.seatRow + asiento.seatColumn,
        precio: price,
        amount: dinero,
        currency: moneda
      }
      let nameAsiento = asiento.seatRow + asiento.seatColumn;

      if (asiento.noSeat || !asiento.chargable || asiento.precio === "") {
        return;
      } else {
        if (this.lista.lcabins[valor2].numSillas[num].lstSillas[valor3].img === 'seleccionado' || this.lstPass[this.numPasajero].val != '--') {
          return;
        } else {

          this.valorAsiento = document.getElementById("pasajero" + this.numPasajero);
          this.listaAsientos[segment].push(nameAsiento);
          this.listaShowAsiento[segment].push(objAsiento);
          this.mismoPasajero = true;
          let vcasd;
          if (asiento.oprice != null) {
            vcasd = asiento.oprice.currency + " " + asiento.oprice.amount.toString()
          } else {
            vcasd = null
          }

          var obj = {
            val: nameAsiento,
            stilo: true,
            delete: "Eliminar o cambiar asiento",
            amount: vcasd
          }


          this.lstPass[this.numPasajero] = obj;


          this.lista.lcabins[valor2].numSillas[num].lstSillas[valor3].img = 'seleccionado';

          this.segments[segment].lcabins[valor2].numSillas[num].lstSillas[valor3].select = true;

        }

      }
    }



  }


}
