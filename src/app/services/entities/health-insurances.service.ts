import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudMethods } from 'src/app/helpers/crud/crud-methods';
import { Observable } from 'rxjs';


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
