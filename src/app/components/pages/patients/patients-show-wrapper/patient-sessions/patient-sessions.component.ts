import { sortByKey } from 'src/app/helpers/consts.helpers';
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

  public date = new Date();
  public array = [{opened: false, humour: 1}, {opened: false, humour: 2}, {opened: false, humour: 0}, {opened: false, humour: 2}, {opened: false, humour: 1}];

  constructor() { }

  ngOnInit() {
    this.patientSessions.map(p => {
      p.opened = false;
    });

    this.patientSessions = sortByKey(this.patientSessions, 'created_at');
  }

}
