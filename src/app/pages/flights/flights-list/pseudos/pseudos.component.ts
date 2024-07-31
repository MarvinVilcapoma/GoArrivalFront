import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pseudos',
  templateUrl: './pseudos.component.html',
  styleUrls: ['./pseudos.component.css']
})
export class PseudosComponent implements OnInit {
  @Input() pseudoRepeat: any;
  constructor() { }

  ngOnInit(): void {
  }

}
