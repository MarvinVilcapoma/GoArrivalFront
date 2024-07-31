import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {


  @Input() lstCountries: any;
  messages: Message[] | any;
  selectedItem: any | undefined;
  nameContact : string = "";
  correo: string  ="";
  phone: string = "";
  prefix: string = "PE"

  ngOnInit(): void {

    this.messages = [{ severity: 'warn', summary: 'Aviso', detail: 'Persona con las que podremos contactarnos en caso de haber imprevistos.' }];
   
  }
}
