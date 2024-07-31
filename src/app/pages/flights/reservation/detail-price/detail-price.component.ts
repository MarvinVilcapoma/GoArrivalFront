import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail-price',
  templateUrl: './detail-price.component.html',
  styleUrls: ['./detail-price.component.css']
})
export class DetailPriceComponent implements OnInit {
  @Input() flight: any;
  @Input() priceSeat: any;
  @Input() priceHotel: any;
  modalPolitica: boolean = false;
  visibleDescuento: boolean = false;
  modalRefDsctCorp!: BsModalRef;
  constructor(private head: HeaderService,private cookie: CookieService,private modalService: BsModalService) { }

  ngOnInit(): void {
  
  }





  openModalDsctCop(template: TemplateRef<any>) {
    this.modalRefDsctCorp = this.modalService.show(template);
  }

}
