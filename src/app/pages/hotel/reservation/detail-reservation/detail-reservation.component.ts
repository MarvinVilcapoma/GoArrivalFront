import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMapComponent } from 'src/app/pages/shared/components/dialog-map/dialog-map.component';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styleUrls: ['./detail-reservation.component.css']
})
export class DetailReservationComponent implements OnInit {

  /**
   *
   */

  lstStars: any[] = [];
  @Input() data: any;
  @Input() lstPerson: any;

  constructor(private dialog: MatDialog) {


  }

  ngOnInit(): void {
    this.llenarStars();
    this.llenarNoStars();
  }

  Mostrarmapa() {
    if (this.data.ohotel.oposition != null) {
      const dialogRef = this.dialog.open(DialogMapComponent, {
        data: {
          latitude: this.data.ohotel.oposition.latitude,
          longitude: this.data.ohotel.oposition.longitude
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  llenarNoStars() {
    const missingStars = 5 - this.data.ohotel.lstStar.length;
    this.data.ohotel.lstStar.push(...Array(missingStars).fill(false));
  }
  
  llenarStars() {
    const starCount = parseFloat(this.data.ohotel.stars);
    this.data.ohotel.lstStar = Array(5).fill(true).map((_, index) => index < starCount);
  }

}
