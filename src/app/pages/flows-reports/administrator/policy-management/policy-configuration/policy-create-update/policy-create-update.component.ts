import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, mergeMap } from 'rxjs';
import { aiportData } from 'src/app/services/airport.const';
import { FlowReportsService } from 'src/app/services/flows-reports/flow-reports.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-policy-create-update',
  templateUrl: './policy-create-update.component.html',
  styleUrls: ['./policy-create-update.component.css']
})
export class PolicyCreateUpdateComponent implements OnInit {

  lstRoles: any[] = [];
  dataSource!: MatTableDataSource<any>;
  lstCostCenter: any[] = [];
  lstPerson: any[] = [];
  filteredOptionsCostCenter!: Observable<any>;
  usersData: any;
  form: any;
  static id = 0;
  textbtn = "Registrar Política";
  defaults: any = null;
  value: string = 'off';
  stateOptions: any[] = [
    { label: 'Desactivado', value: 'off' },
    { label: 'Activado', value: 'on' }
  ];
  indexRute = 0;
  showModel = false;
  lstRutes: any[] = [];
  options: any[] | undefined;
  optionsCabin: any[] | undefined;
  lstMultidestino: any[] = [];
  @Output() select = new EventEmitter<any>();
  @Input() codePolicy: any;
  @Input() dataUpdate: any;
  airportlist: any;
  citylist: any;
  lstAutocomplete: any[] = [];
  constructor(private service: FlowReportsService, private head: HeaderService, private fb: FormBuilder) {
    

  }

  ngOnInit(): void {
    let airport = aiportData;
    this.letAiports(airport);

    this.options = [
      { name: 'Rol', code: 1 },
      { name: 'Centro de Costo', code: 2 },
      { name: 'Usuarios', code: 3 },
      { name: 'General', code: 4 },
    ];

    this.optionsCabin = [
      { name: 'Económica', code: 'E' },
      { name: 'Business', code: 'B' },
      { name: 'First', code: 'F' },
    ];


    this.initForm();
    this.getAllServices();
    this.llenarMulti();
  }

