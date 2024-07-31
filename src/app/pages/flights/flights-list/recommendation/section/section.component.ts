import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() section: any;
  @Input() sectionLength: any;
  @Input() posicion: any;
  @Input() recommendationId: any;
  @Input() recommendationIndex: any;
  @Input() tipoVuelo: any;
  @Input() pseudoRepeat: any;
  @Input() index: any;

  @Output() segmentRadioCheckId = new EventEmitter<string>();
  @Output() outSection = new EventEmitter<any>();
  @Output() outSegmentCheck = new EventEmitter<any>();

  textType: string;
  imgIdaVuelta: string;
  constructor() {
    this.textType = "";
    this.imgIdaVuelta = "";
   }

  ngOnInit(): void {

    if (this.sectionLength === 1) {
      this.textType = 'Ida';
      this.imgIdaVuelta = 'airplane_ida.svg';
    }

    if (this.tipoVuelo === 'RT') {
      if (this.posicion % 2 === 0) {
        this.textType = 'Vuelta';
        this.imgIdaVuelta = 'airplane_vuelta.svg';
      } else {
        this.textType = 'Ida';
        this.imgIdaVuelta = 'airplane_ida.svg';
      }
    }

    if (this.tipoVuelo === 'MC') {
      this.textType = 'Tramo ' + this.posicion;
    }
  }

  ngAfterViewInit() {
    if (this.sectionLength === 1) {
      this.textType = 'Ida';
    }

    if (this.sectionLength === 2) {}

    if (this.sectionLength > 2) {}
  }

  setSegmentCheck($event: any) {
    this.outSegmentCheck.emit($event);
  }

}
