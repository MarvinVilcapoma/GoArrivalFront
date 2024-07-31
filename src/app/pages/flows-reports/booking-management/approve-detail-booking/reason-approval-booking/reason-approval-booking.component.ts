import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-reason-approval-booking',
  templateUrl: './reason-approval-booking.component.html',
  styleUrls: ['./reason-approval-booking.component.css']
})
export class ReasonApprovalBookingComponent implements OnInit {

  @Input() reason: string = "";
  messages: Message[] | any;


  ngOnInit(): void {
    this.messages = [{ severity: 'warn', summary: '', detail: this.reason }];
  }

}
