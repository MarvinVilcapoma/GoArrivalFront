import { Component, OnInit } from '@angular/core';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HeaderService } from 'src/app/services/head.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  messages: Message[] | any;
  showHotel: boolean = true;
  constructor(private head: HeaderService) { }

  ngOnInit(): void {
    this.head.ocultarSpinner();
  }

  validShow() {
    this.messages = [

      { severity: 'warn', detail: 'Ocurrió un error al momento de buscar hoteles. Por favor intente nuevamente' },

    ];
    this.showHotel = false;
    this.head.ocultarSpinner();
  }

}
