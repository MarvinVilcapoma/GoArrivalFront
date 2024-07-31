import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-family-segment',
  templateUrl: './family-segment.component.html',
  styleUrls: ['./family-segment.component.css']
})
export class FamilySegmentComponent implements OnInit {
  @Input() segment: any;
  @Input() indexSec: any;
  @Input() sectionId: any;
  @Input() indexSegment:any;
  @Input() lstComi: any[] = [];
  @Input() lfamilyCombinations: any[] = [];
  @Output() select = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  enviarFamiliy(valor: any){
    this.select.emit(valor);
  }

  changeFamiliy(valor: any){
    this.change.emit(valor);
  }

  

}
