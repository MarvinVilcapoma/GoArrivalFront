import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-airline',
  templateUrl: './filter-airline.component.html',
  styleUrls: ['./filter-airline.component.css']
})
export class FilterAirlineComponent implements OnInit {
  @Input() lstAerolineas: any[] = [];
  @Input() searchFlight: any[] = [];
  @Input() clearFilter: any[] = [];


  @Output() searchFlightFilter = new EventEmitter<any[]>();
  resultFilter: any[] = [];
  checkAll: any;
 
  check: any;
  selectedAirline: any[] = [];
  constructor() { }

  ngOnInit(): void {
 
   
  }

  filtrarAerolinea(event: any){
    if (this.selectedAirline.length === 0) {
      this.searchFlight.forEach(element => {
        element.isVisible = true;
      });
    } else {
      this.searchFlight.forEach(flight => {
        let valor = this.selectedAirline.includes(flight.ocarrier.code);
        valor ? flight.isVisible = true : flight.isVisible = false;
      });
    }
    this.searchFlightFilter.emit(this.searchFlight);
  }

  // filtrarAerolineas(){
  //   if (this.selectedAirline.length === 0){
  //     this.searchFlight.forEach(element =>{
  //       element.isVisible = false;
  //     });
  //   }else{

  //   }
  // }

  toogleCheckBox(){
    this.checkAll = !this.checkAll;
  }

}
