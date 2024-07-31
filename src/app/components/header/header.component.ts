import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('collapseAnimation', [
      state(
        'collapsed',
        style({
          maxHeight: '0',
          opacity: '0',
        })
      ),
      state(
        'expanded',
        style({
          maxHeight: '1000px', /* Establece la altura deseada para el contenido expandido */
          opacity: '1',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  sidebarVisible2: boolean = false;
  @Input() validcunt: any;
  lista: any[] = ['vuelo', 'hoteles', 'autos', 'seguros', 'buses', 'paquete'];
  listaText: any[] = ['textVuelos', 'textHotel', 'textAutos', 'textSeguros', 'textBuses', 'textPaquetes'];
  listaImg: any[] = ['imgVuelo', 'imgHotel', 'imgAuto', 'imgSeguros', 'imgBuses', 'imgpaquete'];
  listaRojo: any[] = ['vuelorojo', 'hotelrojo', 'autorojo', 'segurojo', 'busesrojo', 'paquerojo'];
  qwe: any;
  lstTitleFlight = ["PNR", "# Orden", "Fecha Creacion", "Fecha Expiración", "Ruta", "Solicitante", "Pasajeros", "Estado", ""];
  visible: any;
  numero: number;
  prendido = "vuelosOn";
  apagado = "vuelosOff";
  cookieValue: any
  selectedOption!: number;
  empresa: any;
  lmenu: any;
  lServices: any;
  qew: any;
  validInfo = false;
  cunt = 0;
  cargar = false;
  currentModuleName: string = "";
  validCompanie = false;
  @ViewChild('userBox') userBox!: ElementRef;
  constructor(private router: Router, private cookieServices: CookieService, private headService: HeaderService, private _ActivatedRoute: ActivatedRoute, private flowService: FlowReportsService) {
    this.numero = 1;
  }

  ngOnInit(): void {
    this.cookieValue = this.cookieServices.get('cookieLogin');
    this.cookieValue = this.headService.desencriptar(this.cookieValue);
    this.lmenu = this.cookieServices.get("lstMenu");
    this.lmenu = this.headService.desencriptar(this.lmenu);
    this.lServices = this.cookieServices.get("lstServices");
    this.lServices = this.headService.desencriptar(this.lServices);
    this.cookieValue != null ? this.setInfo() : this.router.navigate([""]);
  }

  setInfo() {
    if (!this.cookieValue.oenterprise.isAgency) {
      this.validCompanie = false;
    }
    this.empresa = this.cookieValue.oenterprise.name;
    this.validInfo = true;
    this.setNumber();
  }



  setNumber() {


    let numero = localStorage.getItem("menu");
    switch (numero) {
      case '2':
        this.selectedOption = 2;
        break;
      case '1':
        this.selectedOption = 1;
        break;
      case '3':
        this.selectedOption = 3;
        break;
      case '4':
        this.selectedOption = 4;
        break;
    }
  }

  routeHome() {
    this.selectedOption = 1;
    localStorage.setItem("menu", "1");
    this.router.navigate(['/flights/']);
  }

  changeCompanie() {
    this.router.navigate(["companies", this.cookieValue.userID]);
  }


  ObtenerReservas() {
    this.headService.mostrarSpinner();
    let data = this.headService.getDataLogin();
    this.flowService.getReservationAuthorizer(data.userID).subscribe(
      (results) => {
        results.status === 200 ? this.routeList("Gestión de reservas", results.ldata, this.lstTitleFlight) : this.headService.setErrorToastr(results.message);
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500();
      }
    );
  }

  routeList(title: string, ldata: any, lstHeaders: string[]) {
    this.router.navigate(["flows/booking-list"], { state: { data: 2 } })
  }



  redirect(valor: any) {
    this.headService.ocultarContador();
    switch (valor.name) {

      case "Reporte KP":
        window.open(valor.url, '_blank', 'toolbar=0,location=0,menubar=0');
        break;
      case "Administrador":
        this.headService.mostrarSpinner();
        this.router.navigate(["/flows/profile"], {
          relativeTo: this._ActivatedRoute
        });
        break;
      case "Mis Reservas":
        this.headService.mostrarSpinner();
        this.router.navigate(["/flows/bookings"], {
          relativeTo: this._ActivatedRoute
        });
        break;
      case "Gestión de Reservas":
        this.router.navigate(["flows/booking-list"], { state: { data: 2 } })
        /*  this.ObtenerReservas(); */
        break;
      case "Reportes":
        let data = this.headService.getDataLogin();
        data.oenterprise.codeDK === "" ? this.router.navigate(['/flights']) : this.router.navigate(["/flows/reports"]);
        break;
    }
  }

  toggleCollapsiblePhone() {
    if (this.isCollapsed) {
      this.qew = document.getElementById("text-colaq");
      this.qew.style.display = "initial";
    }
    this.isCollapsed = !this.isCollapsed;
  }

  toggleCollapsible() {
    if (this.isCollapsed) {
      this.qew = document.getElementById("text-cola");
      this.qew.style.display = "initial";
    }
    this.isCollapsed = !this.isCollapsed;
  }

  changeProfile() {
    var z = document.getElementById("profile");
    z!.style.display = "block";
  }

  cerrarSesion() {
    this.headService.logout();
    localStorage.removeItem('authToken');
    localStorage.setItem('logoutEvent', 'logout' + Math.random());
    this.router.navigate([""]);
  }


  change(on: string, off: string, number: any) {
    this.qwe = document.getElementById(this.prendido);
    this.qwe.style.display = "none";
    this.qwe = document.getElementById(this.apagado);
    this.qwe.style.display = "initial";
    this.qwe = document.getElementById(off);
    this.qwe.style.display = "none";
    this.qwe = document.getElementById(on);
    this.qwe.style.display = "initial";
    this.prendido = on;
    this.apagado = off;
    this.headService.ocultarContador();
    switch (number) {
      case 1:
        localStorage.setItem("menu", "1");
        this.router.navigate(["flights"]);
        break;
      case 2:
        localStorage.setItem("menu", "2");
        this.router.navigate(["hotel"]);
        break;
      case 3:
        localStorage.setItem("menu", "3");
        this.router.navigate(["cars"]);
        break;
      case 4:
        localStorage.setItem("menu", "4");
        this.router.navigate(["insurance"]);
        break;
      case 5:
        /*this.router.navigate(["flights"]); */
        break;
      case 6:
        /*   this.router.navigate(["flights"]); */
        break;
    }
  }


  changeOption1(option: number) {
    if (this.lServices === null) {
      this.headService.setErrorToastr("Su empresa no tiene acceso al sistema.");
      return;
    }

    if (this.selectedOption === option) return;

    

    const menuOptions: any = {
      1: { name: 'Vuelos', route: '/flights' },
      2: { name: 'Hoteles', route: '/hotel' },
      3: { name: 'Autos', route: '/cars' },
      4: { name: 'Seguros', route: '/insurance' }
    };

    const selectedMenu = menuOptions[option];

    if (selectedMenu) {
      this.handleNavigation(selectedMenu.name, option, selectedMenu.route);
    }
  }

  private handleNavigation(menuName: string, option: number, route: string) {
    const existsMenu = this.lServices.some((menu: any) => menu.name === menuName);

    if (existsMenu) {
      this.selectedOption = option;
      localStorage.setItem("menu", option.toString());
      this.headService.mostrarSpinner();
      this.router.navigate([route]);
    } else {
      this.headService.setErrorToastr("Su empresa no tiene acceso al sistema.");
    }
  }




}
