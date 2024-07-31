import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-segment-group',
  templateUrl: './segment-group.component.html',
  styleUrls: ['./segment-group.component.css']
})
export class SegmentGroupComponent implements OnInit {
  @Input() segmentGroup: any;
  @Input() totalFlightTimeShow: any;
  @Input() lSegmentGroupsLength: any;
  @Input() lSegmentGroupsIndex: any;
  @Input() sectionGroup: any;

  textFlightTimeShow: any;
  marketingCarrier: any;
  constructor() { }

  ngOnInit(): void {
    if (this.lSegmentGroupsLength === this.lSegmentGroupsIndex) {
      this.textFlightTimeShow = "Duración total: " + this.totalFlightTimeShow;
    } else {
      this.textFlightTimeShow = "Espera en aeropuerto: " + this.segmentGroup.timeWaitAirport.replace("00d ", "");
    }

    this.marketingCarrier = this.segmentGroup.ocarrier.marketingCode + '.png';
  }

}
