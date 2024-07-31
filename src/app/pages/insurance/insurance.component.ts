import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  constructor(private head: HeaderService) { }

  ngOnInit(): void {
    this.head.ocultarSpinner();
  }

}
