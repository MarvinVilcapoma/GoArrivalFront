import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { FlightService } from 'src/app/services/flight/flight.service';

@Component({
  selector: 'app-passenger-data',
  templateUrl: './passenger-data.component.html',
  styleUrls: ['./passenger-data.component.css']
})
export class PassengerDataComponent implements OnInit {
  @Input() lstCountries: any[] = [];
  @Input() lstDocument: any[] = [];
  @Input() lstGender: any[] = [];
  @Input() lstPerson: any[] = [];
  selectedCity: any | undefined;
  messages: Message[] | any;
  minDate!: Date;
  maxDate!: Date;
  
  /**
   *
   */
  constructor() {
    
    
  }

  ngOnInit(): void {
    this.minDate = new Date(1915, 0, 1);
    const currentYear = new Date().getFullYear();

    this.maxDate = new Date(currentYear - 18, 12, 0);

    this.maxDate.setDate(this.maxDate.getMonth() - 168);
    this.messages = [{ severity: 'warn', summary: 'Aviso', detail: 'Serán los responsables de hacer el check-in y check out en cada habitación del alojamiento.' }];
  }

 

}
