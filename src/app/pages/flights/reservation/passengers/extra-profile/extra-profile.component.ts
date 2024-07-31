import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-extra-profile',
  templateUrl: './extra-profile.component.html',
  styleUrls: ['./extra-profile.component.css']
})
export class ExtraProfileComponent implements OnInit {
  valor: any;
  @Input() lextraProfiles: any[] = [];
  @Output() profileEvent = new EventEmitter<string>();
  constructor(private headService: HeaderService) { }

  ngOnInit(): void {
    this.valor = this.lextraProfiles[0].code;
  }

  onInputChange1(id: any) {
    this.headService.setBorderGood(id);
  }
  

}
