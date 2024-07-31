import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-filter-time',
  templateUrl: './filter-time.component.html',
  styleUrls: ['./filter-time.component.css']
})
export class FilterTimeComponent implements OnInit {

  value!: number;

  paymentOptions: any[] = [
    { name: 'Vuelos directos', value: 1 },
    { name: 'Salida en la mañana', value: 2 },
    { name: 'Salida en la noche', value: 3 }
  ];

  @Input() tipoEscala: any;
  @Input() searchFlight: any[] = [];
  @Input() request: any;
  @Output() searchFilter = new EventEmitter<any[]>();
  @Output() filterTurn = new EventEmitter<any>();
  @Output() refreshdata = new EventEmitter<any[]>();

  flagVD: any;
  flagSM: boolean;
  flagSN: boolean;
  flagVDactivo: boolean;
  flagSMactivo: boolean;
  flagSNactivo: boolean;
  dataRequestFlight: any;
  departureArrivalTimeFrom: any;
  departureArrivalTimeTo: any;
  ss_horasFrom: any;
  ss_horasTo: any;

  constructor(
    public head: HeaderService
  ) {
    this.flagSM = true;
    this.flagSN = true;
    this.flagVDactivo = false;
    this.flagSMactivo = false;
    this.flagSNactivo = false;
  }

  ngOnInit(): void {
    this.tipoEscala === '' ? this.flagVD = true : this.flagVD = false;
  }

  returnFlight() {
    this.searchFlight.forEach(function (recomendacion: any, index1: any) {
      recomendacion.isVisible = true;
      const lsections = recomendacion.lsection;
      lsections.forEach(function (section: any, index2: any) {
        section.isVisible = true;
        const lSegments = section.lschedule;
        lSegments.forEach(function (segment: any, index3: any) {
          segment.isVisible = true;
        });
      });
    });
  }

  changeTurn() {
    switch (this.value) {
      case 1:
        this.returnFlight();
        this.selDirectos();
        break;
      case 2:
        this.returnFlight();
        this.selSalidaManiana();
        break;
      case 3:
        this.returnFlight();
        this.selSalidaNoche();
        break;
      default:
        this.returnFlight();
        this.searchFilter.emit(this.searchFlight);
        this.refreshdata.emit(this.searchFlight);
        break;
    }
  }

  selDirectos() {
    this.head.mostrarSpinner();
    this.searchFlight.forEach(function (recomendacion: any, index1: any) {
      const lsections = recomendacion.lsection;
      let sectionCount = 0;
      lsections.forEach(function (section: any, index2: any) {
        const lSegments = section.lschedule;
        const lSegmentsLength = lSegments.length;
        let segmentCount = 0;
        lSegments.forEach(function (segment: any, index3: any) {
          const lSegmentGroups = segment.lsegment;
          const nroEscalas = lSegmentGroups.length - 1;
          if (nroEscalas > 0) {
            segment.isVisible = false;
            segmentCount++;
          }
        });
        if (lSegmentsLength === segmentCount) {
          section.isVisible = false;
          sectionCount++;
        }
      });
      if (sectionCount > 0) {
        recomendacion.isVisible = false;
      }
    });
    this.searchFilter.emit(this.searchFlight);
    this.refreshdata.emit(this.searchFlight);
  }



  selSalidaManiana() {
    this.searchFlight.forEach(flight => {
      const lsections: any[] = flight.lsection;
      let sectionCount = 0;
      lsections.forEach(section => {
        const lschedules: any[] = section.lschedule;
        const lSegmentsLength = lschedules.length;
        let segmentCount = 0;
        lschedules.forEach(schedule => {
          const horaSalida = parseInt(schedule.departureDateShow.split(':')[0]);
          if (horaSalida >= 12) {
            schedule.isVisible = false;
            segmentCount++;
          }
        });
        if (lSegmentsLength === segmentCount) {
          section.isVisible = false;
          sectionCount++;
        }
      });
      if (sectionCount > 0) flight.isVisible = false;
    });
    this.searchFilter.emit(this.searchFlight);
    this.refreshdata.emit(this.searchFlight);
  }



  selSalidaNoche() {

    this.searchFlight.forEach(flight => {
      const lsections: any[] = flight.lsection;
      let sectionCount = 0;
      lsections.forEach(section => {
        const lschedules: any[] = section.lschedule;
        const lSegmentsLength = lschedules.length;
        let segmentCount = 0;
        lschedules.forEach(schedule => {
          const horaSalida = parseInt(schedule.departureDateShow.split(':')[0]);
          if (horaSalida < 19) {
            schedule.isVisible = false;
            segmentCount++;
          }
        });
        if (lSegmentsLength === segmentCount) {
          section.isVisible = false;
          sectionCount++;
        }
      });
      if (sectionCount > 0) flight.isVisible = false;
    });

    this.searchFilter.emit(this.searchFlight);
    this.refreshdata.emit(this.searchFlight);
  }
}
