import { ToastModule } from './components/generic-components/toast/toast.module';
import { AnamnesisIndexComponent } from './components/pages/anamnesis/anamnesis-index.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2OdometerModule } from 'ng2-odometer';


import { TokenInterceptor, AuthGuardService } from './services';

import { WordWrapPipe } from './pipes/word-wrap.pipe';

// Components
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
  AnamnesisEditComponent,
  PatientsIndexComponent,
  HealthInsuranceIndexComponent,
  CreateSessionComponent
} from './components';

// Directives
import { ModalDirective } from './directives/modal.directive';
import { PatientDataCellComponent } from './components/pages/patients/patients-show/patient-data/patient-data-cell/patient-data-cell.component';

registerLocaleData(localePt);
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
    HealthInsuranceIndexComponent,
    HealthInsurancesListComponent,
    HealthInsurancesCreateComponent,
    HealthInsurancesShowComponent,
    DataCardComponent,
    AnamnesisListComponent,
    PatientDataComponent,
    PatientSessionsComponent,
    AnamnesisEditComponent,
    AnamnesisIndexComponent,
    PatientsIndexComponent,
    CreateSessionComponent,
    ModalDirective,
    PatientDataCellComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2OdometerModule.forRoot(),
    ToastModule.forRoot(),
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
