import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IgxSliderType } from "igniteui-angular";

@Component({
  selector: 'app-filter-price',
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css']
})
export class FilterPriceComponent implements OnInit {
  step = 0.01;
  rangeValues: number[] = [0, 100];
  @Input() minPrice!: number;
  @Input() maxPrice!: number;
  @Input() lstHotel: any[] = [];
  @Output() select = new EventEmitter<any>();
  /**
   *
   */

  public sliderType = IgxSliderType;
  


  constructor() {
    
    
  }

  ngOnInit(): void {
    this.rangeValues = [this.minPrice,this.maxPrice];
  }

  filtPrice(valor_ :any): any {
    const menorprecio = this.minPrice;
    const mayorprecio = this.maxPrice;
    let precio1: any;
    let precio2: any;
   
    let results = [];

    precio1 = this.rangeValues[0];
    precio2 = this.rangeValues[1];
    if (precio1 < menorprecio || precio1 > mayorprecio) {
      //$('#precio1').val(menorprecio);
      return false;
    }
    if (precio2 < menorprecio || precio2 > mayorprecio) {
    
      return false;
    }
    let listado: any[] = [] = this.lstHotel;
    results = listado.filter(m => m.oprice.pricePerAllNights >=  precio1 &&  m.oprice.pricePerAllNights <= precio2);
    let lsthotel: any  = results;
    this.select.emit(lsthotel);
   }

}
