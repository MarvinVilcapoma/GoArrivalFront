


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateDate'
})
export class DateToSpanishPipe implements PipeTransform {

  private daysOfWeek: { [key: string]: string } = {
    'Sunday': 'domingo',
    'Monday': 'lunes',
    'Tuesday': 'martes',
    'Wednesday': 'miércoles',
    'Thursday': 'jueves',
    'Friday': 'viernes',
    'Saturday': 'sábado'
  };

  private months: { [key: string]: string } = {
    'January': 'enero',
    'February': 'febrero',
    'March': 'marzo',
    'April': 'abril',
    'May': 'mayo',
    'June': 'junio',
    'July': 'julio',
    'August': 'agosto',
    'September': 'septiembre',
    'October': 'octubre',
    'November': 'noviembre',
    'December': 'diciembre'
  };

  transform(value: string): string {
    if (!value) return '';

    const parts = value.split(' ');
    if (parts.length !== 4) return value;

    const dayOfWeek = this.daysOfWeek[parts[0]];
    const dayOfMonth = parts[1];
    const month = this.months[parts[3]];

    if (!dayOfWeek || !month) return value;

    return `${dayOfWeek} ${dayOfMonth} de ${month}`;
  }
}