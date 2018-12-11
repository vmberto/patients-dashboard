import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth/auth-guard.service';


// Patients
import { PatientsListComponent   } from './components/pages/patients/patients-list/patients-list.component';
import { PatientsCreateComponent } from './components/pages/patients/patients-create/patients-create.component';
import { PatientsShowComponent } from './components/pages/patients/patients-show-wrapper/patients-show.component';

// HealthInsurances
import { HealthInsurancesListComponent } from './components/pages/health-insurances/health-insurances-list/health-insurances-list.component';
import { HealthInsurancesShowComponent } from './components/pages/health-insurances/health-insurances-show/health-insurances-show.component';
import { HealthInsurancesCreateComponent } from './components/pages/health-insurances/health-insurances-create/health-insurances-create.component';
import { AnamnesisListComponent } from './components/pages/anamnesis/anamnesis-list/anamnesis-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', canActivate: [AuthGuardService], component: RootComponent, children: 
    [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'patients', component: PatientsListComponent },
      { path: 'patients/create', component: PatientsCreateComponent },
      { path: 'patients/show/:id', component: PatientsShowComponent },

      { path: 'health-insurances', component: HealthInsurancesListComponent },
      { path: 'health-insurances/create', component: HealthInsurancesCreateComponent },
      { path: 'health-insurances/show/:id', component: HealthInsurancesShowComponent },

      { path: 'anamnesis', component: AnamnesisListComponent },
      { path: 'anamnesis/create', component: PatientsCreateComponent },
      { path: 'anamnesis/show/:id', component: PatientsShowComponent },

    ]
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
