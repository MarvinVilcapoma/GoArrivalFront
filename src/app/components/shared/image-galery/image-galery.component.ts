import { Component, Inject, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-galery',
  templateUrl: './image-galery.component.html',
  styleUrls: ['./image-galery.component.css']
})
export class ImageGaleryComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    public dialogRef: MatDialogRef<ImageGaleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  /*   this.loadImage();
    this.configGallery(); */
    
  }

  loadImage() {
    for (let index = 0; index < this.data.data.length; index++) {
      let imagen: NgxGalleryImage = {
        small: this.data.data[index].smallPhoto,
        medium: this.data.data[index].bigPhoto,
        big: this.data.data[index].bigPhoto,
      };
      this.galleryImages.push(imagen);
    }
  }

  configGallery() {
    this.galleryOptions = [
      {
          preview: false,
          width: '1200px',
          height: '798px',
          startIndex: this.data.index,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          preview: false,
          breakpoint: 800,
          width: '100%',
          height: '600px',
          startIndex: this.data.index,
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
    ];
  }
  
  close(): void {
    this.dialogRef.close();
  }

}
