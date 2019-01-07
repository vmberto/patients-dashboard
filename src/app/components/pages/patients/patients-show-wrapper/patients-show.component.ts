import { PatientsService, ShareDataService} from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { showup } from 'src/app/helpers/animations/animations';

@Component({
  selector: 'app-show',
  templateUrl: './patients-show.component.html',
  styleUrls: ['./patients-show.component.css'],
  animations: [showup]
})
export class PatientsShowComponent implements OnInit {

  public patientData: any;
  public patientSessions: any;

  constructor(private activatedRoute: ActivatedRoute, private patientsService: PatientsService, private shareData: ShareDataService) { }

  ngOnInit() {

    this.shareData.activateLoadingScreen(true);

    this.activatedRoute.params.subscribe(res => {

      this.patientsService.get(res.id).subscribe(
        (res) => {
          this.shareData.activateLoadingScreen(false);
          this.patientData = res;
          this.patientSessions = res.Sessions;
        },
        () => {
          this.shareData.activateLoadingScreen(false);

        });

    });

  }

  public updatePatientData($event) {
    this.patientsService.update($event).subscribe(() => {
      this.patientData.updated_at = new Date();
    });
  }

}
