import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SubMenu } from 'src/models/flows-reports/administrator';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  listReports: any[] = [];
  listHeads: any[] = [];
  textTitle = "";
  selector: boolean = false;
  validReport = false;
  currentDate = new Date();
  sevenDaysAgo = new Date(this.currentDate);
  inicioShow: string = '';
  finalShow: string = '';
  lmenu: any = null;
  lstReports: SubMenu[] = [];
  constructor(private headService: HeaderService, private flowService: FlowReportsService, private router: Router, private cookieServices: CookieService) { }

  ngOnInit(): void {
    this.sevenDaysAgo.setDate(this.sevenDaysAgo.getDate() - 7);
    this.inicioShow = this.sevenDaysAgo.getDate() + '/' + (this.sevenDaysAgo.getMonth() + 1) + '/' + this.sevenDaysAgo.getFullYear();
    this.finalShow = this.currentDate.getDate() + '/' + (this.currentDate.getMonth() + 1) + '/' + this.currentDate.getFullYear();
    this.lmenu = this.cookieServices.get("lstMenu");
    this.lmenu = this.headService.desencriptar(this.lmenu);

    const encontrado = this.lmenu.find((menu: any) => menu.name === "Reportes");

    if (encontrado) {
      this.lstReports = encontrado.lsubMenu;
    }
  }

  setReportList(name: string) {
    this.router.navigate(["flows/reports-list"], { state: { data: name } });
  }

  ObtenerReporte() {
    this.headService.mostrarSpinner();
    let data = this.headService.getDataLogin();
    sessionStorage.setItem("dateini", this.inicioShow);
    sessionStorage.setItem("datefin", this.finalShow);

    const dataReport = {
      DateFrom: this.inicioShow,
      DateUntil: this.finalShow,
      CompanyDK: data.oenterprise.codeDK,
      Query: ''
    }
    this.flowService.getReportGeneral(dataReport).subscribe(
      (results) => {
        this.textTitle = "Mis reportes vuelos";
        this.listReports = results;
        this.selector = true;

        this.validReport = true;
        this.headService.ocultarSpinner();

      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    );
  }

  ObtenerReporteHoteles() {
    this.headService.mostrarSpinner();
    let data = this.headService.getDataLogin();
    const dataReport = {
      DateFrom: this.inicioShow,
      DateUntil: this.finalShow,
      CompanyDK: data.oenterprise.codeDK,
    }
    this.flowService.getReportHotel(dataReport).subscribe(
      (results) => {
        this.textTitle = "Mis reportes hoteles";
        this.listReports = results.lhotelReport;
        this.selector = false;

        this.validReport = true;
        this.headService.ocultarSpinner();

      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    );
  }

  getHeadColumns() {
    var myVar = this.listReports[0];
    for (var key in myVar) {
      this.listHeads.push(key);
    }
  }


}
