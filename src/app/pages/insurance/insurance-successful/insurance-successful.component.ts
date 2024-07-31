import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-insurance-successful',
  templateUrl: './insurance-successful.component.html',
  styleUrls: ['./insurance-successful.component.css']
})
export class InsuranceSuccessfulComponent implements OnInit {

  card: any;
  passengers: any[] = [];
  messages2: Message[] | any;
  messages3: Message[] | any;
  constructor(private head: HeaderService,private router: Router) {
    
    
  }

  ngOnInit(): void {
    this.head.ocultarSpinner();
    this.messages2 = [
      { severity: 'info', summary: '', detail: 'A partir de 70 años, el monto aumenta 50%.' },
    ];
    this.messages3 = [
      { severity: 'info', summary: '', detail: 'A partir de 75 años, el monto aumenta 100%.' },
    ];
    const data = history.state.data;
    this.card = data.card;
    this.passengers = data.result.lpassengers;
  }

  cerrar(){
    this.router.navigate(["insurance"]);
  }

}
