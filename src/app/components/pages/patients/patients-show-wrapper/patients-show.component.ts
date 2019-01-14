import { PatientsService, ShareDataService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { showup } from 'src/app/helpers/animations/animations';
import { sortByKey } from 'src/app/app.utils';

@Component({
  selector: 'app-show',
  templateUrl: './patients-show.component.html',
  styleUrls: ['./patients-show.component.css'],
  animations: [showup]
})
export class PatientsShowComponent implements OnInit {

  public patientData: any;
  public patientSessions: any;
  public totalSessions: number;

  public sessionsListLimit = 8;

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService,
    private shareData: ShareDataService) { }

  ngOnInit() {

    this.shareData.sessionLimitEvent
      .subscribe(
        res => {
          if (res) this.loadData(null);
        }
      );

    this.loadData(this.sessionsListLimit);
  }

  loadData(sessions_limit: number): void {

    this.shareData.activateLoadingScreen(true);

    this.activatedRoute.params.subscribe(res => {

      let options: any = { id: res.id };
      if (sessions_limit) {
        options = {...options, query: { sessions_limit }};
      }

      this.patientsService.get(options)
        .subscribe(
          (res) => {
            this.shareData.activateLoadingScreen(false);
            this.patientData = res.patient;
            this.patientSessions = res.patient.Sessions;
            this.totalSessions = res.meta.total_sessions;
            sortByKey(this.patientSessions, 'attendance_at');

          },
          () => {
            this.shareData.activateLoadingScreen(false);

          });

    });
  }

  public updatePatientData($event): void {
    this.patientsService.update($event).subscribe(() => {
      this.patientData.updated_at = new Date();
    });
  }

}
