import { ShareDataService, SessionsService } from 'src/app/services';
import { sortByKey } from 'src/app/utils/app.utils';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { collapse } from 'src/app/utils/animations/animations';


@Component({
  selector: 'app-patient-sessions',
  templateUrl: './patient-sessions.component.html',
  styleUrls: ['./patient-sessions.component.css'],
  animations: [collapse]
})
export class PatientSessionsComponent implements OnInit {

  @Input() patientSessions;
  @Input() totalSessions: number;
  @Input() sessionsListLimit;
  @Output() download: EventEmitter<any> = new EventEmitter<any>();


  public modalState: string;

  constructor(private shareDataService: ShareDataService, private sessionsService: SessionsService) { }

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

  public downloadPatientEvolution(): void {

    const last_sessions_number = 4;

    this.download.emit(last_sessions_number);

  }

}
