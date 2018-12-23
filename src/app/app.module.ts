import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token/token.interceptor.service';
import { AuthGuardService } from './services/auth/auth-guard.service';

import { WordWrapPipe } from './pipes/word-wrap.pipe';

import {
  AppComponent,
  SidebarComponent,
  RootComponent,
  LoginComponent,
  DashboardComponent,
  PatientsListComponent,
  PatientsCreateComponent,
  PatientsShowComponent,
  HealthInsurancesListComponent,
  HealthInsurancesCreateComponent,
  HealthInsurancesShowComponent,
  DataCardComponent,
  AnamnesisListComponent,
  PatientDataComponent,
  PatientSessionsComponent,
  AnamnesisEditComponent
} from './components';

// Directives

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RootComponent,
    LoginComponent,
    DashboardComponent,
    PatientsListComponent,
    WordWrapPipe,
    PatientsCreateComponent,
    PatientsShowComponent,
    HealthInsurancesListComponent,
    HealthInsurancesCreateComponent,
    HealthInsurancesShowComponent,
    DataCardComponent,
    AnamnesisListComponent,
    PatientDataComponent,
    PatientSessionsComponent,
    AnamnesisEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
