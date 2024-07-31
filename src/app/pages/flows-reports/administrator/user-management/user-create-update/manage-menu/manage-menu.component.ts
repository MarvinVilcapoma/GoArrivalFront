import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent implements OnInit, AfterViewInit {
  @ViewChild(MatMenuTrigger) adjustersMenuTrigger!: MatMenuTrigger;

  @Input() lstMenu: any[] = [];
  sendMenu: any[] = [];
  validMenu = false;


  constructor(private head: HeaderService,private service: FlowReportsService) {
        
  }




  ngOnInit(): void {
    this.getMenu();
  }

  ngAfterViewInit(): void {

  }

  getMenu() {
    let valor = this.head.getCompany();
    let agencyval = this.head.getIsAgency();
    this.service.getMenuByEnterpriseCode(valor.id, agencyval).subscribe(
      x => {
        if (x.status === 200) {
          this.lstMenu = x.ldata;

          this.validMenu = true;
          this.adjustersMenuTrigger.openMenu()
     
          
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  

  toggleSelectionMenu(cost: any, $event: any, padre: any) {
    let obj: any = {};
    obj.menuID = cost.id;
    obj.IsActive = cost.isActive;
    if ($event.checked) {
      if (!this.sendMenu.includes(obj)) {
        this.sendMenu.push(obj);
        this.checkedHijos(cost, true, padre);
        this.pushearLst(cost);
      }
    } else {
      const index1 = this.sendMenu.findIndex((men) => men.menuID === obj.menuID);

      if (index1 > -1) {
        this.sendMenu.splice(index1, 1);
      }
      this.checkedHijos(cost, false, padre);
    }
  }

  pushearLst(cost: any) {
    if (cost.lsubMenu != null) {
      cost.lsubMenu.forEach((element: any) => {
        let obj: any = {};
        obj.menuID = element.id;
        obj.IsActive = element.isActive;
        this.sendMenu.push(obj);
        if (element.lsubMenu != null) {
          element.lsubMenu.forEach((sub: any) => {
            let obje: any = {};
            obje.menuID = sub.id;
            obje.IsActive = sub.isActive;
            this.sendMenu.push(obje);
          });
        }
      });
    }
  }

  sendPadHijo(hijo: any, padre: any) {
    let obj: any = {};
    obj.menuID = hijo.id;
    obj.IsActive = hijo.isActive;
    let menu = this.sendMenu.filter((m: any) => m.menuID.toString().toUpperCase().includes(obj.menuID.toString().toUpperCase()))
    if (menu?.length === 0) {
      this.sendMenu.push(obj);
    }


    let obje: any = {};
    obje.menuID = padre.id;
    obje.IsActive = padre.isActive;
    let menua = this.sendMenu.filter((m: any) => m.menuID.toString().toUpperCase().includes(obje.menuID.toString().toUpperCase()))
    if (menua?.length === 0) {
      this.sendMenu.push(obje);
    }
  }

  toggleSelectionMenuSub(cost: any, $event: any, sub: any, padre: any) {
    let obj: any = {};
    obj.menuID = cost.id;
    obj.IsActive = cost.isActive;
    if ($event.checked) {
      if (!this.validExits(obj)) {
        sub.isChecked = true;
        padre.isChecked = true;
        this.sendMenu.push(obj);
        this.sendPadHijo(sub, padre);
      }
    } else {

      const objWithIdIndex = this.sendMenu.findIndex((men) => men.menuID === obj.menuID);
      if (this.validExits(obj)) {
        this.sendMenu.splice(objWithIdIndex, 1);
      }
      let valid = this.validateChecked(sub.lsubMenu);
      if (valid === false) {
        sub.isChecked = false;
      }
      let validP = this.validateChecked(padre.lsubMenu);
      if (validP === false) {
        padre.isChecked = false;
      }
    }
  }

  validateChecked(lstSub: any[]) {
    let valor = false;
    lstSub.forEach((element: any) => {
      if (element.isChecked) {
        valor = true;
      }
    });
    return valor;
  }

  validExits(obj: any) {
    let validar = true;
    let menua = this.sendMenu.filter((m: any) => m.menuID.toString().toUpperCase().includes(obj.menuID.toString().toUpperCase()))
    if (menua?.length === 0) {
      validar = false;
    }
    return validar;
  }

  checkedHijos(sub: any, activo: boolean, padre: any) {
    if (padre != null) {
      if (!activo) {
        if (!this.validateChecked(padre.lsubMenu)) {
          padre.isChecked = activo;
          const index1 = this.sendMenu.findIndex((men) => men.menuID === padre.id);
          if (index1 > -1) {
            this.sendMenu.splice(index1, 1);
          }
        }
      } else {
        let obj: any = {};
        obj.menuID = padre.id;
        obj.IsActive = padre.isActive;
        if (!this.validExits(obj)) {
          this.sendMenu.push(obj);
        }
        padre.isChecked = activo;
      }
    }
    if (sub.lsubMenu != null) {
      sub.lsubMenu.forEach((element: any) => {
        if (!activo) {
          const index1 = this.sendMenu.findIndex((men) => men.menuID === element.id);
          if (index1 > -1) {
            this.sendMenu.splice(index1, 1);
          }
        }
        element.isChecked = activo;
        if (element.lsubMenu != null) {
          element.lsubMenu.forEach((sub: any) => {
            if (!activo) {
              const index1 = this.sendMenu.findIndex((men) => men.menuID === sub.id);
              if (index1 > -1) {
                this.sendMenu.splice(index1, 1);
              }
            }
            sub.isChecked = activo;
          });
        }
      });
    }
  }

}
