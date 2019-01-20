import { AnamnesisService } from './../../../../../services/entities/anamnesis.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import saveAs from 'node_modules/file-saver';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {

  @Input() patientData;
  @Output() editPatientData: EventEmitter<any> = new EventEmitter<any>();

  public downloadingAnamnesis: boolean;
  public openInput = false;
  public edit: string;

  constructor(private anamnesisService: AnamnesisService) { }

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

  public downloadPatientAnamnesis() {

    this.downloadingAnamnesis = true;

    /** @TODO colocar um seletor para definir a anamnese que será aplicado os dados do paciente */
    this.anamnesisService.downloadAnamnesis(1, this.patientData)
      .then((res) => {
        this.downloadingAnamnesis = false;
        const file = new Blob([res], { type: 'application/pdf' });
        const anamnesisName = this.patientData.name.toLowerCase().split(' ').join('-');
        const filename = `anamnese-${anamnesisName}.pdf`;

        saveAs(file, filename);
      })
      .catch((err) => {
        this.downloadingAnamnesis = false;
        console.log(err);
      });
  }

}
