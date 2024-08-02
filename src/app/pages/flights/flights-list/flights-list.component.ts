import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { Recommendation } from 'src/models/flight/Flight.model';

declare var $: any;

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit, OnDestroy {

  lstGlobalizer: any[] = [];
  private subscription!: Subscription;
  llowCostAirlines: any;
  lstCalendar: any[] = [];
  request: any;
  validCalendar = false;
  validFlights = false;
  lstFlights: Recommendation[] = [];
  validTypeFlight = true;
  tipoVuelo = "RT";
  indexTramo = 2;
  cookieValue: any;
  pseudos: any;
  datae: any;
  aerolineas: any[] = [];
  globalizer: any[] = [];
  globalizerClean: boolean = false;
  flagDinData2: boolean = false;
  flagDinData;
  lstMultidestino: any[] = [];
  objetoDesencriptado: any;
  requestLower: any;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(private cookieServices: CookieService, public headService: HeaderService, private service: FlightService, private changeDetectorRef: ChangeDetectorRef) {
    this.flagDinData = false;
  }

  ngOnInit(): void {
    this.objetoDesencriptado = this.cookieServices.get('cookieLogin');
    this.objetoDesencriptado = this.headService.desencriptar(this.objetoDesencriptado);
    let datos = history.state.data;
    this.getData(datos)
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  replaceStateData(newData: any) {
    // Obtiene el estado actual del historial
    const currentState = history.state;

    // Modifica los datos del estado
    currentState.data = newData;
    
    // Reemplaza el estado actual en el historial
    history.replaceState(currentState, '');
  }

  getData(data: any) {
    if (data.result != undefined){
      this.replaceStateData({...data});
      this.cookieValue = data;
      this.requestLower = this.cookieValue;
      this.setFlights();
    }
  }


  showCalendar(ldata: any[]) {
    this.lstCalendar = ldata;
    this.validCalendar = true;
  }


  searchCalendar(request: any) {
    this.validCalendar = false;
    this.subscription = this.service.searchCalendar(request).subscribe(
      result => {
        result.status === 200 ? this.showCalendar(result.ldata) : this.validCalendar = true;
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      }
    )
  }


  cargar(): void {
    this.headService.mostrarSpinner();
    setTimeout(() => {
      this.stopLoading();
    }, 1700);
  }

  stopLoading(): void {
    this.headService.ocultarSpinner();
    this.changeDetectorRef.detectChanges();
  }

  ocultarLower($event: boolean) {
    this.validTypeFlight = $event;
    this.validCalendar = false;
  }

  Datafiltrosuperior($event: any) {
    this.setLstAerolineas($event);
    this.globalizer = this.setGlobalizer($event);
  }

  setLstAerolineas(searchData: any) {
    this.aerolineas = [];
  
    searchData.forEach((reco: any) => {
    
        const existingAirline = this.aerolineas.some(aerolinea => aerolinea.marketingCode === reco.ocarrier.code);
  
        if (!existingAirline) {
          const dataAero = {
            marketingCode: reco.ocarrier.code,
            marketingName: reco.ocarrier.name,
            filter: 0
          };
          this.aerolineas.push(dataAero);
        }

    });
  }

  setGlobalizer(searchData: any[]) {
    let lstGlobalizer: any[] = [];
    searchData.forEach(element => {
      if (!lstGlobalizer.includes(element.gds)) {
        lstGlobalizer.push(element.gds);
      }
    });

    return lstGlobalizer;
  }

  ocultarComponentes($event: any) {
    this.validFlights = $event;
  }

  busquedaFiltros($event: any) {
    this.lstFlights = $event || [];
  
    if ($event) {
      const visibleFlights = this.lstFlights.filter((flight: any) => flight.isVisible);

      this.flagDinData2 = visibleFlights.length === 0;
     /*  this.validFlights = !this.flagDinData2; */
    } else {
      this.validCalendar = false;
      this.flagDinData2 = true;
    }
  
    this.headService.ocultarSpinner();
  }

  onSearchFlightFilter(event: any) {
    console.log('Filtro de vuelos aplicado:', event);
  }

  converDate(date: string, valid_: boolean) {
    let fecha: any = date.split("T");
    fecha = fecha[0];
    fecha = fecha.replaceAll("-", "/");
    let fechaShow = fecha.split("/");
    fechaShow = fechaShow[2] + "/" + fechaShow[1] + "/" + fechaShow[0]
    if (valid_) {
      return fecha;
    } else {
      return fechaShow;
    }
  }

  llenarOirgenMulti(lst: any, number: any) {
    this.lstMultidestino.forEach((element: any) => {
      if (number === 1) {
        lst.push(element.origenIata);
      } else if (number === 2) {
        lst.push(element.destinoIata);
      } else {
        lst.push(element.salida);
      }
    });
    return lst;
  }


  searchFlight(valor_: any) {
    this.headService.mostrarSpinner();
    let ida = valor_.salida.substring(0, 10);
    let retorno = valor_.llegada.substring(0, 10);
    ida = ida.replaceAll("-", "/");
    retorno = retorno.replaceAll("-", "/");

    let idaDate = new Date(valor_.salida);
    let retornoDate = new Date(valor_.llegada);

    this.cookieValue.request.Dates = [];
    this.cookieValue.request.Dates.push(ida, retorno);
    this.cookieValue.dataRQ.fechas = [];
    this.cookieValue.dataRQ.fechas.push(idaDate, retornoDate);
    this.lstCalendar = [];
    this.requestLower = this.cookieValue;
    this.validTypeFlight = false;
    this.service.searchFlight(this.cookieValue.request).subscribe(
      x => {

        const obj = {
          result: x,
          request: this.request,
          lstMulti: this.lstMultidestino
        }
        this.cookieValue.result = x;
        this.replaceStateData(this.cookieValue);
        this.setFlights();
      },
      error => {
        error.status === 404 ? this.headService.setErrorToastr("Servicio no encontrado") : this.headService.error500(); 
      }
    )
  }

  setFlights() {
    this.lstCalendar = [];
    this.request = this.cookieValue.request;


    this.lstMultidestino = this.cookieValue.lstMulti;
    if(this.lstMultidestino != undefined){
      this.lstMultidestino.forEach(element => {
        element.minDate = new Date(element.minDate);
      });
      this.indexTramo = this.lstMultidestino.length;
     
    }
  
    if (this.cookieValue.result.status === 200) {
      this.flagDinData2 = false;
      this.lstCalendar.length > 0 ? this.validCalendar = true : this.searchCalendar(this.request);
      if (this.cookieValue.result.odata.llowCostAirline?.length > 0) {
        this.llowCostAirlines = this.cookieValue.result.odata.llowCostAirline;
      }

      if (this.cookieValue.result.odata.lrecommendation?.length > 0) {
        this.lstFlights = this.cookieValue.result.odata.lrecommendation;
        this.tipoVuelo = this.request.Type;
      
        this.pseudos = this.cookieValue.result.odata.lpseudoPrice;
        this.setLstAerolineas(this.lstFlights);
        this.globalizer = this.setGlobalizer(this.lstFlights);
        this.validTypeFlight = true;
        this.validFlights = true;
      }
    } else {
      this.lstFlights = this.cookieValue.result.odata.lrecommendation;
      this.validTypeFlight = true;
      this.flagDinData2 = true;
    }
    this.headService.ocultarSpinner();
  }

}

