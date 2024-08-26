import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/services/head.service';
import { LoginService } from 'src/app/services/login/login.service';
import * as crypto from 'crypto-js';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Passenger } from 'src/models/flight/passenger.model';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})


export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('spinner') spinnerse: any;
  year: Date = new Date();
  numberyear: any;
  usuario: any;
  value: string = "";
  value1: string = "";
  showOverlay = false;
  password: any;
  visible: boolean = false;
  messageError: any;
  validError: boolean;
  textError = ""
  classError = "";
  strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_\\W]).*$", "g");
  showHeader = false;
  validErrorPassword = false;
  UserId: any;
  AppId: any;
  passwordCrypto = 'serviceLogin#$';
  objetoEncriptado: string;
  loginData:any;
  visiblePassword: boolean = false;
  private subscription!: Subscription;
  widgets$!: Observable<any[]>;
  lstAirports: any;

  userForget: string = "";
  emailForget: string = "";
  visibleCode: boolean = false;
  code: string = "";
  userIdForget: string = "";
  
  constructor(private router: Router, private headerService: HeaderService,
    private service: LoginService, private cookieServices: CookieService, public dialog: MatDialog,private route: ActivatedRoute) {
    this.validError = false;
    this.showHeader = false;
    this.usuario = "";
    this.objetoEncriptado = "";
    this.password = "";
    this.headerService.ocultarEncabezado();
  }

  ngOnInit(): void {
    
    let token = localStorage.getItem('authToken');
    if (token) {
      const data = this.headerService.desencriptar(token);
      this.usuario = data.user;
      this.password = data.password;
      this.loginUser();
      // Si existe un token, automáticamente iniciar sesión
      /* this.headerService.autoLogin(token); */
    }
    
  }

  forgetPassword(){
    this.headerService.mostrarSpinner();
    const data = {
      Login: this.userForget,
      Email: this.emailForget
    }
    this.service.recoveryPassword(data).subscribe(
      result => {
        result.status === 200 ? this.goodForgetPassword(result.odata.userID) : this.headerService.setErrorToastr(result.message);
      }
    )
  }

  confirmCode(){
    this.headerService.mostrarSpinner();
    this.service.validateRecoveryPassword(this.code,this.userIdForget).subscribe(
      result => {
        result.status === 200 ? this.successCodeConfirm() : this.headerService.setErrorToastr(result.message);
      }
    )

  }

  successCodeConfirm(){
    this.visibleCode = false;
    this.visible = true;
    this.headerService.ocultarSpinner();
  }

  goodForgetPassword(userId: string){
    this.userIdForget = userId;
    this.visiblePassword = false;
    this.visibleCode = true;
    this.headerService.ocultarSpinner();
  }



  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onInputChange1(){
    this.classError = "";
    this.validErrorPassword= false;
  }

  updatePassword(){
    if(this.value === "" || this.value1 === ""){
      this.textError = "Por favor rellenar los campos."
      this.classError = "ng-invalid ng-dirty";
      this.validErrorPassword = true;
      return;
    }
    if(this.value != this.value1){
      this.textError = "Las contraseñas deben ser iguales."
      this.classError = "ng-invalid ng-dirty";
      this.validErrorPassword = true;
      return;
    }
    this.headerService.mostrarSpinner();
    let data = {
      UserID: this.code === "" ? this.loginData.odata.userID : this.userIdForget,
      Password: crypto.SHA256(this.value).toString(),
      AppID : 1
    }
    this.service.updatePassword(data).subscribe(
      x => {
      
        if(x.status === 200){
          this.code === "" ? this.validRouteFlight() : this.loginUser();
          this.headerService.setSuccessToastr(x.message);
        } else {
          this.textError = x.message;
          this.validErrorPassword = true;
          this.headerService.ocultarSpinner();
        }
      },
      error => {
        error.status === 404 ? this.headerService.setErrorToastr("Servicio no encontrado") : this.headerService.error500(); 
      }
    )
  }
  
  validAutogestion(rpta: any) {
    let LPassenger = [];
    let pasajero!: Passenger;
    let documents = [];
    let obj = {
      docNumber: rpta.lpersonDocument[0].number,
      docTypeId: rpta.lpersonDocument[0].id
    }
    documents.push(obj);
    if (!rpta.orole.isCentralizer) {

      pasajero = {
        age: 0,
        birthDate: rpta.birthDate,
        countryIataCode: rpta.countryOrigin,
        createdDatePerson: "",
        createdDateUser: "",
        email: rpta.email,
        firstName: rpta.name,
        frequentFlyer: rpta.frequentFlyer,
        gender: rpta.gender,
        isVIP: rpta.isVIP,
        lastName: rpta.lastName,
        lcostCenter: rpta.lcostCenter,
        ocostCenter: "",
        loginUser: "",
        lpersonDocuments: documents,
        message: null,
        nationality: "",
        orole: rpta.orole,
        personId: rpta.personID,
        phone: rpta.phone,
        travelerCode: rpta.travelerCode,
        userId: rpta.userID,
      }
    }
    LPassenger.push(pasajero);
    let passengers = this.headerService.encriptar(LPassenger);
    sessionStorage.setItem('passengers', passengers);
    
  }

  validRouteFlight(){
    this.cookieServices.delete("dk_company");
    this.cookieServices.delete("cookieLogin");
    let data = {
      user: this.usuario,
      password: this.password
    }
    const datosLogin: any = this.headerService.encriptar(data);
    this.setToken(datosLogin);
    this.validAutogestion(this.loginData.odata);
    let obj = this.loginData.odata;
    const lstMenu = obj.lmenu;
    const lservice = obj.lservice;
    delete obj.lmenu;
    delete obj.lservice;
    localStorage.setItem("menu", "1");
    this.enviarCookie(obj, "cookieLogin");

    this.enviarCookie(lservice, "lstServices");
    this.enviarCookie(lstMenu, "lstMenu");

    if (this.loginData.odata.orole?.isConsolidatorAdvisor) {

    /*   this.router.navigate(["companies", this.loginData.odata.userID]); */
      this.router.navigateByUrl("/companies/" + this.loginData.odata.userID);

    } else {
      this.router.navigateByUrl('/flights');
    }
  }

  loginUserEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.loginUser();
    }
  }


  enviarCookie(objeto: any, name: string) {
    let valor = this.headerService.encriptar(objeto);
    this.cookieServices.set(name, valor);
  }

  setToken(token: string) {
    // Guardar el token en localStorage
    localStorage.setItem('authToken', token);
    // Emitir un evento de cambio en el localStorage
    localStorage.setItem('loginEvent', 'login' + Math.random());
  }

  loginUser() {

    this.headerService.mostrarSpinner();
    let obj : any = {
      User: this.code === "" ? this.usuario : this.userForget,
      Password: crypto.SHA256(this.code === "" ? this.password : this.value).toString(),
      AppId: 1
    }
    
    this.subscription =  this.service.login(obj).subscribe(
      rpta => {
        console.log(rpta);
        if (rpta.status != 200) {

          this.headerService.ocultarSpinner();
          this.messageError = rpta.message;
          this.validError = true;
        } else {
         
         /*  localStorage.setItem('authToken', datosLogin); */
          this.loginData = rpta;
          if(this.loginData.odata.requiredNewPassword){
            this.headerService.ocultarSpinner();
            this.visible = true;
            return;
          } else {
            this.validRouteFlight();
          }
          

        }

      },
      error => {
        error.status === 404 ? this.headerService.setErrorToastr("Servicio no encontrado") : this.headerService.error500(); 
      },
    );
  }

}
