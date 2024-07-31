import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createDivVacio'
})
export class CreateDivPipe implements PipeTransform {

  transform(value: any[], cantidad: number): any {
    return value.filter((x) => x <= cantidad);
  }

}
