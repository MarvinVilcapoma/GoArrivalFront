import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';


declare var $: any;

@Component({
  selector: 'app-passenger-data',
  templateUrl: './passenger-data.component.html',
  styleUrls: ['./passenger-data.component.css']
})
export class PassengerDataComponent implements OnInit {
  @Input() index: any;
  @Input() user: any;
  @Input() gds: any;
  @Input() lcompanyUids: any[] = [];
  @Input() lstpaises: any[] = [];
  @Input() lstDocument: any[] = [];
  @Input() lstCostCenter: any[] = [];
  tratamiento: any;
  loginData: any;
  datosuser: any;
  document: any;
  travelCode: string;
  costCenterCode: string;
  validNumberDoc: any;
  minDate!: Date;
  maxDate!: Date;
  bsValue: Date;
  otheDataCC: string = "";
  isPhone = false;
  lstPaises: any;
  valorrow!: any;
  lstTratamiento: any[] = [];
  id: any;
  isConsolidator: boolean = false;
  validWrite?: boolean;
  lstSelects: any[] = [];
  lstInputs: any[] = [];
  lstUidsRq: any[] = [];
  datosLogin: any;
  constructor(private cookieServices: CookieService, private headService: HeaderService) {
    this.bsValue = new Date();
    this.costCenterCode = "";
    this.travelCode = "";

    let fecha;
    if (this.datosuser != null && this.datosuser?.length > 0) {
      this.datosuser.forEach((element: any) => {
        fecha = new Date(element.birthDate);
        this.bsValue = fecha;
      });
    }

  }

  setSelectPreUID(item: any, index: any, event: any) {
    let valor = event;
    let element: any = null;
    if(item.code === 'U5'){
      element = item.lcompanyUidList.find((element: any) => element.code === valor);
    }
    let obj = {
      CodeUid: item.code,
      PassengerId: index.toString(),
      ValueUid: valor,
      id: element.id
    }
    if (this.lstUidsRq.length === 0) {
      this.lstUidsRq.push(obj);
      this.createInput(valor, item, index)
    } else {
      const indexe = this.lstUidsRq.findIndex(x => x.CodeUid === obj.CodeUid);
      if (indexe !== -1) {
        this.lstUidsRq[indexe] = obj;
        this.createInput(valor, item, index)
      } else {
        this.createInput(valor, item, index)
        this.lstUidsRq.push(obj);
      }
    }
  }


