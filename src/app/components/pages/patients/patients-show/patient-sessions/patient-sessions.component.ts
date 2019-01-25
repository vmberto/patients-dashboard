import { ShareDataService, SessionsService } from 'src/app/services';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { collapse } from 'src/app/utils/animations/animations';
import saveAs from 'node_modules/file-saver';



@Component({
  selector: 'app-patient-sessions',
  templateUrl: './patient-sessions.component.html',
  styleUrls: ['./patient-sessions.component.css'],
  animations: [collapse]
})
export class PatientSessionsComponent implements OnInit {

  public sessions: any;
  public downloadingEvolution: boolean;

  public modalState: 'open' | 'close';

  constructor(private shareDataService: ShareDataService, private sessionsService: SessionsService) {
  }

  ngOnInit() {

    this.sessions = this.shareDataService.patient.Sessions;

  }

  public changeModalState(state: 'open' | 'close'): void {
    this.modalState = state;
  }

  public downloadPatientEvolution(last_sessions_number): void {
    
    const { id, name } = this.shareDataService.patient;
    this.downloadingEvolution = true;

    this.sessionsService.downloadPatientEvolution({ last_sessions_number, patient_id: id })
      .then((res) => {

        this.downloadingEvolution = false;

        const file = new Blob([res], { type: 'application/pdf' });
        const patientEvolutionName = name.toLowerCase().split(' ').join('-');
        const filename = `evolução-${patientEvolutionName}.pdf`;
        saveAs(file, filename);

      })
      .catch(() => {
        this.downloadingEvolution = false;
      });

  }

}
