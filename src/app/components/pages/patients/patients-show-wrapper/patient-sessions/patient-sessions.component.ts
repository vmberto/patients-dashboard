import { sortByKey } from 'src/app/app.utils';
import { Component, OnInit, Input } from '@angular/core';
import { collapse } from 'src/app/helpers/animations/animations';

@Component({
  selector: 'app-patient-sessions',
  templateUrl: './patient-sessions.component.html',
  styleUrls: ['./patient-sessions.component.css'],
  animations: [collapse]
})
export class PatientSessionsComponent implements OnInit {

  @Input() patientSessions;

  public modalState: string;

  constructor() { }

  ngOnInit() {
    this.patientSessions.map(patient => {
      patient.opened = false;
    });

    this.patientSessions = sortByKey(this.patientSessions, 'created_at');
  }

  public changeModalState(state: string) {
    this.modalState = state;
  }

}
