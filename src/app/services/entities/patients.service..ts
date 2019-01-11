import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudMethods } from 'src/app/helpers/crud/crud-methods';

@Injectable({
  providedIn: 'root'
})
export class PatientsService extends CrudMethods {

  constructor(public http: HttpClient) {
    super();
    this.entity = 'patients';
  }

  public getPatientsTotalCount(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/${this.entity}/counter`);
  }

  public getAllSessionsDuration(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/${this.entity}/session/total-hours`);
  }

  public getLastWeekSessions(queryParams): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/${this.entity}/all-sessions`, { params: queryParams });
  }

  public postCreateSession(session): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/${this.entity}/${session.patients_id}/create-session`, session);
  }

}
