import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
declare var $: any;
@Component({
  selector: 'app-filter-hour',
  templateUrl: './filter-hour.component.html',
  styleUrls: ['./filter-hour.component.css']
})
export class FilterHourComponent implements OnInit,AfterViewInit {

  @Input() indexTramo: any;
  @Input() tipoVuelo: any;
  @Input() request: any;
  @Input() lstHours: any[] = [];
  @Input() lstTramosFilter: any[] = [];
  
  maleta: any;
  @Output() searchFilter = new EventEmitter<any>();
 
  horario1 = 1;
  horario2 = 2;
  horario3 = 3;
  horario4 = 4;
  horario5 = 5;
  horario6 = 6;
  isMeridian = false;
  showSpinners = false;
  myTime1: any;
  myTime2: any;
  myTime3: any;
  myTime4: any;
  myTime5: any;
  myTime6: any;
  myTime7: any;
  myTime8: any;
  myTime9: any;
  myTime10: any;
  myTime11: any;
  myTime12: any;
  hoursPlaceholder = 'hh';
  minutesPlaceholder = 'mm';
  searchFlight: any[] = [];
  texto1: any;
  texto2: any;
  texto3: any;
  texto4: any;
  texto5: any;
  texto6: any;
  imgIdaVuelta1: any;
  imgIdaVuelta2: any;
  imgIdaVuelta3: any;
  imgIdaVuelta4: any;
  imgIdaVuelta5: any;
  imgIdaVuelta6: any;

  constructor(private service: FlightService,private head: HeaderService) { }

  ngOnInit(): void {
    console.log(this.indexTramo);
    const tipoVuelo = this.tipoVuelo;
    if (tipoVuelo === 'RT') {
      this.indexTramo = 2;
      this.texto1 = 'Ida';
      this.texto2 = 'Vuelta';
      this.imgIdaVuelta1 = 'flight/avion_ida_blanco.svg';
      this.imgIdaVuelta2 = 'flight/avion_vuelta_blanco.svg';
    }
    if (tipoVuelo === 'OW') {
      this.indexTramo = 1;
      this.texto1 = 'Ida';
      this.imgIdaVuelta1 = 'flight/avion_ida_blanco.svg';
    }
    if (tipoVuelo === 'MC') {
      this.texto1 = 'Tramo 1';
      this.texto2 = 'Tramo 2';
      this.texto3 = 'Tramo 3';
      this.texto4 = 'Tramo 4';
      this.texto5 = 'Tramo 5';
      this.texto6 = 'Tramo 6';
      this.imgIdaVuelta1 = 'flight/avion_ida_blanco.svg';
      this.imgIdaVuelta2 = 'flight/avion_ida_blanco.svg';
      this.imgIdaVuelta3 = 'flight/avion_ida_blanco.svg';
      this.imgIdaVuelta4 = 'flight/avion_ida_blanco.svg';
      this.imgIdaVuelta5 = 'flight/avion_ida_blanco.svg';
      this.imgIdaVuelta6 = 'flight/avion_ida_blanco.svg';
    }
  }

  ngAfterViewInit() {
    const indexTramo = this.indexTramo;
  }

  setHorarios() {

    this.head.mostrarSpinner();
    
    const leta = document.getElementById('chkmaleta');
    this.maleta = leta;
    let dataRequestFlight = this.request;

    let data = {
      Luser: dataRequestFlight.Luser,
      Lpassenger: dataRequestFlight.Lpassenger,
      CabinType: dataRequestFlight.CabinType,
      Type: this.tipoVuelo,
      Scales: dataRequestFlight.Scales,
      NumberOfRecomendations: 50,
      TypeSearch: this.head.getTypeSearch(),
      IncludeBaggage: dataRequestFlight.IncludeBaggage,
      IncludeCarryOn:  dataRequestFlight.IncludeCarryOn,
      Origin: dataRequestFlight.Origin,
      Destination: dataRequestFlight.Destination,
      Dates: dataRequestFlight.Dates,
      TimeFrom: dataRequestFlight.TimeFrom,
      TimeTo: dataRequestFlight.TimeTo,
      Oenterprise: dataRequestFlight.Oenterprise
    };


    const indexTramo = this.indexTramo;
    const departureArrivalTimeFrom_ = dataRequestFlight.TimeFrom;
    const departureArrivalTimeTo_ = dataRequestFlight.TimeTo;

    const time1 = $('#timepicker1').val();
    const time2 = $('#timepicker2').val();
    const time3 = $('#timepicker3').val();
    const time4 = $('#timepicker4').val();
    const time5 = $('#timepicker5').val();
    const time6 = $('#timepicker6').val();
    const time7 = $('#timepicker7').val();
    const time8 = $('#timepicker8').val();
    const time9 = $('#timepicker9').val();
    const time10 = $('#timepicker10').val();
    const time11 = $('#timepicker11').val();
    const time12 = $('#timepicker12').val();

    switch (indexTramo) {
      case 1:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        break;
      case 2:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        break;
      case 3:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        departureArrivalTimeFrom_[2] = time5;
        departureArrivalTimeTo_[2] = time6;
        break;
      case 4:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        departureArrivalTimeFrom_[2] = time5;
        departureArrivalTimeTo_[2] = time6;
        departureArrivalTimeFrom_[3] = time7;
        departureArrivalTimeTo_[3] = time8;
        break;
      case 5:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        departureArrivalTimeFrom_[2] = time5;
        departureArrivalTimeTo_[2] = time6;
        departureArrivalTimeFrom_[3] = time7;
        departureArrivalTimeTo_[3] = time8;
        departureArrivalTimeFrom_[4] = time9;
        departureArrivalTimeTo_[4] = time10;
        break;
      case 6:
        departureArrivalTimeFrom_[0] = time1;
        departureArrivalTimeTo_[0] = time2;
        departureArrivalTimeFrom_[1] = time3;
        departureArrivalTimeTo_[1] = time4;
        departureArrivalTimeFrom_[2] = time5;
        departureArrivalTimeTo_[2] = time6;
        departureArrivalTimeFrom_[3] = time7;
        departureArrivalTimeTo_[3] = time8;
        departureArrivalTimeFrom_[4] = time9;
        departureArrivalTimeTo_[4] = time10;
        departureArrivalTimeFrom_[5] = time11;
        departureArrivalTimeTo_[5] = time12;
        break;
    }

    data.TimeFrom = departureArrivalTimeFrom_;
    data.TimeTo = departureArrivalTimeTo_;

    this.service.searchFlight(data).subscribe(
      result => {
        result.status === 500 ? this.searchFilter.emit(null) : this.searchFilter.emit(result.odata.lrecommendation);
        
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      },
      () => {

      }
    );
  }



}
