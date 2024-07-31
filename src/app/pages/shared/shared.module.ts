import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { GalleryImageComponent } from './components/gallery-image/gallery-image.component';
import { DialogMapComponent } from './components/dialog-map/dialog-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PriceRoomComponent } from './components/price-room/price-room.component';
import { DialogTimeLimitComponent } from './components/dialog-time-limit/dialog-time-limit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';
import { StepperModule } from 'primeng/stepper';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [GalleryImageComponent, DialogMapComponent, PriceRoomComponent, DialogTimeLimitComponent],
  imports: [
    DropdownModule,
    GoogleMapsModule,
    AutoCompleteModule,
    StepperModule,
    GalleriaModule,
    CarouselModule.forRoot(),
  ],
  exports: [PriceRoomComponent,GalleryImageComponent,DialogMapComponent,DialogTimeLimitComponent,StepperModule,AutoCompleteModule]
})
export class SharedModule { }
