import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaformat'
})
export class FechaformatPipe implements PipeTransform {

  transform(value: any): any {
    let fechatotal;
    if(value instanceof Date) {

    } else {
      let fecha = value.substr(0, 10);
      let fechaformat = fecha.split('-');
      let año = fechaformat[0];
      let mes = fechaformat[1];
      let dia = fechaformat[2];
      fechatotal = año  + '-' + mes  + '-' + dia;
      return fechatotal;
    }
  
   
  }

}
