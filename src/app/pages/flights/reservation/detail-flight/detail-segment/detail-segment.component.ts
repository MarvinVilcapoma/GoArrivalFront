import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-segment',
  templateUrl: './detail-segment.component.html',
  styleUrls: ['./detail-segment.component.css']
})
export class DetailSegmentComponent implements OnInit {
  @Input() segment: any;
  @Input() section: any;
  @Input() bagAllowed: any;
  @Output() msjairline = new EventEmitter<any>();
  @Input() bagquantity: any;
  @Input() lengthSegments: any;

  marketingCarrier: any;
  lSegmentGroups: any[] = [];
  timeOfDepartureShow: any;
  timeOfArrivalShow: any;
  lSegmentGroupsLength: any;
  totalFlightTimeShow: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.segment);
    this.totalFlightTimeShow = this.section.oschedule.durationShow;
    this.lSegmentGroupsLength = this.lengthSegments;
    const lSegmentGroupsLength = this.lSegmentGroupsLength;
    if (lSegmentGroupsLength > 0) {
      this.marketingCarrier = this.section.oschedule.ocarrier.marketingCode + ".png";
      this.timeOfDepartureShow = this.section.departureDateShow;
      this.timeOfArrivalShow = this.section.arrivalDateShow;
      this.msjairline.emit(this.marketingCarrier);
    }
  }

}
