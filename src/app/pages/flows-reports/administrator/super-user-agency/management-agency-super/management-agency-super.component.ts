import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { FlightService } from 'src/app/services/flight/flight.service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-management-agency-super',
  templateUrl: './management-agency-super.component.html',
  styleUrls: ['./management-agency-super.component.css']
})
export class ManagementAgencySuperComponent implements OnInit, AfterViewInit {



  @Input() textbtn!: string;
  @Input() isRegister!: boolean;
  @Input() lstCountries: any;
  @Input() data: any;
  @Input() lstDocument: any;
  @Output() select = new EventEmitter<any>;
  form: any;
  static id = 0;
  stateOptions: any[] = [
    { label: 'Desactivado', value: 'off' },
    { label: 'Activado', value: 'on' }
  ];
  filteredOptions!: Observable<any>;


  constructor(private fb: FormBuilder,private head: HeaderService,private service: FlowReportsService) {
   
    
  }

  ngOnInit(): void {
 
    this.initForm();

  }

  ngAfterViewInit(): void {

  }

  initForm(){
    this.form = this.fb.group({
      id: [ManagementAgencySuperComponent.id],
      name: [this.isRegister === true ? '' : this.data.name, Validators.required],
      ruc: [this.isRegister === true ? '' : this.data.ruc, Validators.required],
      pais: [this.isRegister === true ? '' : this.data.countryOrigin,Validators.required],
      address: [this.isRegister === true ? '' : this.data.address, Validators.required],
      email: [this.isRegister === true ? '' : this.data.email, Validators.required],
      phone: [this.isRegister === true ? '' : this.data.phone, Validators.required],
      isActive: [this.isRegister === true ? 'on' : this.data.isActive === true ? 'on' : 'off', Validators.required],
    });
    if(this.isRegister){
  

      this.form.addControl('nameContact', this.fb.control('',Validators.required));
      this.form.addControl('lastNameContact', this.fb.control('',Validators.required));
      this.form.addControl('documentId', this.fb.control('',Validators.required));
      this.form.addControl('documentNumber', this.fb.control('',Validators.required));
    }
  }



  manageAgenc(){
    this.head.mostrarSpinner();
    let data = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? '' : this.data.id,
      Name: this.form.controls.name.value,
      Ruc: this.form.controls.ruc.value,
      CountryOrigin: this.form.controls.pais.value,
      Address: this.form.controls.address.value,
      OcontactInfo: {
        Name: this.isRegister === false ? '' : this.form.controls.nameContact.value,
        LastName: this.isRegister === false ? '' : this.form.controls.lastNameContact.value,
        Phone: this.form.controls.phone.value,
        Email: this.form.controls.email.value,
        OcontactDocument: null
      },
      IsActive: this.form.controls.isActive.value === 'on' ? true : false,
    };

    let ocontac: any = {
      DocumentID: this.isRegister === false ? '' : this.form.controls.documentId.value,
      Number: this.isRegister === false ? '' : this.form.controls.documentNumber.value,
      IsActive: this.isRegister === false ? '' : true
    }
    if(this.isRegister){
      data.OcontactInfo.OcontactDocument = ocontac;
    } 
    this.service.manageAgency(data).subscribe(
      x =>  {
        if(x === null){
          this.head.error500();
        }
        if(x.status === 200){
          this.head.ocultarSpinner();
          this.head.setSuccessToastr(x.message);
          this.select.emit(x.ldata);
        } else {
          this.head.ocultarSpinner();
          this.head.setErrorToastr(x.message);
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }





}
