import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudServices } from '../../helpers/crud/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientsService extends CrudServices {

  constructor(public http: HttpClient) {
    super();
    this.entity = 'patients';
  }

  public getPatientsTotalCount(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/${this.entity}/counter`);
  }

}
