import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from 'src/app/services';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {

  public patientId: number;
  public creatingSession: boolean;
  public sessionForm: FormGroup

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService) { }

  ngOnInit() {

    
    this.activatedRoute.params
      .subscribe(
        res => {
          this.patientId = res.id;
        }
      );

    this.sessionForm = this.fb.group({
      humour: ['', [Validators.required]],
      attendance_at: ['', [Validators.required]],
      description: ['', [Validators.required]],

    });

  }

  public close() {
    this.closeModal.emit('close');
  }


  public submitSessionData() {

    if (this.sessionForm.valid) {

      this.creatingSession = true;


      const formControls = this.sessionForm.controls;

      const sessionData = {
        description: formControls.description.value,
        humour_id: 1,
        attendance_at: new Date(),
        patients_id: this.patientId
      };

      this.patientsService.postCreateSession(sessionData)
        .subscribe(
          () => {
            window.location.reload();
          }
        )

    }

  }


}
