import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';
import { CreditCard } from 'src/models/flows-reports/credit-card';
import { CardRecord } from 'src/models/flows-reports/card-record';
import { ActivatedRoute, Router } from '@angular/router';
import * as util from 'src/app/pages/flows-reports/administrator/util'
import { CardValidator} from './validatos';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-create-update',
  templateUrl: './card-create-update.component.html',
  styleUrls: ['./card-create-update.component.css']
})
export class CardCreateUpdateComponent implements OnInit {

  @Input() isRegister!: boolean;
  @Input() data: any;
  @Input() companyId: any;
  @Input() textbtn!: string;
  @Output() select = new EventEmitter<any>();
  static id = 0;

  
  loading!: boolean;
  editionMode!: boolean;
  card!: CreditCard;
  loginUser: any;
  recoveredCard = '';
  errorResult!: boolean;
  successResult!: boolean;
  errorResultMessage: string = '';
  datos: Date = new Date();

  companyname: any;
 /*  form = this.fb.group({
    card: ['', Validators.required],
    dueDate: ['', Validators.required],
    code: ['', Validators.required],
    alias: [''],
    holdername: [''],
    brandcode: [''],
    status: ['']
  }); */
  minDate: Date | any;
  form: any;
  userid: any;
  types: any[] = [];
  constructor(
    private fb: FormBuilder,
    private cardService: FlowReportsService,
    private cookieServices: CookieService,
    private headService: HeaderService,
    private _route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

  }


  ngOnInit() {
    
    this.loginUser = this.headService.getDataLogin();
    this.initForm();
    this.types = [
      { name: 'Visa', code: 'VI' },
      { name: 'Mastercard', code: 'MC' },
      { name: 'AMEX', code: 'AX' }
    ];
  }

 
  initForm(){
    this.form = this.fb.group({
      id: [CardCreateUpdateComponent.id],
      card: [this.isRegister === true ? '' : this.data.number, Validators.required],
      dueDate: [this.isRegister === true ? '' : this.transformDate(), Validators.required],
      code: [this.isRegister === true ? '' : this.data.code, Validators.required],
      alias: [this.isRegister === true ? '' : this.data.alias],
      holdername: [this.isRegister === true ? '' : this.data.holderName, Validators.required],
      brandcode: [this.isRegister === true ? '' : this.data.brandCode, Validators.required],
      status: [this.isRegister === true ? true : this.data.isActive, Validators.required]
    });
  }

  transformDate(){
    let fecha = this.data.expirationDate.split("/");
    fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0] + "T00:00:00";
    return new Date(fecha)
  }




  onSubmit(){
    this.headService.mostrarSpinner();
    let cardNumber: string;
    if(this.form.controls.card.value && this.form.controls.brandcode.value && this.form.controls.code.value){
    let cardValue = util.removeWhiteSpace(this.form.value.card.toString());
  

    if (!this.isRegister && util.removeWhiteSpace(this.data?.number) === cardValue) {
      cardNumber = this.data.encryptedNumber;
    } else {
      cardNumber = util.encryptUsingTripleDES(cardValue);
    }

    let fechaFormateada: any;
    fechaFormateada = this.datePipe.transform(this.form.controls.dueDate.value, 'yyyy-MM-dd HH:mm:ss');
    fechaFormateada = fechaFormateada.replace(" ","T");

    let cardRecord: CardRecord = {
      IsRegister: this.isRegister,
      ID: this.isRegister === true ? "" : this.data.id,
      CompanyID: this.companyId,
      Number: cardNumber,
      ExpirationDate: fechaFormateada,
      HolderName: this.form.controls.holdername.value,
      BrandCode: this.form.controls.brandcode.value,
      Code: this.form.controls.code.value,
      Alias: this.form.controls.alias.value,
      User: this.loginUser.name + ' ' + this.loginUser.lastName,
      IsActive: this.form.controls.status.value
      
    };
  

    this.cardService.save(cardRecord).subscribe(
      (result) => {
        if(result === null){
          this.headService.error500();
        }
        if(result.status === 200){
          this.headService.ocultarSpinner();
          this.headService.setSuccessToastr(result.message);
          this.select.emit(result.ldata);
        } else {
          this.headService.ocultarSpinner();
          this.headService.setErrorToastr(result.message);
        }
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      },
      () => {
        this.loading = false;
        if (this.successResult) {
          // this.dialogRef.close(true);
        }
      }
    );
  }
  }
}
