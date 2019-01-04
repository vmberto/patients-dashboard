import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudMethods } from '../../helpers/crud/crud-methods';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HealthInsurancesService extends CrudMethods {


  constructor(public http: HttpClient) {
    super();
    this.entity = 'health-insurances';
  }

  public getPatientsRelation(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/${this.entity}/patients`);
  }


}
