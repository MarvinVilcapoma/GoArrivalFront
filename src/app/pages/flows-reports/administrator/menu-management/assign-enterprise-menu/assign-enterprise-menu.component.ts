import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-assign-enterprise-menu',
  templateUrl: './assign-enterprise-menu.component.html',
  styleUrls: ['./assign-enterprise-menu.component.css']
})
export class AssignEnterpriseMenuComponent implements OnInit {

  @Input() lstEnterprise: any[] = [];
  @Input() menuId!: number;
  @Input() isAgency!: boolean;
  @Output() select = new EventEmitter<any>();
  files!: any;
  cols!: any[];
  totalRecords!: number;
  selectedNodes!: any;
  lstNewRpta: any[] = [];

  /**
   *
   */
  constructor(private service: FlowReportsService, private header: HeaderService) {

  }

  ngOnInit(): void {
    this.setSelectNodes();
    this.cols = [
      { field: 'name', header: 'Nombre' },
    ];
    this.files = this.convertRpta(this.lstEnterprise);
    this.totalRecords = this.files.length;
  }

  setSelectNodes(){
    let lstNodes: any[] = [];
    this.lstEnterprise.forEach(element => {
        let node = {
          data: element,
          partialSelected : false
        }
        element.isAssign === true ? lstNodes.push(node) : null;
    });

    this.selectedNodes = lstNodes;
  }



  convertRpta(lst: any[]) {
    lst.forEach(element => {
      let qwe: any = {};
      qwe.id = element.id;
      qwe.name = element.name;
      qwe.isAssign = element.isAssign;
      let datos: any = {
        data: qwe
      };

      this.lstNewRpta.push(datos);
    });
    return this.lstNewRpta;
  }

  assignEnterpriseMenu(){
    this.header.mostrarSpinner();
    let sendCodes: any = [];
    this.selectedNodes.forEach((element: any) => {
      sendCodes.push(element.data.id);
    });
    let data = {
      MenuID: this.menuId,
      IsAgency: this.isAgency,
      Codes: sendCodes
    }
    this.service.assignEnterpriseMenu(data).subscribe(
      result => {
        if(result === null){
          this.header.error500();
        }
        if(result.status === 200){
          this.header.ocultarSpinner();
          this.header.setSuccessToastr(result.message);
          this.select.emit();
        } else {
          this.header.ocultarSpinner();
          this.header.setErrorToastr(result.message);
        }
      },
      error => {
        error.status === 404 ? this.header.setErrorToastr("Servicio no encontrado") : this.header.error500(); 
      }
    )
  }

}
