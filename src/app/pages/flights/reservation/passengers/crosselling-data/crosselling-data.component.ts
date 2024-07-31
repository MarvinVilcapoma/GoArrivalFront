import { Component,Input,EventEmitter,Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DialogMapComponent } from 'src/app/pages/shared/components/dialog-map/dialog-map.component';

@Component({
  selector: 'app-crosselling-data',
  templateUrl: './crosselling-data.component.html',
  styleUrls: ['./crosselling-data.component.css']
})
export class CrossellingDataComponent {
  @Input() hotel: any;
  @Input() borrar: any;
  activeSlideIndex = 0;
  @Output() select = new EventEmitter<any>();
  /**
   *
   */
  constructor(private dialog: MatDialog,private cookie: CookieService) {
    
    
  }

  deleteHotel(){
    this.cookie.set("infohotel_cross", "");
    this.cookie.delete("infohotel_cross","/flights");
    this.select.emit(false);
  }

  Mostrarmapa(valor: any) {
 

    const dialogRef = this.dialog.open(DialogMapComponent, {
      data: {
        latitude: valor.oposition.latitude,
        longitude: valor.oposition.longitude
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });


  }
}
