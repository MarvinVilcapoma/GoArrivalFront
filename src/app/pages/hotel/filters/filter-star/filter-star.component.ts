import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-star',
  templateUrl: './filter-star.component.html',
  styleUrls: ['./filter-star.component.css']
})
export class FilterStarComponent {
  @Input() lstHotel: any[] = [];
  @Output() select = new EventEmitter<any>();
  listadohotel: any[] = [];
  estrella5: boolean;
  estrella4: boolean;
  estrella3: boolean;
  estrella2: boolean;
  estrella1: boolean;
  todas: boolean;
  listadoEstrellas: any[] = [];

  constructor() {
    this.estrella5 = false;
    this.estrella4 = false;
    this.estrella3 = false;
    this.estrella2 = false;
    this.estrella1 = false;
    this.todas = true;
  }

  FiltroEstrella(estrellas: any) {

    let listadohotel: any[] = [];
    let estrella1 = this.estrella1;
    let estrella2 = this.estrella2;
    let estrella3 = this.estrella3;
    let estrella4 = this.estrella4;
    let estrella5 = this.estrella5;
    let todas = this.todas;
    let listadoEstrellas = this.listadoEstrellas;

    listadohotel = this.lstHotel;

    if (estrellas === 'todas') {
      if (todas === true) {
        this.estrella1 = false;
        this.estrella2 = false;
        this.estrella3 = false;
        this.estrella4 = false;
        this.estrella5 = false;
      }
    }

    switch (estrellas) {
      case "1":
        if (estrella1 === true) {
          listadoEstrellas.push("1");
          this.todas = false;
          if (listadoEstrellas.length === 1) {
            listadohotel = [];
          } else {
            listadohotel = [];
          }
        } else {
          let indice;
          indice = listadoEstrellas.indexOf('1');
          listadoEstrellas.splice(indice, 1);
          listadohotel = [];
        }
        break;

      case "2":
        if (estrella2 === true) {
          listadoEstrellas.push("2");
          this.todas = false;
          if (listadoEstrellas.length === 1) {
            listadohotel = [];
          } else {
            listadohotel = [];
          }
        } else {
          let indice;
          indice = listadoEstrellas.indexOf('2');
          listadoEstrellas.splice(indice, 1);
          listadohotel = [];
        }
        break;

      case "3":
        if (estrella3 === true) {
          listadoEstrellas.push("3");
          this.todas = false;
          if (listadoEstrellas.length === 1) {
            listadohotel = [];
          } else {
            listadohotel = [];
          }
        } else {
          let indice;
          indice = listadoEstrellas.indexOf('3');
          listadoEstrellas.splice(indice, 1);
          listadohotel = [];
        }
        break;

      case "4":
        if (estrella4 === true) {
          listadoEstrellas.push("4");
          this.todas = false;
          if (listadoEstrellas.length === 1) {
            listadohotel = [];
          } else {
            listadohotel = [];
          }
        } else {
          let indice;
          indice = listadoEstrellas.indexOf('4');
          listadoEstrellas.splice(indice, 1);
          listadohotel = [];
        }
        break;

      case "5":
        if (estrella5 === true) {
          listadoEstrellas.push("5");
          this.todas = false;
          if (listadoEstrellas.length === 1) {
            listadohotel = [];
          } else {
            listadohotel = [];
          }
        } else {
          let indice;
          indice = listadoEstrellas.indexOf('5');
          listadoEstrellas.splice(indice, 1);
          listadohotel = [];
        }
        break;
      case "todas":
        if (todas === true) {
          listadoEstrellas = [];
        } else {
          listadoEstrellas.splice(0, 5);
          listadohotel = [];
        }
        break;
    }

    this.listadoEstrellas = listadoEstrellas;

    let listado: any = this.lstHotel;

    if (estrellas === 'todas') {
      listadohotel = listado;
      this.listadohotel = listadohotel;
    } else {
      if (listadoEstrellas.length === 0) {
        this.listadohotel = [];
        listadohotel = [];
      
      } else {
        listadoEstrellas.forEach(function(valor) {
          let results: any = listado.filter((m : any) => parseFloat(m.stars) === parseFloat(valor));
          results.forEach((element: any) => {
            listadohotel.push(element);
          });
        });
        this.listadohotel = listadohotel;
        
      }
    }

    this.select.emit(this.listadohotel);
  }
}
