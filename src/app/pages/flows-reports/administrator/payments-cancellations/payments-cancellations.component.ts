import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-payments-cancellations',
  templateUrl: './payments-cancellations.component.html',
  styleUrls: ['./payments-cancellations.component.css']
})


export class PaymentsCancellationsComponent implements OnInit {

  companies: any[] = [];
  cards: any[] = [];
  loading!: boolean
  loginUser: any;
  errorForm!: boolean
  errorMessage: string = ""
  successPayment!: boolean
  filteredOptions!: Observable<any[]>;
  selected!: boolean;
  blockNav = true;
  isSidenavExpanded = true;
  form: any = this.fb.group({
    company: ['', Validators.required],
    card: ['', Validators.required],
    amount: ['', [Validators.required, Validators.pattern("^[0-9]+\.?[0-9]*$")]],
    detail: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public headService: HeaderService,
    private companyService: FlowReportsService,
    public dialog: MatDialog) {
      this.headService.ocultarEncabezado();
     }

  ngOnInit() {
    this.loginUser = this.headService.getDataLogin();
    this.loadCompanies();
  }

   mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  private _filter(name: any): any[] {
    const filterValue = name.toLowerCase();

    return this.companies.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  configAutocomplete(){
    this.filteredOptions = this.form.get('company').valueChanges
    .pipe(
      startWith<string | any>(''),
      map((value: any) => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.companies.slice())
    );
  }

  displayFn(company: any): string {
    return company && company.name ? company.name : '';
  }


  loadCompanies() {
    this.loading = true;
    this.companyService.get().subscribe(
      (result) => {
        if (result && result.status === 200 && result.ldata) {
          this.companies = result.ldata
        }
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      },
      () => {
        this.loading = false;
        this.configAutocomplete();
      }
    );
  }

  onSubmit() {
    
    this.errorForm = false;
    this.successPayment = false;

    let cardId = this.form.value.card;
    let amountField = this.form.value.amount;
    let detail = this.form.value.detail;
    let user = this.loginUser.name + ' ' + this.loginUser.lastName;
    let email = this.loginUser.email;

    if (isNaN(amountField) || amountField.toString().indexOf('e') >= 0){
      this.errorForm = true;
      this.errorMessage = 'Monto incorrecto';
      return;
    }

    let amount = +amountField;
    if (amount <= 0){
      this.errorForm = true;
      this.errorMessage = 'Monto debe ser mayor a cero';
      return;
    }

    let data: any = {
      CreditCardID: cardId,
      Amount: amount,
      Detail: detail,
      User: user,
      Email: email
    };

    this.loading = true;

    this.companyService.pay(data).subscribe(
      (result) => {
        result.status === 500 ? this.headService.setErrorToastr(result.odata != null ? result.odata.errorMessage : result.message) : this.headService.setSuccessToastr(result.message);
        this.resetForm();
      },
      (error) => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      },
      () => {
        this.loading = false;
      }
    );
  }

  resetForm() {
    // this.form.reset();
    this.form.get('company').setValue('');
    this.form.get('card').setValue('');
    this.form.get('amount').setValue('');
    this.form.get('detail').setValue('');
    this.form.markAsUntouched();
  }

  cleanInput() {
    this.form.get('company').setValue('');
  }

  getCards() {
    this.form.get('card').setValue('');
    this.loading = true;
    this.companyService.getCards(this.form.value.company.id, false).subscribe(
      (result) => {
        if (result && result.status === 200 && result.ldata) {
          this.cards = result.ldata
        }
      },
      (error) => {

      },
      () => {
        this.loading = false;
        this.selected = true;
      }
    );
  }


}
