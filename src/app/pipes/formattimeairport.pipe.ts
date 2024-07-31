import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattimeairport'
})
export class FormattimeairportPipe implements PipeTransform {

  transform(value: any): any {
    let timeairport;
    if (value != null) {
      timeairport = value.replace("00d", "").trim();
    }
    return timeairport;
  }
}
