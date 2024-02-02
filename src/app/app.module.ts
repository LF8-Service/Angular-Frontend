import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {EmployeeService} from "./services/EmployeeService";
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "./services/AuthenticationService";
import {EmployeeTableComponent} from "./employee-table/employee-table.component";
import {MainViewComponent} from "./main-view/main-view.component";
import {QualificationTableComponent} from "./qualification-table/qualification-table.component";
import {QualificationService} from "./services/QualificationService";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
      EmployeeTableComponent,
    QualificationTableComponent,
    MainViewComponent
  ],

  providers: [
    AuthenticationService,
    EmployeeService,
    QualificationService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
