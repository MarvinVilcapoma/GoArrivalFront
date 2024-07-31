import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-successful-reservation',
  templateUrl: './successful-reservation.component.html',
  styleUrls: ['./successful-reservation.component.css']
})
export class SuccessfulReservationComponent implements OnInit {

  data: any;
  datosuser: any;
  company: any;
  updateAproval: any;
  logindata: any;
  visible: boolean = false;
  urlPagoEfectivo: SafeResourceUrl = "";
  constructor(private headService: HeaderService, private router: Router, protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let datos = history.state.data;

    this.datosuser = datos.users;
    this.data = datos.information.odata;
    this.data.opaymentInfo != null ? this.showCIP() : this.urlPagoEfectivo = "";
    this.headService.ocultarContador();
    this.logindata = this.headService.getDataLogin();
    this.company = this.logindata.oenterprise;
    this.updateAproval = this.logindata.ocompany?.ocompanyConfiguration?.updateApprovals;
    this.headService.ocultarSpinner();
  }

  showCIP() {
    this.urlPagoEfectivo = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.opaymentInfo.url);
    this.visible = true;
  }

  goInit() {
    this.router.navigate(['/flights']);
  }

}
