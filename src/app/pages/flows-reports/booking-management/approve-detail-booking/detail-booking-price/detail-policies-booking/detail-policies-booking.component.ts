import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-policies-booking',
  templateUrl: './detail-policies-booking.component.html',
  styleUrls: ['./detail-policies-booking.component.css']
})
export class DetailPoliciesBookingComponent {

  @Input() politica: any;
  @Input() politicaIndex: any;
  @Input() politicaslength: any;

}
