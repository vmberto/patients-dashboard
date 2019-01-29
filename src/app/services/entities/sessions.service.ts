import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudMethods } from 'src/app/utils/crud/crud-methods';

@Injectable({
  providedIn: 'root'
})
export class SessionsService extends CrudMethods {

  constructor(public http: HttpClient) {
    super();
    this.entity = 'sessions';
  }

  public downloadPatientEvolution( { patient, last_sessions_number } ): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');

    return this.http.post(`${environment.API_URL}/api/${this.entity}/download`, { patient, last_sessions_number }, {headers, responseType: 'blob' as 'json'}).toPromise();
  }

}
