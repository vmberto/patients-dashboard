import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {

  @Input() patientData;
  @Output() editPatientData: EventEmitter<any> = new EventEmitter<any>();

  public openInput = false;
  public edit: string;

  constructor() { }

  ngOnInit() {
    this.edit = this.patientData.name;

  }

  public openInputToEdit() {
    this.openInput = !this.openInput;
  }

  public closeOrEditButton(editField) {
    if (editField && this.patientData.name !== editField) {
      this.patientData.name = editField;
      this.editPatientData.emit(this.patientData);
    }
    this.openInput = false;
  }

}
