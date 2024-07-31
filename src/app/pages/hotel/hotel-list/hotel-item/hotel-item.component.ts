import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogMapComponent } from 'src/app/pages/shared/components/dialog-map/dialog-map.component';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.css']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: any;
  @Input() url: any;
  @Output() select = new EventEmitter();
  urlNotFound = "https://domiruthgeneral.blob.core.windows.net/domiruth/Images/imagenotfound.jfif";
  constructor(private sanitizer: DomSanitizer,private dialog : MatDialog) {

  }

  ngOnInit(): void {
    if (this.url === null || this.url === undefined) {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlNotFound);
    } else {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }

  selectRoom(valor_: any){
    this.select.emit(valor_)
  }

  

  mostrarmapa() {

    const dialogRef = this.dialog.open(DialogMapComponent, {
      data: {
        latitude: this.hotel.oposition?.latitude,
        longitude: this.hotel.oposition?.longitude
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });


  }



}
