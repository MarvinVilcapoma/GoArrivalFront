import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, Event } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';



@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {


  myData: any;
  showHeader = true;
  flagCentralizador = true;
  objetoDesencriptado: any = {};
  objetoEncriptado: any;
  cookieValue: any;
  pasajeros = 1;
  constructor(private headerService: HeaderService, private router: Router,private viewportScroller: ViewportScroller, private cookieServices: CookieService, private meta: Meta,private titleService: Title) {
    this.showHeader = true;
    this.headerService.mostrarEncabezado();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Ajusta la posición del scroll al top de la página
      }
    });
  }

  ngOnInit(): void {
    this.headerService.ocultarContador();
    this.headerService.ocultarSpinner();
    this.cookieValue = this.cookieServices.get('cookieLogin');
    this.cookieServices.delete("ss_flights", '/');
    this.cookieServices.delete("ss_flights", '/flights');
    this.objetoDesencriptado = this.headerService.desencriptar(this.cookieValue);

    this.validCentralizer();

    this.meta.addTag({ name: 'description', content: 'Lista de vuelos en Go Arrival.' });
    this.titleService.setTitle('Página de Vuelos - Go Arrival');
    this.headerService.ocultarSpinner();
  }

  validCentralizer() {
    this.flagCentralizador = this.objetoDesencriptado.orole.isCentralizer;
  }








  updateCentralizador($event: any) {

    this.pasajeros = $event.pass;
    this.flagCentralizador = $event.valid;

  }

}

