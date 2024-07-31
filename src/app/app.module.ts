import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './pages/logins/login/login.component';
import { LoginConsolidatorComponent } from './pages/logins/login-consolidator/login-consolidator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { myObjectReducer } from './app-state/reducers/login.reducer';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule } from "ngx-spinner";
import { ImageGaleryComponent } from './components/shared/image-galery/image-galery.component';
import { GalleryImageComponent } from './pages/shared/components/gallery-image/gallery-image.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { GoogleMapsModule } from '@angular/google-maps';
import { DialogMapComponent } from './pages/shared/components/dialog-map/dialog-map.component';

import { CompaniesComponent } from './pages/logins/companies/companies.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';



import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { DialogUpdatePasswordComponent } from './pages/logins/UpdatePassword/dialog-update-password/dialog-update-password.component';
import { NoutFoundComponent } from './pages/nout-found/nout-found.component';
import { PruebaChildrenComponent } from './pages/prueba-children/prueba-children.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputOtpModule } from 'primeng/inputotp';


@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LoginConsolidatorComponent,
    ImageGaleryComponent,
    CompaniesComponent,
    DialogUpdatePasswordComponent,
    NoutFoundComponent,
    PruebaChildrenComponent
    
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    SidebarModule,
    RouterLink,
    InputOtpModule,
    RouterOutlet,
    RouterLinkActive,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    ToastModule,
    DividerModule,
    PasswordModule,
    OverlayPanelModule,
    CarouselModule.forRoot(),
    StoreModule.forRoot({ myObject: myObjectReducer }),
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    BadgeModule,
    MatProgressBarModule,
    PasswordModule,
    DividerModule,
    NgxSpinnerModule,
    AppRoutingModule
  ],
  providers: [{
    provide: MAT_DATE_LOCALE,
    useValue: "es-PE",
  },
    CookieService,MessageService,ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
