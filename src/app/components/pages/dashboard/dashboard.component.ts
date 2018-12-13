import { HealthInsurancesService } from './../../../services/entities/health-insurances.service';
import { PatientsService } from 'src/app/services/entities/patients.service.';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { generateRandomColor } from 'src/app/helpers/consts.helpers';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public patientsCounter: Observable<any>;
    public myChart = [];

    public labels: string[];
    public chartData: number[] = [];
    public colors: string[] = [];

    constructor(private patientsService: PatientsService, private healthInsuranceService: HealthInsurancesService) { }



    ngOnInit() {

        this.patientsCounter = this.patientsService.getPatientsTotalCount().pipe(map(res => res.data));

        this.healthInsuranceService.getPatientsRelation().subscribe(
            res => {
                this.labels = res.data.map(data => data.name);
                res.data.forEach((data) => {
                    this.chartData.push(data.Patients.length);
                });
                this.labels.forEach(() => {
                    this.colors.push(generateRandomColor());
                });

                this.myChart = new Chart('myChart', {
                    type: 'doughnut',
                    data: {
                        labels: this.labels,
                        datasets: [{
                            data: this.chartData,
                            backgroundColor: this.colors,
                            borderColor: this.colors,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        legend: {
                            fullWidth: true,
                            display: true,
                            poisition: 'right',
                            labels: {
                                fontColor: 'white',
                                fontSize: 15
                            }
                        },
                    }
                });


            });


    }

}
