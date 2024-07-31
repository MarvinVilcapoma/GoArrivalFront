import { Component, OnInit, Input, AfterViewInit,Output,EventEmitter } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-family-fare',
  templateUrl: './family-fare.component.html',
  styleUrls: ['./family-fare.component.css']
})
export class FamilyFareComponent implements OnInit, AfterViewInit {

  lstIncluye: any[] = [];
  lstNoIncluye: any[] = [];
  lstPago: any[] = [];
  validShow = false;
  changeC: string = "";
  @Input() segment: any;
  @Input() sectionId: any;
  @Input() idSection: any;
  @Input() idSegment: any;
  @Input() lstComi: any[] = [];
  @Input() lfamilyCombinations: any[] = [];
  @Output() select = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();
  lstCombinada: any[] =[];
  lstIds: any[] = [];
  valorValid: any;
  priceFinal: any;
  colorsFare = [
    "#3D5DBB",
    "#FF560D",
    "#E8A40C",
    "#FFCD0D",
    "#65E29C",
    "#71FC86",
    "#71D7FC",
    "#9BC53D",
    "#5F1A37",
    "#274C77",
    "#BE95C4",
    "#8EA604",
    "#3C1518",
    "#D90368",
    "#00CC66",
    "#4C2C69",
    "#C33C54",
  ];
  constructor() { }

  ngOnInit(): void {
    this.llenarList();
    this.orderLst();
  }

  createList(lst: any[], idV: string) {
    for (let index = 0; index < lst.length; index++) {
      const element = this.segment.lfareFamilies[index];
      let id = this.idSection + "_" + this.idSegment + "_" + index + "_" + element.fareBasis + "_div";
      if (id !== idV) {
        let bloque = document.getElementById(id);
        bloque?.style.setProperty("background-color", 'rgb(198, 198, 198)', "important");
      }
    }
  }

  llenarList(){
    let lstComi = [];
    for (let index = 0; index < this.segment.lfareFamilies.length; index++) {
      const element = this.segment.lfareFamilies[index];
      if (this.segment.fareBasis === element.fareBasis) {
        const obj = {
          fareBasis : this.segment.fareBasis,
        sectionId : this.sectionId,
        segmentId : this.idSegment,
        familyName: element.familyName
        }
     
        this.select.emit(obj);
        /* this.llenarObj(this.segment.fareBasis, this.idSegment, this.sectionId); */
      }
    }
  }


  ngAfterViewInit() {
    this.setChecked();
  }



  changeColor(valor1: any, index: any) {
    let bloque = document.getElementById(valor1);
    bloque?.style.setProperty("background-color", this.colorsFare[index], "important");
  }

  changeColorHtml(index: any, fare_: string, lst: any[]) {
    let valor1 = this.idSection + '_' + this.idSegment + '_' + index + "_" + fare_ + "_div";

    let bloque = document.getElementById(valor1);

    bloque?.style.setProperty("background-color", this.colorsFare[index], "important");
    this.createList(lst, valor1);
    
  }

  changeFamily(fare_ :any,name: any){
    this.valorValid = false;
    const valor = {
      fareBasis : fare_,
      sectionId : this.sectionId,
      segmentId : this.idSegment,
      familyName: name
    }
    valor.segmentId = valor.segmentId + 1;
    this.lstComi.forEach(element => {
      if(element.sectionId === valor.sectionId){
        if(element.segmentId === valor.segmentId){
          element.fareBasis = valor.fareBasis;
          element.familyName = valor.familyName;
        }
      }
    });
    this.letPrice();
    if(this.valorValid === false){
      this.priceFinal = null;
    }

    const objeto = {
      price: this.priceFinal,
      lstFare: this.lstComi
    }
    this.change.emit(objeto);
   
  }

  letPrice(){
    this.lfamilyCombinations.forEach((element: any) => {
      if(!this.valorValid){
        this.questionFamily(element.lfareBasisCombinations,element.oprice);
      }
      
    });

  }

  questionFamily(lstFam_ :any[],price: any){
    for (let index = 0; index < lstFam_.length; index++) {
      const element = lstFam_[index];
      delete element.obaggage;
    }


    this.valorValid = this.sonListasIguales1(lstFam_,this.lstComi);
    if(this.valorValid){
      this.priceFinal = price;
    } 
    
  }

  sonListasIguales1(lista1: any[], lista2: any[]): boolean {
    if (lista1.length !== lista2.length) {
      return false; // Las listas tienen diferentes longitudes
    }
  
    for (let i = 0; i < lista1.length; i++) {
      let objeto1 = lista1[i];
      let objeto2 = lista2[i];
  
      for (let propiedad in objeto1) {
        if (objeto1[propiedad] !== objeto2[propiedad]) {
          return false; // Los objetos tienen una propiedad diferente
        }
      }
    }
  
    return true; // Si no se encontraron diferencias, las listas son iguales
  }

  llenarObj(fare: string, segment: number, section: number) {
    let obj = {
      fareBasis : fare,
    sectionId : section,
    segmentId : segment
    }
 
    this.lstCombinada.push(obj);
  }

  setChecked() {
    for (let index = 0; index < this.segment.lfareFamilies.length; index++) {
      const element = this.segment.lfareFamilies[index];
      if (this.segment.fareBasis === element.fareBasis) {

        let valor1 = this.idSection + '_' + this.idSegment + '_' + index + "_" + this.segment.fareBasis + "_div";
        this.changeColor(valor1, index);
        let valor = this.idSection + '_' + this.idSegment + '_' + index + "_" + this.segment.fareBasis;
        const maleRadio = document.getElementById(valor) as HTMLInputElement;
        maleRadio.checked = true;
       
      }
    }

  }


  orderLst() {
    this.segment.lfareFamilies.forEach((element: any) => {
      this.lstIncluye = [];
      this.lstNoIncluye = [];
      this.lstPago = [];
      if (element.lfamilyServices?.length > 0) {
        element.lfamilyServices.forEach((family: any) => {
          switch (family.serviceStatus) {
            case "INC":
              this.lstIncluye.push(family.serviceDescription);
              break;
            case "CHA":
              this.lstPago.push(family.serviceDescription);
              break;
            case "NOF":
              this.lstNoIncluye.push(family.serviceDescription);
              break;
          }
        });
      }
      element.incluye = this.lstIncluye;
      element.noIncluye = this.lstNoIncluye;
      element.pagaPor = this.lstPago;
    });
    this.validShow = true;
  }

}