  validTypeUserCN() {

    if (this.user.type === 'CHD') {


      const today = new Date();
      /* this.maxDate = today; */
      this.maxDate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
      this.minDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());

    } else if (this.user.type === 'INF') {

      const today = new Date();
      this.maxDate = today;
      this.minDate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
    } else {
      this.minDate = new Date(1915, 0, 1);
      const currentYear = new Date().getFullYear();
      this.validWrite ? this.maxDate = new Date(currentYear - 12, 12, 0) : this.maxDate = new Date(currentYear - 18, 12, 0);
      this.maxDate.setDate(this.maxDate.getMonth() - 168);
    }
  }

  setBorder(id: any) {
    this.id = document.getElementById(id);
    this.id.style.border = "1px solid #ced4da";
    this.id.style.borderRadius = "7px";
  }

  setSelectUID(item: any, index: any, event: any) {
    let id = "select_value_" + item.code + "_" + index;
    let valor = event.value;
    let element: any = null;
    if(item.code === 'U5'){
      element = item.lcompanyUidList.find((element: any) => element.code === valor);
    }
    let obj = {
      CodeUid: item.code,
      PassengerId: index.toString(),
      ValueUid: valor,
      id: element ? element.id : 0
    }
    this.user.ocostCenter = obj;
    if (this.lstUidsRq.length === 0) {
      this.lstUidsRq.push(obj);
      this.setBorder(id);
      this.createInput(valor, item, index)
    } else {
      const indexe = this.lstUidsRq.findIndex(x => x.CodeUid === obj.CodeUid);
      if (indexe !== -1) {
        this.lstUidsRq[indexe] = obj;
        this.setBorder(id);
        this.createInput(valor, item, index)
      } else {
        this.createInput(valor, item, index)
        this.setBorder(id);
        this.lstUidsRq.push(obj);
      }
    }
  }

  onInputChange1(id: any, id2: number) {
    id = id + id2;
    this.headService.setBorderGood(id);
  }



  createInput(valor: any, item: any, indexPax: any) {
    if (valor != "OTROS") {
      item.showInput = false;
      return;
    }
    if (valor === "OTROS") {
      item.showInput = true;
    } else {
      item.showInput = false;
    }
  }

  onInputChangeOther(code: any, index: any, event: any) {
    let id = "otros_" + code + "_" + index;
    let valorInput = event.target.value;
    let obj = {
      CodeUid: code,
      PassengerId: index.toString(),
      ValueUid: valorInput
    }
    if (this.lstUidsRq.length === 0) {
      this.setBorder(id);
      this.lstUidsRq.push(obj);
    } else {
      const indexe = this.lstUidsRq.findIndex(x => x.CodeUid === obj.CodeUid);
      if (indexe !== -1) {
        this.setBorder(id);
        this.lstUidsRq[indexe] = obj;
      } else {
        this.setBorder(id);
        this.lstUidsRq.push(obj);
      }
    }
  }

  onInputChange(code: any, index: any, event: any) {
    let id = "input_" + code + "_" + index;
    let valorInput = event.target.value;
    let obj = {
      CodeUid: code,
      PassengerId: index.toString(),
      ValueUid: valorInput
    }
    if (this.lstUidsRq.length === 0) {
      this.setBorder(id);
      this.lstUidsRq.push(obj);
    } else {
      const indexe = this.lstUidsRq.findIndex(x => x.CodeUid === obj.CodeUid);
      if (indexe !== -1) {
        this.setBorder(id);
        this.lstUidsRq[indexe] = obj;
      } else {
        this.setBorder(id);
        this.lstUidsRq.push(obj);
      }
    }
  }

  ngOnInit(): void {
    this.lstTratamiento = [
      { name: 'Sr.', code: 'MR' },
      { name: 'Sra.', code: 'MRS' }
    ];
    let valor: any = this.cookieServices.get("cookieLogin");
    this.datosLogin = this.headService.desencriptar(valor);

    this.user.gender === 'M' ? this.user.tratamiento = "MR" : this.user.tratamiento = "MRS";
    this.user.prefixPhone = "+51";
    this.validUIDS(this.lcompanyUids);
    this.precargarUids();
    this.headService.ocultarSpinner();
    this.loginData = this.cookieServices.get('cookieLogin');
    this.loginData = this.headService.desencriptar(this.loginData);
    this.validWrite = this.loginData.orole.isConsolidatorAdvisor;
    !this.validWrite ? null : this.user.phone = this.datosLogin.phone;
    !this.validWrite ? null : this.user.email = this.datosLogin.email;
    this.validPassengers();

    this.validTypeUserCN();


    if (this.user.birthDate != null && this.user.birthDate != "" && this.user.birthDate != undefined) {
      this.user.birthDate = new Date(this.user.birthDate);
    }
  }

  precargarUids() {
    this.lstSelects.forEach(element => {
      if (element.code === 'U5' && this.user.lcostCenter?.length > 0) {
        this.costCenterCode = this.user.lcostCenter[0].id;
        const indexe = element.lcompanyUidList.findIndex((x: any) => x.id === this.costCenterCode);
        this.costCenterCode = element.lcompanyUidList[indexe].code;
        if (indexe != -1) {
          let obj = {
            CodeUid: "U5",
            ValueUid: element.lcompanyUidList[indexe].code,
            id: element.lcompanyUidList[indexe].id
          }
          this.user.ocostCenter = obj;
        }
        this.setSelectPreUID(element, this.index, element.lcompanyUidList[indexe].code)
      }
      if (element.code === 'U9' && this.user.travelerCode != '') {
        this.travelCode = this.user.travelerCode;
        const idExiste = element.lcompanyUidList.some((objeto: any) => objeto.code === this.travelCode);
        if (idExiste) {
          this.setSelectPreUID(element, this.index, this.user.travelerCode)
        } else {
          this.travelCode = "";
        }

      }
    });
  }

  validUIDS(lst: any) {
    if (lst?.length > 0) {
      lst.forEach((element: any) => {
        if (element.isList || element.code === "U5") {
          if (element.code === "U5") {
            element.lcompanyUidList = this.lstCostCenter;
          }

          this.lstSelects.push({ ...element });
        } else {
          this.lstInputs.push({ ...element });
        }
      });
      this.lstSelects.forEach(element => {
        element.showInput = false;
      });
    }

  }

  validPassengers() {
    if (this.user.birthDate != "") {
      let fecha = new Date(this.user.birthDate);
      this.bsValue = fecha;
    } else {
      let datos!: Date;
      this.bsValue = datos;
    }

    if (this.user.gender === 'M') {
      this.user.gender = "M";
      this.tratamiento = 'MR';
    } else {
      this.user.gender = "F";
      this.tratamiento = 'MRS';
    }
    if (this.user.lpersonDocuments.length > 0) {
      if (this.user.lpersonDocuments[0].docTypeId === 'F3F05B20-412E-4A1A-BA31-B69B1E6D0392') {
        this.validNumberDoc = true;
      } else {
        this.validNumberDoc = false;
      }
    } else {
      this.validNumberDoc = false;
    }
  }



  noespacio(valor: any) {
    $("#txtcorreo_" + valor).keyup(function () {
      var ta = $("#txtcorreo_" + valor);
      var letras = ta.val().replace(/ /g, "");
      ta.val(letras)
    });
  }

  Solotexto(event: any) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return;
    }
  }



  ValidarSoloNumero(event: any) {
    // tslint:disable-next-line: max-line-length
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 8 && event.keyCode !== 9) {
      return;
    }
  }

  setDate(valor_: any) {
    this.user.birthDate = valor_;
  }

  setValor(event: any, selectedOption: any, user: any) {

    const selectedValue = event.target.value;


    const selectedDocument = this.lstDocument.find(item => item.id === selectedValue);
    user.lpersonDocuments[0]["code"] = selectedDocument.code;


  }


}
