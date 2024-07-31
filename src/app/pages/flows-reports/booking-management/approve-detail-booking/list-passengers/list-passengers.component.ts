import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-passengers',
  templateUrl: './list-passengers.component.html',
  styleUrls: ['./list-passengers.component.css']
})
export class ListPassengersComponent {


  @Input() lstPassenger: any;
}
