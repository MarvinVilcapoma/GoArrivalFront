import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';

declare var $: any;

@Component({
  selector: 'app-reason-trip',
  templateUrl: './reason-trip.component.html',
  styleUrls: ['./reason-trip.component.css']
})
export class ReasonTripComponent implements OnInit {
  @Input() lsReasonflight: any[] = [];
  @Output() reasonFlightEvent = new EventEmitter<string>();
  @Output() extraReasonEvent = new EventEmitter<string>();
  reason: any;
  classDrop: string = "";
  @Input() ifExtraReason: any;
  valorExtra: string = "";
  selectedReason: any  ="";
  constructor(private headService: HeaderService) { }

  ngOnInit(): void {
    if (this.lsReasonflight && this.lsReasonflight.length > 0){
      this.selectedReason = this.lsReasonflight[0].id;
      this.reasonFlightEvent.emit(this.lsReasonflight[0]);
  
    }
  }

  onInputChange1(id: any) {

    this.headService.setBorderGood(id);
  }






}
