import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-filter-name',
  templateUrl: './filter-name.component.html',
  styleUrls: ['./filter-name.component.css']
})
export class FilterNameComponent {
  @Input() lstHotel: any[] = [];
  listadohotel: any[] = [];
  @Output() select = new EventEmitter<any>();

  filterName() {
    let nombre: any;
    let results;
    let listado :any[] = [] = this.lstHotel;
   
    
    nombre = $('#nombrehotel').val();
    results = listado.filter(m => m.name.toUpperCase().includes(nombre.toUpperCase()))
    
    this.listadohotel = results;
    this.select.emit(this.listadohotel);
  }

}
