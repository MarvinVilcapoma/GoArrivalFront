import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail-booking-price',
  templateUrl: './detail-booking-price.component.html',
  styleUrls: ['./detail-booking-price.component.css']
})
export class DetailBookingPriceComponent {

  @Input() flight: any;
  modalRefPoliticas!: BsModalRef;
  modalRefDsctCorp!: BsModalRef;
  /**
   *
   */
  constructor(private modalService: BsModalService) {
  }

  openModalPoliticas(template: any) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: "gray con-politicas" })
    );
  }



  openModalDsctCop(template: TemplateRef<any>) {
    this.modalRefDsctCorp = this.modalService.show(template);
  }

}
