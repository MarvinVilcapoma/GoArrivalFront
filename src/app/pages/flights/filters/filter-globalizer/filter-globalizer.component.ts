import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-globalizer',
  templateUrl: './filter-globalizer.component.html',
  styleUrls: ['./filter-globalizer.component.css']
})
export class FilterGlobalizerComponent implements OnInit {
  @Input() lstGlobalizer: any[] = [];
  @Input() searchFlight: any[] = [];

  @Input() filterClean: boolean = false;

  @Output() searchFlightFilter = new EventEmitter<any[]>();
  resultFilter: any[] = [];
  checkAll: any;
 
  check: any;
  selectedAirline: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  filtrarAerolinea(event: any){
    console.log('Valor de filterClean en filtrarAerolinea:', this.filterClean);
    if (this.selectedAirline.length === 0) {

      this.searchFlight.forEach(element => {
        element.isVisible = true;
      });

    } else {
      
      // this.searchFlight.forEach(flight => {
      //   let valor = this.selectedAirline.includes(flight.gds);
      //   valor ? flight.isVisible = true : flight.isVisible = false;
      // });
      this.searchFlight.forEach(flight => {
        flight.isVisible = this.selectedAirline.includes(flight.gds);
      });
    }

    console.log('Selected Airlines:', this.selectedAirline);

    this.searchFlightFilter.emit(this.searchFlight);
  }


}
