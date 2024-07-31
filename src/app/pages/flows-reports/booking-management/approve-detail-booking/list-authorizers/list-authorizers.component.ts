import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-list-authorizers',
  templateUrl: './list-authorizers.component.html',
  styleUrls: ['./list-authorizers.component.css']
})
export class ListAuthorizersComponent implements OnInit {

  @Input() lapprovers: any;
  @Input() lpolicies: any;
  @Input() currency: string = "";

  messages: Message[] | any;
  ngOnInit(): void {
    this.messages = [{ severity: 'info', summary: 'Info', detail: '(Las personas en la siguiente lista se encargaran de revisar su solicitud y gestionarla .)' }];
  }

}
