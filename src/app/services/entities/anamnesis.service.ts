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

  public downloadAnamnesis(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/pdf',
      })
    };

    return this.http.get(`${environment.API_URL}/api/${this.entity}/download/${id}`, httpOptions);
  }


}
