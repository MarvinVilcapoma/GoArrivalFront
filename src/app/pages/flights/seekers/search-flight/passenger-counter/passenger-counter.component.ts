import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-passenger-counter',
  templateUrl: './passenger-counter.component.html',
  styleUrls: ['./passenger-counter.component.css']
})
export class PassengerCounterComponent implements OnInit {

  show: boolean = false;
  form: FormGroup;
  private wasInside = false;
  totalPassengers = 1;
  PASSENGER_LIMIT = 6;
  errorMessage = '';
  filter: any[] = [];

  @Input() value: any;
  @Output() selection = new EventEmitter<any[]>();
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      adults: new FormControl(''),
      children: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.show = false;
      this.errorMessage = '';
    }
    this.wasInside = false;
  }

  initForm() {

    let adults = 1;
    let children = 0;
    let infants = 0;
/*     if (this.value?.length === 1) adults = this.value[0].Quantity;
    if (this.value?.length === 2) children = this.value[1].Quantity;
    if (this.value?.length === 3) infants = this.value[2].Quantity; */
    if (this.value) {
      this.value.forEach((element: any) => {
        switch (element.Type) {
          case 'ADT':
            adults = element.Quantity;
            break;
          case 'CHD':
            children = element.Quantity;
            break;
          case 'INF':
            infants = element.Quantity;
            break;
        }
      });
/*       adults = this.value[0].Quantity;
      children = this.value[1].Quantity;
      infants = this.value[2].Quantity; */
    }

    this.totalPassengers = Number(adults) + Number(children) + Number(infants);

    this.form = this.formBuilder.group({
      adults: new FormControl({ value: adults, disabled: true }),
      children: new FormControl({ value: children, disabled: true }),
      infants: new FormControl({ value: infants, disabled: true })
    });

    this.filter.push({
      Quantity: adults,
      Type: 'ADT'
    });

    this.filter.push({
      Quantity: children,
      Type: 'CHD'
    });

    this.filter.push({
      Quantity: infants,
      Type: 'INF'
    });
    let obj: any = {
      filter: this.filter,
      totalPassengers: this.totalPassengers
    }
    this.selection.emit(obj);
  }

  onFocus() {
    this.show = true;
  }

  removePassenger(type: any) {
    this.errorMessage = '';
    const adults = Number(this.form.controls['adults'].value);
    const children = Number(this.form.controls['children'].value);
    const infants = Number(this.form.controls['infants'].value);
    switch (type) {
      case 'adults':
        if (adults > 1) {
          if (adults - 1 >= infants) {
            this.form.controls['adults'].setValue((adults - 1));
            this.totalPassengers--;
          } else {
            this.errorMessage = 'El número de infantes no puede superar al número de adultos';
          }
        }
        break;
      case 'children':
        if (children > 0) {
          this.form.controls['children'].setValue((children - 1));
          this.totalPassengers--;
        }
        break;
      case 'infants':
        if (infants > 0) {
          this.form.controls['infants'].setValue((infants - 1));
          this.totalPassengers--;
        }
        break;
    }
    this.updateFilter(type);
  }

  addPassenger(type: any) {
    this.errorMessage = '';
    if (this.totalPassengers < this.PASSENGER_LIMIT) {
      const adults = Number(this.form.controls['adults'].value);
      const children = Number(this.form.controls['children'].value);
      const infants = Number(this.form.controls['infants'].value);
      switch (type) {
        case 'adults':
          this.form.controls['adults'].setValue((adults + 1));
          this.totalPassengers++;
          break;
        case 'children':
          this.form.controls['children'].setValue((children + 1));
          this.totalPassengers++;
          break;
        case 'infants':
          if (infants + 1 <= adults) {
            this.form.controls['infants'].setValue((infants + 1));
            this.totalPassengers++;
          } else {
            this.errorMessage = 'El número de infantes no puede superar al número de adultos';
          }
          break;
      }
    } else {
      this.errorMessage = 'Máximo número de pasajeros permitidos: ' + this.PASSENGER_LIMIT;
    }
    this.updateFilter(type);
  }

  updateFilter(type: any) {
    switch (type) {
      case 'adults':
        this.filter[0] = { Quantity: this.form.controls['adults'].value, Type: 'ADT' };
        break;
      case 'children':
        this.filter[1] = { Quantity: this.form.controls['children'].value, Type: 'CHD' };
        break;
      case 'infants':
        this.filter[2] = { Quantity: this.form.controls['infants'].value, Type: 'INF' };
        break;
    }
    let obj: any = {
      filter: this.filter,
      totalPassengers: this.totalPassengers
    }
    this.selection.emit(obj);
  }

}
