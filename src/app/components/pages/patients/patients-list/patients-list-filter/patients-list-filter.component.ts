import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-patients-list-filter',
  templateUrl: './patients-list-filter.component.html',
  styleUrls: ['./patients-list-filter.component.css']
})
export class PatientsListFilterComponent implements OnInit {

  public filterForm: FormGroup;
  @Input() filterConfig;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFilters: EventEmitter<any> = new EventEmitter<any>();


  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.filterForm = this.fb.group({
      search: [''],
      health_insurance: ['']
    });

  }

  public close() {
    this.closeModal.emit('close');
  }

  public submitFilters() {

    const controls = this.filterForm.controls;
    const filters = [];

    if (controls.health_insurance.value) {
      filters.push({ health_insurance: controls.health_insurance.value });
    } else {
      filters.push({ health_insurance: false });
    }

    if (controls.search.value) {
      filters.push({ search: controls.search.value });
    } else {
      filters.push({ search: false });
    }

    this.sendFilters.emit(filters);
    this.close();

  }

}
