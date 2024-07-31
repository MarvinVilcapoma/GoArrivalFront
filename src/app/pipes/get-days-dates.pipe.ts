import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDaysDates'
})
export class GetDaysDatesPipe implements PipeTransform {

  transform(fecha: Date[]): any {

    if (fecha[0] != null && fecha[1] != null) {
      // Convertir las fechas a milisegundos y restarlas
      const diferenciaEnMilisegundos = fecha[1].getTime() - fecha[0].getTime();

      // Convertir la diferencia de milisegundos a días
      const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));


      return dias;
    }

  }

}
