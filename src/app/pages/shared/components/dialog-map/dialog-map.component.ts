import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-map',
  templateUrl: './dialog-map.component.html',
  styleUrls: ['./dialog-map.component.css']
})
export class DialogMapComponent implements OnInit {

  @Input() isList: any;
  zoom = 15;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  markers: any[] = [];

  latitude: number = 0;
  mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 14
  }
  marker = {
    position: { lat: 0, lng: 0 },
  }



  constructor(
    public dialogRef: MatDialogRef<DialogMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.data.latitude = parseFloat(this.data.latitude);
    this.data.longitude = parseFloat(this.data.longitude);
    
    
  }

  ngOnInit() {
    this.mapOptions.center!.lat = this.data.latitude;
    this.mapOptions.center!.lng = this.data.longitude;
    this.marker.position.lat = this.data.latitude;
    this.marker.position.lng = this.data.longitude;
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.data.latitude,
        lng: this.data.longitude
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
