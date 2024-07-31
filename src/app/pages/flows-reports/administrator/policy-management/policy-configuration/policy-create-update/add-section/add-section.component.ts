import { Component, OnInit, Input } from '@angular/core';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { aiportData } from 'src/app/services/airport.const';

declare var $: any;


@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})


export class AddSectionComponent implements OnInit {
  
  
  lstAutocomplete: any[] = [];
  airportlist: any;
  citylist: any;
  minDateRetorno!: Date;
  calendarSalidaValue! :Date;
  dateCustomClasses!: DatepickerDateCustomClasses[];

  textOne = "col-lg col-md col-sm col-12";
  textTwo = "col-lg-3 col-md-3 col-sm-3 col-12";
  textThree = "col-lg-2 col-md-2 col-sm-2 col-12";
  group: any = null;
  @Input() lstMulti: any;
  @Input() validStyle: any;
  @Input() validDate!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.group = aiportData;
    
    this.validTamanos();
  }

  validTamanos(){
    if(this.validStyle === true){
      this.textOne = "col-lg-12 col-md-12 col-sm-12 col-12";
      this.textTwo = "col-lg-12 col-md-12 col-sm-12 col-12";
      this.textThree = "col-lg-12 col-md-12 col-sm-12 col-12"
    }
  }

  selectEvent(item: any,item2: any) {
 
    item2.origenIata = item.iataCode;
    item2.origen = item.name;
    /* this.isOpen = false;
    this.setBorderGood("searchOriginInit"); */
    $(".x").hide();
  }

  deleteTramo(){
    this.lstMulti.pop();
  }

  addTramo(){
    let valor = new Date();
    let disa;
    if(this.lstMulti[this.lstMulti.length - 1].salidaShow != ''){
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

  onChangeSearch(val: string, item: any) {

    this.lstAutocomplete = [];
    const lstAutocomplete = this.lstAutocomplete;
    this.group.lairports.forEach(function (aeropuerto: any) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.name,
        priority: aeropuerto.priority,
        categoryId: 1,
        categoryName: "Aeropuerto",
      };
      lstAutocomplete.push(obj1);
    });
    this.group.lcities.forEach(function (ciudad: any) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        searchName: ciudad.name,
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: "Ciudad",
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(
        (word) => word.name.toLowerCase().search(val.toLowerCase()) >= 0
      );
      item.data = resultFilter;

      $(".x").hide();
    }
  }

  selectEventDestino(item: any,index: any,item2: any) {
   /*  this.datosEnvira.destinoAuto = item.iataCode;
    this.datosEnvira.destinoTexto = item.name;
    this.valdestino = false;
    this.setBorderGood("searchDestinoInit");
    $(".x").hide();
    if (this.model.origentTexto.length < 5) {
      this.model.origentTexto = "";
    } */
    item2.destinoIata = item.iataCode;
    item2.destino = item.name;
    if(this.lstMulti[index+1] != null && this.lstMulti[index+1] != undefined){
      this.lstMulti[index+1].origenIata = item.iataCode;
      this.lstMulti[index+1].origen = item.name;
    }
    $(".x").hide();
  }

  onChangeSearchDestino(val: string, item: any) {

  

    this.lstAutocomplete = [];
    const lstAutocomplete = this.lstAutocomplete;
    this.group.airportlist.forEach(function (aeropuerto: any) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.name,
        priority: aeropuerto.priority,
        categoryId: 1,
        categoryName: "Aeropuerto",
      };
      lstAutocomplete.push(obj1);
    });
    this.group.citylist.forEach(function (ciudad: any) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        searchName: ciudad.name,
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: "Ciudad",
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;

    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(
        (word) => word.name.toLowerCase().search(val.toLowerCase()) >= 0
      );
      item.data1 = resultFilter;

      $(".x").hide();
    }
  }

  onValueChangeSalida(value: any,item: any,index: any): void {
    $("#txtFechaSalida").removeClass("campo-invalido");

    this.dateCustomClasses = [
      { date: this.minDateRetorno, classes: ["bg-danger", "text-warning"] },
    ];

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
      item.salida = value.getFullYear() + "/" + mes + "/" + dia;
      item.salidaShow = dia + "/" + mes + "/" + value.getFullYear();
      if(this.lstMulti[index+1] != null && this.lstMulti[index+1] != undefined){
        this.lstMulti[index+1].minDate = value;
        this.lstMulti[index+1].disable = false;
      }
      /* this.valueShow = this.datosEnvira.fechaSalidaShow; */
    }
  }

}
