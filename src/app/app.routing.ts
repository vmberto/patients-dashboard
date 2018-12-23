import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import {
  RootComponent,
  LoginComponent,
  DashboardComponent,
  PatientsListComponent,
  PatientsCreateComponent,
  PatientsShowComponent,
  HealthInsurancesListComponent,
  HealthInsurancesCreateComponent,
  HealthInsurancesShowComponent,
  AnamnesisListComponent,
  AnamnesisEditComponent
} from './components';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', canActivate: [AuthGuardService], component: RootComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'patients', component: PatientsListComponent },
      { path: 'patients/create', component: PatientsCreateComponent },
      { path: 'patients/show/:id', component: PatientsShowComponent },

      { path: 'health-insurances', component: HealthInsurancesListComponent },
      { path: 'health-insurances/create', component: HealthInsurancesCreateComponent },
      { path: 'health-insurances/show/:id', component: HealthInsurancesShowComponent },

      { path: 'anamnesis', component: AnamnesisListComponent },
      { path: 'anamnesis/edit/:id', component: AnamnesisEditComponent },

    ]
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