  letAiports(group: any) {
    

    this.lstAutocomplete = [];
    const lstAutocomplete = this.lstAutocomplete;
    group.lairports.forEach(function (aeropuerto: any) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.name,
        priority: aeropuerto.priority,
        categoryId: 1,
        categoryName: "Aeropuerto",
      };
      lstAutocomplete.push(obj1);
    });
    group.lcities.forEach(function (ciudad: any) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        searchName: ciudad.name,
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: "Ciudad",
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;
  }

  deleteRute() {
    this.lstRutes.pop();
    this.indexRute = this.lstRutes.length;
  }


  llenarMulti() {

    let qwe = {
      isActive: 'off',
      additionalPercentage: "",
      amount: "",
      lstMulti: [{
        origen: "",
        origenIata: "",
        destinoIata: "",
        destino: "",
        data: [],
        data1: [],
        keyword: "name"
      }]
    }
    if (this.lstRutes.length === 5) {
      return;
    }
    this.lstRutes.push(qwe);
    this.indexRute = this.lstRutes.length;
  }


  getIatas() {
    let iatas: any[] = this.dataUpdate.travelRoute.split("-");
    let obj: any = {};
    let lstmul: any[] = [];
    for (let index = 0; index < iatas.length; index++) {
      const element = iatas[index];
      let reason = this.lstAutocomplete.find(x => x.iataCode == element);

      let isPar = index + 1;
      if (isPar % 2 === 0) {
        obj.destino = reason;
        lstmul.push(obj);
        obj = {};
      } else {
        obj.origen = reason;
      }
    }
    let listaAiport: any[] = [];
    lstmul.forEach(element => {
      let obj: any = {};
      obj.origen = element.origen.name;
      obj.origenIata = element.origen.iataCode;
      obj.destino = element.destino.name;
      obj.destinoIata = element.destino.iataCode;
      obj.data = [];
      obj.data1 = [];
      obj.keyword = "name";
      listaAiport.push(obj);
    });

    return listaAiport;
  }

  updateP5() {
    let qwe = {
      isActive: this.dataUpdate.isActive ? 'on' : 'off',
      additionalPercentage: this.dataUpdate.additionalPercentage,
      amount: this.dataUpdate.maxAmount,
      lstMulti: this.getIatas()
    }



    this.lstRutes = [];

    this.lstRutes.push(qwe);
  }

  validUpdate() {
    if (this.dataUpdate != null) {
      this.textbtn = "Actualizar Política";
      switch (this.codePolicy) {
        case 'P0':
          this.form.controls.precioNatMaX.setValue(this.dataUpdate.opolicy5?.oaddtional?.maxNationalAmount);
          this.form.controls.precioIntMax.setValue(this.dataUpdate.opolicy5?.oaddtional?.maxInternationalAmount);
          const isActP0 =  this.dataUpdate.opolicy5?.oaddtional?.isActive ? 'on' : 'off';
          this.dataUpdate.opolicy5 != null ? this.form.controls.isActive.setValue(isActP0) : this.form.controls.isActive.setValue('on');
          break;
        case 'P1':
          this.form.controls.id.setValue(this.dataUpdate.id);
          this.form.controls.diasN.setValue(this.dataUpdate.minNationalDays);
          this.form.controls.diasI.setValue(this.dataUpdate.minInternationalDays);
          this.form.controls.option.setValue(this.dataUpdate.configurationTypeID);
          if (this.dataUpdate.configurationTypeID === 3) {
            this.form.controls.selected.setValue(this.dataUpdate.applyToID);
          } else if (this.dataUpdate.configurationTypeID === 4) {
            this.form.controls.selected.setValue('');
          } else {
            this.form.controls.selected.setValue(parseFloat(this.dataUpdate.applyToID));
          }
          const isAct = this.dataUpdate.isActive ? 'on' : 'off';
          const actN = this.dataUpdate.isActiveNational ? 'on' : 'off';
          const actI = this.dataUpdate.isActiveInternational ? 'on' : 'off';
          this.form.controls.activoN.setValue(actN);
          this.form.controls.activoI.setValue(actI);
          this.form.controls.isActive.setValue(isAct);
          break;
        case 'P2':
          this.form.controls.id.setValue(this.dataUpdate.id);
          this.form.controls.diasN.setValue(this.dataUpdate.maxNationalAmount);
          this.form.controls.diasI.setValue(this.dataUpdate.maxInternationalAmount);
          this.form.controls.option.setValue(this.dataUpdate.configurationTypeID);
          if (this.dataUpdate.configurationTypeID === 3) {
            this.form.controls.selected.setValue(this.dataUpdate.applyToID);
          } else if (this.dataUpdate.configurationTypeID === 4) {
            this.form.controls.selected.setValue('');
          } else {
            this.form.controls.selected.setValue(parseFloat(this.dataUpdate.applyToID));
          }
          const isActP2 = this.dataUpdate.isActive ? 'on' : 'off';
          const actNP2 = this.dataUpdate.isActiveNational ? 'on' : 'off';
          const actIP2 = this.dataUpdate.isActiveInternational ? 'on' : 'off';
          this.form.controls.activoN.setValue(actNP2);
          this.form.controls.activoI.setValue(actIP2);
          this.form.controls.isActive.setValue(isActP2);
          break;
        case 'P3':
          this.form.controls.id.setValue(this.dataUpdate.id);
          this.form.controls.horaI.setValue(this.dataUpdate.initialHour);
          this.form.controls.horaF.setValue(this.dataUpdate.finalHour);
          this.form.controls.option.setValue(this.dataUpdate.configurationTypeID);
          if (this.dataUpdate.cabinType === "Business") {
            this.form.controls.cabina.setValue("B");
          }
          if (this.dataUpdate.cabinType === "First") {
            this.form.controls.cabina.setValue("F");
          }
          if (this.dataUpdate.cabinType === "Económica") {
            this.form.controls.cabina.setValue("E");
          }

          if (this.dataUpdate.configurationTypeID === 3) {
            this.form.controls.selected.setValue(this.dataUpdate.applyToID);
          } else if (this.dataUpdate.configurationTypeID === 4) {
            this.form.controls.selected.setValue('');
          } else {
            this.form.controls.selected.setValue(parseFloat(this.dataUpdate.applyToID));
          }

          const isActP3 = this.dataUpdate.isActive ? 'on' : 'off';
          const timeP3 = this.dataUpdate.isActiveNational ? 'on' : 'off';
          const scaleP3 = this.dataUpdate.isActiveInternational ? 'on' : 'off';
          this.form.controls.tiempoAir.setValue(timeP3);
          this.form.controls.escalasA.setValue(scaleP3);
          this.form.controls.isActive.setValue(isActP3);
          break;
        case 'P4':
          this.form.controls.id.setValue(this.dataUpdate.id);
          this.form.controls.option.setValue(this.dataUpdate.configurationTypeID);
          if (this.dataUpdate.cabinType === "Business") {
            this.form.controls.cabina.setValue("B");
          }
          if (this.dataUpdate.cabinType === "First") {
            this.form.controls.cabina.setValue("F");
          }
          if (this.dataUpdate.cabinType === "Económica") {
            this.form.controls.cabina.setValue("E");
          }
          if (this.dataUpdate.configurationTypeID === 3) {
            this.form.controls.selected.setValue(this.dataUpdate.applyToID);
          } else if (this.dataUpdate.configurationTypeID === 4) {
            this.form.controls.selected.setValue('');
          } else {
            this.form.controls.selected.setValue(parseFloat(this.dataUpdate.applyToID));
          }
          const isActP4 = this.dataUpdate.isActive ? 'on' : 'off';
          this.form.controls.isActive.setValue(isActP4);

          break;
        case 'P5':
          this.form.controls.id.setValue(this.dataUpdate.id);
          this.form.controls.option.setValue(this.dataUpdate.configurationTypeID);
          if (this.dataUpdate.configurationTypeID === 3) {
            this.form.controls.selected.setValue(this.dataUpdate.applyToID);
          } else if (this.dataUpdate.configurationTypeID === 4) {
            this.form.controls.selected.setValue('');
          } else {
            this.form.controls.selected.setValue(parseFloat(this.dataUpdate.applyToID));
          }
          this.updateP5();
          break;
        case 'P6':
          this.form.controls.id.setValue(this.dataUpdate.id);

          this.form.controls.option.setValue(this.dataUpdate.configurationTypeID);
          if (this.dataUpdate.configurationTypeID === 3) {
            this.form.controls.selected.setValue(this.dataUpdate.applyToID);
          } else if (this.dataUpdate.configurationTypeID === 4) {
            this.form.controls.selected.setValue('');
          } else {
            this.form.controls.selected.setValue(parseFloat(this.dataUpdate.applyToID));
          }
          const isActP6 = this.dataUpdate.isActive ? 'on' : 'off';
          const actNP6 = this.dataUpdate.isActiveNational ? 'on' : 'off';
          const actIP6 = this.dataUpdate.isActiveInternational ? 'on' : 'off';
          this.form.controls.porjeActivoN.setValue(actNP6);
          this.form.controls.porActivoI.setValue(actIP6);
          this.form.controls.isActive.setValue(isActP6);
          break;
        case 'P7':
          this.form.controls.id.setValue(this.dataUpdate.id);
          this.form.controls.montoExcN.setValue(this.dataUpdate.nationalAmount);
          this.form.controls.montoExcI.setValue(this.dataUpdate.internationalAmount);
          this.form.controls.option.setValue(this.dataUpdate.configurationTypeID);
          if (this.dataUpdate.configurationTypeID === 3) {
            this.form.controls.selected.setValue(this.dataUpdate.applyToID);
          } else if (this.dataUpdate.configurationTypeID === 4) {
            this.form.controls.selected.setValue('');
          } else {
            this.form.controls.selected.setValue(parseFloat(this.dataUpdate.applyToID));
          }
          const isActP7 = this.dataUpdate.isActive ? 'on' : 'off';
          const actNP7 = this.dataUpdate.isActiveNational ? 'on' : 'off';
          const actIP7 = this.dataUpdate.isActiveInternational ? 'on' : 'off';
          this.form.controls.montoExcActivoN.setValue(actNP7);
          this.form.controls.montoExcActivoI.setValue(actIP7);
          this.form.controls.isActive.setValue(isActP7);
          break;
      }
    }
  }

  initForm() {
    switch (this.codePolicy) {
      case 'P3':
        this.form = this.fb.group({
          id: [PolicyCreateUpdateComponent.id],
          horaI: [0, Validators.required],
          horaF: [0, Validators.required],
          selected: [''],
          option: ['', Validators.required],
          escalasA: ['on', Validators.required],
          tiempoAir: ['on', Validators.required],
          cabina: ['', Validators.required],
          isActive: ['on', Validators.required],
        });
        break;
      case 'P4':
        this.form = this.fb.group({
          id: [PolicyCreateUpdateComponent.id],
          option: [this.defaults?.option, Validators.required],
          selected: [''],
          cabina: [this.defaults?.option, Validators.required],
          isActive: ['on', Validators.required],
        });
        break;
      case 'P5':
        this.form = this.fb.group({
          id: [PolicyCreateUpdateComponent.id],
          option: [this.defaults?.option, Validators.required],
          selected: [''],
        });
        break;
      case 'P0':
        this.form = this.fb.group({
          precioNatMaX: [this.defaults?.name, Validators.required],
          precioIntMax: [this.defaults?.lastName, Validators.required],
          isActive: ['on', Validators.required],
        });
        break;
      case 'P6':
        this.form = this.fb.group({
          id: [PolicyCreateUpdateComponent.id],
          porcentajeN: ['', Validators.required],
          porcentajeI: ['', Validators.required],
          option: ['', Validators.required],
          selected: [''],
          porjeActivoN: ['on', Validators.required],
          porActivoI: ['on', Validators.required],
          isActive: ['on', Validators.required],
        });
        break;
      case 'P7':
        this.form = this.fb.group({
          id: [PolicyCreateUpdateComponent.id],
          montoExcN: [this.defaults?.name, Validators.required],
          montoExcI: [this.defaults?.lastName, Validators.required],
          option: [this.defaults?.option, Validators.required],
          selected: [''],
          montoExcActivoN: ['on', Validators.required],
          montoExcActivoI: ['on', Validators.required],
          isActive: ['on', Validators.required],
        });
        break;
      default:

        this.form = this.fb.group({
          id: [PolicyCreateUpdateComponent.id],
          diasN: [this.defaults?.name, Validators.required],
          diasI: [this.defaults?.lastName, Validators.required],
          selected: [''],
          option: ['', Validators.required],
          activoN: ['on', Validators.required],
          activoI: ['on', Validators.required],
          isActive: ['on', Validators.required],
        });
        break;
    }


  }

  setOption(valor_: any) {

    this.form.controls.option.setValue(valor_.value);
  }

  setOptionCabin(valor_: any) {
    if (valor_.value === "Business") {
      this.form.controls.cabina.setValue("B");
    }
    if (valor_.value === "First") {
      this.form.controls.cabina.setValue("F");
    }
    if (valor_.value === "Económica") {
      this.form.controls.cabina.setValue("E");
    }

  }

  getAllServices() {
    this.head.mostrarSpinner();
    let valor = this.head.getCompany();
    const secondRequestData = {
      EnterpriseCode: valor.id,
      IsAgency: this.head.getIsAgency(),
      Administrator: true,
    }
    this.service.multiFetchUsersData(valor.id, valor.isAgency, true, secondRequestData, valor.id, false).subscribe(data => {
      this.usersData = data;
      this.usersData.secondResponse.ldata = this.setIdUser(this.usersData.secondResponse.ldata)
      this.validUpdate();
      this.head.ocultarSpinner();
      this.showModel = true;
    },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500();
      }
    );
  }

  setIdUser(lst: any[]) {
    lst.forEach(element => {
      element.id = element.userID;
    });

    return lst;
  }

  registerPolicy(obj: unknown) {
    this.head.mostrarSpinner();
    this.service.manageCompanyPolicy(obj).subscribe(
      x => {
        this.head.ocultarSpinner();
        if (x.status === 200) {
          this.head.setSuccessToastr(x.message);
          this.select.emit(x.odata);
        } else {
          this.head.setErrorToastr(x.message);
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  createAditionalRoute(obj: unknown) {
    this.head.mostrarSpinner();
    this.service.manageAdditionalRoute(obj).subscribe(
      x => {
        this.head.ocultarSpinner();
        if (x.status === 200) {
          this.head.setSuccessToastr(x.message);
          this.select.emit(x.odata);
        } else {
          this.head.setErrorToastr(x.message);
        }

      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  setLstP5() {
    let lstAverage: any[] = [];
    this.lstRutes.forEach(element => {
      let obj: any = {};
      obj.id = this.form.controls.id?.value;
      obj.ConfigurationTypeID = this.form.controls.option?.value;
      obj.ApplyTo = this.form.controls.selected?.value?.toString();
      obj.IataCodes = [];
      obj.MaxAmount = parseFloat(element.amount);
      obj.AdditionalPercentage = parseFloat(element.additionalPercentage);
      obj.IsActive = element.isActive === 'on' ? true : false
      element.lstMulti.forEach((iata: any) => {
        obj.IataCodes.push(iata.origenIata);
        obj.IataCodes.push(iata.destinoIata);
      });
      lstAverage.push(obj);
    });

    return lstAverage;
  }

  validCampos() {

  }

  createPolicy() {
    let valor = this.head.getCompany();
    let obj: any = {};

    switch (this.codePolicy) {
      case 'P1':
        obj = {
          PolicyCode: this.codePolicy,
          CompanyID: valor.id,
          Lpolicy1RQ: [{
            ID: this.form.controls.id?.value,
            ConfigurationTypeID: this.form.controls.option?.value,
            ApplyTo: this.form.controls.selected?.value?.toString(),
            IsActiveNational: this.form.controls.activoN.value === 'on' ? true : false,
            MinNationalDays: this.form.controls.diasN.value,
            IsActiveInternational: this.form.controls.activoI.value === 'on' ? true : false,
            MinInternationalDays: this.form.controls.diasI.value,
            IsActive: this.form.controls.isActive.value === 'on' ? true : false
          }]
        }
        this.registerPolicy(obj);
        break;
      case 'P2':
        obj = {
          PolicyCode: this.codePolicy,
          CompanyID: valor.id,
          Lpolicy2RQ: [{
            ID: this.form.controls.id?.value,
            ConfigurationTypeID: this.form.controls.option?.value,
            ApplyTo: this.form.controls.selected?.value?.toString(),
            IsActiveNational: this.form.controls.activoN.value === 'on' ? true : false,
            MaxNationalAmount: this.form.controls.diasN.value,
            IsActiveInternational: this.form.controls.activoI.value === 'on' ? true : false,
            MaxInternationalAmount: this.form.controls.diasI.value,
            IsActive: this.form.controls.isActive.value === 'on' ? true : false,
          }]
        }
        this.registerPolicy(obj);
        break;

      case 'P3':
        obj = {
          PolicyCode: this.codePolicy,
          CompanyID: valor.id,
          Lpolicy3RQ: [{
            ID: this.form.controls.id?.value,
            ConfigurationTypeID: this.form.controls.option?.value,
            ApplyTo: this.form.controls.selected?.value?.toString(),
            InitialHour: this.form.controls.horaI?.value,
            FinalHour: this.form.controls.horaF?.value,
            CabinType: this.form.controls.cabina?.value,
            IncludeWaitingAirport: this.form.controls.tiempoAir.value === 'on' ? true : false,
            EvaluateScales: this.form.controls.escalasA.value === 'on' ? true : false,
            IsActive: this.form.controls.isActive.value === 'on' ? true : false
          }]
        }
        this.registerPolicy(obj);
        break;
      case 'P4':
        obj = {
          PolicyCode: this.codePolicy,
          CompanyID: valor.id,
          Lpolicy4RQ: [{
            ID: this.form.controls.id?.value,
            ConfigurationTypeID: this.form.controls.option?.value,
            ApplyTo: this.form.controls.selected?.value?.toString(),
            CabinType: this.form.controls.cabina?.value,
            IsActive: this.form.controls.isActive.value === 'on' ? true : false
          }]
        }
        this.registerPolicy(obj);
        break;
      case 'P5':
        obj = {
          PolicyCode: this.codePolicy,
          CompanyID: valor.id,
          Opolicy5RQ: {
            LaverageCost: this.setLstP5()
          }
        }
        this.registerPolicy(obj);
        break;
      case 'P0':
        obj = {
          CompanyID: valor.id,
          MaxNationalAmount: this.form.controls.precioNatMaX?.value,
          MaxInternationalAmount: this.form.controls.precioIntMax?.value,
          IsActive: this.form.controls.isActive.value === 'on' ? true : false
        }
        this.createAditionalRoute(obj);
        break;
      case 'P6':
        obj = {
          PolicyCode: this.codePolicy,
          CompanyID: valor.id,
          Lpolicy6RQ: [{
            ID: this.form.controls.id?.value,
            ConfigurationTypeID: this.form.controls.option?.value,
            ApplyTo: this.form.controls.selected?.value?.toString(),
            IsActiveNational: this.form.controls.porjeActivoN.value === 'on' ? true : false,
            NationalPercentage: this.form.controls.porcentajeN.value,
            IsActiveInternational: this.form.controls.porActivoI.value === 'on' ? true : false,
            InternationalPercentage: this.form.controls.porcentajeI.value,
            IsActive: this.form.controls.isActive.value === 'on' ? true : false
          }]
        }
        this.registerPolicy(obj);
        break;
      case 'P7':
        obj = {
          PolicyCode: this.codePolicy,
          CompanyID: valor.id,
          Lpolicy7RQ: [{
            ID: this.form.controls.id?.value,
            ConfigurationTypeID: this.form.controls.option?.value,
            ApplyTo: this.form.controls.selected?.value?.toString(),
            IsActiveNational: this.form.controls.montoExcActivoN.value === 'on' ? true : false,
            NationalAmount: this.form.controls.montoExcN.value,
            IsActiveInternational: this.form.controls.montoExcActivoI.value === 'on' ? true : false,
            InternationalAmount: this.form.controls.montoExcI.value,
            IsActive: this.form.controls.isActive.value === 'on' ? true : false
          }]
        }
        this.registerPolicy(obj);
        break;

    }

  }

  getRole() {

    let valor = this.head.getCompany();

    this.service.getRole(valor.id, valor.isAgency, true).subscribe(
      x => {
        if (x.status === 200) {
          this.lstRoles = x.ldata;
          this.lstRoles.forEach((element: any) => {
            element['visible'] = true;
          });
          this.dataSource.data = this.lstRoles;
          this.head.ocultarSpinner();
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getCostCenter() {
    let valor = this.head.getCompany();
    this.service.getCostCenter(valor.id, false).subscribe(
      x => {
        if (x.status === 200) {
          x.ldata.forEach((element: any) => {
            element.isChecked = false
          });
          this.lstCostCenter = x.ldata;
          this.getRole();
        }
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  getEnterprisePerson() {
    let valor = this.head.getCompany();
    const objewe = {
      EnterpriseCode: valor.id,
      IsAgency: this.head.getIsAgency(),
      Administrator: true,
    }
    this.service.getEnterprisePerson(objewe).subscribe(
      x => {
        if (x.status === 200) {
          this.lstPerson = x.ldata;

          this.lstPerson.forEach(element => {
            element.fullName = element.name + " " + element.lastName;
          });
        }
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

}
