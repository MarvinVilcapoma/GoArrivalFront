import { Component, OnInit } from '@angular/core';
import { HeaderService } from './services/head.service';
import { DialogTimeLimitComponent } from './pages/shared/components/dialog-time-limit/dialog-time-limit.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public headerService: HeaderService,public dialog: MatDialog,private router: Router,private confirmationService: ConfirmationService) {
    
  }
  title = 'GoArrival';
  showHeader = true;
  showOverlay = false;
  ngOnInit(){
    window.addEventListener('storage', (event) => {
      if (event.key === 'logoutEvent') {
        // Si se detecta el evento de logout, redirigir al usuario a la página de login
        this.router.navigate(['']);
        // Opcional: Mostrar un mensaje al usuario indicando que se ha cerrado sesión
        this.confirm();
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key === 'loginEvent') {
        const token = this.headerService.getToken();
        if (token) {
          this.router.navigateByUrl('/flights');
        }
      } else if (event.key === 'logoutEvent') {
        this.router.navigate(['']);
        this.confirm();
      }
    });
    
  }

  confirm() {
    this.confirmationService.confirm({
        header: 'Información',
        message: 'Por favor inicie sesión nuevamente.',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm'
    });
}

  openDialog() {
   

    const dialogRef = this.dialog.open(DialogTimeLimitComponent, {
      disableClose: true, // Esto evita que el diálogo se cierre al hacer clic fuera de él
   
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  mostrarContador(): void {
    const url = window.location.pathname;
    const tiempoRestante: any = localStorage.getItem('tiempoExpiracion');
    
    if(url === '/flights/passenger-data' || url === '/flights/generate-reservation'){
      if (tiempoRestante === null) this.openDialog();
    }

    
  
  }
}
