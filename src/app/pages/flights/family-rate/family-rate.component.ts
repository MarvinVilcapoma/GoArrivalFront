import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-family-rate',
  templateUrl: './family-rate.component.html',
  styleUrls: ['./family-rate.component.css']
})
export class FamilyRateComponent implements OnInit {

  @Input() modalRef!: BsModalRef;
  @Input() lstSection: any[] = [];
  @Input() lfamilyCombinations: any;
  @Input() request: any;
  @Output() select = new EventEmitter<any>();
  lstComi: any[] = [];
  priceFinal: any = null;
  showPrice = false;
  valorValid: boolean = false;
  price: number = 0;
  currency: string = "";
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
  lstValid: any[] = [];
  lstCombi: any[] = [];
  selectionColor : any = 0;
  section: any;
  constructor(private head: HeaderService) { }

  ngOnInit() {
    this.validColor();
  }

  validColor(){
    this.lstSection.forEach((element,index) => {
      if(element.isDefault) { this.selectionColor = index; this.section = element; this.price = element.oprice.totalAmountWithCharges; this.currency = element.oprice.currency};
    });
  }

  ocultar() {
    this.modalRef.hide();
  }


  continuar(){
    this.head.mostrarSpinner();
/*     for (let index = 0; index < this.section.lsegmentFareBasis.length; index++) {
      const element = this.section.lsegmentFareBasis[index];
      this.request.Lsections[element.sectionId-1].Oschedule.Lsegments[element.segmentId-1].FareBasis = element.fareBasis;
      this.request.Lsections[element.sectionId-1].Oschedule.Lsegments[element.segmentId-1].familyName = element.familyName;
    } */
    const data = {
      section: this.section,
      family: false
    }
    this.select.emit(data);
  }

  changeColor(valor: any) {
    let id = valor.indexSection;
    this.section = valor.section;
    this.price = valor.section.oprice.totalAmountWithCharges;
    this.currency = valor.section.oprice.currency;
    if(id === this.selectionColor) return;
    if(id != this.selectionColor) this.removeBorde(id); 
  }

  removeBorde(id: any){
    let idFamily : any = document.getElementById("family_" + this.selectionColor);
    idFamily.style.setProperty("border", "none", "important");
    this.setBorder(id);
  }

  setBorder(id: any){
    let idFamilyDelete : any = document.getElementById("family_" + id);
    idFamilyDelete.style.setProperty("border", "3px solid" + this.colorsFare[id], "important");
    this.selectionColor = id;
  }

}
