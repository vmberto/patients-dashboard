import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudMethods } from 'src/app/utils/crud/crud-methods';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  constructor(public http: HttpClient) {
  }

  public getCep(cep: string){
      return this.http.get(`${environment.API_URL}/api/seeker/cep/${cep}`);
  }

}
