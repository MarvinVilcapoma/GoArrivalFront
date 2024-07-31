import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-successful-reservation',
  templateUrl: './successful-reservation.component.html',
  styleUrls: ['./successful-reservation.component.css']
})
export class SuccessfulReservationComponent implements OnInit {
  messages: Message[] | any;
  data: any;
  dataHotel: any;
  dataReservation: any;
  responsiveOptions: any[] | any;

  /**
   *
   */
  constructor(private head: HeaderService) {
    
    
  }
  ngOnInit() {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    this.data = history.state.data;
    this.dataReservation = this.data.data;
    this.dataHotel = this.data.dataHotel;
    this.messages = [{ severity: 'success', summary: '¡Felicidades!', detail: 'Tu reserva de hotel ha sido generada con éxito.' }];
    this.head.ocultarSpinner();
  }
}
