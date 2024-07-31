import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-bag-data',
  templateUrl: './bag-data.component.html',
  styleUrls: ['./bag-data.component.css']
})
export class BagDataComponent implements OnInit {
  @Input() data: any;
  @Input() borrar: any;
  precioTotal: any;
  dates: any;
  precioAsientos = 0;
  @Output() select = new EventEmitter<any>();
  constructor(private cookie: CookieService,private head: HeaderService,private service: FlightService) {
    
    
  }

  ngOnInit(): void {
  

    let cryp = this.cookie.get("ss_passengerAsientos")
    this.dates = this.head.desencriptar(cryp);
    if (this.dates != null) {
      this.dates = this.validarPasajeros();
    }
  }

  validarPasajeros() {
    let lista: any = [];
    this.dates.forEach((segment: any) => {
      if (segment.pasajeros.length > 0) {
        lista.push(segment);
      }
    });
    this.letPriceAsientos(lista);
    return lista;
  }

  letPriceAsientos(list: any[]) {
    list.forEach(element => {
      element.pasajeros.forEach((pass: any) => {
        this.precioAsientos = this.precioAsientos + pass.amount;
      });
    });
  }

  eliminarMaleta(pass: any,bag: any,maleta: any) {
    let passId = bag.PassengerID - 1;
    let segmentid = pass.SegmentID - 1;
   

    let lich : any = this.cookie.get("ss_dataMaleta");
    lich  = this.head.desencriptar(lich);

    let index: number;
    index = lich.Lpassenger[passId].Lsegment.findIndex((item: any) => item.SegmentID === pass.SegmentID);
          


    let newli = lich.Lpassenger[passId].Lsegment[index].Lbag.indexOf(maleta);
    lich.Lpassenger[passId].Lsegment[index].Lbag.splice(newli, 1);


    let onlyum = this.head.encriptar(lich)
    this.cookie.set("ss_dataMaleta", onlyum);


    
    let ind = this.data.LpassengerInfo.indexOf(bag);
    this.data.LpassengerInfo.splice(ind, 1);
  

    if(this.data.LpassengerInfo.length === 0){
      this.data = null;
      this.cookie.set("ss_dataMaleta", "");
      this.cookie.set("ss_dataMaletaInfo", "");
      this.getFeeAncilliares();
    }
    this.renovar(this.dates);
  }

  getFeeAncilliares() {
    this.head.mostrarSpinner();

    let secc : any = this.cookie.get("ss_dataMaleta");
    secc  = this.head.desencriptar(secc);

    let seat: any = this.cookie.get("ss_rqAsientos");
    seat  = this.head.desencriptar(seat);


   
    if (seat != null) {
      seat.forEach((element:any) => {
        element.PassengerID = element.PassengerID + 1;
      });
    }
    let obj: any = {
      Currency: "USD",
      SearchType: "C",
      Lpassenger: secc,
      Lseat: seat
    }
    if (secc === null && seat === null) {
      obj = null;
    }

    this.service.GenerateFeeAncilliares(obj).subscribe(
      x => {
        if(x != null){
          this.precioTotal = x.totalAmount;
          this.select.emit(this.precioTotal);
        } 
        let fee = this.head.encriptar(x);
        this.cookie.set("feeAncilliares",fee);
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  renovar(valor: any) {
    let lista: any = [];
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

    let cripto = this.head.encriptar(data)
    this.cookie.set("ss_rqAsientos", cripto);
    this.getFeeAncilliares();

  }

  llenarAsientos(lst: any) {
    let lista: any = [];
    lst.forEach((element: any) => {
      let seg: any = {
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

}
