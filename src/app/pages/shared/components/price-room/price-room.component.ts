import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-room',
  templateUrl: './price-room.component.html',
  styleUrls: ['./price-room.component.css']
})
export class PriceRoomComponent implements OnInit {

  @Input() room: any;
  @Input() hotel: any;
  @Output() select = new EventEmitter<any>();
  constructor() {  
    
  }

  ngOnInit(): void {
  
  }

  onload(roomSelect: any){
    this.select.emit(roomSelect)
  }

}
