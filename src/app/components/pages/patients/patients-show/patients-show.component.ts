import { PatientsService, ShareDataService, SessionsService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { showup } from 'src/app/utils/animations/animations';
import { sortByKeyDesc } from 'src/app/utils/app.utils';


@Component({
  selector: 'app-show',
  templateUrl: './patients-show.component.html',
  styleUrls: ['./patients-show.component.css'],
  animations: [showup]
})
export class PatientsShowComponent implements OnInit {

  public patientDataLoaded = false;
  public totalSessions: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService,
    private shareDataService: ShareDataService) { }

  ngOnInit() {

    this.loadData();
  }

  loadData(): void {

    this.shareDataService.activateLoadingScreen(true);

    this.activatedRoute.params.subscribe(res => {

      this.patientsService.get({ id: res.id })
        .subscribe(
          (res) => {
            this.patientDataLoaded = true;

            this.shareDataService.patient = res.patient;

            this.shareDataService.activateLoadingScreen(false);

            sortByKeyDesc(this.shareDataService.patient.Sessions, 'attendance_at');

          },
          () => {
            this.shareDataService.activateLoadingScreen(false);

          });

    });
  }

  public updatePatientData($event): void {

    this.patientsService.update($event).subscribe(() => {
      if (this.shareDataService.patient) {
        this.shareDataService.patient.updated_at = new Date();
      }
    });
  }

}
