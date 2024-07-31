import { Injectable, ViewChild } from '@angular/core';
import { AES, enc } from 'crypto-js';
import Dexie from 'dexie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

import * as XLSX from 'xlsx';
import { DialogTimeLimitComponent } from '../pages/shared/components/dialog-time-limit/dialog-time-limit.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
  showHeader = true;
  showOverlay = false;
  showCounter = false;
  passwordCrypto = 'serviceLogin#$';
  validCount = 0;
  intervalo: any;
  cunt: any;
  isPhone: any = false;
 

  constructor(public dialog: MatDialog, private cookieService: CookieService, private spinner: NgxSpinnerService, private messageService: MessageService,private location: Location) {
   
  }



  public exportAsExcelFile(data: any, title: string) {
    const table = data.cloneNode(true);
    const headerCells = table.querySelectorAll('th[mat-header-cell]');
    headerCells.forEach((cell: any) => {
      if (cell.textContent.trim() === 'Acciones') {
        const columnIndex = Array.from(cell.parentElement.children).indexOf(cell);
        const rows = table.querySelectorAll('tr');
        rows.forEach((row: any) => {
          row.removeChild(row.children[columnIndex]);
        });
      }
    });

    // Convertir la tabla sin la columna "acciones" a una hoja de cálculo
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, title);
  }


 




  setData(key: string, value: any): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    this.cookieService.set(key, JSON.stringify(value), expirationDate, "null", "null", true, 'Strict');
  }

  getProduction(): boolean{
    return environment.production;
  }

  goback(){
    this.location.back();
  }

  setBorder(id: any) {
    let idBlock: any = document.getElementById(id);
    idBlock.style.setProperty("border", "1px solid #ED1C24", "important");
  }

  clearToast(){
    this.messageService.clear();
  }

  setBorderGood(id: any) {
    let idBlock: any = document.getElementById(id);;
    idBlock.style.setProperty("border", "1px solid #ced4da", "important");
  }

  clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }


  getData(key: string): any {
    const value = this.cookieService.get(key);
    return value;
  }

  getDataLogin() {
    let valor = this.getData("cookieLogin");
    valor = this.desencriptar(valor);
    return valor;
  }

  error500() {
    this.setErrorToastr("Ocurrió un problema con el servicio.")
    this.ocultarSpinner();
  }

  setErrorToastr(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 6000 });
    this.ocultarSpinner();
  }

  setSuccessToastr(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message, life: 6000 });
  }

  setWarningToastr(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Info', detail: message, life: 6000 });
    this.ocultarSpinner();
  }

  isConsolidator() {
    let type;
    let login = this.getDataLogin();

    login.oenterprise.type === "CN" ? type = true : type = false; 
    return type;
  }

  getTypeSearch() {
    let type;
    let login = this.getDataLogin();
    login.oenterprise.type === "CN" ? type = 'N' : type = 'C';
    return type;
  }

  getCompany() {
    let login = this.getDataLogin();
    return login.oenterprise;
  }


  getIsAgency() {
    let login = this.getDataLogin();
    return login.oenterprise.isAgency;
  }

  removeData(key: string): void {
    this.cookieService.delete(key);
  }

  mostrarSpinner(): void {

    this.spinner.show();
  }

  ocultarContador(): void {
    localStorage.removeItem('tiempoExpiracion');
    this.showCounter = false;
    clearInterval(this.intervalo)
  }

  mostrarContador(): void {

    const tiempoRestante: any = localStorage.getItem('tiempoExpiracion');
    if (tiempoRestante != null && tiempoRestante != "") {
      this.start(tiempoRestante);
    } else {
      this.start(720);
    }
    this.showCounter = true;
  }

  openDialog() {


    const dialogRef = this.dialog.open(DialogTimeLimitComponent, {
      disableClose: true, // Esto evita que el diálogo se cierre al hacer clic fuera de él

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  logout() {
    this.ocultarContador();
    this.clearAllCookies();
    this.cookieService.deleteAll();
    this.cookieService.delete("cookieLogin");
    this.cookieService.delete("dk_company");
    this.cookieService.delete("lstMenu", "/flights");
    this.cookieService.delete("lstServices", "/flights");
    this.cookieService.delete("cookieLogin", "/flights");
    this.cookieService.delete("dk_company", "/flights");

    this.cookieService.delete("lstMenu", "/flows");
    this.cookieService.delete("lstServices", "/flows");
    this.cookieService.delete("cookieLogin", "/flows");
    this.cookieService.delete("dk_company", "/flows");


    this.ocultarContador();

  }



  start(seconds: any) {
    /* var counter = seconds;
    this.intervalo = setInterval(() => {
      counter--;
      this.cunt = counter;
      localStorage.setItem('tiempoExpiracion', this.cunt);
      if (counter === 0) {
        localStorage.removeItem('tiempoExpiracion');
        this.openDialog();
        clearInterval(this.intervalo);
      }

    }, 1000); */
  }

  validPhone() {
    const isMobile = this.checkIfMobile();
    return isMobile;
  }

  checkIfMobile(): boolean {
    return window.innerWidth <= 500;
  }

  ocultarSpinner(): void {
    this.spinner.hide();
  }


  mostrarEncabezado(): void {
    this.showHeader = true;
  }

  ocultarEncabezado(): void {
    this.showHeader = false;
  }

  encriptar(objeto: any): string {
    const objetoEncriptado = AES.encrypt(JSON.stringify(objeto), this.passwordCrypto).toString();
    return objetoEncriptado;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  desencriptar(objetoEncriptado: string): any {
    let objetoDesencriptado = null;
    if (objetoEncriptado != '') {
      const bytes = AES.decrypt(objetoEncriptado, this.passwordCrypto);
      objetoDesencriptado = JSON.parse(bytes.toString(enc.Utf8));
    }

    return objetoDesencriptado;
  }
}


