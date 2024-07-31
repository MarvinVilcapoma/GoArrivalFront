import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  isReservation = true;
  modalRef!: BsModalRef;
  messageReservation = "";
  pnrInformation!: any;
  datosuser: any;
  visibleDialog : boolean = false;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(private router: Router,private headService: HeaderService,private modalservice: BsModalService) { }

  ngOnInit(): void {
    

  
  }

  showInfoReservation(valor: any) {
    if(valor.result.status === 500){
      this.isReservation = true;
      this.messageReservation = valor.result.message; 
      this.headService.ocultarContador();
      this.headService.ocultarSpinner();
      this.visibleDialog = true;
    } else {
      this.pnrInformation = valor.result;
      this.headService.ocultarContador();
      this.pnrInformation = valor.result;
      this.datosuser = valor.lpassengers;
      const datos = {
        information: this.pnrInformation,
        users: this.datosuser
      }
      this.router.navigate(["flights/successful-reservation"], { state: { data: datos } });
    }
    
  }

  regresarB() {
    this.router.navigate(['/flights']);
  }

}
