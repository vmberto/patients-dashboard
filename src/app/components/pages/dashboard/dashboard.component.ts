import { HealthInsurancesService, PatientsService, SessionsService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { generateRandomColor } from 'src/app/app.utils';
import Chart from 'chart.js';

import * as moment from 'moment';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public startDate = moment().startOf('week').subtract(1, 'week');
    public endDate = moment().endOf('week').subtract(1, 'week');

    // Counters
    public patientsCounter: Observable<number>;


    // Chart patients x health-insurance relation
    public patientsHealthInsuranceChart = [];
    public healthInsuranceLabels: string[];
    public patientsHealthInsuranceData: number[] = [];
    public randomColors: string[] = [];

    // Chart total sessions last week
    public lastWeekSessionsChart = [];
    public totalHoursWorked: any;
    public totalPatients: number;

    constructor(
        private patientsService: PatientsService,
        private sessionsService: SessionsService,
        private healthInsuranceService: HealthInsurancesService) { }



    ngOnInit() {

        this.patientsCounter = this.patientsService.get({ url: 'counter' }).pipe(map(res => res.data));

        this.patientsHealthInsuranceRelationChart();

        this.totalSessionsLastWeekChart();

    }

    private patientsHealthInsuranceRelationChart() {

        this.healthInsuranceService.get({ url: 'patients' })
            .subscribe(
                res => {
                    this.healthInsuranceLabels = res.data.map(data => data.name);

                    this.patientsHealthInsuranceData = res.data.map(data => data.Patients.length);

                    this.randomColors = this.healthInsuranceLabels.map(_data => _data = generateRandomColor());

                    this.patientsHealthInsuranceChart = new Chart('patientsHealthInsuranceChart', {
                        type: 'pie',
                        data: {
                            labels: this.healthInsuranceLabels,
                            datasets: [{
                                data: this.patientsHealthInsuranceData,
                                backgroundColor: this.randomColors,
                                borderColor: this.randomColors,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            legend: {
                                position: 'left',
                                labels: {
                                    fontColor: 'white',
                                    fontSize: 11
                                }
                            }
                        }
                    });
                });

    }

    private totalSessionsLastWeekChart() {

        const lastWeek = {
            min_date: moment(this.startDate).format('YYYY-MM-DD HH:mm'),
            max_date: moment(this.endDate).format('YYYY-MM-DD HH:mm')
        };

        this.sessionsService.get({ query: lastWeek, url: 'statistics' }).subscribe(
            res => {
                this.totalPatients = res.totalPatients;
                this.totalHoursWorked = res.totalHours;

                this.lastWeekSessionsChart = new Chart('lastWeekSessionsChart', {
                    type: 'line',
                    beginAtZero: true,
                    data: {
                        labels: res.dataLabels,
                        datasets: [{
                            data: res.dataSets,
                            borderColor: 'white',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: function (value) { if (Number.isInteger(value) && value >= 0) { return value; } },
                                    stepSize: 1
                                }
                            }]
                        }
                    }
                });
            }
        );
    }

    public recalculateSessions() {
        this.startDate = moment(this.startDate).set('hour', 0);
        this.endDate = moment(this.endDate).set('hour', 23);
        this.totalSessionsLastWeekChart();
    }

}
