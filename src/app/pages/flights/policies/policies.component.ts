import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent {

  @Input() politica: any;
  @Input() politicaIndex: any;
  @Input() politicaslength: any;

}
