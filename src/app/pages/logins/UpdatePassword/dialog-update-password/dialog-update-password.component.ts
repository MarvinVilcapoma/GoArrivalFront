import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import * as crypto from 'crypto-js';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-dialog-update-password',
  templateUrl: './dialog-update-password.component.html',
  styleUrls: ['./dialog-update-password.component.css']
})
export class DialogUpdatePasswordComponent implements OnInit{

  contras: any;
  contraVal: any;
  valPass = false;
  textcontra = "";
  value: any;
  texto: any;
  valid: any;
  stylo: any;
  textpass = "Las contraseñas no coinciden."
  constructor( private service: LoginService, private router: Router,private headerService: HeaderService,
    public dialogRef: MatDialogRef<DialogUpdatePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  validCampo(){
    if(this.valPass === true){
      return;
    } else {
      this.updatePass();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  updatePass(){
    this.dialogRef.close();
    const data = {
      UserID: this.data,
      Password: crypto.SHA256(this.contras).toString(),
      AppID: 1
    }
    this.service.updatePassword(data).subscribe(
      x=> {
        if(x.status === 200){
          this.router.navigate(["flights"]);
        }
      },
      error => {
        error.status === 404 ? this.headerService.setErrorToastr("Servicio no encontrado") : this.headerService.error500(); 
      },
    )
  }

  validpassword() {
     this.valid = document.getElementById("conti");
     var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_\\W]).*$", "g");
    if (strongRegex.test(this.contras)) {
      if(this.valPass === true){
        this.valid.style.backgroundColor = "#E82D56";
        this.valid.style.pointerEvents = "visible";
      }
    } 
    else {
      this.valid.style.backgroundColor = "rgba(232, 45, 86, 0.5)";
      this.valid.style.pointerEvents = "none";
    }
    return true;
  }

  validpasswordRepeat() {
    this.valid = document.getElementById("conti");
    if(this.contras === this.contraVal){
      this.valPass = false;
        this.valid.style.backgroundColor = "#E82D56";
        this.valid.style.pointerEvents = "visible";
      
    } else {
      
      this.valid.style.backgroundColor = "rgba(232, 45, 86, 0.5)";
      this.valid.style.pointerEvents = "none";
      this.valPass = true;
    }
  }

}