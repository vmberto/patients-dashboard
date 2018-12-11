import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudServices } from '../../helpers/crud/crud-service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HealthInsurancesService extends CrudServices {


  constructor(public http: HttpClient) {
    super();
    this.entity = 'health-insurances';
  }

  public getPatientsRelation(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/${this.entity}/patients`);
  }


}
