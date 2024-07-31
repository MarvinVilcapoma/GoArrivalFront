import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  messages: Message[] | any;

  number: string = "";
  dateExpired: any = "";
  cvv: string = "";
  name: string = "";
  lastName: string = "";

  ngOnInit(): void {
    this.messages = [{ severity: 'warn', summary: 'Aviso', detail: 'Tu tarjeta sólo será usada como garantía, pagarás directamente en el hotel.' }];
  }

}
