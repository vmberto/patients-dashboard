import { ShareDataService } from 'src/app/services';
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
  @Input() firstListedSessions;

  public modalState: string;

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit() {
    this.patientSessions.map(patient => {
      patient.opened = false;
    });

  }

  public changeModalState(state: string): void {
    this.modalState = state;
  }

  public showAllSessions(): void {
    this.shareDataService.watchSessionLimit(true);
  }

}
