import { HttpClient } from '@angular/common/http';
import { CrudServices } from './../../helpers/crud/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudServices {
  protected entity = 'users';

  constructor(public http: HttpClient) {
    super();
   }
}
