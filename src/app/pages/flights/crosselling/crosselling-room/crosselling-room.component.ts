import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMapComponent } from 'src/app/pages/shared/components/dialog-map/dialog-map.component';
import { GalleryImageComponent } from 'src/app/pages/shared/components/gallery-image/gallery-image.component';

@Component({
  selector: 'app-crosselling-room',
  templateUrl: './crosselling-room.component.html',
  styleUrls: ['./crosselling-room.component.css']
})
export class CrossellingRoomComponent implements OnInit {

  lstStars: any[] = [];
  lsthabitacionBlock: any[] = [];
  @Input() data: any;
  @Output() select = new EventEmitter<any>();
  constructor(private dialog: MatDialog) {

    
  }

  ngOnInit(): void {
    this.lsthabitacionBlock = this.data.lroom;
    this.llenarStars();
    this.llenarNoStars();
  }


  selectRoom(event: any){
    this.select.emit(event);
  }

  llenarStars() {

    this.lstStars = [];
    for (let index = 0; index < parseFloat(this.data.ohotel.stars); index++) {
      this.lstStars.push(true);
    }
    this.data.ohotel.lstStar = this.lstStars;
  }

  selectPhotos(imagenList: any[]) {
    const dialogRef = this.dialog.open(GalleryImageComponent, {
      data: imagenList
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ShowGarantia(valor: any,event: any) {
    let lista = [];
    let origen : any;
    let destino: any;
    origen = document.getElementById("origen");
    destino = document.getElementById("destino");
    if(valor === 1 && event.target.checked && !origen.checked){
      this.lsthabitacionBlock.forEach(function (element) {
        if (element.guaranteeType != null) {
          if (element.guaranteeType.length > 0) {
            element.guaranteeType.forEach((pago: any) => {
              if (pago === "GuaranteeRequired") {
                lista.push(element);
              }
            });
          }
  
        }
      });
    } else if (valor === 2 && event.target.checked && !destino.checked) {
      this.lsthabitacionBlock.forEach(function (element) {
        if (element.guaranteeType != null) {
          if (element.guaranteeType.length > 0) {
            element.guaranteeType.forEach((pago: any) => {
              if (pago === "Deposit") {
                lista.push(element);
              }
            });
          }
  
        }
      });
    } else if (valor === 1 && !event.target.checked && origen.checked){
      this.lsthabitacionBlock.forEach(function (element) {
        if (element.guaranteeType != null) {
          if (element.guaranteeType.length > 0) {
            element.guaranteeType.forEach((pago: any) => {
              if (pago === "Deposit") {
                lista.push(element);
              }
            });
          }
  
        }
      });
    } else if (valor === 2 && !event.target.checked && destino.checked) {
      this.lsthabitacionBlock.forEach(function (element) {
        if (element.guaranteeType != null) {
          if (element.guaranteeType.length > 0) {
            element.guaranteeType.forEach((pago: any) => {
              if (pago === "GuaranteeRequired") {
                lista.push(element);
              }
            });
          }
  
        }
      });
    } else {
      lista = this.lsthabitacionBlock;
    }
    

    this.data.lroom = lista;

  }

  llenarNoStars() {

      for (let index = this.data.ohotel.lstStar.length; index < 5; index++) {
        this.data.ohotel.lstStar.push(false);
      }
    
  }

 

  Mostrarmapa() {

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
