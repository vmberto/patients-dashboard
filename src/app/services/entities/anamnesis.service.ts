import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudServices } from '../../helpers/crud/crud-service';
import { Injectable, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnamnesisService extends CrudServices {


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

  public downloadAnamnesis(id): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');

    return this.http.get(`${environment.API_URL}/api/${this.entity}/download/${id}`, {headers, responseType: 'blob' as 'json'}).toPromise();
  }


}
