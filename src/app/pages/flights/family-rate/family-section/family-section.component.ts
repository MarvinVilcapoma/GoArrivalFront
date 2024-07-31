import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-family-section',
  templateUrl: './family-section.component.html',
  styleUrls: ['./family-section.component.css']
})
export class FamilySectionComponent implements OnInit {
  isAccordionOpen: boolean = false;
  @Input() section: any;
  @Input() indexSection: any;
  @Input() lstComi: any[] = [];
  @Input() lfamilyCombinations: any[] = [];
  @Output() select = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();
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
  lstIncluye: any[] = [];
  lstPago: any[] = [];
  lstNoIncluye: any[] = [];
  divColor: string = '#FFFFFF';
 
  constructor() { }

  ngOnInit(): void {
    this.orderLst();
  }

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }


 
  selectFamily(){
    let data = {
      indexSection: this.indexSection,
      section: this.section
    }
    this.select.emit(data);
  }
 

  enviarFamiliy(valor: any) {
    this.select.emit(valor);
  }

  changeFamiliy(valor: any) {
    this.change.emit(valor);
  }

  orderLst() {
    if (this.section.lservice?.length > 0)
      this.section.lservice.forEach((family: any) => {
        switch (family.type) {
          case "INC":
            this.lstIncluye.push(family.description);
            break;
          case "CHA":
            this.lstPago.push(family.description);
            break;
          case "NOF":
            this.lstNoIncluye.push(family.description);
            break;
        }
      });

  }



}
