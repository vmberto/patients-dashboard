import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ShareDataService } from 'src/app/services';

@Component({
  selector: 'app-patient-data-cell',
  templateUrl: './patient-data-cell.component.html',
  styleUrls: ['./patient-data-cell.component.css']
})
export class PatientDataCellComponent implements OnInit {

  @Input() cellType: string;
  
  @Input() cellTitle: string;
  @Input() cellValue: string;
  @Output() cellValueChange = new EventEmitter<string>();


  public openInput: boolean;
  public edit: string;


  constructor(private shareDataService: ShareDataService) { }

  ngOnInit() { }

  public openInputToEdit() {
    this.edit = this.cellValue;
    this.openInput = !this.openInput;
  }

  public closeOrEditButton(newValue) {
    if (newValue && this.cellValue !== newValue) {
      this.cellValueChange.emit(newValue);
      this.cellValue = newValue;
      this.shareDataService.sendPatientChanges(this.shareDataService.patient)
    }
    this.openInput = false;
  }

}
