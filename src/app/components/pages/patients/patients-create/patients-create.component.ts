import { Router, ActivatedRoute } from '@angular/router';
import { PatientsService, HealthInsurancesService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './patients-create.component.html',
  styleUrls: ['./patients-create.component.css']
})
export class PatientsCreateComponent implements OnInit {

  public patientForm: FormGroup;
  public isPrivateValue: 'Sim' | 'Não' = 'Não';
  public healthInsurances;

  public creatingPatient: boolean;


  constructor(
    private fb: FormBuilder,
    private patientService: PatientsService,
    private healthInsuranceService: HealthInsurancesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.healthInsuranceService.get().subscribe(res => {
      this.healthInsurances = res.data;
    });

    this.patientForm = this.fb.group({
      name: ['', [Validators.required]],
      is_private: [false, [Validators.required]],

      health_insurance: [''],

      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],

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
