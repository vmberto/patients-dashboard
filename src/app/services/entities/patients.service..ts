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

}
