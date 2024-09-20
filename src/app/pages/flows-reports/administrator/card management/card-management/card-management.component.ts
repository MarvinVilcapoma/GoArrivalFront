import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditCard } from 'src/models/flows-reports/credit-card';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.css'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(1000, [animate('0.5s', style({ opacity: 1 }))])
        ], { optional: true }
        )
      ])
    ])
  ]
})
export class CardManagementComponent implements OnInit, AfterViewInit {

  companies!: any[];

  loading!: boolean
  filteredOptions!: Observable<any[]>;
  companyControl: FormControl;
  resultMessage!: string;
  companyName!: string;
  selected!: boolean;
  idCard: string = '';
  selectedCompany: any;
  isSidenavExpanded = true;
  blockNav = true;
  vaultUrl = `https://domiruth-uat-kv.vault.azure.net`;
  secretValue!: string;
  columns: any[] = [
    {
      label: 'Alias',
      visible: true,
      property: 'alias',
    },
    {
      label: 'Tarjeta',
      property: 'number',
      visible: true
    },
    {
      label: 'Vencimiento',
      property: 'expirationDate',
      visible: true
    },
    {
      label: 'Estado',
      property: 'isActive',
      visible: true
    },

    {
      label: 'Acciones',
      visible: true,
      property: 'acciones',
    }

  ];
  dataSource!: MatTableDataSource<any>;
  cards : any[] = []
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  validtable = false;
  validtext!: boolean;
  data: any;
  textHeader: string = "";
  visible: boolean = false;
  isRegister: boolean = false;
  companyId: string = "";
  constructor(
    private companyService: FlowReportsService,
    public head: HeaderService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar) {
      this.head.ocultarEncabezado();
      this.companyControl = new FormControl('');
     }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
   /*  this.cards = new MatTableDataSource(); */
    this.loadCompanies();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Roles por pagina';
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  toggleColumnVisibility(column: any, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  exportAsXLSX(): void {
    let data = document.getElementById("table-card");
    this.head.exportAsExcelFile(data, "Reportes-tarjetas.xlsx");
  }

  validManage(valor: any){
    this.cards = valor;
    this.cards.forEach((element: any) => {
      element['visible'] = true;
    });
    this.dataSource.data = this.cards;
    this.visible = false;
  }


  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
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

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.companies.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  configAutocomplete(){
    this.filteredOptions = this.companyControl.valueChanges
    .pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.companies.slice())
    );
  }

  displayFn(company: any): string {
    return company && company.name ? company.name : '';
  }


  loadCompanies() {
    this.loading = true;
    let valor = this.head.getCompany();
    this.companyService.getCompanyAgency(valor.id,true).subscribe(
      (result) => {
        if (result && result.status === 200 && result.ldata) {
          this.companies = result.ldata
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      },
      () => {
        this.loading = false;
        this.configAutocomplete();
      }
    );
  }

  cleanInput() {
    this.companyControl.setValue('');
    this.validtable = false;
    this.selected = false;
  }

  createCard() {
    this.textHeader = "Registrar Tarjeta";
    this.isRegister = true;
    this.visible = true;
  }

  edit(card: CreditCard) {
    if (!this.selectedCompany) {
      this.openSnackBar('Seleccione una empresa');
      return;
    }

    if (!card) {
      this.openSnackBar('Datos de tarjeta incorrectos');
      return;
    }

  
    this.idCard = card.id;
    this.openDialog();
  }

  getCard(cardID: string) {
    this.loading = true;
    this.companyService.getCreditCardDetail(cardID).subscribe(
      (result) => {
        if (result && result.status === 200 && result.odata) {
          this.data = result.odata;
          this.isRegister = false;
          this.textHeader  = "Actualizar Tarjeta";
          this.visible = true;
        }
    
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      },
      () => {
        this.loading = false;
      }
    );
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok');
  }

  onOptionSelected() {
    /* this.selectedCompany = this.companyControl.value; */
    this.getCards(this.selectedCompany);
    this.validtable = true;
  }

  getCards(id: any) {
  
    this.loading = true;

    this.companyService.getCards(id, true).subscribe(
      (result) => {
        if (result.status === 200) {
          this.cards = result.ldata;
          this.cards.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.cards;
          this.loading = false;
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      },
      () => {
        this.loading = false;
        this.selected = true;
        if(this.companyControl.value){
        this.companyName = this.companyControl.value.name;}
      }
    );}
  

  openDialog(): void {
    this.head.mostrarSpinner();
    sessionStorage.setItem("selectcompany", this.selectedCompany.id);
    sessionStorage.setItem("companyname", this.selectedCompany.name);
    
    this.router.navigate(["/flows/card-create-update", this.idCard]);
  }

}
