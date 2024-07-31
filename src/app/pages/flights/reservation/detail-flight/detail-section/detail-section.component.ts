import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail-section',
  templateUrl: './detail-section.component.html',
  styleUrls: ['./detail-section.component.css']
})
export class DetailSectionComponent implements OnInit {
  @Input() section: any;
  @Input() tipoVuelo: any;
  @Input() sectionLength: any;
  @Input() posicion: any;
  @Input() LSection: any;
  @Input() index: any;
  @Input() lstBag: any;
  visibleResumen: boolean =false;
  modalRef!: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  textType: any;
  imgIdaVuelta: any;
  marketingcarrier: any;
  validAirline = false;
  constructor(private modalService: BsModalService) { }

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

  ObtenerAirline($event: any) {
    this.marketingcarrier = $event;
    this.validAirline = true;
 }

 openModal(template: TemplateRef<any>) {
   this.modalRef = this.modalService.show(
     template,
     Object.assign({}, { class: 'gray modal-lg m-resumen' })
   );
 }

}
