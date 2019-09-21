import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule } from '@angular/common/http';


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
  ],
  providers: [AuthGuard,
    AutologoutService,
  LoginService,
UploadserviceService],
    entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
