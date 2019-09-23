import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';*/

import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FileuploadComponent } from './fileupload/fileupload.component';

import  { AutologoutService } from './services/autologout.service';
import  { LoginService } from './services/login.service';
import  { UploadserviceService } from './services/uploadservice.service';
import { AutologoutComponent } from './autologout/autologout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadComponent,
    HeaderComponent,
    FooterComponent,
    FileuploadComponent,
    AutologoutComponent
  ],
  imports: [
    BrowserModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
    /*MatInputModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule*/
  ],
  providers: [AuthGuard,
    AutologoutService,
  LoginService,
UploadserviceService],
    entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){}

 }
