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
    public patientsCounter: Observable<any>;
    public myChart = [];
    public lastWeekSessionsChart = [];

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


        let startDate: any = moment().startOf('week').subtract(1, 'week');
        let endDate: any = moment().endOf('week').subtract(1, 'week');


        const lastWeek = {
            min_date: moment(startDate).format('YYYY-MM-DD'),
            max_date: moment(endDate).format('YYYY-MM-DD')
        }


        this.patientsService.getLastWeekSessions(lastWeek).subscribe(
            res => {
                const sessionsNumber = this.enumerateDaysBetweenDates(startDate, endDate).map(day => day = this.getNumbers(res.sessions, day));

                this.lastWeekSessionsChart = new Chart('lastWeekSessionsChart', {
                    type: 'line',
                    data: {
                        labels: this.enumerateDaysBetweenDates(startDate, endDate).map(date => moment(date).format('DD/MM/YYYY')),
                        datasets: [{
                            data: sessionsNumber,
                            borderColor: 'white',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                    }
                });
            }
        )

    }

    public getNumbers(sessions, day) {
        return sessions.filter(session => moment(session.attendance_at).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD')).length;
    };

    public enumerateDaysBetweenDates(startDate, endDate) {
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
