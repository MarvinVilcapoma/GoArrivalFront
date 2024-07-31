import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-modal-section',
  templateUrl: './modal-section.component.html',
  styleUrls: ['./modal-section.component.css']
})
export class ModalSectionComponent  {
  @Input() section: any;
  @Input() tipo: any;
  lsegment: any;
  segment = null;
  constructor() { }


}
