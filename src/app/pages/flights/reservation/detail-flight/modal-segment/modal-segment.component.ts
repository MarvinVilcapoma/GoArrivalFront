import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-segment',
  templateUrl: './modal-segment.component.html',
  styleUrls: ['./modal-segment.component.css']
})
export class ModalSegmentComponent implements OnInit {
  @Input() segment: any;
  @Input() tipo: any;
  @Input() lsegments: any;
  constructor() { }

  ngOnInit(): void {
  }

}
