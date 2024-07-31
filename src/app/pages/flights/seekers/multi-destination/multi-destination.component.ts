import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

declare var $: any;

@Component({
  selector: 'app-multi-destination',
  templateUrl: './multi-destination.component.html',
  styleUrls: ['./multi-destination.component.css']
})
export class MultiDestinationComponent implements OnInit {


  lstAutocomplete: any[] = [];
  airportlist: any;
  citylist: any;
  minDateRetorno!: Date;
  calendarSalidaValue!: Date;
  dateCustomClasses!: DatepickerDateCustomClasses[];
  filteredItems: any[] | any;

  @Input() lstMultidestino: any[] = [];


  textOne = "col-lg col-md col-sm col-12";
  textTwo = "col-lg-3 col-md-3 col-sm-3 col-12";
  textThree = "col-lg-2 col-md-2 col-sm-2 col-12";

  @Input() cities: any[] = [];
  @Input() style!: boolean;
  @Input() lstMulti: any;
  @Input() validStyle: any;
  @Input() validDate!: boolean;
  @Output() selectAddTramo = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
/*     if(this.lstMultidestino.length === 1){
      this.addObject();
    } */
    
    /*     this.validTamanos(); */
  }

  addObject() {
    if (this.lstMultidestino.length >= 6) {
      return;
    } else {
      this.lstMultidestino.push({
        selectedItem: "",
        agregarClase: false,
        agregarClaseRet: false,
        agregarClaseFecha: false,
        disabled: this.lstMultidestino[this.lstMultidestino.length -1].bsValue === null ? true : false,
        defaultDate: this.lstMultidestino[this.lstMultidestino.length -1].bsValue === null ? new Date() : this.lstMultidestino[this.lstMultidestino.length -1].bsValue,
        selectedItemRetorno: "",
        bsValue: null,
        minDate: this.lstMultidestino[this.lstMultidestino.length -1].bsValue === null ? new Date() : this.lstMultidestino[this.lstMultidestino.length -1].bsValue, 
      });
      this.selectAddTramo.emit(true);
    }

  }



  filterItems(event: AutoCompleteCompleteEvent) {

    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.cities as any[]).length; i++) {
      let item = (this.cities as any[])[i];
      if (item.label.toLowerCase().search(query.toLowerCase()) >= 0) {
        filtered.push(item);
      }
    }
    this.filteredItems = filtered;
  }

  validTamanos() {
    if (this.validStyle === true) {
      this.textOne = "col-lg-12 col-md-12 col-sm-12 col-12";
      this.textTwo = "col-lg-12 col-md-12 col-sm-12 col-12";
      this.textThree = "col-lg-12 col-md-12 col-sm-12 col-12";
      this.setNewDate();
    }
  }

  selectDates(id: number, item: any) {
    let itemSelected = this.lstMultidestino[id+1];
    item.agregarClaseFecha = false;
    if (itemSelected != undefined){
      itemSelected.defaultDate = item.bsValue;
      itemSelected.disabled = false;
      
      item.bsValue > itemSelected.bsValue ? itemSelected.bsValue = null : null; 
      itemSelected.minDate = item.bsValue;
    }
    /*   if (this.bsValue[1] != null && this.bsValue[1] != undefined && !this.headerService.validPhone()) {
        this.startCalendar.overlayVisible = false;
      } */
  }

  selectItem(id: number,item: any){
    let itemSelected = this.lstMultidestino[id+1];
    item.agregarClaseRet = false;
    if (itemSelected != undefined){
      itemSelected.selectedItem = item.selectedItemRetorno;
      itemSelected.agregarClase = false;
    }
  }

  setNewDate() {
    this.lstMulti.forEach((element: any) => {
      element.salida = new Date(element.salida);
    });
  }

  selectEvent(item: any, item2: any) {

    item2.origenIata = item.iataCode;
    item2.origen = item.name;
    /* this.isOpen = false;
    this.setBorderGood("searchOriginInit"); */
    $(".x").hide();
  }

  deleteTramo() {
    this.lstMultidestino.pop();
    this.selectAddTramo.emit(false);
  }

  addTramo() {
    let valor = new Date();
    let disa;
    if (this.lstMulti[this.lstMulti.length - 1].salidaShow != '') {
      disa = false;
    } else {
      disa = true;
    }
    let obj = {
      origen: null,
      destino: null,
      disable: disa,
      origenIata: null,
      destinoIata: null,
      minDate: new Date(),
      salida: "",
      salidaShow: "",
      data: [],
      data1: [],
      keyword: "name"
    }
    this.lstMulti.push(obj);
  }



  selectEventDestino(item: any, index: any, item2: any) {

    item2.destinoIata = item.iataCode;
    item2.destino = item.name;
    if (this.lstMulti[index + 1] != null && this.lstMulti[index + 1] != undefined) {
      this.lstMulti[index + 1].origenIata = item.iataCode;
      this.lstMulti[index + 1].origen = item.name;
    }
    $(".x").hide();
  }



  onValueChangeSalida(value: any, item: any, index: any): void {

    $("#txtFechaSalida").removeClass("campo-invalido");
    if (value != null && value != "") {
      let mes = "";
      let getMonth = value.getMonth() + 1;
      if (getMonth < 10) {
        getMonth = value.getMonth() + 1;
        mes = "0" + getMonth;
      } else {
        mes = "" + getMonth;
      }

      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }

      if (value >= this.calendarSalidaValue) {
        $("#fechadestino").val("");

      }
      let year: any = value.getFullYear();
      const anio: string = year.toString();
      item.salida = value;
      item.salidaShow = dia + "/" + mes + "/" + anio;

      /*      item.salida = value.getFullYear() + "/" + mes + "/" + dia; */
      /*
           item.salida = value.getFullYear() + "/" + mes + "/" + dia;
           item.salidaShow = dia + "/" + mes + "/" + value.getFullYear(); */
      if (this.lstMulti[index + 1] != null && this.lstMulti[index + 1] != undefined) {
        this.lstMulti[index + 1].minDate = value;
        this.lstMulti[index + 1].disable = false;
      }

    }
  }

}
