import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-order-price',
  templateUrl: './order-price.component.html',
  styleUrls: ['./order-price.component.css']
})
export class OrderPriceComponent implements OnInit {

  @Output() searchFlightFilter = new EventEmitter<any[]>();
  textoPrecio;
  @Input() searchFlight: any[] = [];

  constructor(private head: HeaderService) { this.textoPrecio = 'Precio'; }

  ngOnInit(): void {
  }

  deMenorAMayor(elem1:any, elem2:any) {
    return elem1 - elem2;
  }

  deMayorAMenor(elem1:any, elem2:any) {
    return elem2 - elem1;
  }

 

  seleccionarPrecio(valor1: any, valor2:any) {
    this.textoPrecio = valor2;
    if (valor1 === 'mas') {
      this.searchFlight.sort((a, b) => a.oprice.totalAmount - b.oprice.totalAmount );
    }
    if (valor1 === 'menos') {
      this.searchFlight.sort((a, b) => b.oprice.totalAmount - a.oprice.totalAmount );
    }
    this.searchFlightFilter.emit(this.searchFlight);
  }

}
