import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {

  public creatingSession: boolean;
  public sessionForm: FormGroup

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {


    this.sessionForm = this.fb.group({
      humour: ['', [Validators.required]],
      attedance_at: ['', [Validators.required]],
      description: ['', [Validators.required]],


    });

  }

  public close() {
    this.closeModal.emit('close');
  }


  public submitPatientData() {

  }


}
