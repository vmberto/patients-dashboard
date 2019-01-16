import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudMethods } from 'src/app/helpers/crud/crud-methods';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnamnesisService extends CrudMethods {

  constructor(public http: HttpClient) {
    super();
    this.entity = 'anamnesis';
  }

  public createAnamnesisQuestion(questionData): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/${this.entity}/new-question/${questionData.id}`, questionData);
  }

  public deleteAnamnesisQuestion(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/api/${this.entity}/delete-question/${id}`);
  }

  public downloadAnamnesis(id, patient = false): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(`${environment.API_URL}/api/${this.entity}/download/${id}`, patient || {},  {headers, responseType: 'blob' as 'json'}).toPromise();
  }


}
