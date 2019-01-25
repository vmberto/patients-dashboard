import { AnamnesisService } from './../../../../../services/entities/anamnesis.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import saveAs from 'node_modules/file-saver';
import { ShareDataService } from 'src/app/services';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {

  public patient: any;
  
  @Output() editpatient: EventEmitter<any> = new EventEmitter<any>();
  public downloadingAnamnesis: boolean;
  public edit: string;
  public openInput = false;

  constructor(private anamnesisService: AnamnesisService, private shareDataService: ShareDataService) { }

  ngOnInit() {

    this.patient = this.shareDataService.patient;
    this.edit = this.patient.name;

  }

  public openInputToEdit() {
    this.openInput = !this.openInput;
  }

  public closeOrEditButton(editField) {
    if (editField && this.patient.name !== editField) {
      this.patient.name = editField;
      this.editpatient.emit(this.patient);
    }
    this.openInput = false;
  }

  public downloadPatientAnamnesis() {

    this.downloadingAnamnesis = true;

    /** @TODO colocar um seletor para definir a anamnese que será aplicado os dados do paciente */
    this.anamnesisService.downloadAnamnesis(1, this.patient)
      .then((res) => {
        this.downloadingAnamnesis = false;
        const file = new Blob([res], { type: 'application/pdf' });
        const anamnesisName = this.patient.name.toLowerCase().split(' ').join('-');
        const filename = `anamnese-${anamnesisName}.pdf`;

        saveAs(file, filename);
      })
      .catch(() => {
        this.downloadingAnamnesis = false;
      });
  }

}
