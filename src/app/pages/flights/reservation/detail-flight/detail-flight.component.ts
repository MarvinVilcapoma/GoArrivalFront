import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-flight',
  templateUrl: './detail-flight.component.html',
  styleUrls: ['./detail-flight.component.css']
})
export class DetailFlightComponent implements OnInit {
  @Input() LSection: any;
  @Input() tipovuelo: any;
  @Input() lstBag: any;
  constructor() { }

  ngOnInit(): void {
  }

}
