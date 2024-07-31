import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatBooking'
})
export class DateFormatBookingPipe implements PipeTransform {

  transform(value: any): any {
    let data;
    let recorte;
    let fecha;
    let hora;
    let fechafinal;
    let fechaformat;
    let dia;
    let mes;
    let año;
    let fechatotal;
    recorte = value.split("T");
    fecha = recorte[0];
    hora =  recorte[1];
    fechaformat = fecha.split("-");
    dia = fechaformat[2];
    mes = fechaformat[1];
    año = fechaformat[0];
    fechatotal = año + '/' + mes + '/' + dia;
    hora = hora.substr(0,5);
    fechafinal = fechatotal + ' ' + hora;
    return fechafinal;
  }

}
