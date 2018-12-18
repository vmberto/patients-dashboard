import { TableComponent } from './helpers/generic-components/table-component/table.component';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token/token.interceptor.service';
import { AuthGuardService } from './services/auth/auth-guard.service';

import { WordWrapPipe } from './pipes/word-wrap.pipe';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/root/sidebar/sidebar.component';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { PatientsListComponent } from './components/pages/patients/patients-list/patients-list.component';
import { NotificationComponent } from './helpers/notification/notification.component';
import { PatientsCreateComponent } from './components/pages/patients/patients-create/patients-create.component';
import { PatientsShowComponent } from './components/pages/patients/patients-show-wrapper/patients-show.component';
import { HealthInsurancesListComponent } from './components/pages/health-insurances/health-insurances-list/health-insurances-list.component';
import { HealthInsurancesCreateComponent } from './components/pages/health-insurances/health-insurances-create/health-insurances-create.component';
import { HealthInsurancesShowComponent } from './components/pages/health-insurances/health-insurances-show/health-insurances-show.component';
import { DataCardComponent } from './helpers/generic-components/data-card/data-card.component';
import { AnamnesisListComponent } from './components/pages/anamnesis/anamnesis-list/anamnesis-list.component';
import { PatientDataComponent } from './components/pages/patients/patients-show-wrapper/patient-data/patient-data.component';
import { PatientSessionsComponent } from './components/pages/patients/patients-show-wrapper/patient-sessions/patient-sessions.component';

// Directives

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RootComponent,
    LoginComponent,
    DashboardComponent,
    PatientsListComponent,
    NotificationComponent,
    TableComponent,
    WordWrapPipe,
    PatientsCreateComponent,
    PatientsShowComponent,
    HealthInsurancesListComponent,
    HealthInsurancesCreateComponent,
    HealthInsurancesShowComponent,
    DataCardComponent,
    AnamnesisListComponent,
    PatientDataComponent,
    PatientSessionsComponent
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
