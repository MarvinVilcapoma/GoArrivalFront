import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(private head: HeaderService) { }

  ngOnInit(): void {
    this.head.ocultarSpinner();
  }

}
