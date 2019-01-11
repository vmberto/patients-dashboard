import { HealthInsurancesService, PatientsService } from 'src/app/services';
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
    public totalSessions: number;

    constructor(
        private patientsService: PatientsService,
        private healthInsuranceService: HealthInsurancesService) { }



    ngOnInit() {

        this.patientsCounter = this.patientsService.getPatientsTotalCount().pipe(map(res => res.data));

        this.patientsHealthInsuranceRelationChart();

        this.totalSessionsLastWeekChart();

    }

    private patientsHealthInsuranceRelationChart() {

        this.healthInsuranceService.getPatientsRelation()
            .subscribe(
                res => {
                    this.healthInsuranceLabels = res.data.map(data => data.name);

                    this.patientsHealthInsuranceData = res.data.map(data => data.Patients.length);

                    this.randomColors = this.healthInsuranceLabels.map(_data => _data = generateRandomColor());
                    
                    this.patientsHealthInsuranceChart = new Chart('patientsHealthInsuranceChart', {
                        type: 'doughnut',
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

    private totalSessionsLastWeekChart() {

        let startDate: any = moment().startOf('week').subtract(1, 'week');
        let endDate: any = moment().endOf('week').subtract(1, 'week');
        const lastWeek = {
            min_date: moment(startDate).format('YYYY-MM-DD'),
            max_date: moment(endDate).format('YYYY-MM-DD')
        }

        this.patientsService.getLastWeekSessions(lastWeek).subscribe(
            res => {
                const sessionsNumber = this.enumerateDaysBetweenDates(startDate, endDate).map(day => day = this.getNumbers(res.data, day));
                this.totalSessions = res.data.length;

                this.lastWeekSessionsChart = new Chart('lastWeekSessionsChart', {
                    type: 'line',
                    beginAtZero: true,
                    data: {
                        labels: this.enumerateDaysBetweenDates(startDate, endDate).map(date => moment(date).format('DD/MM/YYYY')),
                        datasets: [{
                            data: sessionsNumber,
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
        )
    }

    private getNumbers(sessions, day) {
        return sessions.filter(session => moment(session.attendance_at).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD')).length;
    };

    private enumerateDaysBetweenDates(startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };


}
