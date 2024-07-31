import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-detail-flight',
  templateUrl: './modal-detail-flight.component.html',
  styleUrls: ['./modal-detail-flight.component.css']
})
export class ModalDetailFlightComponent implements OnInit {
  @Input() LSection: any;
  @Input() lstBag: any;
  @Input() sect: any;
  constructor() { }

  ngOnInit(): void {
  }

}
