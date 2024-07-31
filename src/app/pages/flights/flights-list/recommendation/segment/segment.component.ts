import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output, AfterContentInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {

  @Input() section: any;
  @Input() segment: any;
  @Input() bagAllowed: any;
  @Input() hasCarryOn: any;
  @Input() indexSegment: any
  @Input() recommendationId: any
  @Input() sectionId: any
  @Input() lSectionGroups: any
  @Input() recommendationIndex: any
  @Input() bagQuantity: any
  @Output() outSegmentCheck = new EventEmitter<any>();
  selectedCategory: any = "";
  marketingName: any;
  marketingCarrier: any;
  timeOfDepartureShow: any;
  timeOfArrivalShow: any;
  lSegmentGroupsLength: any;
  totalFlightTimeShow: any;
  flagSegmentId: any;
  lSegmentGroups: any[] = [];
  radioButtonName: any;
  segmentRadioSel: any;
  stringscalas: any;
  onlyOnce: boolean = true;


  constructor() {this.radioButtonName = 'radioSection'; }

  ngOnInit(): void {
    
    this.flagSegmentId = 'flagSegment_' + this.recommendationId + '' + this.sectionId + '' + this.segment.id + '' + this.indexSegment;
    this.totalFlightTimeShow = this.segment.durationShow;
    let schedule = this.section.lschedule[this.indexSegment - 1];
    this.indexSegment === 1 ? schedule["selected"] = true: schedule["selected"] = false;
    this.lSegmentGroupsLength = this.segment.lsegment.length;
    const lSegmentGroupsLength = this.lSegmentGroupsLength;
    if (lSegmentGroupsLength > 0) {
      this.marketingName = this.segment.ocarrier.marketingName;
      this.marketingCarrier = this.segment.ocarrier.marketingCode + ".png";
      this.timeOfDepartureShow = this.segment.departureDateShow;
      this.timeOfArrivalShow = this.segment.arrivalDateShow;
    }
  }





  listSegmentGroups(flagSegmentId: any, lSegmentGroups: any) {
    this.lSegmentGroups = lSegmentGroups;
    $("#" + flagSegmentId).show();
  }

  hideSegmentGroups(flagSegmentId: any) {
    this.lSegmentGroups = [];
    $("#" + flagSegmentId).hide();
  }

  selectRadioButton(radioId: any) {
    for (const element of this.section.lschedule) element === this.segment ? element.selected = true : element.selected = false;
  }

}
