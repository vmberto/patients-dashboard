import { HealthInsuranceIndexComponent } from './components/pages/health-insurances/health-insurance-index.component';
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
  AnamnesisIndexComponent,
  AnamnesisListComponent,
  AnamnesisEditComponent,
  PatientsIndexComponent
} from './components';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', canActivate: [AuthGuardService], component: RootComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: DashboardComponent, data: { title: 'dashboard' } },


      {
        path: 'patients', component: PatientsIndexComponent, data: { title: 'pacientes' }, children: [
          { path: '', component: PatientsListComponent },
          { path: 'create', component: PatientsCreateComponent },
          { path: 'show/:id', component: PatientsShowComponent },
        ]
      },

      {
        path: 'health-insurances', component: HealthInsuranceIndexComponent, data: { title: 'planos de saúde' }, children: [
          { path: '', component: HealthInsurancesListComponent },
        ]
      },

      {
        path: 'anamnesis', component: AnamnesisIndexComponent, data: { title: 'anamneses' }, children: [
          { path: '', component: AnamnesisListComponent },
          { path: 'edit/:id', component: AnamnesisEditComponent },
        ]
      },

    ]
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
