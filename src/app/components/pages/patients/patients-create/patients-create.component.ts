import { HealthInsurancesService } from '../../../../services/entities/health-insurances.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsService } from './../../../../services/entities/patients.service.';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './patients-create.component.html',
  styleUrls: ['./patients-create.component.css']
})
export class PatientsCreateComponent implements OnInit {

  public patientForm: FormGroup;
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
      health_insurance: ['', [Validators.required]],

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



  submitPatientData() {


    if (this.patientForm.valid) {

      this.creatingPatient = true;


      const formControls = this.patientForm.controls;

      const patientData = {
        name: formControls.name.value,
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
