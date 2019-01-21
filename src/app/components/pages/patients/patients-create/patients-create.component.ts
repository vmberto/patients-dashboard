import { MARITAL_STATES } from 'src/app/helpers/consts/config.helpers';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsService, HealthInsurancesService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { emailValidator, nameValidator, cepValidator } from 'src/app/helpers/validators';
import { SeekerService } from 'src/app/services/seeker.service';

@Component({
  selector: 'app-create',
  templateUrl: './patients-create.component.html',
  styleUrls: ['./patients-create.component.css']
})
export class PatientsCreateComponent implements OnInit {

  public patientForm: FormGroup;
  public isPrivateValue: 'Sim' | 'Não' = 'Não';
  public healthInsurances;
  public maritalStates = MARITAL_STATES;

  public creatingPatient: boolean;


  constructor(
    private fb: FormBuilder,
    private patientService: PatientsService,
    private healthInsuranceService: HealthInsurancesService,
    private router: Router,
    private route: ActivatedRoute,
    private seekerService: SeekerService) { }

  ngOnInit() {

    this.healthInsuranceService.get().subscribe(res => {
      this.healthInsurances = res.data;
    });

    this.patientForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      is_private: [false, [Validators.required]],

      health_insurance: [''],

      email: ['', [Validators.required, emailValidator]],
      phone: ['', [Validators.required]],

      marital_status_type_id: [1, [Validators.required]],
      childrens_number: ['', [Validators.required]],

      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: [''],
      zip_code: ['', [Validators.required]],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });

  }

  public setPatientType() {
    const currentValue = this.patientForm.controls.is_private.value;
    this.isPrivateValue = currentValue === false ? 'Sim' : 'Não';
    this.patientForm.controls.is_private.setValue(currentValue === false ? true : false);
  }

  public checkMaritalStatus() {
    const formControls = this.patientForm.controls;
    if (formControls.marital_status_type_id.value != 1) {
      this.patientForm.addControl('union_time', new FormControl('', [Validators.required]));
      return true;
    } else {
      this.patientForm.removeControl('union_time');
      return false;
    }
  }

  public findCep() {

    this.seekerService.getCep(this.patientForm.controls.zip_code.value)
      .subscribe(
        (res) => {
          this.patientForm.controls.city.setValue(res['localidade'])
          this.patientForm.controls.district.setValue(res['bairro'])
          this.patientForm.controls.street.setValue(res['logradouro'])

        }
      )

  }

  submitPatientData() {

    if (this.patientForm.valid) {

      this.creatingPatient = true;


      const formControls = this.patientForm.controls;

      const patientData = {
        name: formControls.name.value,
        is_private: formControls.is_private.value,
        email: formControls.email.value,
        phone: formControls.phone.value,
        health_insurance_id: formControls.health_insurance.value,
        marital_status_type_id: formControls.marital_status_type_id.value,
        childrens_number: formControls.childrens_number.value,
        union_time: formControls.union_time ? `${formControls.union_time.value} anos` : null,
        address: {
          street: formControls.street.value,
          number: formControls.number.value,
          complement: formControls.complement.value,
          zip_code: formControls.zip_code.value,
          district: formControls.district.value,
          city: formControls.city.value,
        }
      };


      this.patientService.post(patientData)
        .subscribe(
          () => {
            this.creatingPatient = false;

            this.router.navigate(['..'], { relativeTo: this.route });
          },
          () => {
            this.creatingPatient = false;

          }
        );
    }


  }

}
