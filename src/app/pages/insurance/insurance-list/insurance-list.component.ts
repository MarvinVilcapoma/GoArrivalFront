import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { HeaderService } from 'src/app/services/head.service';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.css']
})
export class InsuranceListComponent implements OnInit {

  messages1: Message[] | any;
  lstInsurance: any[] = [];
  request: any;
  visible: boolean = false;
  card:any;
  constructor(private route: ActivatedRoute,private head: HeaderService,private service: InsuranceService,private router : Router) {

  }

  ngOnInit() {
   
    // Obtiene el parámetro 'data' de la navegación
    const data = history.state.data;
    this.lstInsurance = data.response;
    this.request = data.request;
   // Aquí puedes acceder a this.dataRespuesta
    let days : string = this.lstInsurance[0].days;
    let message: string = "Producto con vigencia de" + " " + days + " " + "dias";
    this.messages1 = [
      { severity: 'success', summary: 'Información', detail: message },
    ];
    this.head.ocultarSpinner();
  }

  openDialog(item: any){
    this.card = item;
    this.visible = true;
  }

  next(item: any){
    const obj = { request : this.request, card: item};
    this.router.navigate(["insurance/insurance-reservation"], { state: { data: obj } })
  }

  validBenefits(item: any){
    item.lbenefits != null && item.lbenefits != undefined ? this.openDialog(item) : this.viewDetail(item);
  }

  viewDetail(item: any){
    this.head.mostrarSpinner();
    const data = {
      Code: item.code,
      QuoteCode: item.quoteCode,
      Sucursal: "7",
      Lpassenger: this.request.Lpassenger,
    }
    this.service.getBenefits(data).subscribe(
      result => {
        item["lbenefits"] = result;
        this.card = item;
        this.visible = true;
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
