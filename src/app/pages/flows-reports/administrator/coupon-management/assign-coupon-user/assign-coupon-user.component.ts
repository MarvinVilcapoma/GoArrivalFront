import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-assign-coupon-user',
  templateUrl: './assign-coupon-user.component.html',
  styleUrls: ['./assign-coupon-user.component.css']
})
export class AssignCouponUserComponent implements OnInit {

  @Input() lstCompany: any[] = [];
  @Input() couponId: any;
  @Output() select = new EventEmitter<any>();
  selectedCompany: any | undefined;
  loading: boolean = false;
  validtable: boolean = false;
  lstPerson: any[] = [];
  cols!: any[];

  files!: any;
  selectedNodes!: any;
  lstNewRpta: any[] = [];
  totalRecords!: number;
  constructor(private head: HeaderService, private service: FlowReportsService) {


  }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'lastName', header: 'Apellido' },
      { field: 'email', header: 'Correo' }
    ];
  }

  showTable() {
    this.lstNewRpta = [];
    this.validtable = false;
    this.loading = true;
    const qwe = {
      EnterpriseCode: this.selectedCompany,
      IsAgency: false,
      Administrator: true,
    }
    this.service.getEnterprisePerson(qwe).subscribe(
      x => {
        if (x.status === 200) {
          this.lstPerson = x.ldata;
          this.files = this.convertRpta(this.lstPerson);
          this.totalRecords = this.files.length;
          this.validtable = true;
          this.loading = false;
        } 
        
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  validCheck(valor: any){
    if(this.selectedNodes?.length > 200){
      this.selectedNodes = this.selectedNodes.slice(0,200)
    }
  }

  sendCouponByMail() {
    if(this.selectedNodes?.length > 200){
      this.head.setErrorToastr("Maximo 200 usuarios");
      return;
    }
    this.head.mostrarSpinner();
    let sendEmail: any = [];
    this.selectedNodes.forEach((element: any) => {
      sendEmail.push(element.data);
    });
    let data = {
      CouponID: this.couponId,
      LguestUser: sendEmail
    }
    this.service.sendCouponByMail(data).subscribe(
      result => {
        if(result === null){
          this.head.error500();
        }
        if(result.status === 200){
          this.head.ocultarSpinner();
          this.head.setSuccessToastr(result.message);
          this.select.emit();
        } else {
          this.head.ocultarSpinner();
          this.head.setErrorToastr(result.message);
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  convertRpta(lst: any[]) {
    lst.forEach(element => {
      let qwe: any = {};
      qwe.userID = element.userID;
      qwe.name = element.name;
      qwe.lastName = element.lastName;
      qwe.email = element.email;
      let datos: any = {
        data: qwe
      };

      this.lstNewRpta.push(datos);
    });
    return this.lstNewRpta;
  }

}
