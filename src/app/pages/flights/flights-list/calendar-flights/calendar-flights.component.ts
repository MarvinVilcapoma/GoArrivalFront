import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formatyyyymmddpare } from 'src/app/validators/custom-validators';


@Component({
  selector: 'app-calendar-flights',
  templateUrl: './calendar-flights.component.html',
  styleUrls: ['./calendar-flights.component.css'],
  providers: [DatePipe]
})
export class CalendarFlightsComponent implements OnInit {


  datesini: any[] = [];
  formatfechasini: any[] = []
  formatfechasfin: any[] = [];
  datesfin: any[] = [];
  calendarMatrix: any[][] = [];


  lowCost: any;
  lowCostAll: any;
  aerolineaShow = false;
  calendarShow = true;
  textCalendar: string = "Ocultar Calendario";
  @Input() salida: any;
  @Input() calendar: any[] = [];
  @Input() lstMultidestino: any;
  @Input() buscador: any;
  @Input() tipoVuelo: any;
  validCalendar = false;
  spinner = true;
  currency = 'US$';
  space = ' '
  zeta: any;
  equis: any;
  @Output() fechas = new EventEmitter<any>();
  @Output() ocultar = new EventEmitter<any>();
 
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    /* this.separateDates();
    this.validr(); */
    this.armarCalendar();
   /*  this.llenarCalendario(); */
  }

 
 

  converDate(date: string, valid_: boolean) {
    let fecha: any = date.split("T");
    fecha = fecha[0];
    fecha = fecha.replaceAll("-", "/");
    let fechaShow = fecha.split("/");
    fechaShow = fechaShow[2] + "/" + fechaShow[1] + "/" + fechaShow[0]
    if (valid_) {
      return fecha;
    } else {
      return fechaShow;
    }
  }

  searchFlight(valor: any){
    let fechas = {
      salida: valor.departureDate,
      llegada: valor.arrivalDate
    }
    this.fechas.emit(fechas);
  }



  armarCalendar() {
    this.datesini = [];
    this.datesini = this.getNewDate(this.buscador.Dates[0]);
    this.datesfin = [];
    this.datesfin = this.getNewDate(this.buscador.Dates[1]);

      // Crear la matriz 7x7
      for (let i = 0; i < 7; i++) {
          this.calendarMatrix[i] = [];
          for (let j = 0; j < 7; j++) {
              this.calendarMatrix[i][j] = [];
          }
      }

      // Recorrer la data original y llenar la matriz
      for (let index = 0; index < this.calendar.length; index++) {
          const data = this.calendar[index];
          const departureDate = data.departureDate;
          const arrivalDate = data.arrivalDate;

          // Encontrar la posición dentro de la matriz
          const departureIndex = this.datesini.indexOf(departureDate);
          const arrivalIndex = this.datesfin.indexOf(arrivalDate);

          // Agregar el elemento a la matriz en la posición correspondiente
          this.calendarMatrix[departureIndex][arrivalIndex].push(data);
      }


      this.formatfechasini = [];
      this.datesini.forEach(x => {
        const fechas = this.formatearFecha(x)
        const fech = fechas.split(" ");
        this.formatfechasini.push({
          dia: fech[0],
          fecha: fech[1] +" " + fech[2],
        });
      })

      this.formatfechasfin = [];
      this.datesfin.forEach(x => {
        const fechas = this.formatearFecha(x)
        const fech = fechas.split(" ");
        this.formatfechasfin.push({
          dia: fech[0],
          fecha: fech[1] +" " + fech[2],
        });
      })

  /*     this.cargarcalendar = true; */

  }

  formatearFecha(fecha: string): string {
    const fechaini = new Date(fecha);
    return formatDate(fechaini, 'EEEE dd MMM', 'es-PE', 'America/Lima');
  }

  formatyyyymmddpare(stringDate: string) {
    if (stringDate) {
      const date = new Date(stringDate);
      let dd = date.getDate().toString();
      let mm = (date.getMonth() + 1).toString();
      const yyyy = date.getFullYear();
      if (date.getDate() < 10) {
        dd = '0' + dd;
      }
      if ((date.getMonth() + 1) < 10) {
        mm = '0' + mm;
      }
      // const format = dd + '/' + mm + '/' + yyyy;
      const format = yyyy + '-' + mm + '-' + dd;
      return format;
    } else {
      return '';
    }
  }


  getNewDate(date: string): string[] {
    const fechacalendarini = new Date(date);
    let arraydate: string[] = [];
      arraydate.push(formatyyyymmddpare(fechacalendarini.toString())+"T00:00:00");
      let countini = 1;
      let countini2 = 1;
      for (let index = 0; index < 6; index++) {
        if(index < 3){
          const threeDaysLater = new Date(fechacalendarini);
          threeDaysLater.setDate(fechacalendarini.getDate() + countini);
          arraydate.push(formatyyyymmddpare(threeDaysLater.toString())+"T00:00:00");
          countini++;
        }else{
          const threeDaysbefore = new Date(fechacalendarini);
          threeDaysbefore.setDate(fechacalendarini.getDate() - countini2);
          arraydate.push(formatyyyymmddpare(threeDaysbefore.toString())+"T00:00:00");
          countini2++;
        }
      }

      const compararFechas = (fecha1: string, fecha2: string) => {
        return new Date(fecha1).getTime() - new Date(fecha2).getTime();
      };

      arraydate.sort(compararFechas);

      return arraydate;
  }

 

}
