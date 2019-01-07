import { AnamnesisIndexComponent } from './components/pages/anamnesis/anamnesis-index.component';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
  HealthInsuranceIndexComponent
} from './components';

// Directives
import { ModalDirective } from './directives/modal.directive';


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
    PatientsIndexComponent
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
