import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-time-limit',
  templateUrl: './dialog-time-limit.component.html',
  styleUrls: ['./dialog-time-limit.component.css']
})
export class DialogTimeLimitComponent {
  /**
   *
   */
  constructor(private dialogRef: MatDialogRef<DialogTimeLimitComponent>,private router: Router) {
    
    
  }

  regresarB(){
    this.router.navigate(["/flights"]);
    this.dialogRef.close({ datosAdicionales: 'Información opcional' });
  }
}
