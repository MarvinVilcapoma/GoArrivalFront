import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-seat-data',
  templateUrl: './seat-data.component.html',
  styleUrls: ['./seat-data.component.css']
})
export class SeatDataComponent implements OnInit {

  @Input() data: any;
  @Input() borrar: any;
  @Input() maletas: any;
  @Output() select = new EventEmitter<any>();
  precioTotal: any;
  dataSeats: any;
  /**
   *
   */
  newListMale:any[] = [];
  precioAsientos = 0;
 
  constructor(private head: HeaderService,private Cookie: CookieService,private service: FlightService) {
      
  }

  ngOnInit(): void {
    let lich: any = this.Cookie.get("ss_dataMaleta");
    this.newListMale = this.head.desencriptar(lich);
    this.getFeeAncilliares();
    if (this.data != null) {
      this.data = this.validarPasajeros();
    }
  }

  eliminarMaleta(pass: any,bag: any,maleta: any){
    let passId = bag.PassengerID - 1;
    let segmentid = pass.SegmentID - 1;

    let lich: any = this.newListMale;

    let index: number;
    index = lich.Lpassenger[passId].Lsegment.findIndex((item: any) => item.SegmentID === pass.SegmentID);
    segmentid = index;


    let newli = lich.Lpassenger[passId].Lsegment[segmentid].Lbag.indexOf(maleta);
    lich.Lpassenger[passId].Lsegment[segmentid].Lbag.splice(newli, 1);

    this.newListMale = lich;

   


    let ind = this.maletas.LpassengerInfo.indexOf(bag);
    this.maletas.LpassengerInfo.splice(ind, 1);

  
    if(this.maletas.LpassengerInfo.length === 0){
      this.maletas = null;
      this.Cookie.delete("ss_dataMaleta","/flights");
      this.Cookie.delete("ss_dataMaletaInfo","/flights");
     /*  this.getFeeAncilliares(); */
    }
    this.renovar(this.data);
  }

  validarPasajeros() {
    let lista: any = [];
    this.data.forEach((segment: any) => {
      if (segment.pasajeros.length > 0) {
        lista.push(segment);
      }
    });
    this.letPriceAsientos(lista);
    return lista;
  }

  letPriceAsientos(list: any) {
    list.forEach((element: any) => {
      element.pasajeros.forEach((pass: any) => {
        this.precioAsientos = this.precioAsientos + pass.amount;
      });
    });
  }


  eliminarPasajero(index: any, index2: any, item: any) {

    let ind = this.data[index].pasajeros.indexOf(item);
    this.data[index].pasajeros.splice(ind, 1);
    if (this.data[index].pasajeros.length === 0) {
      let valor = this.data.indexOf(index2);
      this.data.splice(valor, 1);
    }

    if(this.data.length === 0){
      this.data = null;

      this.precioTotal = 0;
      this.Cookie.set("ss_rqAsientos","");
      this.Cookie.delete("ss_rqAsientos","/flights");
    }
    this.renovar(this.data);
  }

  getFeeAncilliares() {
    this.head.mostrarSpinner();
   
    let secc = this.Cookie.get("ss_dataMaleta");
    secc = this.head.desencriptar(secc);

    let seat: any = this.Cookie.get("ss_rqAsientos");
    seat = this.head.desencriptar(seat);

    


    if (seat != null) {
      seat.forEach((element: any) => {
        element.PassengerID = element.PassengerID + 1;
      });
    }
    let obj: any = {
      Currency: "USD",
      SearchType: "C",
      Lpassenger: this.newListMale,
      Lseat: seat
    }
    if (secc === null && seat === null) {
      obj = null;
      this.select.emit(0);
    }
    
    this.service.GenerateFeeAncilliares(obj).subscribe(
      x => {
        if(x != null){
          this.precioTotal = x.totalAmount;
          this.select.emit(this.precioTotal);
        } 
        let fee = this.head.encriptar(x);
        this.Cookie.set("feeAncilliares",fee);
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  

  renovar(valor: any) {
    let lista :any[]= [];
    if (valor != null) {
      valor.forEach((element:any) => {
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
    this.Cookie.delete("ss_rqAsientos","/flights");
    this.Cookie.set("ss_rqAsientos",cripto);
    this.getFeeAncilliares();

  }

  llenarAsientos(lst: any[]) {
    let lista:any[] = [];
    let lsegmen: any[] = [];
    let seg: any;
    lst.forEach(element => {
      seg = {
        SegmentID: null,
        Oseat: {
          Column: null,
          Row: null,
          Amount: null,
          Currency: null
        }
      }
      let obj = {
        PassengerID: null,
        Lsegment: lsegmen,
      }
      if (lista.length > 0) {
        let data = lista.findIndex(m => m.PassengerID == element.numberPassenger);
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
