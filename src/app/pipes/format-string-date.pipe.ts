import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStringDate'
})
export class FormatStringDatePipe implements PipeTransform {

  transform(value: Date): any {
    if (value != undefined) {
      const fechaComoString = value.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' }); // Convertir a formato "dd MMMM"
      return fechaComoString;
    }

  }

}
